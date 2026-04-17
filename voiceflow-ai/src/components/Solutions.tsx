"use client";

import { motion } from "framer-motion";
import { Stethoscope, Building2, ShoppingCart, Scale, Wrench, Users } from "lucide-react";

const industries = [
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Automate patient interactions while maintaining HIPAA compliance.",
    features: ["Appointment scheduling", "Patient triage", "Insurance verification"],
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Capture every lead and schedule showings around the clock.",
    features: ["Lead qualification", "Property information", "Showing scheduling"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Instant support that boosts satisfaction and reduces returns.",
    features: ["Order tracking", "Returns processing", "Product recommendations"],
  },
  {
    icon: Scale,
    title: "Legal",
    description: "Streamline client intake and answer common questions instantly.",
    features: ["Intake forms", "Consultation scheduling", "FAQ handling"],
  },
  {
    icon: Wrench,
    title: "Home Services",
    description: "Never miss a service call or emergency dispatch again.",
    features: ["Booking management", "Instant estimates", "Emergency dispatch"],
  },
  {
    icon: Users,
    title: "Agencies",
    description: "White-label AI agents branded for each of your clients.",
    features: ["White-label solution", "Multi-client dashboard", "Branded experiences"],
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            AI Solutions <span className="gradient-text">By Industry</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Purpose-built AI agents trained on industry-specific knowledge and workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <ind.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{ind.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{ind.description}</p>
              <ul className="space-y-2 mb-4">
                {ind.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#demo" className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
                Learn More &rarr;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
