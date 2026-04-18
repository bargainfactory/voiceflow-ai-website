"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope, Building2, ShoppingCart, Scale, Wrench, HelpCircle,
  MessageSquare, Phone, Smartphone, Share2, Globe,
  ArrowRight, ArrowLeft, CheckCircle, Sparkles,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function QuoteForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState("");
  const [volume, setVolume] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const industries = [
    { icon: Stethoscope, label: t.solutions.healthcare },
    { icon: Building2, label: t.solutions.realEstate },
    { icon: ShoppingCart, label: t.solutions.ecommerce },
    { icon: Scale, label: t.solutions.legal },
    { icon: Wrench, label: t.solutions.homeServices },
    { icon: HelpCircle, label: t.quote.other },
  ];

  const volumes = [t.quote.vol1, t.quote.vol2, t.quote.vol3, t.quote.vol4];

  const channels = [
    { icon: Globe, label: t.quote.chWebsite },
    { icon: Phone, label: t.quote.chPhone },
    { icon: MessageSquare, label: t.quote.chSMS },
    { icon: Smartphone, label: t.quote.chWhatsApp },
    { icon: Share2, label: t.quote.chSocial },
  ];

  const toggleChannel = (ch: string) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const canAdvance = () => {
    if (step === 1) return !!industry;
    if (step === 2) return !!volume;
    if (step === 3) return selectedChannels.length > 0;
    if (step === 4) return name && email;
    return false;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const recommendedPlan = volume === t.quote.vol4 || industry === t.quote.other ? t.pricing.enterprise : t.pricing.professional;
  const estimatedSavings = volume === t.quote.vol1 ? "$3,500" : volume === t.quote.vol2 ? "$7,500" : volume === t.quote.vol3 ? "$15,000" : "$30,000+";

  return (
    <section id="quote" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.quote.headline} <span className="gradient-text">{t.quote.headlineAccent}</span>
          </h2>
          <p className="text-slate-400 text-lg">
            {t.quote.subtitle}
          </p>
        </motion.div>

        <div className="glass-card rounded-2xl p-8">
          {!submitted ? (
            <>
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={"h-1.5 flex-1 rounded-full transition-all " + (
                      s <= step ? "bg-emerald-500" : "bg-slate-700"
                    )}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-semibold text-white mb-6">{t.quote.step1}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {industries.map((ind) => (
                        <button
                          key={ind.label}
                          onClick={() => setIndustry(ind.label)}
                          className={"flex flex-col items-center gap-2 p-4 rounded-xl border transition-all " + (
                            industry === ind.label
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-slate-700 hover:border-slate-500 text-slate-300"
                          )}
                        >
                          <ind.icon className="w-6 h-6" />
                          <span className="text-sm">{ind.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-semibold text-white mb-6">{t.quote.step2}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {volumes.map((v) => (
                        <button
                          key={v}
                          onClick={() => setVolume(v)}
                          className={"p-4 rounded-xl border text-sm transition-all " + (
                            volume === v
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-slate-700 hover:border-slate-500 text-slate-300"
                          )}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-semibold text-white mb-6">{t.quote.step3}</h3>
                    <div className="space-y-3">
                      {channels.map((ch) => (
                        <button
                          key={ch.label}
                          onClick={() => toggleChannel(ch.label)}
                          className={"w-full flex items-center gap-3 p-4 rounded-xl border text-sm transition-all text-left " + (
                            selectedChannels.includes(ch.label)
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-slate-700 hover:border-slate-500 text-slate-300"
                          )}
                        >
                          <ch.icon className="w-5 h-5" />
                          {ch.label}
                          {selectedChannels.includes(ch.label) && (
                            <CheckCircle className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-6">{t.quote.step4}</h3>
                    <input type="text" placeholder={t.quote.nameField + " *"} value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
                    <input type="email" placeholder={t.quote.emailField + " *"} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
                    <input type="tel" placeholder={t.quote.phoneField} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
                    <input type="text" placeholder={t.quote.companyField} value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    {t.quote.back}
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button
                    onClick={() => canAdvance() && setStep((s) => s + 1)}
                    disabled={!canAdvance()}
                    className={"flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all " + (
                      canAdvance() ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-slate-700 text-slate-500 cursor-not-allowed"
                    )}
                  >
                    {t.quote.next}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => canAdvance() && handleSubmit()}
                    disabled={!canAdvance()}
                    className={"flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all " + (
                      canAdvance() ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-slate-700 text-slate-500 cursor-not-allowed"
                    )}
                  >
                    {t.quote.getMyQuote}
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t.quote.quoteReady}</h3>
              <p className="text-slate-400 mb-8">{t.quote.basedOn}</p>

              <div className="glass-card rounded-xl p-6 max-w-sm mx-auto mb-6 border-emerald-500/30">
                <p className="text-emerald-400 font-semibold text-lg mb-2">{recommendedPlan} {t.quote.plan}</p>
                <p className="text-slate-400 text-sm mb-4">
                  {t.quote.forIndustry} {industry} {t.quote.withVolume} {volume} {t.quote.monthlyInteractions}
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="text-sm text-slate-400">{t.quote.estSavings}</p>
                  <p className="text-3xl font-bold text-emerald-400">{estimatedSavings}</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm">
                {t.quote.specialistContact} <span className="text-white">{email}</span>
              </p>

              <div className="mt-6 flex justify-center gap-2">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: [0, 1, 0], y: [20, -20, -40] }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
