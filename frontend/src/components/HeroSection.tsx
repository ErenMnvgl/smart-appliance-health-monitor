"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ scrollProgress }: { scrollProgress: any }) {
  // Opacity: 1 at start, fades out between 10% and 15% scroll
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.15], [1, 1, 0]);
  // Y position: static, then slides up as it fades out
  const y = useTransform(scrollProgress, [0.1, 0.15], [0, -100]);
  const scale = useTransform(scrollProgress, [0, 0.15], [1, 0.95]);
  const display = useTransform(scrollProgress, (p) => (p > 0.16 ? "none" : "flex"));

  return (
    <motion.section 
      style={{ opacity, y, scale, display }}
      className="fixed inset-0 w-full h-screen z-10 pointer-events-none flex flex-col items-center justify-center pt-24 pb-12"
    >
      {/* Rotating Circular Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-overlay pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="w-[800px] h-[800px] rounded-full border border-white/20 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute w-[950px] h-[950px] rounded-full border border-vestel-red/30"
        />
      </div>

      <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
            The Connected <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vestel-red to-orange-500">
              Ecosystem
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl"
        >
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light drop-shadow-lg">
            Vestel Smart Appliance Connection & Health Monitor. Seamlessly track,
            manage, and visualize the performance of your premium home appliances in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 2.5, behavior: "smooth" })}
            className="px-8 py-4 bg-vestel-red text-white font-semibold rounded-full hover:bg-vestel-red-hover transition-all flex items-center justify-center gap-2 group"
          >
            Explore System
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
