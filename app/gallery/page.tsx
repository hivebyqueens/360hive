"use client";

import { useState, useEffect, useMemo } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/layout/Chatbot";
import { motion } from "framer-motion";

type Language = "en" | "fr" | "rw";
type ThemeMode = "dark" | "light";

const copy = {
  en: {
    pageTitle: "Gallery",
    mediaTitle: "Visual Showcase",
  },
  fr: {
    pageTitle: "Galerie",
    mediaTitle: "Vitrine Visuelle",
  },
  rw: {
    pageTitle: "Ifoto",
    mediaTitle: "Ibyerekanwa bya Visual",
  },
} as const;

const visualTiles = [
  "Cinematic Launch",
  "Brand Campaign",
  "Studio Production",
  "Digital Experience",
  "Health Innovation",
  "Leadership Sessions",
];

export default function GalleryPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [logoMissing, setLogoMissing] = useState(false);

  const t = useMemo(() => copy[language], [language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    const handleImageError = () => setLogoMissing(true);
    const img = new window.Image();
    img.onload = () => setLogoMissing(false);
    img.onerror = handleImageError;
    img.src = "/logo.png";
  }, []);

  return (
    <div className="queen-shell">
      <Navigation
        language={language}
        setLanguage={setLanguage}
        mode={mode}
        setMode={setMode}
        logoMissing={logoMissing}
      />

      <main className="content">
        <motion.section
          className="media"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>{t.mediaTitle}</h2>
          <div className="media-grid">
            {visualTiles.map((tile, idx) => (
              <motion.article
                key={tile}
                className="media-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <span>Featured</span>
                <h3>{tile}</h3>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer language={language} setLanguage={setLanguage} mode={mode} setMode={setMode} />
      <Chatbot language={language} />
    </div>
  );
}
