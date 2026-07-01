"use client";

import { ArrowUpRight, Code2 } from "lucide-react";

export default function FooterCTA() {
  return (
    <footer className="relative w-full min-h-screen bg-vestel-red z-30 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent opacity-60" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h2>
          
          <p className="text-lg text-white/70 mb-10 font-light max-w-xl leading-relaxed">
            A comprehensive software engineering portfolio — frontend architecture, motion design, and full-stack integration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#"
              className="px-8 py-4 bg-white text-vestel-red font-medium rounded-full hover:bg-neutral-100 transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              See Project Details
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-black/15 text-white font-medium rounded-full border border-white/15 hover:bg-black/25 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 w-full text-center text-white/40 text-[13px]">
        <p>© 2026 Eren Portfolio Project</p>
      </div>
    </footer>
  );
}
