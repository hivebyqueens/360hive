"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, type Language, type Translations } from "./translations";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const AppContext = createContext<AppContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <AppContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
