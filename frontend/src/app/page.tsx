"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ImageSequenceScroll from "@/components/ImageSequenceScroll";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EcosystemSection from "@/components/EcosystemSection";
import DashboardShowcase from "@/components/DashboardShowcase";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // scrollYProgress is scoped to the scroll runway div, not the full page
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative bg-black selection:bg-vestel-red selection:text-white">
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-vestel-red z-[9999] origin-left"
        style={{ scaleX }}
      />

      {/* Scroll runway — all fixed overlays live inside here */}
      <div ref={scrollRef} className="relative min-h-[700vh]">
        <ImageSequenceScroll scrollProgress={scrollYProgress} />
        <HeroSection scrollProgress={scrollYProgress} />
        <AboutSection scrollProgress={scrollYProgress} />
        <EcosystemSection scrollProgress={scrollYProgress} />
        <DashboardShowcase scrollProgress={scrollYProgress} />
      </div>

      {/* Footer — normal flow element, physically at the bottom of the page */}
      <FooterCTA />
    </main>
  );
}
