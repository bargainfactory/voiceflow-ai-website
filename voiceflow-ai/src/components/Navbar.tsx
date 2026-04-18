"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.solutions, href: "#solutions" },
    { label: t.nav.demo, href: "#demo" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.caseStudies, href: "#case-studies" },
    { label: t.nav.roiCalculator, href: "#roi" },
    { label: t.nav.dashboard, href: "#dashboard" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-emerald-400" />
            <span className="text-xl font-bold gradient-text">VoiceFlow</span>
            <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
              AI
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
            <a
              href="#demo"
              className="ml-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              {t.nav.tryDemo}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-slate-300 hover:text-emerald-400 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <a
                href="#demo"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg mt-3"
              >
                {t.nav.tryDemo}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
