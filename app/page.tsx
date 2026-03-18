"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Language = "en" | "fr";
type ThemeMode = "dark" | "light";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const translations = {
  en: {
    navAbout: "About",
    navServices: "Services",
    navProducts: "Products",
    navContact: "Contact",
    slogan: "We build digital ecosystems that grow brands with precision.",
    heroTitle: "Core Services for 360 Hive by Queen",
    heroText:
      "From software development and media production to marketing and training, we combine strategy, motion, and execution in one hive.",
    quote: "Request a Quote",
    book: "Book a Call",
    intro: "Intro Video",
    introText:
      "A high-energy brand intro space ready for your launch reel, motion graphics, and campaign stories.",
    aboutTitle: "About Us",
    aboutText:
      "360 Hive by Queen is a multidisciplinary digital studio helping businesses design, market, and scale impactful products.",
    mission: "Mission",
    missionText:
      "Build meaningful digital value through design-led engineering, creative storytelling, and measurable growth.",
    vision: "Vision",
    visionText:
      "Become the most trusted ecosystem partner for ambitious brands in Africa and beyond.",
    servicesTitle: "Core Services",
    productsTitle: "Our Products",
    teamTitle: "Team",
    testimonialsTitle: "Testimonials",
    photosTitle: "Photo Moments",
    contactTitle: "Contact Us",
    chatbotTitle: "Hive Chatbot",
    chatbotHint: "Local knowledge assistant. No external API.",
    formName: "Name",
    formEmail: "Email",
    formService: "Service needed",
    formMessage: "Message",
    submit: "Send Request",
    sent: "Your request has been recorded. We will contact you shortly.",
    copyright: "2026 360 Hive by Queen. All rights reserved.",
  },
  fr: {
    navAbout: "A propos",
    navServices: "Services",
    navProducts: "Produits",
    navContact: "Contact",
    slogan: "Nous construisons des ecosystemes digitaux qui font grandir les marques.",
    heroTitle: "Services clés de 360 Hive by Queen",
    heroText:
      "Du developpement logiciel a la production media, nous reunissons strategie, motion et execution.",
    quote: "Demander un devis",
    book: "Reserver un appel",
    intro: "Video d'introduction",
    introText:
      "Un espace premium pour votre video de marque, vos motion graphics et vos campagnes.",
    aboutTitle: "A propos de nous",
    aboutText:
      "360 Hive by Queen est un studio digital multidisciplinaire qui aide les marques a creer et a scaler.",
    mission: "Mission",
    missionText:
      "Creer de la valeur digitale via l'ingenierie, le design et le storytelling creatif.",
    vision: "Vision",
    visionText:
      "Devenir le partenaire de confiance des marques ambitieuses en Afrique et au-dela.",
    servicesTitle: "Services principaux",
    productsTitle: "Nos produits",
    teamTitle: "Equipe",
    testimonialsTitle: "Temoignages",
    photosTitle: "Moments photo",
    contactTitle: "Nous contacter",
    chatbotTitle: "Chatbot Hive",
    chatbotHint: "Assistant local, sans API externe.",
    formName: "Nom",
    formEmail: "Email",
    formService: "Service souhaite",
    formMessage: "Message",
    submit: "Envoyer",
    sent: "Votre demande a ete enregistree. Nous vous contacterons bientot.",
    copyright: "2026 360 Hive by Queen. Tous droits reserves.",
  },
} as const;

const coreServices = [
  {
    title: "Software & Web Development",
    details: [
      "Designing and developing websites, applications, and databases.",
      "Customizing software solutions to meet user needs.",
      "Managing web platforms and searchable online systems.",
    ],
  },
  {
    title: "Digital Content & Media Production",
    details: [
      "Video and media post-production: editing, subtitles, graphics, and animation.",
      "Creation of digital and printed content: images, catalogs, and promotional materials.",
    ],
  },
  {
    title: "Marketing & Advertising",
    details: [
      "Running marketing campaigns and videograph experiences.",
      "Advertising services to attract and retain customers.",
    ],
  },
  {
    title: "Technical & Professional Services",
    details: ["Technical consulting tailored to your business and platform stack."],
  },
  {
    title: "Education & Training",
    details: [
      "Educational services, practical training, and digital learning support.",
    ],
  },
  {
    title: "Graphic Design",
    details: [
      "Visual content for branding, marketing communication, and campaign identity.",
    ],
  },
];

const products = [
  {
    name: "Ranik",
    type: "Videograph",
    text: "Cinematic campaign content and social-first video storytelling.",
  },
  {
    name: "Abiru Real Estate",
    type: "Property platform",
    text: "Digital real-estate experiences, listings, and lead conversion workflows.",
  },
  {
    name: "Rwanda Urology",
    type: "Healthcare platform",
    text: "Modern patient-focused digital communication and clinic web presence.",
  },
];

const teamBios = [
  {
    name: "Queen",
    role: "Founder & Creative Lead",
    bio: "Leads strategy, branding, and growth direction across all 360 Hive initiatives.",
  },
  {
    name: "Development Team",
    role: "Engineering",
    bio: "Builds secure web systems, automation flows, and performant digital products.",
  },
  {
    name: "Media & Marketing Team",
    role: "Production + Ads",
    bio: "Produces campaign visuals, motion assets, and customer acquisition programs.",
  },
];

const testimonialData = [
  {
    quote:
      "360 Hive gave our brand a full digital identity and campaign pipeline in one place.",
    author: "Client, Kigali",
  },
  {
    quote:
      "Their team understands both technical execution and storytelling. Fast and reliable.",
    author: "Startup Founder",
  },
  {
    quote:
      "From design to launch to marketing, we felt like we had one strong in-house team.",
    author: "SME Owner",
  },
];

const localBotKnowledge: Array<{ keys: string[]; answer: string }> = [
  {
    keys: ["quote", "pricing", "price", "cost"],
    answer:
      "For a quote, use the contact form and select your needed service. We respond with scope and timeline.",
  },
  {
    keys: ["book", "call", "meeting"],
    answer:
      "You can book a call using the Book a Call button in the hero section. We usually confirm within 24 hours.",
  },
  {
    keys: ["service", "services"],
    answer:
      "Our services include development, media production, marketing, consulting, training, and graphic design.",
  },
  {
    keys: ["products", "ranik", "abiru", "urology"],
    answer:
      "Current products include Ranik (videograph), Abiru Real Estate, and Rwanda Urology.",
  },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [sent, setSent] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Welcome to 360 Hive. Ask me about services, products, pricing, or booking.",
    },
  ]);

  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
    window.setTimeout(() => setSent(false), 3000);
  };

  const handleChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) {
      return;
    }

    const lower = trimmed.toLowerCase();
    const matched = localBotKnowledge.find((entry) =>
      entry.keys.some((keyword) => lower.includes(keyword)),
    );

    const assistantText =
      matched?.answer ??
      "I can help with services, products, pricing, booking, and contact details. Try one of those keywords.";

    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "assistant", text: assistantText },
    ]);
    setChatInput("");
  };

  return (
    <div className="site-shell">
      <div className="motion-orb motion-orb-one" aria-hidden="true" />
      <div className="motion-orb motion-orb-two" aria-hidden="true" />
      <div className="motion-grid" aria-hidden="true" />

      <header className="topbar">
        <a href="#home" className="brand-anchor" aria-label="360 Hive by Queen">
          <span className="brand-fallback">360 HIVE</span>
        </a>
        <nav className="topnav" aria-label="Main">
          <a href="#about">{t.navAbout}</a>
          <a href="#services">{t.navServices}</a>
          <a href="#products">{t.navProducts}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>
        <div className="toolbar">
          <div className="pill-switch" role="group" aria-label="Language selector">
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={language === "fr" ? "active" : ""}
              onClick={() => setLanguage("fr")}
            >
              FR
            </button>
          </div>
          <button
            type="button"
            className="mode-toggle"
            onClick={() => setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      <main id="home" className="main-content">
        <section className="hero reveal">
          <p className="eyebrow">360 Hive by Queen</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-slogan">{t.slogan}</p>
          <p className="hero-text">{t.heroText}</p>
          <div className="cta-row">
            <a href="#contact" className="btn btn-primary">
              {t.quote}
            </a>
            <a href="#contact" className="btn btn-secondary">
              {t.book}
            </a>
          </div>
        </section>

        <section className="video-panel reveal" aria-label={t.intro}>
          <div className="video-content">
            <h2>{t.intro}</h2>
            <p>{t.introText}</p>
          </div>
          <button type="button" className="play-btn" aria-label="Play intro video">
            Play Reel
          </button>
        </section>

        <section id="about" className="section reveal">
          <h2>{t.aboutTitle}</h2>
          <p className="section-lead">{t.aboutText}</p>
          <div className="duo-cards">
            <article className="glass-card">
              <h3>{t.mission}</h3>
              <p>{t.missionText}</p>
            </article>
            <article className="glass-card">
              <h3>{t.vision}</h3>
              <p>{t.visionText}</p>
            </article>
          </div>
        </section>

        <section id="services" className="section reveal">
          <h2>{t.servicesTitle}</h2>
          <div className="card-grid services-grid">
            {coreServices.map((service) => (
              <article className="glass-card service-card" key={service.title}>
                <h3>{service.title}</h3>
                <ul>
                  {service.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="section reveal">
          <h2>{t.productsTitle}</h2>
          <div className="card-grid product-grid">
            {products.map((product) => (
              <article className="glass-card product-card" key={product.name}>
                <p className="tag">{product.type}</p>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal">
          <h2>{t.teamTitle}</h2>
          <div className="card-grid team-grid">
            {teamBios.map((member) => (
              <article className="glass-card" key={member.name}>
                <h3>{member.name}</h3>
                <p className="tag">{member.role}</p>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal">
          <h2>{t.testimonialsTitle}</h2>
          <div className="card-grid testimonial-grid">
            {testimonialData.map((entry) => (
              <article className="glass-card" key={entry.author}>
                <p className="quote">
                  &ldquo;{entry.quote}&rdquo;
                </p>
                <p className="tag">{entry.author}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal">
          <h2>{t.photosTitle}</h2>
          <div className="photo-strip">
            <div className="photo-tile">Campaign Shoot</div>
            <div className="photo-tile">Studio Edit</div>
            <div className="photo-tile">Brand Session</div>
            <div className="photo-tile">Team Strategy</div>
          </div>
        </section>

        <section id="contact" className="section contact-section reveal">
          <div className="contact-pane glass-card">
            <h2>{t.contactTitle}</h2>
            <p>
              Kigali, Rwanda<br />
              hello@360hivebyqueen.com<br />
              +250 7XX XXX XXX
            </p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                {t.formName}
                <input name="name" required />
              </label>
              <label>
                {t.formEmail}
                <input name="email" type="email" required />
              </label>
              <label>
                {t.formService}
                <input name="service" required />
              </label>
              <label>
                {t.formMessage}
                <textarea name="message" rows={4} required />
              </label>
              <button type="submit" className="btn btn-primary">
                {t.submit}
              </button>
              {sent && <p className="status-ok">{t.sent}</p>}
            </form>
          </div>

          <div className="chatbot-pane glass-card">
            <h3>{t.chatbotTitle}</h3>
            <p className="chatbot-hint">{t.chatbotHint}</p>
            <div className="chat-stream" aria-live="polite">
              {chatMessages.map((message, index) => (
                <p
                  key={`${message.role}-${index}`}
                  className={message.role === "assistant" ? "bubble assistant" : "bubble user"}
                >
                  {message.text}
                </p>
              ))}
            </div>
            <form className="chat-entry" onSubmit={handleChat}>
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about services, products, quote, booking..."
                aria-label="Chat message"
              />
              <button type="submit" className="btn btn-secondary">
                Send
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">{t.copyright}</footer>
    </div>
  );
}
