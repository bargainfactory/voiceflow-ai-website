"use client";

import { motion } from "framer-motion";
import { Shield, Server, Lock } from "lucide-react";

const logos = [
  "TechCorp", "MedFirst", "Apex Realty", "ShopWave",
  "LegalEase", "HomeFlow", "AgencyX", "ScaleUp",
];

const badges = [
  { icon: Shield, label: "SOC 2 Compliant" },
  { icon: Server, label: "99.9% Uptime SLA" },
  { icon: Lock, label: "HIPAA Ready" },
];

export default function TrustBadges() {
  return (
    <section className="py-16 border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 uppercase tracking-widest mb-8"
        >
          Trusted by 500+ businesses worldwide
        </motion.p>

        <div className="relative overflow-hidden mb-12">
          <div className="flex animate-scroll-left w-max">
            {[...logos, ...logos].map((name, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-8 px-6 py-3 glass-card rounded-lg"
              >
                <span className="text-slate-400 font-semibold text-lg whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 px-5 py-3 glass-card rounded-xl"
            >
              <badge.icon className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-slate-300">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
