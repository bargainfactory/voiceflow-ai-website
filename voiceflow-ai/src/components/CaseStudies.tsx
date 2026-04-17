"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp } from "lucide-react";

const studies = [
  {
    company: "MedFirst Clinic",
    industry: "Healthcare",
    challenge: "200+ daily patient calls overwhelming a 3-person team",
    solution: "AI voice agent for appointment scheduling and patient triage",
    metrics: [
      { label: "Call Deflection", value: "73%" },
      { label: "Fewer No-Shows", value: "45%" },
      { label: "Monthly Savings", value: "$12,400" },
      { label: "Patient Satisfaction", value: "4.8/5" },
    ],
    quote: "VoiceFlow AI transformed our front desk operations. Patients love the instant scheduling, and our staff can finally focus on in-person care.",
    person: "Dr. Sarah Chen, Medical Director",
  },
  {
    company: "Apex Realty Group",
    industry: "Real Estate",
    challenge: "Missing 60% of after-hours leads with no follow-up system",
    solution: "AI chatbot + voice agent for 24/7 lead qualification",
    metrics: [
      { label: "More Qualified Leads", value: "340%" },
      { label: "Faster Response", value: "28%" },
      { label: "New Monthly Revenue", value: "$31,000" },
      { label: "Lead Capture Rate", value: "89%" },
    ],
    quote: "We went from missing most after-hours inquiries to capturing nearly every single lead. The ROI was obvious within the first month.",
    person: "Marcus Johnson, Broker/Owner",
  },
  {
    company: "ShopWave",
    industry: "E-Commerce",
    challenge: "8-hour average support response time driving customers away",
    solution: "AI chatbot handling orders, returns, and product questions",
    metrics: [
      { label: "Response Time", value: "2 sec" },
      { label: "Auto-Resolution", value: "82%" },
      { label: "Monthly Savings", value: "$18,700" },
      { label: "Customer Satisfaction", value: "92%" },
    ],
    quote: "Our customers used to wait hours for a response. Now they get instant, accurate help around the clock. Support tickets dropped dramatically.",
    person: "Lisa Park, Head of Customer Experience",
  },
];

export default function CaseStudies() {
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
            Real Results From <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            See how companies like yours are saving thousands with AI-powered customer service.
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
                      <span className="text-slate-500 font-medium">Challenge: </span>
                      <span className="text-slate-300">{study.challenge}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-slate-500 font-medium">Solution: </span>
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
