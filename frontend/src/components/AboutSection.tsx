"use client";

import { motion, useTransform } from "framer-motion";
import { Cpu, Wifi, Activity, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Wifi className="w-5 h-5 text-vestel-red" />,
    title: "Always Connected",
    description: "Real-time telemetry keeps every device in sync — no polling, no lag.",
  },
  {
    icon: <Activity className="w-5 h-5 text-vestel-red" />,
    title: "Health Diagnostics",
    description: "Algorithms detect anomalies the moment they surface.",
  },
  {
    icon: <Cpu className="w-5 h-5 text-vestel-red" />,
    title: "Smart Edge",
    description: "Microcontrollers preprocess sensor data at the source.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-vestel-red" />,
    title: "Secure Architecture",
    description: "End-to-end encrypted payloads across every channel.",
  },
];

export default function AboutSection({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.15, 0.2, 0.3, 0.35], [40, 0, 0, -40]);
  const pointerEvents = useTransform(scrollProgress, (val: number) => (val > 0.15 && val < 0.35 ? "auto" : "none"));
  const display = useTransform(scrollProgress, (p: number) => (p < 0.14 || p > 0.36 ? "none" : "flex"));

  return (
    <motion.section 
      style={{ opacity, y, pointerEvents: pointerEvents as any, display }}
      className="fixed inset-0 w-full h-screen z-20 flex flex-col items-center justify-center px-6"
    >
      <div className="glass-panel p-10 md:p-14 rounded-3xl max-w-4xl w-full shadow-2xl shadow-black/40">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-white">
          Intelligence at the Core.
        </h2>
        
        <p className="text-lg text-neutral-400 mb-12 leading-relaxed font-light max-w-2xl">
          The central nervous system for your home — bridging hardware and software
          to provide unified operational intelligence for every appliance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-vestel-red/10 flex items-center justify-center border border-vestel-red/15">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-white mb-1">{feature.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
