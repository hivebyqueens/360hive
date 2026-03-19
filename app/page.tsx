"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Language = "en" | "fr" | "rw";
type ThemeMode = "dark" | "light";
type ChatMessage = { role: "assistant" | "user"; text: string };

const copy = {
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    request: "Request a Quote",
    call: "Book a Call",
    badge: "The Sovereign Pulse",
    heroTitle: "Empowering Innovation Through Collaboration",
    heroSubtitle:
      "A 360 deg ecosystem where creativity, technology, and leadership meet to redefine digital growth.",
    aboutTitle: "The Hive Philosophy",
    aboutText:
      "360 Hive by Queens is a dynamic platform connecting innovation, business, and creativity into one powerful ecosystem led by bold women.",
    productsTitle: "Elite Offerings",
    testimonialsTitle: "Testimonials",
    contactTitle: "Let us build something powerful together",
    contactText:
      "Connect with the Hive for strategy, creative production, and scalable digital execution.",
    formName: "Full Name",
    formEmail: "Email Address",
    formMessage: "Message",
    send: "Send Sovereign Message",
    sent: "Message received. We will respond shortly.",
    mediaTitle: "Visual Showcase",
    chat: "Chat with us",
    chatTitle: "Hive Assistant",
    chatHint: "Local assistant powered by portfolio data only.",
    copyright: "Copyright 2026 360 Hive by Queens. All rights reserved.",
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    about: "A propos",
    contact: "Contact",
    request: "Demander un devis",
    call: "Reserver un appel",
    badge: "Le Pulse Souverain",
    heroTitle: "Donner de la puissance a l innovation par la collaboration",
    heroSubtitle:
      "Un ecosysteme 360 deg ou creativite, technologie et leadership se rencontrent.",
    aboutTitle: "La Philosophie Hive",
    aboutText:
      "360 Hive by Queens connecte innovation, business et creativite dans un ecosysteme unique porte par des femmes leaders.",
    productsTitle: "Offres Elite",
    testimonialsTitle: "Temoignages",
    contactTitle: "Construisons quelque chose de puissant ensemble",
    contactText:
      "Contactez la Hive pour la strategie, la production creative et l execution digitale.",
    formName: "Nom complet",
    formEmail: "Adresse email",
    formMessage: "Message",
    send: "Envoyer le message",
    sent: "Message recu. Nous revenons vers vous rapidement.",
    mediaTitle: "Vitrine Visuelle",
    chat: "Discuter avec nous",
    chatTitle: "Assistant Hive",
    chatHint: "Assistant local base uniquement sur nos donnees.",
    copyright: "Copyright 2026 360 Hive by Queens. Tous droits reserves.",
  },
  rw: {
    home: "Ahabanza",
    products: "Ibicuruzwa",
    about: "Ibitwerekeye",
    contact: "Twandikire",
    request: "Saba igiciro",
    call: "Teganya ikiganiro",
    badge: "Sovereign Pulse",
    heroTitle: "Duteza imbere udushya biciye mu bufatanye",
    heroSubtitle:
      "Uruhurirane rwa 360 deg aho ubuhanzi, ikoranabuhanga n ubuyobozi bihurira.",
    aboutTitle: "Inkingi za Hive",
    aboutText:
      "360 Hive by Queens ihuza udushya, ubucuruzi n ubuhanzi muri ecosystem ikomeye iyobowe n abagore.",
    productsTitle: "Serivisi z Intangarugero",
    testimonialsTitle: "Ubuhamya",
    contactTitle: "Twubake ikintu gikomeye hamwe",
    contactText:
      "Twandikire ku bijyanye na strategy, creative production, no gukura kwa digital.",
    formName: "Amazina yose",
    formEmail: "Imeyili",
    formMessage: "Ubutumwa",
    send: "Ohereza ubutumwa",
    sent: "Ubutumwa bwakiriwe. Turagusubiza vuba.",
    mediaTitle: "Ibyerekanwa bya Visual",
    chat: "Vugana natwe",
    chatTitle: "Umufasha Hive",
    chatHint: "Umufasha ukoresha amakuru ya portfolio gusa.",
    copyright: "Copyright 2026 360 Hive by Queens. Uburenganzira bwose burarinzwe.",
  },
} as const;

const features = [
  { icon: "CO", title: "Collaboration", text: "Unified teams and aligned execution across products and campaigns." },
  { icon: "IN", title: "Innovation", text: "Future-ready solutions blending aesthetics and technical precision." },
  { icon: "LE", title: "Leadership", text: "Women-led strategy with bold, accountable decision-making." },
  { icon: "360", title: "Full Ecosystem", text: "One loop from ideation to launch, optimization, and growth." },
];

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

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Founder, TechVision",
    quote:
      "The Hive ecosystem transformed how we execute. Strategy and creativity now move as one.",
  },
  {
    name: "Marcus Thorne",
    role: "Director, RealPath",
    quote: "Collaborating with Queens was our best strategic decision this year.",
  },
  {
    name: "Elena Rodriguez",
    role: "CEO, Bloom Med",
    quote: "They delivered a full roadmap, not just a service package.",
  },
];

const visualTiles = [
  "Cinematic Launch",
  "Brand Campaign",
  "Studio Production",
  "Digital Experience",
  "Health Innovation",
  "Leadership Sessions",
];

const botKnowledge = [
  {
    keys: ["quote", "price", "pricing", "igiciro", "devis"],
    answer: "Use Request a Quote and we will respond with scope, timeline, and pricing options.",
  },
  {
    keys: ["book", "call", "meeting", "ikiganiro"],
    answer: "Book a Call from the top navigation or hero section to schedule a strategy session.",
  },
  {
    keys: ["products", "ranik", "abiru", "urology", "ibicuruzwa"],
    answer: "Our products include Ranik, Abiru Real Estate, and Rwanda Urology.",
  },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [logoMissing, setLogoMissing] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Welcome to 360 Hive by Queens. Ask about quotes, products, or booking a call.",
    },
  ]);

  const t = useMemo(() => copy[language], [language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    const revealBlocks = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealBlocks.forEach((block) => io.observe(block));

    return () => io.disconnect();
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    event.currentTarget.reset();
    window.setTimeout(() => setFormSent(false), 3000);
  };

  const submitChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clean = chatInput.trim();
    if (!clean) {
      return;
    }

    const result = botKnowledge.find((entry) =>
      entry.keys.some((word) => clean.toLowerCase().includes(word)),
    );

    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: clean },
      {
        role: "assistant",
        text:
          result?.answer ??
          "I can help with quote requests, products, booking, and contact details.",
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="queen-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <nav className="top-nav">
        <a className="brand" href="#home" aria-label="360 Hive by Queens">
          {!logoMissing && (
            <Image
              src="/logo.png"
              alt="360 Hive by Queens logo"
              width={34}
              height={34}
              className="brand-logo"
              unoptimized
              onError={() => setLogoMissing(true)}
            />
          )}
          <span>360 Hive by Queens</span>
        </a>

        <div className="nav-links">
          <a href="#home">{t.home}</a>
          <a href="#products">{t.products}</a>
          <a href="#about">{t.about}</a>
          <a href="#contact">{t.contact}</a>
        </div>

        <div className="nav-actions">
          <div className="lang-group" role="group" aria-label="Language switcher">
            <button type="button" onClick={() => setLanguage("en")} className={language === "en" ? "active" : ""}>
              EN
            </button>
            <button type="button" onClick={() => setLanguage("fr")} className={language === "fr" ? "active" : ""}>
              FR
            </button>
            <button type="button" onClick={() => setLanguage("rw")} className={language === "rw" ? "active" : ""}>
              RW
            </button>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mode-toggle"
            onClick={() => setMode((p) => (p === "dark" ? "light" : "dark"))}
          >
            {mode === "dark" ? "Light" : "Dark"}
          </Button>
          <Button asChild size="sm" variant="gradient" className="nav-cta">
            <a href="#contact">{t.request}</a>
          </Button>
        </div>
      </nav>

      <main className="content" id="home">
        <section className="hero" data-reveal>
          <div className="hero-copy">
            <p className="pill">{t.badge}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <div className="hero-buttons">
              <Button asChild variant="gradient">
                <a href="#contact">{t.request}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact">{t.call}</a>
              </Button>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="glow-halo" />
            <div className="hive-cluster">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={`hex-${i}`} className="hex" />
              ))}
            </div>
          </div>
        </section>

        <section className="about" id="about" data-reveal>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <div className="feature-grid">
            {features.map((item) => (
              <article key={item.title} className="feature-card">
                <span className="feature-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="products" id="products" data-reveal>
          <h2>{t.productsTitle}</h2>
          <div className="product-grid">
            {productCards.map((card) => (
              <article key={card.title} className="product-card">
                <div className="product-media">{card.key}</div>
                <div className="product-body">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <a href="#contact" className="learn-more">
                    Learn More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials" data-reveal>
          <h2>{t.testimonialsTitle}</h2>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <div className="person">
                  <span className="avatar">{item.name.slice(0, 2).toUpperCase()}</span>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                  </div>
                </div>
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
              </article>
            ))}
          </div>
        </section>

        <section className="media" data-reveal>
          <h2>{t.mediaTitle}</h2>
          <div className="media-grid">
            {visualTiles.map((tile) => (
              <article key={tile} className="media-card">
                <span>Featured</span>
                <h3>{tile}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" data-reveal>
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

          <form className="contact-form" onSubmit={submitContact}>
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
            <Button type="submit" variant="gradient" className="form-submit">
              {t.send}
            </Button>
            {formSent && <p className="success">{t.sent}</p>}
          </form>
        </section>
      </main>

      <footer className="footer">
        <div>
          <p className="brand-line">360 Hive by Queens</p>
          <p>{t.copyright}</p>
        </div>
        <div className="footer-links">
          <a href="#home">{t.home}</a>
          <a href="#products">{t.products}</a>
          <a href="#about">{t.about}</a>
          <a href="#contact">{t.contact}</a>
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
      </footer>

      <Button
        type="button"
        variant="gradient"
        className="chat-fab"
        onClick={() => setChatOpen((v) => !v)}
      >
        {t.chat}
      </Button>

      {chatOpen && (
        <aside className="chat-window" aria-label={t.chatTitle}>
          <header>
            <div>
              <h3>{t.chatTitle}</h3>
              <p>{t.chatHint}</p>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={() => setChatOpen(false)}>
              Close
            </Button>
          </header>

          <div className="chat-messages" aria-live="polite">
            {chatMessages.map((msg, idx) => (
              <p key={`${msg.role}-${idx}`} className={`bubble ${msg.role}`}>
                {msg.text}
              </p>
            ))}
          </div>

          <form className="chat-form" onSubmit={submitChat}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about quote, products, booking..."
            />
            <Button type="submit" size="sm" variant="outline">
              Send
            </Button>
          </form>
        </aside>
      )}
    </div>
  );
}
