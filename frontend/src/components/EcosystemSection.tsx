"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useTransform } from "framer-motion";
import { useAppliances, Appliance } from "@/lib/useAppliances";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// ─── Health score bar (bottom of card) ───────────────────────────────────────
function HealthBar({ score, health }: { score: number; health: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  const color =
    health === "good"
      ? "#34d399"
      : health === "warning"
      ? "#fbbf24"
      : health === "critical"
      ? "#da291c"
      : "#525252";

  useEffect(() => {
    if (!barRef.current) return;
    gsap.to(barRef.current, {
      width: `${Math.max(0, Math.min(100, score))}%`,
      duration: 0.7,
      ease: "power2.out",
    });
  }, [score]);

  return (
    <div className="relative mt-3 pt-3 border-t border-white/[0.05]">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] text-neutral-600 font-medium uppercase tracking-widest">
          Health Score
        </span>
        <span
          className="text-[12px] font-mono font-semibold tabular-nums"
          style={{ color }}
        >
          {score}%
        </span>
      </div>
      {/* Track */}
      <div className="h-1 w-full rounded-full bg-white/[0.05] overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ width: "0%", backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
    </div>
  );
}

// ─── Animated telemetry value ────────────────────────────────────────────────
function LiveValue({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState(value);
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value === prevRef.current) return;
    prevRef.current = value;
    const el = spanRef.current;
    if (!el) { setDisplayed(value); return; }

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0.2, y: -6, color: "#fbbf24" },
      {
        opacity: 1,
        y: 0,
        color: "#e5e5e5",
        duration: 0.4,
        ease: "power2.out",
        onStart: () => setDisplayed(value),
      }
    );
  }, [value]);

  return (
    <span ref={spanRef} className="font-mono text-[13px] text-neutral-200 tabular-nums">
      {displayed}
    </span>
  );
}

// ─── Live events feed ────────────────────────────────────────────────────────
interface FeedEvent {
  id: number;
  name: string;
  field: string;
  value: string;
  ts: number;
  color: string;
}

function LiveFeed({ events }: { events: FeedEvent[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  // Animate new item appearing
  useEffect(() => {
    const el = listRef.current?.querySelector("li:first-child");
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
  }, [events.length]);

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col h-full min-h-[200px]">
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
          Live Events
        </span>
      </div>
      <ul ref={listRef} className="space-y-2 overflow-hidden">
        {events.slice(0, 7).map((ev) => (
          <li key={ev.id} className="flex items-start gap-2 text-[12px]">
            <div
              className="mt-[3px] w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: ev.color }}
            />
            <div className="min-w-0">
              <span className="text-neutral-300 font-medium">{ev.name}</span>
              <span className="text-neutral-600 mx-1">·</span>
              <span className="text-neutral-500">{ev.field}</span>
              <span className="text-neutral-600 mx-1">→</span>
              <span className="font-mono" style={{ color: ev.color }}>{ev.value}</span>
            </div>
          </li>
        ))}
        {events.length === 0 && (
          <li className="text-[12px] text-neutral-600 italic">Waiting for events…</li>
        )}
      </ul>
    </div>
  );
}

// ─── Status pulse dot ────────────────────────────────────────────────────────
function StatusDot({ status }: { status: string }) {
  const pulseRef = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!pulseRef.current || status !== "online") return;
    gsap.fromTo(
      pulseRef.current,
      { scale: 1, opacity: 0.7 },
      { scale: 2.5, opacity: 0, duration: 1.5, ease: "power2.out", repeat: -1, repeatDelay: 0.6 }
    );
  }, [status]);

  return (
    <div className="relative flex items-center justify-center w-3.5 h-3.5">
      {status === "online" && (
        <span ref={pulseRef} className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      )}
      <span className={cn("relative inline-flex rounded-full h-2 w-2",
        status === "online" ? "bg-emerald-500" : "bg-neutral-600"
      )} />
    </div>
  );
}

// ─── Single appliance card ────────────────────────────────────────────────────
function ApplianceCard({ appliance }: { appliance: Appliance & { healthScore?: number } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const leftBorderRef = useRef<HTMLDivElement>(null);
  const prevHealth = useRef(appliance.health);

  // Health change: animate left border flash
  useEffect(() => {
    if (prevHealth.current === appliance.health) return;
    prevHealth.current = appliance.health;
    if (!leftBorderRef.current || !cardRef.current) return;

    const color =
      appliance.health === "critical" ? "#da291c"
      : appliance.health === "warning" ? "#fbbf24"
      : "#34d399";

    // Shake card + flash glow
    gsap.timeline()
      .to(cardRef.current, { x: -3, duration: 0.06, ease: "power1.inOut" })
      .to(cardRef.current, { x: 3, duration: 0.06 })
      .to(cardRef.current, { x: -2, duration: 0.05 })
      .to(cardRef.current, { x: 0, duration: 0.05 });

    gsap.fromTo(
      leftBorderRef.current,
      { opacity: 1, backgroundColor: color },
      { opacity: 0.4, duration: 1.5, ease: "power3.out" }
    );
  }, [appliance.health]);

  // Mouse glow
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    gsap.to(el, {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
    });
  };
  const onMouseLeave = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  const score = typeof (appliance as any).healthScore === "number" ? (appliance as any).healthScore : 100;

  const healthColor =
    appliance.health === "good" ? "#34d399"
    : appliance.health === "warning" ? "#fbbf24"
    : appliance.health === "critical" ? "#da291c"
    : "#525252";

  return (
    <div
      ref={cardRef}
      className="gsap-card group appliance-card rounded-2xl overflow-hidden relative cursor-default flex flex-col"
      style={{ opacity: 0, transform: "translateY(28px)" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Left health border accent */}
      <div
        ref={leftBorderRef}
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl z-10"
        style={{ backgroundColor: healthColor, opacity: 0.4 }}
      />

      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-48 h-48 rounded-full opacity-0 -translate-x-1/2 -translate-y-1/2 blur-[70px] z-0"
        style={{
          background: `radial-gradient(circle, ${healthColor}22 0%, transparent 70%)`,
        }}
      />

      {/* Product image */}
      <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
        <Image
          src={(appliance as any).image}
          alt={appliance.name}
          fill
          className="object-cover object-center opacity-70 group-hover:opacity-90 group-hover:scale-[1.05] transition-all duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0e] via-[#0c0b0e60] to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/[0.07]">
          <StatusDot status={appliance.status} />
          <span className="text-[11px] text-neutral-300 font-medium capitalize">
            {appliance.status}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute bottom-3 left-4">
          <span className="text-[10px] font-bold tracking-[0.12em] text-vestel-red uppercase">
            {(appliance as any).category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-[15px] font-semibold text-white mb-3 leading-tight">
          {appliance.name}
        </h3>

        {/* Data rows */}
        <div className="space-y-0 flex-1">
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-[12px] text-neutral-500">Health</span>
            <span
              className="text-[12px] font-semibold uppercase tracking-wide"
              style={{ color: healthColor }}
            >
              {appliance.health}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-[12px] text-neutral-500">State</span>
            <LiveValue value={(appliance as any).usage || "—"} />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-[12px] text-neutral-500">Telemetry</span>
            <LiveValue value={(appliance as any).temp || "—"} />
          </div>
        </div>

        {/* Health score bar */}
        <HealthBar score={score} health={appliance.health} />
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
let eventCounter = 0;

export default function EcosystemSection({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.35, 0.4, 0.55, 0.6], [40, 0, 0, -40]);
  const pointerEvents = useTransform(scrollProgress, (val: number) =>
    val > 0.35 && val < 0.6 ? "auto" : "none"
  );
  const display = useTransform(scrollProgress, (p: number) =>
    p < 0.34 || p > 0.61 ? "none" : "flex"
  );

  const { appliances } = useAppliances(1000);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const prevAppliances = useRef<typeof appliances>([]);

  // Live event feed state
  const [feedEvents, setFeedEvents] = useState<FeedEvent[]>([]);

  // Detect changes and populate feed
  useEffect(() => {
    if (prevAppliances.current.length === 0) {
      prevAppliances.current = appliances;
      return;
    }
    appliances.forEach((a) => {
      const prev = prevAppliances.current.find((p) => p.id === a.id);
      if (!prev) return;

      const checks: { field: string; key: keyof typeof a; color: string }[] = [
        { field: "health", key: "health", color: a.health === "critical" ? "#da291c" : a.health === "warning" ? "#fbbf24" : "#34d399" },
        { field: "status", key: "status", color: a.status === "online" ? "#34d399" : "#525252" },
        { field: "temp", key: "temp" as any, color: "#60a5fa" },
      ];

      checks.forEach(({ field, key, color }) => {
        if ((a as any)[key] !== (prev as any)[key]) {
          setFeedEvents((evs) => [
            { id: ++eventCounter, name: a.name.split(" ").slice(-1)[0], field, value: String((a as any)[key]), ts: Date.now(), color },
            ...evs.slice(0, 19),
          ]);
        }
      });
    });
    prevAppliances.current = appliances;
  }, [appliances]);

  // Entrance stagger
  useEffect(() => {
    const unsub = scrollProgress.on("change", (v: number) => {
      if (v > 0.38 && !hasAnimated.current && gridRef.current) {
        hasAnimated.current = true;
        const cards = gridRef.current.querySelectorAll(".gsap-card");
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
        });
      }
    });
    return () => unsub();
  }, [scrollProgress]);

  return (
    <motion.section
      style={{ opacity, y, pointerEvents: pointerEvents as any, display }}
      className="fixed inset-0 w-full h-screen z-20 flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-7xl mx-auto max-h-[90vh] overflow-y-auto no-scrollbar pb-8 px-2">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-semibold mb-3 text-white">
            The Ecosystem
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto font-light">
            Interconnected devices reporting state, health, and environmental data in real-time.
          </p>
        </div>

        {/* Main grid + feed panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4 items-start">
          {/* Cards grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {appliances.map((appliance) => (
              <ApplianceCard key={appliance.id} appliance={appliance} />
            ))}
          </div>

          {/* Live feed panel */}
          <div className="hidden lg:block sticky top-0">
            <LiveFeed events={feedEvents} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
