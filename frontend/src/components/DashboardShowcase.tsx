"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { SYSTEM_METRICS } from "@/lib/data";

export default function DashboardShowcase({ scrollProgress }: { scrollProgress: any }) {
  // Fades in starting at 60%, solid at 65%, fades out at 85%
  const opacity = useTransform(scrollProgress, [0.6, 0.65, 0.85, 0.9], [0, 1, 1, 0]);
  const pointerEvents = useTransform(scrollProgress, (val) => (val > 0.6 && val < 0.9 ? "auto" : "none"));
  
  // Parallax internal elements slightly while it's visible
  const y1 = useTransform(scrollProgress, [0.6, 0.9], [50, -50]);
  const y2 = useTransform(scrollProgress, [0.6, 0.9], [-20, 20]);
  const display = useTransform(scrollProgress, (p) => (p < 0.59 || p > 0.91 ? "none" : "flex"));

  return (
    <motion.section 
      style={{ opacity, pointerEvents: pointerEvents as any, display }}
      className="fixed inset-0 w-full h-screen z-20 flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16 drop-shadow-xl">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Centralized Intelligence</h2>
          <p className="text-gray-300 max-w-xl mx-auto font-light">
            A single pane of glass for real-time monitoring. The dashboard aggregates telemetry and predicts maintenance needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chart Widget */}
          <motion.div 
            style={{ y: y1 }}
            className="lg:col-span-8 glass-panel border border-white/10 rounded-3xl p-8 min-h-[400px] flex flex-col bg-black/60 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-medium text-white">System Health Score</h3>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                Optimal
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-end relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                  {SYSTEM_METRICS.healthScore}
                </span>
                <span className="text-2xl text-gray-400 ml-2 mb-8">%</span>
              </div>
              
              <svg className="w-full h-32 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L0,80 C20,80 30,20 50,20 C70,20 80,60 100,60 L100,100 Z" fill="url(#grad)" />
                <path d="M0,80 C20,80 30,20 50,20 C70,20 80,60 100,60" fill="none" stroke="currentColor" strokeWidth="2" className="text-vestel-red" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-vestel-red)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--color-vestel-red)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Right Column Metrics */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div 
              style={{ y: y2 }}
              className="glass-panel border border-white/10 bg-black/60 shadow-2xl rounded-3xl p-6 flex-1 flex flex-col justify-between"
            >
              <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Connected Devices</h3>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white">{SYSTEM_METRICS.totalConnected}</span>
                <span className="text-gray-400 mb-2">total</span>
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-gray-300">{SYSTEM_METRICS.online} Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  <span className="text-gray-300">{SYSTEM_METRICS.offline} Offline</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: y1 }}
              className="glass-panel border border-white/10 bg-black/60 shadow-2xl rounded-3xl p-6 flex-1 flex flex-col justify-between"
            >
              <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Active Alerts</h3>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-amber-400">{SYSTEM_METRICS.alerts}</span>
                <span className="text-gray-400 mb-2">warning</span>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Filter needs checking on V-Bot Robot Vacuum.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
