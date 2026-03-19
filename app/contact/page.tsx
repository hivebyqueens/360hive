"use client";

import { useMemo, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Language = "en" | "fr" | "rw";

const copy = {
  en: {
    pageTitle: "Contact",
    contactTitle: "Let us build something powerful together",
    contactText:
      "Connect with the Hive for strategy, creative production, and scalable digital execution.",
    formName: "Full Name",
    formEmail: "Email Address",
    formMessage: "Message",
    send: "Send Sovereign Message",
    sent: "Message received. We will respond shortly.",
  },
  fr: {
    pageTitle: "Contact",
    contactTitle: "Construisons quelque chose de puissant ensemble",
    contactText:
      "Contactez la Hive pour la strategie, la production creative et l execution digitale.",
    formName: "Nom complet",
    formEmail: "Adresse email",
    formMessage: "Message",
    send: "Envoyer le message",
    sent: "Message recu. Nous revenons vers vous rapidement.",
  },
  rw: {
    pageTitle: "Twandikire",
    contactTitle: "Twubake ikintu gikomeye hamwe",
    contactText:
      "Twandikire ku bijyanye na strategy, creative production, no gukura kwa digital.",
    formName: "Amazina yose",
    formEmail: "Imeyili",
    formMessage: "Ubutumwa",
    send: "Ohereza ubutumwa",
    sent: "Ubutumwa bwakiriwe. Turagusubiza vuba.",
  },
} as const;

export default function ContactPage() {
  const language: Language = "en";
  const [formSent, setFormSent] = useState(false);
  const t = useMemo(() => copy[language], [language]);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    event.currentTarget.reset();
    window.setTimeout(() => setFormSent(false), 3000);
  };

  return (
        <motion.section
          className="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="contact-info">
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <ul>
              <li>
                <span>Email</span>
                <a href="mailto:sovereign@360hive.queens">sovereign@360hive.queens</a>
              </li>
              <li>
                <span>Phone</span>
                <a href="tel:+250788000000">+250 788 000 000</a>
              </li>
              <li>
                <span>Location</span>
                <strong>Sector 4, Innovation District, Kigali</strong>
              </li>
            </ul>
          </div>

          <motion.form
            className="contact-form"
            onSubmit={submitContact}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <label>
              {t.formName}
              <input name="name" required />
            </label>
            <label>
              {t.formEmail}
              <input name="email" type="email" required />
            </label>
            <label>
              {t.formMessage}
              <textarea name="message" rows={5} required />
            </label>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" variant="gradient" className="form-submit">
                {t.send}
              </Button>
            </motion.div>
            {formSent && <p className="success">{t.sent}</p>}
          </motion.form>
        </motion.section>
  );
}
