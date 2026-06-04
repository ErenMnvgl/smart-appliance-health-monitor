"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { APPLIANCES } from "@/lib/data";
import { Power, ActivitySquare, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EcosystemSection({ scrollProgress }: { scrollProgress: any }) {
  // Fades in starting at 35%, solid at 40%, fades out at 55%
  const opacity = useTransform(scrollProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.35, 0.4, 0.55, 0.6], [50, 0, 0, -50]);
  const pointerEvents = useTransform(scrollProgress, (val) => (val > 0.35 && val < 0.6 ? "auto" : "none"));
  const display = useTransform(scrollProgress, (p) => (p < 0.34 || p > 0.61 ? "none" : "flex"));

  return (
    <motion.section 
      style={{ opacity, y, pointerEvents: pointerEvents as any, display }}
      className="fixed inset-0 w-full h-screen z-20 flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">The Ecosystem</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light drop-shadow-md">
            An array of interconnected devices reporting state, health, and environmental data to a central nervous system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLIANCES.map((appliance, idx) => (
            <div
              key={appliance.id}
              className="group glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-black/40"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-vestel-red uppercase mb-2">
                    {appliance.category}
                  </p>
                  <h3 className="text-xl font-medium text-white">{appliance.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    {appliance.status === "online" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span className={cn(
                      "relative inline-flex rounded-full h-3 w-3",
                      appliance.status === "online" ? "bg-emerald-500" : "bg-gray-500"
                    )}></span>
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <ActivitySquare className="w-4 h-4" />
                    <span>Health</span>
                  </div>
                  <span className={cn(
                    "text-sm font-medium uppercase tracking-wide",
                    appliance.health === "good" ? "text-emerald-400" :
                    appliance.health === "warning" ? "text-amber-400" :
                    appliance.health === "critical" ? "text-vestel-red" : "text-gray-400"
                  )}>
                    {appliance.health}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Info className="w-4 h-4" />
                    <span>State</span>
                  </div>
                  <span className="text-sm text-gray-200">{appliance.usage}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Power className="w-4 h-4" />
                    <span>Telemetry</span>
                  </div>
                  <span className="text-sm font-mono text-gray-200">{appliance.temp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
