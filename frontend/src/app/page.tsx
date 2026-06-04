"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import ImageSequenceScroll from "@/components/ImageSequenceScroll";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EcosystemSection from "@/components/EcosystemSection";
import DashboardShowcase from "@/components/DashboardShowcase";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative bg-black min-h-[1000vh] selection:bg-vestel-red selection:text-white">
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-vestel-red z-[9999] origin-left"
        style={{ scaleX }}
      />
      
      {/* The background video/sequence that scrubs over the entire 1000vh */}
      <ImageSequenceScroll scrollProgress={scrollYProgress} />

      {/* 
        Scroll-driven Sections:
        They are all fixed position overlays. Their internal useScroll will map 
        the global scroll progress to their opacity, scale, and transforms.
      */}
      <HeroSection scrollProgress={scrollYProgress} />
      <AboutSection scrollProgress={scrollYProgress} />
      <EcosystemSection scrollProgress={scrollYProgress} />
      <DashboardShowcase scrollProgress={scrollYProgress} />
      <FooterCTA scrollProgress={scrollYProgress} />
    </main>
  );
}
