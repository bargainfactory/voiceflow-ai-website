"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { languages, langCodes, type LangCode } from "../i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-emerald-400 hover:bg-white/5 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{languages[lang].langName}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl glass border border-white/10 py-2 z-50 shadow-xl">
          {langCodes.map((code: LangCode) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                code === lang
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {languages[code].langName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
