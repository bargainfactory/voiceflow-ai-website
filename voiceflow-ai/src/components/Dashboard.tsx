"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, Bot, BarChart3, Settings,
  Bell, Search, CheckCircle, Clock, AlertTriangle,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  resolved: { color: "text-emerald-400 bg-emerald-400/10", icon: CheckCircle },
  "in-progress": { color: "text-blue-400 bg-blue-400/10", icon: Clock },
  escalated: { color: "text-amber-400 bg-amber-400/10", icon: AlertTriangle },
};

export default function Dashboard() {
  const { t } = useLanguage();

  const sidebarItems = [
    { icon: LayoutDashboard, label: t.dashboard.overview, active: true },
    { icon: MessageSquare, label: t.dashboard.conversations },
    { icon: Bot, label: t.dashboard.agentsNav },
    { icon: BarChart3, label: t.dashboard.analytics },
    { icon: Settings, label: t.dashboard.settings },
  ];

  const stats = [
    { label: t.dashboard.totalConvos, value: "12,847", change: "+12.5%" },
    { label: t.dashboard.resolutionRate, value: "94.2%", change: "+3.1%" },
    { label: t.dashboard.avgResponse, value: "1.8s", change: "-0.4s" },
    { label: t.dashboard.customerSat, value: "4.7/5", change: "+0.2" },
  ];

  const conversations = [
    { name: "Sarah M.", topic: "Order tracking #4521", status: "resolved", statusLabel: t.dashboard.resolved, time: "2m ago" },
    { name: "James L.", topic: "Product return request", status: "in-progress", statusLabel: t.dashboard.inProgress, time: "5m ago" },
    { name: "Emily R.", topic: "Billing dispute", status: "escalated", statusLabel: t.dashboard.escalated, time: "8m ago" },
  ];

  return (
    <section id="dashboard" className="py-24 grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.dashboard.headline} <span className="gradient-text">{t.dashboard.headlineAccent}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.dashboard.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-sm text-slate-400 ml-3">{t.dashboard.title}</span>
            <div className="ml-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-500" />
              <Bell className="w-4 h-4 text-slate-500" />
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-xs text-emerald-400 font-semibold">JD</span>
              </div>
            </div>
          </div>

          <div className="flex min-h-[500px]">
            <div className="hidden sm:block w-48 bg-slate-900/50 border-r border-slate-700/50 p-3 space-y-1">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={"flex items-center gap-2 px-3 py-2 rounded-lg text-sm " + (
                    item.active
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-slate-400 hover:text-slate-300"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              ))}
            </div>

            <div className="flex-1 p-6 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-emerald-400 mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="text-sm text-slate-400 mb-4">{t.dashboard.chartTitle}</p>
                <div className="h-32 flex items-end gap-2">
                  {[35, 52, 48, 61, 45, 72, 58].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all"
                        style={{ height: h + "%" }}
                      />
                      <span className="text-[10px] text-slate-500">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="text-sm text-slate-400 mb-4">{t.dashboard.recentTitle}</p>
                <div className="space-y-3">
                  {conversations.map((conv) => {
                    const cfg = statusConfig[conv.status];
                    const StatusIcon = cfg.icon;
                    return (
                      <div key={conv.name} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                            <span className="text-xs text-slate-300">{conv.name.split(" ").map(n => n[0]).join("")}</span>
                          </div>
                          <div>
                            <p className="text-sm text-white">{conv.name}</p>
                            <p className="text-xs text-slate-500">{conv.topic}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={"text-xs px-2 py-1 rounded-full flex items-center gap-1 " + cfg.color}>
                            <StatusIcon className="w-3 h-3" />
                            {conv.statusLabel}
                          </span>
                          <span className="text-xs text-slate-500">{conv.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <a
            href="#quote"
            className="inline-flex px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25"
          >
            {t.dashboard.getAccess}
          </a>
        </div>
      </div>
    </section>
  );
}
