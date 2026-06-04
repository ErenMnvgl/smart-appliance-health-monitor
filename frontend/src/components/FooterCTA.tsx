"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";

export default function FooterCTA({ scrollProgress }: { scrollProgress: any }) {
  // Fades in starting at 80%, solid at 90%
  const opacity = useTransform(scrollProgress, [0.8, 0.9], [0, 1]);
  const pointerEvents = useTransform(scrollProgress, (val) => (val > 0.8 ? "auto" : "none"));
  const y = useTransform(scrollProgress, [0.8, 0.9], [100, 0]);
  const display = useTransform(scrollProgress, (p) => (p < 0.79 ? "none" : "flex"));

  return (
    <motion.footer 
      style={{ opacity, pointerEvents: pointerEvents as any, y, display }}
      className="fixed bottom-0 left-0 w-full py-32 bg-vestel-red z-30 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to Build the Future?
          </h2>
          
          <p className="text-xl text-white/80 mb-12 font-light">
            This project was developed as a comprehensive software engineering portfolio showcase, demonstrating frontend architecture, motion design, and full-stack integration capabilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="px-8 py-4 bg-white text-vestel-red font-semibold rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group"
            >
              See Project Details
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-black/20 text-white font-semibold rounded-full border border-white/20 hover:bg-black/30 transition-colors flex items-center justify-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 w-full text-center text-white/50 text-sm">
        <p>© 2026 Eren Portfolio Project. Designed for presentation.</p>
      </div>
    </motion.footer>
  );
}
