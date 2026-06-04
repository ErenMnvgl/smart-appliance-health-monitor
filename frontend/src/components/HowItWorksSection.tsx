"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Device Registration",
    desc: "Appliances securely connect to the local network and authenticate via the backend API using zero-trust protocols.",
  },
  {
    num: "02",
    title: "Telemetry Stream",
    desc: "Sensors continuously push state data (temperature, cycle status, battery) over lightweight MQTT/WebSockets.",
  },
  {
    num: "03",
    title: "Health Analysis",
    desc: "The Node.js backend processes the raw telemetry, comparing it against optimal health thresholds to calculate a live health score.",
  },
  {
    num: "04",
    title: "Dashboard Visualization",
    desc: "The Next.js frontend consumes the real-time API, visualizing the data in an intuitive, responsive command center.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Sticky left side */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl md:text-5xl font-semibold mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-gray-400 font-light text-lg"
            >
              A scalable architecture designed to handle thousands of concurrent appliance connections without latency.
            </motion.p>
          </div>

          {/* Scrolling steps */}
          <div className="lg:w-2/3 flex flex-col gap-24">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="glass-panel p-10 rounded-3xl relative overflow-hidden border-t border-t-white/10"
              >
                <div className="text-8xl font-black text-white/5 absolute -top-4 -right-4 select-none">
                  {step.num}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed relative z-10 text-lg font-light">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
