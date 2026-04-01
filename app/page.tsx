"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  Code2, Video, Megaphone, Lightbulb, GraduationCap, Palette,
  ArrowRight, TrendingDown, AlertCircle, Clock, BarChart3,
  Cpu, Layers, Globe, Zap, CheckCircle2, XCircle
} from "lucide-react";
import { useApp } from "@/lib/i18n-context";


const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const fn = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mouseX, mouseY]);
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(212,0,110,0.08), transparent 70%)`
        ),
      }}
    />
  );
};

/* ─── Subtle glass card — Section 1 ─────────────── */
function ProblemCardSubtle({
  icon: Icon, title, body, delay = 0, accent = false,
}: { icon: React.ElementType; title: string; body: string; delay?: number; accent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group p-5 rounded-2xl cursor-default transition-all duration-300"
      style={{
        background: accent
          ? "rgba(212, 0, 110, 0.12)"
          : "rgba(255, 255, 255, 0.04)",
        border: accent
          ? "1px solid rgba(212, 0, 110, 0.55)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(16px)",
        boxShadow: accent
          ? "0 0 30px rgba(212,0,110,0.20), inset 0 1px 0 rgba(255,255,255,0.07)"
          : "0 0 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: accent ? "rgba(212,0,110,0.3)" : "rgba(212,0,110,0.12)",
          border: `1px solid ${accent ? "rgba(212,0,110,0.6)" : "rgba(212,0,110,0.25)"}`,
        }}
      >
        <Icon size={14} style={{ color: accent ? "#ff66b3" : "#d4006e" }} />
      </div>
      <h4 className="text-[13px] font-bold text-white mb-1.5 leading-tight">{title}</h4>
      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{body}</p>
    </motion.div>
  );
}

/* ─── Vibrant pink card — Section 2 ─────────────── */
function ProblemCardVibrant({
  icon: Icon, title, body, delay = 0, bright = false,
}: { icon: React.ElementType; title: string; body: string; delay?: number; bright?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group p-5 rounded-2xl cursor-default transition-all duration-300"
      style={{
        background: bright
          ? "linear-gradient(135deg, rgba(212,0,110,0.45) 0%, rgba(140,0,200,0.35) 100%)"
          : "rgba(212, 0, 110, 0.08)",
        border: `1px solid ${bright ? "rgba(255,80,160,0.6)" : "rgba(212,0,110,0.3)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: bright
          ? "0 0 40px rgba(212,0,110,0.30), inset 0 1px 0 rgba(255,255,255,0.12)"
          : "0 0 20px rgba(212,0,110,0.10), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: bright ? "rgba(255,255,255,0.15)" : "rgba(212,0,110,0.2)",
          border: `1px solid ${bright ? "rgba(255,255,255,0.25)" : "rgba(212,0,110,0.4)"}`,
        }}
      >
        <Icon size={14} style={{ color: bright ? "#ffffff" : "#ff66b3" }} />
      </div>
      <h4 className="text-[13px] font-bold text-white mb-1.5 leading-tight">{title}</h4>
      <p className="text-[11px] leading-relaxed" style={{ color: bright ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)" }}>{body}</p>
    </motion.div>
  );
}

/* ─── Timeline / What-you-get row ────────────────── */
function TimelineRow({ items, label }: { items: { title: string; body: string }[]; label: string }) {
  return (
    <div className="w-full">
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
      >
        {label}
      </motion.h3>
      <div className="relative">
        {/* connector line */}
        <div
          className="absolute left-0 right-0 hidden md:block"
          style={{
            top: "10px",
            height: "2px",
            background: "linear-gradient(to right, transparent 2%, rgba(212,0,110,0.6) 20%, rgba(140,0,200,0.6) 50%, rgba(212,0,110,0.6) 80%, transparent 98%)",
            zIndex: 0,
          }}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.45 }}
              className="flex flex-col items-start md:items-center gap-4"
            >
              {/* glowing dot */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-5 h-5 rounded-full relative z-10"
                  style={{
                    background: "radial-gradient(circle, #ff66b3 0%, #d4006e 60%)",
                    boxShadow: "0 0 0 4px rgba(212,0,110,0.2), 0 0 18px rgba(212,0,110,0.7)",
                  }}
                />
              </div>
              <div className="md:text-center">
                <p className="text-[13px] font-bold text-white mb-1.5 leading-snug">{item.title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


function NotForItem({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ x: -4, scale: 1.01 }}
      className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(212,0,110,0.18)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 20px rgba(212,0,110,0.06)",
      }}
    >
      <XCircle size={16} style={{ color: "#d4006e", flexShrink: 0, marginTop: 2 }} />
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{text}</p>
    </motion.div>
  );
}

/* ─── Glowing CTA button ─────────────────────────── */
function GlowButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      animate={{ boxShadow: ["0 0 25px rgba(212,0,110,0.4)", "0 0 45px rgba(212,0,110,0.7)", "0 0 25px rgba(212,0,110,0.4)"] }}
      transition={{ boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
      style={{ borderRadius: "999px", display: "inline-block" }}
    >
      <Link
        href={href}
        className="flex items-center gap-3 px-9 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white rounded-full"
        style={{
          background: "linear-gradient(135deg, #d4006e 0%, #8c00c8 100%)",
          boxShadow: "0 0 0 1px rgba(255,100,180,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {children}
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function HomePage() {
  const { t } = useApp();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smooth, [0, 0.18], [0, -50]);
  const heroOpacity = useTransform(smooth, [0, 0.16], [1, 0]);

  const serviceItems = [
    { title: "Software & Web",   body: "Custom platforms built for scale" },
    { title: "Media Production", body: "Cinematic content that captures attention" },
    { title: "Marketing",        body: "Data-driven campaigns that convert" },
    { title: "Consulting",       body: "Strategy from concept to launch" },
    { title: "Training",         body: "Skill programs for modern teams" },
    { title: "Graphic Design",   body: "Identities that define categories" },
  ];

  return (
    <main
      ref={containerRef}
      className="relative text-white overflow-x-hidden"
      style={{ background: "#070010" }}
    >
      <MouseGlow />

      {/* ══ FIXED BACKGROUND BLOBS ══════════════════ */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Big upper-centre magenta bloom — matches reference */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-30%)",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,0,100,0.55) 0%, rgba(130,0,180,0.30) 40%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Secondary purple lower-left */}
        <motion.div
          animate={{ scale: [1, 1.10, 1], opacity: [0.22, 0.35, 0.22] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-5%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,0,200,0.45) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        {/* Right accent */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          style={{
            position: "absolute",
            top: "40%",
            right: "-8%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,0,110,0.30) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ════════════════════════════════════════════ */}
      {/*  HERO                                        */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto">

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4006e] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t.home.badge}
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-5xl md:text-7xl lg:text-[88px] font-black uppercase italic tracking-tighter leading-[0.88] mb-6"
          >
            {t.home.hero1}{" "}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #ff4da6, #cc00ff, #ff4da6)", backgroundSize: "200% auto", animation: "shimmer 4s linear infinite" }}
            >
              {t.home.hero2}
            </span>
          </motion.h1>

          {/* sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {t.home.sub}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <GlowButton href="/quote">{t.home.cta_primary}</GlowButton>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/products"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {t.home.cta_secondary}
              </Link>
            </motion.div>
          </motion.div>

          {/* avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.36 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-3">
              {["dositha", "nicole", "fortune"].map((name) => (
                <div
                  key={name}
                  className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-800"
                  style={{ border: "2px solid #070010" }}
                >
                  <Image src={`/image/${name}.jpeg`} alt={name} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                style={{ background: "linear-gradient(135deg, #d4006e, #7000cc)", border: "2px solid #070010" }}
              >
                50+
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t.home.team_label}
            </p>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ opacity: 0.3 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#d4006e] to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  SECTION 1 — FOR GROWING BRANDS             */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Inner glass panel */}
          <div
            className="rounded-3xl p-8 md:p-12 mb-16"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(212,0,110,0.12)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 80px rgba(212,0,110,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-start">

              {/* 2×2 glass cards */}
              <div className="grid grid-cols-2 gap-3">
                <ProblemCardSubtle icon={TrendingDown} delay={0}    accent title="No digital strategy"    body="Operating without a clear roadmap means budget goes to tactics with no results." />
                <ProblemCardSubtle icon={AlertCircle}  delay={0.07} title="Brand doesn't convert"  body="Traffic comes but visitors leave. Your digital presence isn't working hard enough." />
                <ProblemCardSubtle icon={BarChart3}    delay={0.14} title="Marketing burns budget" body="Ad spend with no measurable ROI. Campaigns that look busy but don't generate leads." />
                <ProblemCardSubtle icon={Clock}        delay={0.21} title="Agencies underdeliver"  body="You've hired before and got polished decks — not results. Overpromised, underbuilt." />
              </div>

              {/* heading right */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:pt-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4" style={{ color: "#d4006e" }}>
                  For Growing Brands
                </p>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.9] mb-5 text-white">
                  You have the product.
                </h2>
                <p className="text-xl md:text-2xl mb-6 leading-snug" style={{ color: "rgba(255,255,255,0.38)" }}>
                  We build the digital presence that sells it.
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
                  360 Hive delivers full-stack digital execution — software, identity, content, and growth strategy under one roof.
                </p>
                <div className="space-y-3">
                  {["End-to-end digital execution", "Measurable growth targets", "One team, zero handoff gaps"].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.12 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <CheckCircle2 size={14} style={{ color: "#d4006e", flexShrink: 0 }} />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Timeline row */}
          <TimelineRow
            label={`${t.home.services_label} — What you get:`}
            items={serviceItems}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  SECTION 2 — FOR STARTUPS                   */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-20 px-6">
        {/* section bloom */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,0,200,0.10) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Inner glass panel */}
          <div
            className="rounded-3xl p-8 md:p-12 mb-16"
            style={{
              background: "rgba(212,0,110,0.03)",
              border: "1px solid rgba(212,0,110,0.18)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 80px rgba(212,0,110,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-start">

              {/* heading left */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:order-1 order-2 lg:pt-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4" style={{ color: "#9c40ff" }}>
                  For Startups & Entrepreneurs
                </p>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.9] mb-5 text-white">
                  Great idea.
                </h2>
                <p className="text-xl md:text-2xl mb-6 leading-snug" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Let us build the machine behind it.
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
                  From MVP to market leader — we've helped 50+ businesses launch fast, grow smart, and build systems that scale without breaking.
                </p>
                <div className="space-y-3">
                  {["Launch-ready in weeks, not months", "Built for scale from day one", "Training included for your team"].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.12 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <CheckCircle2 size={14} style={{ color: "#9c40ff", flexShrink: 0 }} />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 2×2 vibrant pink cards */}
              <div className="grid grid-cols-2 gap-3 lg:order-2 order-1">
                <ProblemCardVibrant icon={Cpu}    delay={0}    bright title="No technical team"     body="The idea is clear but there's no one to build it. You need a team that ships." />
                <ProblemCardVibrant icon={Zap}    delay={0.07} title="Runway is ticking"     body="Every week without a product is burn. Speed to market is existential for startups." />
                <ProblemCardVibrant icon={Globe}  delay={0.14} bright title="Competitors move fast" body="While you're figuring out tech, competitors are already capturing your market." />
                <ProblemCardVibrant icon={Layers} delay={0.21} title="Can't scale manually"  body="Processes built on spreadsheets and WhatsApp break the moment growth hits." />
              </div>
            </div>
          </div>

          {/* Principles timeline row */}
          <TimelineRow
            label={`${t.home.principles_label} — ${t.home.principles_title}:`}
            items={t.principles_list.map(p => ({ title: p.title, body: p.desc }))}
          />

          {/* mid-page CTA */}
          <div className="flex justify-center mt-16">
            <GlowButton href="/quote">{t.home.cta_primary}</GlowButton>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  NOT FOR EVERYONE                            */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>
                Transparency first
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6 text-white">
                Who We're <span style={{ color: "#d4006e" }}>Not</span> For
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.38)" }}>
                We'd rather be honest upfront. We only take on clients where we're confident we can deliver transformational outcomes.
              </p>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.28)" }}>
                If that doesn't describe you — let's talk.
              </p>
              <GlowButton href="/quote">{t.home.cta_primary}</GlowButton>
            </motion.div>

            {/* Right: stacked cards */}
            <div className="flex flex-col gap-4">
              <NotForItem delay={0}    text="Those expecting overnight results without commitment to the process — quality takes collaboration." />
              <NotForItem delay={0.09} text="Those who want the cheapest option available. We optimise for outcomes, not lowest price." />
              <NotForItem delay={0.18} text="Those who won't share feedback or trust the team's expertise. Partnership requires both sides." />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  SERVICES BREAKDOWN                          */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
              {t.home.services_label}
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
              {t.home.services_title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Code2,         num: "01", title: "Software & Web",   body: "Crafting scalable applications and high-end digital experiences on modern stacks." },
              { icon: Video,         num: "02", title: "Media Production", body: "Cinematic storytelling and digital content that captures brand essence at scale." },
              { icon: Megaphone,     num: "03", title: "Marketing & Ads",  body: "Data-driven campaigns that scale your digital presence with measurable ROI." },
              { icon: Lightbulb,     num: "04", title: "Consulting",       body: "Strategic advisory to navigate the digital landscape with clarity and confidence." },
              { icon: GraduationCap, num: "05", title: "Training",         body: "Technical workshops and learning programs to upskill your teams for today's challenges." },
              { icon: Palette,       num: "06", title: "Graphic Design",   body: "Visual identities and UI/UX design that define and differentiate industry leaders." },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6, boxShadow: "0 0 50px rgba(212,0,110,0.18)" }}
                className="group p-6 rounded-2xl cursor-default transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,0,110,0.12)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 0 20px rgba(100,0,180,0.05)",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(212,0,110,0.12)", border: "1px solid rgba(212,0,110,0.25)" }}
                  >
                    <s.icon size={16} style={{ color: "#d4006e" }} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest" style={{ color: "rgba(255,255,255,0.12)" }}>{s.num}</span>
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#ff4da6] transition-colors">{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  FINAL CTA                                   */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(212,0,110,0.14) 0%, rgba(100,0,200,0.08) 50%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.88] mb-6 text-white">
              {t.home.cta_title.split(" ").slice(0, -1).join(" ")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #ff4da6, #9000ff)" }}
              >
                {t.home.cta_title.split(" ").slice(-1)}
              </span>
            </h2>
            <p className="mb-12 max-w-md mx-auto text-lg" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t.home.sub}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <GlowButton href="/quote">{t.home.cta_primary}</GlowButton>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {t.home.cta_btn}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes shimmer {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </main>
  );
}
