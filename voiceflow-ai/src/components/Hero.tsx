"use client";

import { motion } from "framer-motion";
import { Phone, Calculator, Bot, Shield, Clock, TrendingDown } from "lucide-react";

const stats = [
  { icon: Bot, label: "Businesses Served", value: "500+" },
  { icon: TrendingDown, label: "Cost Reduction", value: "70%" },
  { icon: Clock, label: "Availability", value: "24/7" },
  { icon: Shield, label: "Response Time", value: "< 2s" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center grid-bg overflow-hidden pt-16">
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-emerald-300 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Now Powered by GPT-4 + ElevenLabs Voice AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
        >
          Cut Support Costs 70%
          <br />
          <span className="gradient-text">With AI That Actually Talks</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed"
        >
          Custom AI chatbots and voice agents that handle customer service, qualify leads,
          and book appointments &mdash; 24/7. Built with Voiceflow, ElevenLabs, and Twilio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#demo"
            className="animate-pulse-glow inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-lg transition-all hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            Try Live Voice Demo
          </a>
          <a
            href="#roi"
            className="inline-flex items-center gap-2 px-8 py-4 border border-slate-600 hover:border-emerald-500 text-slate-200 font-semibold rounded-xl text-lg transition-all hover:text-emerald-400"
          >
            <Calculator className="w-5 h-5" />
            Calculate Your ROI
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass-card rounded-2xl p-6 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
