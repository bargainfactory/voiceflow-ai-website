"use client";

import { Zap, Globe, ExternalLink, Code, Play } from "lucide-react";

const solutions = ["Healthcare", "Real Estate", "E-Commerce", "Legal", "Home Services", "Agencies"];
const companyLinks = ["About", "Careers", "Blog", "Contact", "Partners"];
const resources = ["Documentation", "API Reference", "Status Page", "Privacy Policy", "Terms of Service"];

const socials = [
  { icon: Globe, label: "Twitter" },
  { icon: ExternalLink, label: "LinkedIn" },
  { icon: Code, label: "GitHub" },
  { icon: Play, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-bold gradient-text">VoiceFlow AI</span>
            </div>
            <p className="text-slate-500 text-sm mb-6">
              AI-powered customer service that never sleeps.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-2">
              {solutions.map((item) => (
                <li key={item}>
                  <a href="#solutions" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2024 VoiceFlow AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-600">
            Built with Voiceflow + ElevenLabs + Twilio
          </p>
        </div>
      </div>
    </footer>
  );
}
