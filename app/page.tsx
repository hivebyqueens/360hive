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
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/i18n-context";

/* ─── Mouse glow ─────────────────────────────────── */
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
      className="pointer-events-none fixed inset-0 z-10 opacity-50"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(255,0,102,0.10), transparent 70%)`
        ),
      }}
    />
  );
};

/* ─── Glass Problem Card ─────────────────────────── */
function ProblemCard({
  icon: Icon, title, body, delay = 0,
}: { icon: React.ElementType; title: string; body: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 0 40px rgba(255,0,102,0.18)" }}
      className="group p-5 rounded-2xl backdrop-blur-md transition-all duration-300 cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,0,102,0.18)",
        boxShadow: "0 0 20px rgba(255,0,102,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: "rgba(255,0,102,0.15)", border: "1px solid rgba(255,0,102,0.3)" }}>
        <Icon size={15} className="text-[#ff0066]" />
      </div>
      <h4 className="text-sm font-black uppercase tracking-tight text-white mb-2 leading-tight">{title}</h4>
      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{body}</p>
    </motion.div>
  );
}

/* ─── Timeline Benefit ───────────────────────────── */
function BenefitRow({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="rounded-2xl overflow-hidden backdrop-blur-md"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,0,102,0.12)",
        boxShadow: "0 0 30px rgba(120,0,255,0.06)",
      }}
    >
      <div className="relative grid"
        style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
      >
        {/* gradient connector line */}
        <div className="absolute top-[2.15rem] left-[calc(100%/(${items.length}*2))] right-[calc(100%/(${items.length}*2))] h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,0,102,0.4), rgba(120,0,255,0.4), transparent)" }}
        />
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            className={`px-5 py-6 flex flex-col gap-3 ${i < items.length - 1 ? "border-r" : ""}`}
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <div className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #ff0066, #7000ff)",
                boxShadow: "0 0 10px rgba(255,0,102,0.6)",
              }}
            />
            <p className="text-sm font-bold text-white leading-snug">{item.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Not-for item ───────────────────────────────── */
function NotForItem({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ x: -4 }}
      className="flex items-start gap-4 p-5 rounded-2xl backdrop-blur-md transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,0,102,0.15)",
        boxShadow: "0 0 20px rgba(255,0,102,0.04)",
      }}
    >
      <XCircle size={16} className="text-[#ff0066] flex-shrink-0 mt-0.5" />
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{text}</p>
    </motion.div>
  );
}

/* ─── Section wrapper (glass panel) ─────────────── */
function GlassSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl overflow-hidden ${className}`}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,0,102,0.1)",
        boxShadow: "0 0 60px rgba(120,0,255,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function HomePage() {
  const { t } = useApp();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smooth, [0, 0.2], [0, -60]);
  const heroOpacity = useTransform(smooth, [0, 0.18], [1, 0]);

  const serviceItems = [
    { icon: Code2,         title: "Software & Web",   body: "Custom platforms built for scale" },
    { icon: Video,         title: "Media Production", body: "Cinematic content that captures attention" },
    { icon: Megaphone,     title: "Marketing",        body: "Data-driven campaigns that convert" },
    { icon: Lightbulb,     title: "Consulting",       body: "Strategy from concept to launch" },
    { icon: GraduationCap, title: "Training",         body: "Skill programs for modern teams" },
    { icon: Palette,       title: "Graphic Design",   body: "Identities that define categories" },
  ];

  return (
    <main ref={containerRef} className="relative text-white overflow-x-hidden selection:bg-[#ff0066]/25"
      style={{ background: "#07001a" }}>
      <MouseGlow />

      {/* ── Ambient background blobs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,0,102,0.22) 0%, rgba(120,0,255,0.15) 40%, transparent 70%)", filter: "blur(60px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.20, 0.12] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[35%] right-[-15%] w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(120,0,255,0.25) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,0,102,0.18) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        {/* subtle grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      </div>

      {/* ════════════════════════════════════════════ */}
      {/*  HERO                                        */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 overflow-hidden text-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0066] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "rgba(255,255,255,0.5)" }}>{t.home.badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-6"
          >
            {t.home.hero1} <br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #ff0066, #c000ff, #ff0066)", backgroundSize: "200% auto", animation: "shimmer 4s linear infinite" }}>
              {t.home.hero2}
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mx-auto leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {t.home.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <Link href="/quote">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(255,0,102,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2 rounded-2xl px-10 h-14 text-[11px] font-black uppercase tracking-widest text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #ff0066, #9000ff)",
                  boxShadow: "0 8px 32px rgba(255,0,102,0.35), 0 0 0 1px rgba(255,0,102,0.2)",
                }}
              >
                {t.home.cta_primary}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.07)" }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl px-8 h-14 text-[11px] font-black uppercase tracking-widest transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {t.home.cta_secondary}
              </motion.button>
            </Link>
          </motion.div>

          {/* Team avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-3">
              {["dositha", "nicole", "fortune"].map((name) => (
                <div key={name} className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-800"
                  style={{ border: "2px solid #07001a" }}>
                  <Image src={`/image/${name}.jpeg`} alt={name} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[9px] font-black"
                style={{ background: "linear-gradient(135deg, #ff0066, #7000ff)", border: "2px solid #07001a" }}>
                50+
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{t.home.team_label}</p>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  SECTION 1 — FOR GROWING BRANDS             */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <GlassSection className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">

              {/* 2×2 problem cards */}
              <div className="grid grid-cols-2 gap-3">
                <ProblemCard icon={TrendingDown}  delay={0}    title="No digital strategy"    body="Operating without a clear roadmap means budget goes to tactics with no results." />
                <ProblemCard icon={AlertCircle}   delay={0.07} title="Brand doesn't convert"  body="Traffic comes but visitors leave. Your digital presence isn't working hard enough." />
                <ProblemCard icon={BarChart3}     delay={0.14} title="Marketing burns budget" body="Ad spend with no measurable ROI. Campaigns that look busy but don't generate leads." />
                <ProblemCard icon={Clock}         delay={0.21} title="Agencies underdeliver"  body="You've hired before and got polished decks — not results. Overpromised, underbuilt." />
              </div>

              {/* Section heading */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:pt-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.45em] block mb-4"
                  style={{ color: "#ff0066" }}>For Growing Brands</span>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9] mb-5 text-white">
                  You have the product.
                </h2>
                <p className="text-2xl md:text-3xl font-normal not-italic normal-case tracking-normal leading-normal mb-6"
                  style={{ color: "rgba(255,255,255,0.4)" }}>
                  We build the digital presence that sells it.
                </p>
                <p className="text-sm leading-relaxed max-w-sm mb-8"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  360 Hive delivers full-stack digital execution — software, identity, content, and growth strategy under one roof.
                </p>
                <div className="space-y-3">
                  {["End-to-end digital execution", "Measurable growth targets", "One team, zero handoff gaps"].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <CheckCircle2 size={15} className="text-[#ff0066] flex-shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* What you get row */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.45em] mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}>
                {t.home.services_label} — What you get
              </p>
              <BenefitRow items={serviceItems} />
            </div>
          </GlassSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  SECTION 2 — FOR STARTUPS                   */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-12 px-6">
        {/* Section glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(112,0,255,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <GlassSection className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">

              {/* Heading first */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:order-1 order-2 lg:pt-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.45em] block mb-4"
                  style={{ color: "#7000ff" }}>For Startups & Entrepreneurs</span>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9] mb-5 text-white">
                  Great idea.
                </h2>
                <p className="text-2xl md:text-3xl font-normal not-italic normal-case tracking-normal leading-normal mb-6"
                  style={{ color: "rgba(255,255,255,0.4)" }}>
                  Let us build the machine behind it.
                </p>
                <p className="text-sm leading-relaxed max-w-sm mb-8"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  From MVP to market leader — we've helped 50+ businesses launch fast, grow smart, and build systems that scale without breaking.
                </p>
                <div className="space-y-3">
                  {["Launch-ready in weeks, not months", "Built for scale from day one", "Training included for your team"].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <CheckCircle2 size={15} style={{ color: "#7000ff" }} className="flex-shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 2×2 problem cards */}
              <div className="grid grid-cols-2 gap-3 lg:order-2 order-1">
                <ProblemCard icon={Cpu}    delay={0}    title="No technical team"     body="The idea is clear but there's no one to build it. You need a team that ships." />
                <ProblemCard icon={Zap}    delay={0.07} title="Runway is ticking"     body="Every week without a product is burn. Speed to market is existential for startups." />
                <ProblemCard icon={Globe}  delay={0.14} title="Competitors move fast" body="While you're figuring out tech, competitors are already capturing your market." />
                <ProblemCard icon={Layers} delay={0.21} title="Can't scale manually"  body="Processes built on spreadsheets and WhatsApp break the moment growth hits." />
              </div>
            </div>

            {/* Principles row */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.45em] mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}>
                {t.home.principles_label} — {t.home.principles_title}
              </p>
              <BenefitRow items={t.principles_list.map(p => ({ title: p.title, body: p.desc }))} />
            </div>
          </GlassSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  NOT FOR EVERYONE                            */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.45em] block mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}>Transparency first</span>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-5 text-white leading-[0.9]">
                Who We're <span style={{ color: "#ff0066" }}>Not</span> For
              </h2>
              <p className="text-sm leading-relaxed max-w-sm"
                style={{ color: "rgba(255,255,255,0.35)" }}>
                We'd rather be honest upfront. We only take on clients where we're confident we can deliver transformational outcomes.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>If that doesn't describe you — let's talk.</p>
                <Link href="/quote">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(255,0,102,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 rounded-2xl px-8 h-13 text-[11px] font-black uppercase tracking-widest text-white"
                    style={{
                      background: "linear-gradient(135deg, #ff0066, #9000ff)",
                      boxShadow: "0 8px 28px rgba(255,0,102,0.3)",
                    }}
                  >
                    {t.home.cta_primary} <ArrowRight size={15} />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: stacked not-for cards */}
            <div className="flex flex-col gap-4">
              <NotForItem delay={0}    text="Those expecting overnight results without commitment to the process — quality takes collaboration." />
              <NotForItem delay={0.08} text="Those who want the cheapest option available. We optimise for outcomes, not lowest price." />
              <NotForItem delay={0.16} text="Those who won't share feedback or trust the team's expertise. Partnership requires both sides." />
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
            <span className="text-[10px] font-bold uppercase tracking-[0.45em] block mb-3"
              style={{ color: "rgba(255,255,255,0.25)" }}>{t.home.services_label}</span>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">{t.home.services_title}</h2>
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
                whileHover={{ y: -6, boxShadow: "0 0 50px rgba(255,0,102,0.15)" }}
                className="group p-6 rounded-2xl backdrop-blur-md transition-all duration-300 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,0,102,0.12)",
                  boxShadow: "0 0 20px rgba(120,0,255,0.05)",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(255,0,102,0.12)", border: "1px solid rgba(255,0,102,0.25)" }}>
                    <s.icon size={16} className="text-[#ff0066]" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest"
                    style={{ color: "rgba(255,255,255,0.15)" }}>{s.num}</span>
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#ff0066] transition-colors">{s.title}</h3>
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(255,0,102,0.12) 0%, rgba(120,0,255,0.08) 50%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6 text-white">
              {t.home.cta_title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #ff0066, #9000ff)" }}>
                {t.home.cta_title.split(" ").slice(-1)}
              </span>
            </h2>
            <p className="mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>{t.home.sub}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/quote">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(255,0,102,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl px-12 h-14 text-[11px] font-black uppercase tracking-widest text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #ff0066, #9000ff)",
                    boxShadow: "0 8px 32px rgba(255,0,102,0.35)",
                  }}
                >
                  {t.home.cta_primary}
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.07)" }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl px-8 h-14 text-[11px] font-black uppercase tracking-widest transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {t.home.cta_btn}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </main>
  );
}
