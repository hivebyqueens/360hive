"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Code2, Video, Megaphone, Lightbulb, GraduationCap, Palette,
  ArrowRight, ChevronDown, TrendingDown, AlertCircle, Clock, BarChart3,
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
      className="pointer-events-none fixed inset-0 z-10 opacity-40"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,0,102,0.08), transparent 80%)`
        ),
      }}
    />
  );
};

/* ─── Glass card ─────────────────────────────────── */
function ProblemCard({
  icon: Icon, title, body, delay = 0,
}: { icon: React.ElementType; title: string; body: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group p-5 rounded-2xl bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] hover:border-[#ff0066]/35 hover:bg-white/[0.07] transition-all duration-300 backdrop-blur-sm"
    >
      <div className="w-8 h-8 rounded-xl bg-[#ff0066]/15 border border-[#ff0066]/20 flex items-center justify-center mb-4 group-hover:bg-[#ff0066]/25 transition-colors">
        <Icon size={15} className="text-[#ff0066]" />
      </div>
      <h4 className="text-sm font-black uppercase tracking-tight text-white mb-2 leading-tight">{title}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
    </motion.div>
  );
}

/* ─── Benefit row item ───────────────────────────── */
function BenefitItem({ title, body, delay = 0, last = false }: { title: string; body: string; delay?: number; last?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      className={`px-6 py-5 flex flex-col gap-3 ${!last ? "border-r border-white/[0.06]" : ""}`}
    >
      <span className="w-2 h-2 rounded-full bg-[#ff0066] flex-shrink-0" />
      <p className="text-sm font-bold text-white leading-snug">{title}</p>
      <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
    </motion.div>
  );
}

/* ─── Not-for accordion item ─────────────────────── */
function NotForItem({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm"
    >
      <XCircle size={16} className="text-[#ff0066] flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
    </motion.div>
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

  return (
    <main ref={containerRef} className="relative bg-[#010717] text-white overflow-x-hidden selection:bg-[#ff0066]/25">
      <MouseGlow />

      {/* ── Ambient background ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#ff0066]/5 blur-[160px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#7000ff]/8 blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ff0066]/5 blur-[120px]" />
      </div>

      {/* ════════════════════════════════════════════ */}
      {/*  HERO                                        */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 overflow-hidden text-center">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:52px_52px]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0066] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-gray-400">{t.home.badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-6"
          >
            {t.home.hero1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#c000ff] to-[#ff0066]">
              {t.home.hero2}
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed mb-10"
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
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-[#ff0066] to-[#9000ff] hover:opacity-90 text-white rounded-2xl px-10 h-14 text-[11px] font-black uppercase tracking-widest group shadow-[0_8px_32px_rgba(255,0,102,0.3)] border-0"
              >
                {t.home.cta_primary}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 hover:bg-white/5 rounded-2xl px-8 h-14 text-[11px] font-black uppercase tracking-widest text-gray-300"
              >
                {t.home.cta_secondary}
              </Button>
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
                <div key={name} className="w-10 h-10 rounded-full border-2 border-[#010717] overflow-hidden relative bg-gray-800">
                  <Image src={`/image/${name}.jpeg`} alt={name} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#010717] bg-gradient-to-br from-[#ff0066] to-[#7000ff] flex items-center justify-center text-[9px] font-black">
                50+
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{t.home.team_label}</p>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  SECTION 1 — FOR GROWING BRANDS             */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Layout: problems left, heading right */}
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">

            {/* 2×2 problem cards */}
            <div className="grid grid-cols-2 gap-3">
              <ProblemCard icon={TrendingDown}  delay={0}    title="No digital strategy"      body="Operating without a clear roadmap means budget goes to tactics with no results." />
              <ProblemCard icon={AlertCircle}   delay={0.07} title="Brand doesn't convert"    body="Traffic comes but visitors leave. Your digital presence isn't working hard enough." />
              <ProblemCard icon={BarChart3}     delay={0.14} title="Marketing burns budget"   body="Ad spend with no measurable ROI. Campaigns that look busy but don't generate leads." />
              <ProblemCard icon={Clock}         delay={0.21} title="Agencies underdeliver"    body="You've hired before and got polished decks — not results. Overpromised, underbuilt." />
            </div>

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pt-4"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#ff0066] block mb-4">For Growing Brands</span>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                You have the product.<br />
                <span className="text-gray-400 font-normal not-italic normal-case text-2xl md:text-3xl tracking-normal leading-normal">
                  We build the digital presence that sells it.
                </span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                360 Hive delivers full-stack digital execution — software, identity, content, and growth strategy under one roof.
              </p>
              <div className="mt-8 space-y-3">
                {["End-to-end digital execution", "Measurable growth targets", "One team, zero handoff gaps"].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <CheckCircle2 size={15} className="text-[#ff0066] flex-shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── What you get row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-gray-500">{t.home.services_label} — What you get</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: Code2,         title: "Software & Web",   body: "Custom platforms built for scale" },
                { icon: Video,         title: "Media Production", body: "Cinematic content that captures attention" },
                { icon: Megaphone,     title: "Marketing",        body: "Data-driven campaigns that convert" },
                { icon: Lightbulb,     title: "Consulting",       body: "Strategy from concept to launch" },
                { icon: GraduationCap, title: "Training",         body: "Skill programs for modern teams" },
                { icon: Palette,       title: "Graphic Design",   body: "Identities that define categories" },
              ].map((item, i) => (
                <BenefitItem key={i} title={item.title} body={item.body} delay={i * 0.05} last={i === 5} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  SECTION 2 — FOR STARTUPS                   */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-28 px-6">
        {/* Section glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#7000ff]/6 blur-[130px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">

          <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">

            {/* Heading first on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-1 order-2 lg:pt-4"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#7000ff] block mb-4">For Startups & Entrepreneurs</span>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                Great idea.<br />
                <span className="text-gray-400 font-normal not-italic normal-case text-2xl md:text-3xl tracking-normal leading-normal">
                  Let us build the machine behind it.
                </span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                From MVP to market leader — we've helped 50+ businesses launch fast, grow smart, and build systems that scale without breaking.
              </p>
              <div className="mt-8 space-y-3">
                {["Launch-ready in weeks, not months", "Built for scale from day one", "Training included for your team"].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <CheckCircle2 size={15} className="text-[#7000ff] flex-shrink-0" />
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

          {/* ── Principles row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-gray-500">{t.home.principles_label} — {t.home.principles_title}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {t.principles_list.map((p, i) => (
                <BenefitItem key={i} title={p.title} body={p.desc} delay={i * 0.07} last={i === 2} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  NOT FOR EVERYONE                            */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-3">
              Who We're <span className="text-[#ff0066]">Not</span> For
            </h2>
            <p className="text-gray-500 text-sm">We'd rather be honest upfront.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            <NotForItem delay={0}    text="Those expecting overnight results without commitment to the process — quality takes collaboration." />
            <NotForItem delay={0.08} text="Those who want the cheapest option available. We optimise for outcomes, not lowest price." />
            <NotForItem delay={0.16} text="Those who won't share feedback or trust the team's expertise. Partnership requires both sides." />
          </div>

          {/* CTA nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-gray-500 text-sm mb-4">If that doesn't describe you — let's talk.</p>
            <Link href="/quote">
              <Button className="relative bg-gradient-to-r from-[#ff0066] to-[#9000ff] text-white rounded-2xl px-10 h-13 text-[11px] font-black uppercase tracking-widest shadow-[0_8px_28px_rgba(255,0,102,0.25)] hover:opacity-90 border-0">
                {t.home.cta_primary} <ArrowRight className="ml-2" size={15} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  SERVICES BREAKDOWN (like "Program details") */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-gray-500 block mb-3">{t.home.services_label}</span>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">{t.home.services_title}</h2>
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
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-[#ff0066]/30 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#ff0066]/12 border border-[#ff0066]/15 flex items-center justify-center group-hover:bg-[#ff0066]/20 transition-colors">
                    <s.icon size={16} className="text-[#ff0066]" />
                  </div>
                  <span className="text-[10px] font-black text-gray-700 tracking-widest">{s.num}</span>
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#ff0066] transition-colors">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  FINAL CTA                                   */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ff0066]/8 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6">
              {t.home.cta_title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] to-[#9000ff]">
                {t.home.cta_title.split(" ").slice(-1)}
              </span>
            </h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto">{t.home.sub}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/quote">
                <Button className="bg-gradient-to-r from-[#ff0066] to-[#9000ff] text-white rounded-2xl px-12 h-14 text-[11px] font-black uppercase tracking-widest shadow-[0_8px_32px_rgba(255,0,102,0.3)] hover:opacity-90 border-0">
                  {t.home.cta_primary}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300 rounded-2xl px-8 h-14 text-[11px] font-black uppercase tracking-widest">
                  {t.home.cta_btn}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
