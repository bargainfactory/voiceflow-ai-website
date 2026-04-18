"use client";

import { motion } from "framer-motion";
import {
  FileText, MessageSquare, Palette, Plug, Rocket, CheckCircle,
  Clock, CreditCard, ArrowRight,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function GetStarted() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: FileText,
      title: t.getStarted.step1Title,
      description: t.getStarted.step1Desc,
      items: [t.getStarted.step1Item1, t.getStarted.step1Item2, t.getStarted.step1Item3],
    },
    {
      number: "02",
      icon: MessageSquare,
      title: t.getStarted.step2Title,
      description: t.getStarted.step2Desc,
      items: [t.getStarted.step2Item1, t.getStarted.step2Item2, t.getStarted.step2Item3],
    },
    {
      number: "03",
      icon: Palette,
      title: t.getStarted.step3Title,
      description: t.getStarted.step3Desc,
      items: [t.getStarted.step3Item1, t.getStarted.step3Item2, t.getStarted.step3Item3],
    },
    {
      number: "04",
      icon: Plug,
      title: t.getStarted.step4Title,
      description: t.getStarted.step4Desc,
      items: [t.getStarted.step4Item1, t.getStarted.step4Item2, t.getStarted.step4Item3],
    },
    {
      number: "05",
      icon: Rocket,
      title: t.getStarted.step5Title,
      description: t.getStarted.step5Desc,
      items: [t.getStarted.step5Item1, t.getStarted.step5Item2, t.getStarted.step5Item3],
    },
  ];

  const highlights = [
    { icon: Clock, text: t.getStarted.highlight1 },
    { icon: CreditCard, text: t.getStarted.highlight2 },
    { icon: CheckCircle, text: t.getStarted.highlight3 },
  ];

  return (
    <section id="get-started" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.getStarted.headline} <span className="gradient-text">{t.getStarted.headlineAccent}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.getStarted.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {highlights.map((h) => (
            <motion.div
              key={h.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-5 py-2.5 glass-card rounded-full"
            >
              <h.icon className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-300">{h.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 w-full">
                  <div className={`glass-card rounded-2xl p-8 ${i % 2 === 1 ? "lg:text-right" : ""}`}>
                    <div className={`flex items-center gap-3 mb-4 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-emerald-400 text-xs font-mono font-bold">{t.getStarted.stepLabel} {step.number}</span>
                        <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.items.map((item) => (
                        <li key={item} className={`flex items-center gap-2 text-sm text-slate-300 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="hidden lg:flex w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 items-center justify-center flex-shrink-0 z-10">
                  <span className="text-emerald-400 font-bold text-sm">{step.number}</span>
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            {t.getStarted.cta}
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-slate-500 text-sm mt-4">{t.getStarted.ctaSub}</p>
        </motion.div>
      </div>
    </section>
  );
}
