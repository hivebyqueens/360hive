"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Language = "en" | "fr" | "rw";
type ThemeMode = "dark" | "light";

const copy = {
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    gallery: "Gallery",
    request: "Request a Quote",
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    about: "A propos",
    contact: "Contact",
    gallery: "Galerie",
    request: "Demander un devis",
  },
  rw: {
    home: "Ahabanza",
    products: "Ibicuruzwa",
    about: "Ibitwerekeye",
    contact: "Twandikire",
    gallery: "Ifoto",
    request: "Saba igiciro",
  },
} as const;

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  logoMissing?: boolean;
}

export function Navigation({
  language,
  setLanguage,
  mode,
  setMode,
  logoMissing = false,
}: NavigationProps) {
  const t = useMemo(() => copy[language], [language]);

  return (
    <nav className="top-nav">
      <Link href="/" className="brand">
        {!logoMissing && (
          <Image
            src="/logo.png"
            alt="360 Hive by Queens logo"
            width={34}
            height={34}
            className="brand-logo"
            unoptimized
          />
        )}
        <span>360 Hive by Queens</span>
      </Link>

      <div className="nav-links">
        <Link href="/">{t.home}</Link>
        <Link href="/about">{t.about}</Link>
        <Link href="/products">{t.products}</Link>
        <Link href="/gallery">{t.gallery}</Link>
        <Link href="/contact">{t.contact}</Link>
      </div>

      <div className="nav-actions">
        <div className="lang-group" role="group" aria-label="Language switcher">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={language === "en" ? "active" : ""}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("fr")}
            className={language === "fr" ? "active" : ""}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLanguage("rw")}
            className={language === "rw" ? "active" : ""}
          >
            RW
          </button>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="mode-toggle"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "dark" ? "Light" : "Dark"}
        </Button>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild size="sm" variant="gradient" className="nav-cta">
            <Link href="/contact">{t.request}</Link>
          </Button>
        </motion.div>
      </div>
    </nav>
  );
}
