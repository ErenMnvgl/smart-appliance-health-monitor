import { useState, useEffect } from 'react';

const APPLIANCE_IMAGES: Record<string, string> = {
  "air-fryer": "/appliances/air-fryer.png",
  "tea-maker": "/appliances/tea-maker.png",
  "vacuum": "/appliances/robot-vacuum.png",
  "mixer": "/appliances/stand-mixer.png",
  "grill": "/appliances/grill-toaster.png",
};

export interface Appliance {
  id: string;
  name: string;
  category: string;
  status: string;
  health: string;
  temp: string;
  usage: string;
  image: string;
}

export interface SystemMetrics {
  totalConnected: number;
  online: number;
  offline: number;
  alerts: number;
  healthScore: number;
  uptime: string;
}

export function useAppliances(pollInterval = 5000) {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalConnected: 0,
    online: 0,
    offline: 0,
    alerts: 0,
    healthScore: 0,
    uptime: "99.9%",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch('/api/appliances');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (!mounted) return;

        const enrichedAppliances: Appliance[] = data.map((a: any) => ({
          ...a,
          image: APPLIANCE_IMAGES[a.type] || "/appliances/air-fryer.png"
        }));

        setAppliances(enrichedAppliances);

        const totalConnected = enrichedAppliances.length;
        const online = enrichedAppliances.filter(a => a.status === 'online').length;
        const offline = enrichedAppliances.filter(a => a.status === 'offline').length;
        const alerts = enrichedAppliances.filter(a => a.health === 'warning' || a.health === 'critical').length;
        
        let healthScore = 100;
        if (totalConnected > 0) {
          const deductions = enrichedAppliances.reduce((acc, a) => {
            if (a.health === 'warning') return acc + 10;
            if (a.health === 'critical') return acc + 30;
            if (a.status === 'offline') return acc + 5;
            return acc;
          }, 0);
          healthScore = Math.max(0, 100 - Math.floor(deductions / totalConnected));
        }

        setMetrics({
          totalConnected,
          online,
          offline,
          alerts,
          healthScore,
          uptime: "99.9%",
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching appliances:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, pollInterval);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [pollInterval]);

  return { appliances, metrics, isLoading };
}
