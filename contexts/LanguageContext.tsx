"use client";

import { createContext, useContext, useState } from "react";

type Lang = "en" | "vi";

interface LangCtx {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LangCtx>({ lang: "en", toggleLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, toggleLang: () => setLang((l) => (l === "en" ? "vi" : "en")) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
