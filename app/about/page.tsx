"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Zap, Crown, Globe } from "lucide-react";

type Language = "en" | "fr" | "rw";

const copy = {
  en: {
    pageTitle: "About Us",
    aboutTitle: "The Hive Philosophy",
    aboutText:
      "360 Hive by Queens is a dynamic platform connecting innovation, business, and creativity into one powerful ecosystem led by bold women.",
  },
  fr: {
    pageTitle: "A propos",
    aboutTitle: "La Philosophie Hive",
    aboutText:
      "360 Hive by Queens connecte innovation, business et creativite dans un ecosysteme unique porte par des femmes leaders.",
  },
  rw: {
    pageTitle: "Ibitwerekeye",
    aboutTitle: "Inkingi za Hive",
    aboutText:
      "360 Hive by Queens ihuza udushya, ubucuruzi n ubuhanzi muri ecosystem ikomeye iyobowe n abagore.",
  },
} as const;

const features = [
  { icon: <Lightbulb size={20} />, title: "Collaboration", text: "Unified teams and aligned execution across products and campaigns." },
  { icon: <Zap size={20} />, title: "Innovation", text: "Future-ready solutions blending aesthetics and technical precision." },
  { icon: <Crown size={20} />, title: "Leadership", text: "Women-led strategy with bold, accountable decision-making." },
  { icon: <Globe size={20} />, title: "Full Ecosystem", text: "One loop from ideation to launch, optimization, and growth." },
];

export default function AboutPage() {
  const language: Language = "en";
  const t = useMemo(() => copy[language], [language]);

  return (
        <motion.section
          className="about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <div className="feature-grid">
            {features.map((item, idx) => (
              <motion.article
                key={item.title}
                className="feature-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 8 }}
              >
                <span className="feature-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>
  );
}
