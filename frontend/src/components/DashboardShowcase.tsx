"use client";

import { motion, useTransform } from "framer-motion";
import { useAppliances } from "@/lib/useAppliances";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// ─── Animated count-up number ─────────────────────────────────────────────
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (!spanRef.current || prevValue.current === value) return;
    const from = { val: prevValue.current };
    prevValue.current = value;

    gsap.to(from, {
      val: value,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: () => {
        if (spanRef.current) {
          spanRef.current.textContent = Math.round(from.val) + suffix;
        }
      },
    });
  }, [value, suffix]);

  return (
    <span ref={spanRef} className="tabular-nums">
      {value}{suffix}
    </span>
  );
}

// ─── Mini sparkline SVG ───────────────────────────────────────────────────
function Sparkline({ color = "#da291c" }: { color?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" }
    );
  }, []);

  return (
    <svg className="w-full h-28 opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,100 L0,80 C20,80 30,20 50,20 C70,20 80,60 100,60 L100,100 Z"
        fill="url(#grad)"
      />
      <path
        ref={pathRef}
        d="M0,80 C20,80 30,20 50,20 C70,20 80,60 100,60"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function DashboardShowcase({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.6, 0.65, 0.85, 0.9], [0, 1, 1, 0]);
  const pointerEvents = useTransform(scrollProgress, (val: number) =>
    val > 0.6 && val < 0.9 ? "auto" : "none"
  );
  const y1 = useTransform(scrollProgress, [0.6, 0.9], [40, -40]);
  const y2 = useTransform(scrollProgress, [0.6, 0.9], [-16, 16]);
  const display = useTransform(scrollProgress, (p: number) =>
    p < 0.59 || p > 0.91 ? "none" : "flex"
  );

  const { metrics } = useAppliances(1000);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Entrance reveal on scroll
  useEffect(() => {
    const unsub = scrollProgress.on("change", (v: number) => {
      if (v > 0.63 && !hasAnimated.current && sectionRef.current) {
        hasAnimated.current = true;
        const widgets = sectionRef.current.querySelectorAll(".dash-widget");
        gsap.fromTo(
          widgets,
          { opacity: 0, y: 28, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    });
    return () => unsub();
  }, [scrollProgress]);

  // Health score label
  const healthLabel =
    metrics.healthScore >= 90
      ? "Optimal"
      : metrics.healthScore >= 70
      ? "Good"
      : metrics.healthScore >= 50
      ? "Degraded"
      : "Critical";

  const healthLabelColor =
    metrics.healthScore >= 90
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/15"
      : metrics.healthScore >= 70
      ? "text-amber-400 bg-amber-500/10 border-amber-500/15"
      : "text-vestel-red bg-vestel-red/10 border-vestel-red/20";

  return (
    <motion.section
      style={{ opacity, pointerEvents: pointerEvents as any, display }}
      className="fixed inset-0 w-full h-screen z-20 flex flex-col items-center justify-center px-6"
    >
      <div ref={sectionRef} className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-white">
            Centralized Intelligence
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto font-light text-base">
            A single pane of glass for real-time monitoring. Aggregated
            telemetry and predictive maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Health Score Widget */}
          <motion.div
            style={{ y: y1 }}
            className="dash-widget lg:col-span-8 dashboard-widget rounded-3xl p-8 min-h-[380px] flex flex-col opacity-0"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-base font-medium text-white">System Health Score</h3>
              <div
                className={`px-3 py-1 rounded-full border text-[13px] font-medium ${healthLabelColor}`}
              >
                {healthLabel}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 tabular-nums">
                  <AnimatedNumber value={metrics.healthScore} />
                </span>
                <span className="text-2xl text-neutral-500 ml-1 mb-8">%</span>
              </div>
              <Sparkline color="var(--color-vestel-red)" />
            </div>
          </motion.div>

          {/* Right Column Metrics */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <motion.div
              style={{ y: y2 }}
              className="dash-widget dashboard-widget rounded-3xl p-6 flex-1 flex flex-col justify-between opacity-0"
            >
              <h3 className="text-[13px] text-neutral-500 font-medium uppercase tracking-[0.06em] mb-2">
                Connected Devices
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white">
                  <AnimatedNumber value={metrics.totalConnected} />
                </span>
                <span className="text-neutral-500 mb-2 text-sm">total</span>
              </div>
              <div className="mt-4 flex gap-4 text-[13px]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-neutral-400">
                    <AnimatedNumber value={metrics.online} /> Online
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  <span className="text-neutral-400">
                    <AnimatedNumber value={metrics.offline} /> Offline
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ y: y1 }}
              className="dash-widget dashboard-widget rounded-3xl p-6 flex-1 flex flex-col justify-between opacity-0"
            >
              <h3 className="text-[13px] text-neutral-500 font-medium uppercase tracking-[0.06em] mb-2">
                Active Alerts
              </h3>
              <div className="flex items-end gap-2">
                <span
                  className={`text-5xl font-bold tabular-nums ${
                    metrics.alerts > 0 ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  <AnimatedNumber value={metrics.alerts} />
                </span>
                <span className="text-neutral-500 mb-2 text-sm">
                  {metrics.alerts === 1 ? "warning" : "warnings"}
                </span>
              </div>
              <p className="mt-4 text-[13px] text-neutral-500">
                {metrics.alerts === 0
                  ? "All systems operating normally."
                  : `${metrics.alerts} device${metrics.alerts > 1 ? "s" : ""} require attention.`}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
