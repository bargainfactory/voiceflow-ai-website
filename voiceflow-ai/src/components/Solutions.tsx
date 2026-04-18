"use client";

import { motion } from "framer-motion";
import { Stethoscope, Building2, ShoppingCart, Scale, Wrench, Users } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Solutions() {
  const { t } = useLanguage();

  const industries = [
    {
      icon: Stethoscope,
      title: t.solutions.healthcare,
      description: t.solutions.healthcareDesc,
      features: [t.solutions.healthcareF1, t.solutions.healthcareF2, t.solutions.healthcareF3],
    },
    {
      icon: Building2,
      title: t.solutions.realEstate,
      description: t.solutions.realEstateDesc,
      features: [t.solutions.realEstateF1, t.solutions.realEstateF2, t.solutions.realEstateF3],
    },
    {
      icon: ShoppingCart,
      title: t.solutions.ecommerce,
      description: t.solutions.ecommerceDesc,
      features: [t.solutions.ecommerceF1, t.solutions.ecommerceF2, t.solutions.ecommerceF3],
    },
    {
      icon: Scale,
      title: t.solutions.legal,
      description: t.solutions.legalDesc,
      features: [t.solutions.legalF1, t.solutions.legalF2, t.solutions.legalF3],
    },
    {
      icon: Wrench,
      title: t.solutions.homeServices,
      description: t.solutions.homeServicesDesc,
      features: [t.solutions.homeServicesF1, t.solutions.homeServicesF2, t.solutions.homeServicesF3],
    },
    {
      icon: Users,
      title: t.solutions.agencies,
      description: t.solutions.agenciesDesc,
      features: [t.solutions.agenciesF1, t.solutions.agenciesF2, t.solutions.agenciesF3],
    },
  ];

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
            {t.solutions.headline} <span className="gradient-text">{t.solutions.headlineAccent}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.solutions.subtitle}
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
                {t.solutions.learnMore} &rarr;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
