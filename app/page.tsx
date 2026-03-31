"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Code2, Video, Megaphone, Lightbulb, GraduationCap, Palette, ArrowRight, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/i18n-context";

const serviceIcons = [Code2, Video, Megaphone, Lightbulb, GraduationCap, Palette];

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
      className="pointer-events-none fixed inset-0 z-10 opacity-30"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(255,0,102,0.12), transparent 80%)`
        ),
      }}
    />
  );
};

export default function HomePage() {
  const { t } = useApp();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smooth, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(smooth, [0, 0.25], [1, 0]);
  const hexScale = useTransform(smooth, [0, 0.3], [1, 1.15]);

  return (
    <main ref={containerRef} className="relative bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <MouseGlow />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 dark:opacity-100" />

        {/* Rotating hex */}
        <motion.div
          style={{ scale: hexScale, opacity: heroOpacity }}
          className="absolute z-0 w-[700px] h-[700px] pointer-events-none opacity-[0.07]"
        >
          <svg className="w-full h-full animate-[spin_80s_linear_infinite]" viewBox="0 0 100 100">
            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="#ff0066" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#7000ff" strokeWidth="0.15" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="22" fill="none" stroke="#ff0066" strokeWidth="0.1" strokeDasharray="1 4" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="lg:col-span-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-8 bg-white/5 dark:bg-white/5 w-fit px-4 py-2 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff0066] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400">
                  {t.home.badge}
                </span>
              </motion.div>

              {/* Hero title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-8"
              >
                {t.home.hero1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066]">
                  {t.home.hero2}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 dark:text-gray-400 text-lg max-w-md leading-relaxed mb-10"
              >
                {t.home.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link href="/quote">
                  <Button size="lg" className="bg-[#ff0066] hover:bg-[#ff0066]/90 text-white rounded-2xl px-8 h-14 text-[11px] font-black uppercase tracking-widest group shadow-[0_8px_24px_rgba(255,0,102,0.25)]">
                    {t.home.cta_primary}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl px-8 h-14 text-[11px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300">
                    {t.home.cta_secondary}
                  </Button>
                </Link>
              </motion.div>

              {/* Team avatars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {["dositha", "nicole", "fortune"].map((name) => (
                    <div key={name} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#010717] bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                      <Image src={`/image/${name}.jpeg`} alt={name} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.home.team_label}</p>
              </motion.div>
            </motion.div>

            {/* Terminal widget */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ff0066] to-[#7000ff]" />
                <div className="flex gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-3 font-mono text-[11px] text-gray-400 dark:text-gray-500">
                  <p className="text-gray-900 dark:text-white">$ init 360_hive --mode=production</p>
                  <p>✓ Loading core systems...</p>
                  <p>✓ Software team: <span className="text-green-400">ready</span></p>
                  <p>✓ Design team: <span className="text-green-400">ready</span></p>
                  <p>✓ Active clients: <span className="text-[#ff0066]">50+</span></p>
                  <p>✓ Status: <span className="text-[#7000ff]">optimized</span></p>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-[#ff0066] ml-1"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-[#ff0066] font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">{t.home.services_label}</span>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">{t.home.services_title}</h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">{t.home.services_sub}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services_list.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-[#ff0066]/30 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0066]/10 to-[#7000ff]/10 flex items-center justify-center mb-4 group-hover:from-[#ff0066]/20 group-hover:to-[#7000ff]/20 transition-all">
                    <Icon size={18} className="text-[#ff0066]" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-[#ff0066] transition-colors">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-28 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[#ff0066] font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">{t.home.principles_label}</span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">{t.home.principles_title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.principles_list.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col gap-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff0066] to-[#7000ff] flex items-center justify-center text-white font-black italic text-lg shadow-lg shadow-pink-500/15 group-hover:scale-110 transition-transform">
                    0{i + 1}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#ff0066]/30 to-transparent" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight group-hover:text-[#ff0066] transition-colors">{p.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff0066]/5 via-transparent to-[#7000ff]/5" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
              {t.home.cta_title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#ff0066]">{t.home.cta_title.split(" ").slice(-1)}</span>
            </h2>
            <Link href="/contact">
              <Button size="lg" className="bg-white dark:bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-2xl px-12 h-14 text-xs font-black uppercase tracking-[0.25em] transition-all shadow-xl dark:shadow-white/5 group">
                {t.home.cta_btn}
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
