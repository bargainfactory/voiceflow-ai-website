"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";

export default function ROICalculator() {
  const [tickets, setTickets] = useState(1000);
  const [costPerTicket, setCostPerTicket] = useState(15);
  const [agents, setAgents] = useState(5);
  const [salary, setSalary] = useState(45000);

  const currentMonthlyCost = tickets * costPerTicket;
  const aiHandledPct = 70;
  const monthlySavings = Math.round(currentMonthlyCost * 0.7);
  const annualSavings = monthlySavings * 12;
  const setupCost = 4997;
  const roiMonths = monthlySavings > 0 ? Math.ceil(setupCost / monthlySavings) : 0;

  const formatCurrency = (n: number) =>
    "$" + n.toLocaleString();

  return (
    <section id="roi" className="py-24 grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Calculate Your <span className="gradient-text">ROI</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            See exactly how much you can save with VoiceFlow AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 space-y-8"
          >
            <div>
              <label className="flex justify-between text-sm mb-3">
                <span className="text-slate-300">Monthly Support Tickets</span>
                <span className="text-emerald-400 font-semibold">{tickets.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={tickets}
                onChange={(e) => setTickets(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-3">
                <span className="text-slate-300">Average Cost Per Ticket</span>
                <span className="text-emerald-400 font-semibold">{formatCurrency(costPerTicket)}</span>
              </label>
              <input
                type="range"
                min={5}
                max={50}
                step={1}
                value={costPerTicket}
                onChange={(e) => setCostPerTicket(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-3">
                <span className="text-slate-300">Current Support Agents</span>
                <span className="text-emerald-400 font-semibold">{agents}</span>
              </label>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={agents}
                onChange={(e) => setAgents(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-3">
                <span className="text-slate-300">Average Agent Salary</span>
                <span className="text-emerald-400 font-semibold">{formatCurrency(salary)}/yr</span>
              </label>
              <input
                type="range"
                min={25000}
                max={80000}
                step={1000}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border-emerald-500/30"
          >
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" />
              Your Projected Savings
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className="text-slate-400">Current Monthly Cost</span>
                <span className="text-xl font-bold text-white">{formatCurrency(currentMonthlyCost)}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <span className="text-slate-400">AI-Handled Percentage</span>
                <span className="text-xl font-bold text-emerald-400">{aiHandledPct}%</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-400">Monthly Savings</span>
                </div>
                <span className="text-2xl font-bold text-emerald-400">{formatCurrency(monthlySavings)}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-400">Annual Savings</span>
                </div>
                <span className="text-3xl font-bold text-emerald-400">{formatCurrency(annualSavings)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-400">Pays for Itself In</span>
                </div>
                <span className="text-xl font-bold text-white">
                  {roiMonths} {roiMonths === 1 ? "month" : "months"}
                </span>
              </div>
            </div>

            <a
              href="#quote"
              className="mt-8 block text-center px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Get Custom Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
