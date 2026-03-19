"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Language = "en" | "fr" | "rw";

const copy = {
  en: {
    pageTitle: "Products",
    productsTitle: "Elite Offerings",
  },
  fr: {
    pageTitle: "Produits",
    productsTitle: "Offres Elite",
  },
  rw: {
    pageTitle: "Ibicuruzwa",
    productsTitle: "Serivisi z Intangarugero",
  },
} as const;

const productCards = [
  {
    key: "Ranik",
    title: "Ranik - Videography",
    text: "Translating brand essence into cinematic visual narratives.",
  },
  {
    key: "AR",
    title: "Abiru Real Estate",
    text: "Modern property experiences and lead-focused digital journeys.",
  },
  {
    key: "RU",
    title: "Rwanda Urology",
    text: "Patient-centered communication with healthcare brand confidence.",
  },
];

export default function ProductsPage() {
  const language: Language = "en";
  const t = useMemo(() => copy[language], [language]);

  return (
        <motion.section
          className="products"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>{t.productsTitle}</h2>
          <div className="product-grid">
            {productCards.map((card, idx) => (
              <motion.article
                key={card.title}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="product-media">{card.key}</div>
                <div className="product-body">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <a href="/contact" className="learn-more">
                    Learn More
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
  );
}
