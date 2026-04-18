"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import en from "./translations";
import { languages, type LangCode, type TranslationKeys } from "./index";

type LanguageContextType = {
  lang: LangCode;
  t: TranslationKeys;
  setLang: (code: LangCode) => void;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: en,
  setLang: () => {},
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
  }, []);

  const t = languages[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
