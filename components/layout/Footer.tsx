"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Language = "en" | "fr" | "rw";

const copy = {
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    copyright: "Copyright 2026 360 Hive by Queens. All rights reserved.",
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    about: "A propos",
    contact: "Contact",
    copyright: "Copyright 2026 360 Hive by Queens. Tous droits reserves.",
  },
  rw: {
    home: "Ahabanza",
    products: "Ibicuruzwa",
    about: "Ibitwerekeye",
    contact: "Twandikire",
    copyright: "Copyright 2026 360 Hive by Queens. Uburenganzira bwose burarinzwe.",
  },
} as const;

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = useMemo(() => copy[language], [language]);

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div>
        <p className="brand-line">360 Hive by Queens</p>
        <p>{t.copyright}</p>
      </div>
      <div className="footer-links">
        <Link href="/">{t.home}</Link>
        <Link href="/products">{t.products}</Link>
        <Link href="/about">{t.about}</Link>
        <Link href="/contact">{t.contact}</Link>
      </div>
      <div className="socials">
        <a href="#" aria-label="Website">
          WEB
        </a>
        <a href="#" aria-label="LinkedIn">
          IN
        </a>
        <a href="#" aria-label="Instagram">
          IG
        </a>
      </div>
    </motion.footer>
  );
}
