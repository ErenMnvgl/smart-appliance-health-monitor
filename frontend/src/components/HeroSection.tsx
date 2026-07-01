"use client";

import { motion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const y = useTransform(scrollProgress, [0.1, 0.15], [0, -80]);
  const scale = useTransform(scrollProgress, [0, 0.15], [1, 0.97]);
  const display = useTransform(scrollProgress, (p: number) => (p > 0.16 ? "none" : "flex"));

  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Rings: subtle breathe scale animation
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 50,
        ease: "none",
        repeat: -1,
      });
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 70,
        ease: "none",
        repeat: -1,
      });

      // Stagger text entrance
      gsap.fromTo(
        ".hero-word",
        { opacity: 0, y: 30, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.1,
        }
      );

      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.45, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.65, ease: "power2.out" }
      );

      // Floating dot particles
      const dots = containerRef.current?.querySelectorAll(".hero-dot");
      dots?.forEach((dot, i) => {
        gsap.to(dot, {
          y: "random(-12, 12)",
          x: "random(-8, 8)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <motion.section
      style={{ opacity, y, scale, display }}
      className="fixed inset-0 w-full h-screen z-10 pointer-events-none flex flex-col items-center justify-center pt-24 pb-12"
    >
      {/* Background orbital rings — GSAP controlled */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.2] pointer-events-none">
        <div
          ref={ring1Ref}
          className="w-[700px] h-[700px] rounded-full border border-white/[0.1] border-dashed"
        />
        <div
          ref={ring2Ref}
          className="absolute w-[880px] h-[880px] rounded-full border border-vestel-red/15"
        />
      </div>

      {/* Floating ambient dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="hero-dot absolute w-1 h-1 rounded-full bg-vestel-red/30"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 14}%`,
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="container mx-auto px-6 h-full flex flex-col items-center justify-center text-center relative z-20 max-w-3xl"
      >
        {/* Headline split into words for stagger */}
        <h1 className="text-5xl md:text-[5.5rem] leading-[0.95] font-bold tracking-tight text-white mb-6 overflow-hidden">
          {"The Connected".split(" ").map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block mr-[0.25em] opacity-0"
              style={{ display: "inline-block" }}
            >
              {word}
            </span>
          ))}
          <span className="block">
            <span
              className="hero-word inline-block opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-vestel-red via-red-500 to-orange-500"
              style={{ display: "inline-block" }}
            >
              Ecosystem
            </span>
          </span>
        </h1>

        <p className="hero-sub opacity-0 text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed font-light max-w-xl">
          Seamlessly track, manage, and visualize the performance of your
          premium home appliances in real-time.
        </p>

        <div className="hero-cta opacity-0 flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <button
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight * 2.5,
                behavior: "smooth",
              })
            }
            className="px-8 py-4 bg-vestel-red text-white font-medium rounded-full hover:bg-vestel-red-hover transition-all flex items-center justify-center gap-2 group shadow-lg shadow-vestel-red/20"
          >
            Explore System
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
