"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function CaseStudies() {
  const { t } = useLanguage();

  const studies = [
    {
      company: t.caseStudies.med.name,
      industry: t.caseStudies.med.industry,
      challenge: t.caseStudies.med.challenge,
      solution: t.caseStudies.med.solution,
      metrics: [
        { label: t.caseStudies.med.m1l, value: t.caseStudies.med.m1 },
        { label: t.caseStudies.med.m2l, value: t.caseStudies.med.m2 },
        { label: t.caseStudies.med.m3l, value: t.caseStudies.med.m3 },
        { label: t.caseStudies.med.m4l, value: t.caseStudies.med.m4 },
      ],
      quote: t.caseStudies.med.quote,
      person: t.caseStudies.med.person,
    },
    {
      company: t.caseStudies.apex.name,
      industry: t.caseStudies.apex.industry,
      challenge: t.caseStudies.apex.challenge,
      solution: t.caseStudies.apex.solution,
      metrics: [
        { label: t.caseStudies.apex.m1l, value: t.caseStudies.apex.m1 },
        { label: t.caseStudies.apex.m2l, value: t.caseStudies.apex.m2 },
        { label: t.caseStudies.apex.m3l, value: t.caseStudies.apex.m3 },
        { label: t.caseStudies.apex.m4l, value: t.caseStudies.apex.m4 },
      ],
      quote: t.caseStudies.apex.quote,
      person: t.caseStudies.apex.person,
    },
    {
      company: t.caseStudies.shop.name,
      industry: t.caseStudies.shop.industry,
      challenge: t.caseStudies.shop.challenge,
      solution: t.caseStudies.shop.solution,
      metrics: [
        { label: t.caseStudies.shop.m1l, value: t.caseStudies.shop.m1 },
        { label: t.caseStudies.shop.m2l, value: t.caseStudies.shop.m2 },
        { label: t.caseStudies.shop.m3l, value: t.caseStudies.shop.m3 },
        { label: t.caseStudies.shop.m4l, value: t.caseStudies.shop.m4 },
      ],
      quote: t.caseStudies.shop.quote,
      person: t.caseStudies.shop.person,
    },
  ];

  return (
    <section id="case-studies" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.caseStudies.headline} <span className="gradient-text">{t.caseStudies.headlineAccent}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.caseStudies.subtitle}
          </p>
        </motion.div>

        <div className="space-y-8">
          {studies.map((study, i) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <span className="text-emerald-400 font-bold text-lg">
                        {study.company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{study.company}</h3>
                      <span className="text-sm text-emerald-400">{study.industry}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="text-sm">
                      <span className="text-slate-500 font-medium">{t.caseStudies.challenge} </span>
                      <span className="text-slate-300">{study.challenge}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-slate-500 font-medium">{t.caseStudies.solution} </span>
                      <span className="text-slate-300">{study.solution}</span>
                    </p>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4">
                    <Quote className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-300 text-sm italic mb-2">{study.quote}</p>
                      <p className="text-slate-500 text-xs">&mdash; {study.person}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80 grid grid-cols-2 gap-4">
                  {study.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-slate-800/50 rounded-xl p-4 text-center"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-emerald-400">{metric.value}</div>
                      <div className="text-xs text-slate-400 mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
