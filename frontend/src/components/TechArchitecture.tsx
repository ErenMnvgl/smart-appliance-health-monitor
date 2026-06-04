"use client";

import { motion } from "framer-motion";
import { Server, Database, MonitorSmartphone, Code2 } from "lucide-react";

export default function TechArchitecture() {
  return (
    <section className="py-32 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Under the Hood</h2>
          <p className="text-gray-400 font-light">A robust, modern software stack powering the ecosystem.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            {
              icon: <MonitorSmartphone className="w-8 h-8 mb-4 text-white" />,
              title: "Frontend",
              desc: "Next.js 14, React, Tailwind CSS, Framer Motion",
            },
            {
              icon: <Server className="w-8 h-8 mb-4 text-white" />,
              title: "Backend API",
              desc: "Node.js, Express, RESTful endpoints",
            },
            {
              icon: <Database className="w-8 h-8 mb-4 text-white" />,
              title: "Data Layer",
              desc: "In-memory state management (mocked for demo)",
            },
            {
              icon: <Code2 className="w-8 h-8 mb-4 text-white" />,
              title: "Language",
              desc: "End-to-end TypeScript for type safety",
            }
          ].map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/5 transition-colors"
            >
              {tech.icon}
              <h3 className="text-lg font-medium text-white mb-2">{tech.title}</h3>
              <p className="text-sm text-gray-400">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
