"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Wifi, Activity, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Wifi className="w-6 h-6 text-vestel-red" />,
    title: "Always Connected",
    description: "Real-time MQTT telemetry ensures sync.",
  },
  {
    icon: <Activity className="w-6 h-6 text-vestel-red" />,
    title: "Health Diagnostics",
    description: "Algorithms detect anomalies instantly.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-vestel-red" />,
    title: "Smart Edge",
    description: "Microcontrollers process raw sensor data.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-vestel-red" />,
    title: "Secure Architecture",
    description: "End-to-end encrypted payloads.",
  },
];

export default function AboutSection({ scrollProgress }: { scrollProgress: any }) {
  // Fades in starting at 15%, solid at 20%, fades out at 30%
  const opacity = useTransform(scrollProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.15, 0.2, 0.3, 0.35], [50, 0, 0, -50]);
  const pointerEvents = useTransform(scrollProgress, (val) => (val > 0.15 && val < 0.35 ? "auto" : "none"));
  const display = useTransform(scrollProgress, (p) => (p < 0.14 || p > 0.36 ? "none" : "flex"));

  return (
    <motion.section 
      style={{ opacity, y, pointerEvents: pointerEvents as any, display }}
      className="fixed inset-0 w-full h-screen z-20 flex flex-col items-center justify-center px-6"
    >
      <div className="glass-panel p-12 rounded-3xl max-w-4xl w-full border border-white/10 shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          Intelligence at the Core.
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light">
          The central nervous system for your home. Bridging the gap between hardware 
          and software to provide unified operational intelligence for all your appliances.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-vestel-red/10 flex items-center justify-center border border-vestel-red/20">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
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
