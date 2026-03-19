"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Language = "en" | "fr" | "rw";

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
  const language: Language = "en";
  const t = useMemo(() => copy[language], [language]);

  return (
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
  );
}
