"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/layout/Chatbot";
import { motion } from "framer-motion";

type Language = "en" | "fr" | "rw";
type ThemeMode = "dark" | "light";

const copy = {
  en: {
    badge: "The Sovereign Pulse",
    heroTitle: "Empowering Innovation Through Collaboration",
    heroSubtitle:
      "A 360 deg ecosystem where creativity, technology, and leadership meet to redefine digital growth.",
    request: "Request a Quote",
    call: "Book a Call",
  },
  fr: {
    badge: "Le Pulse Souverain",
    heroTitle: "Donner de la puissance a l innovation par la collaboration",
    heroSubtitle:
      "Un ecosysteme 360 deg ou creativite, technologie et leadership se rencontrent.",
    request: "Demander un devis",
    call: "Reserver un appel",
  },
  rw: {
    badge: "Sovereign Pulse",
    heroTitle: "Duteza imbere udushya biciye mu bufatanye",
    heroSubtitle:
      "Uruhurirane rwa 360 deg aho ubuhanzi, ikoranabuhanga n ubuyobozi bihurira.",
    request: "Saba igiciro",
    call: "Teganya ikiganiro",
  },
} as const;

export default function Home() {
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

      <main className="content" id="home">
        <motion.section
          className="hero"
          data-reveal
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="pill">{t.badge}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <div className="hero-buttons">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="gradient">
                  <Link href="/contact">{t.request}</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline">
                  <Link href="/contact">{t.call}</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <div className="hero-visual" aria-hidden="true">
            <motion.div
              className="glow-halo"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="hero-image"
              animate={{
                y: [0, -12, 0],
                rotateX: [0, 5, 0],
                rotateY: [0, 3, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/image/home.png"
                alt="360 Hive by Queens - Innovation Hub"
                width={300}
                height={300}
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer language={language} setLanguage={setLanguage} mode={mode} setMode={setMode} />
      <Chatbot language={language} />
    </div>
  );
}
