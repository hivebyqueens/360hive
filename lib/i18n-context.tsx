"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, type Language, type Translations } from "./translations";

type ThemeMode = "dark" | "light";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  t: Translations;
}

const AppContext = createContext<AppContextType>({
  language: "en",
  setLanguage: () => {},
  mode: "dark",
  setMode: () => {},
  t: translations.en,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mode, setMode] = useState<ThemeMode>("dark");

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        mode,
        setMode,
        t: translations[language],
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
