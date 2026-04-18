"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();

  const tiers = [
    {
      name: t.pricing.starter,
      audience: t.pricing.starterAudience,
      setup: "$2,497",
      monthly: "$497",
      popular: false,
      features: [
        t.pricing.f_chatbot1, t.pricing.f_convos500, t.pricing.f_emailSupport,
        t.pricing.f_basicAnalytics, t.pricing.f_voiceflow, t.pricing.f_lang1,
      ],
      cta: t.pricing.getStarted,
    },
    {
      name: t.pricing.professional,
      audience: t.pricing.professionalAudience,
      setup: "$4,997",
      monthly: "$997",
      popular: true,
      features: [
        t.pricing.f_chatVoice, t.pricing.f_convos2500, t.pricing.f_prioritySupport,
        t.pricing.f_advancedAnalytics, t.pricing.f_fullStack, t.pricing.f_lang5,
        t.pricing.f_crm, t.pricing.f_leadQual,
      ],
      cta: t.pricing.startTrial,
    },
    {
      name: t.pricing.enterprise,
      audience: t.pricing.enterpriseAudience,
      setup: "Custom",
      monthly: "Custom",
      popular: false,
      features: [
        t.pricing.f_unlimitedAgents, t.pricing.f_unlimitedConvos, t.pricing.f_dedicatedManager,
        t.pricing.f_customIntegrations, t.pricing.f_whiteLabel, t.pricing.f_allLangs,
        t.pricing.f_sla, t.pricing.f_customTraining,
      ],
      cta: t.pricing.contactSales,
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.pricing.headline} <span className="gradient-text">{t.pricing.headlineAccent}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={"glass-card rounded-2xl p-8 relative " + (
                tier.popular ? "border-emerald-500/50 ring-1 ring-emerald-500/20 md:scale-105" : ""
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                  <Star className="w-3 h-3" />
                  {t.pricing.mostPopular}
                </div>
              )}

              <h3 className="text-xl font-semibold text-white mb-1">{tier.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{tier.audience}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{tier.monthly}</span>
                  {tier.monthly !== "Custom" && <span className="text-slate-400 text-sm">{t.pricing.month}</span>}
                </div>
                <p className="text-slate-500 text-sm mt-1">
                  {tier.setup !== "Custom" ? tier.setup + " " + t.pricing.setupFee : t.pricing.customPricing}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#quote"
                className={"block text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all " + (
                  tier.popular
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                    : "border border-slate-600 hover:border-emerald-500 text-slate-200 hover:text-emerald-400"
                )}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
