"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, Palette, TrendingUp, Target, Eye, Zap, CheckCircle2, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/i18n-context";

const teamMembers = [
  {
    name: "IGIRIMPUHWE Dositha",
    role: "CEO & Fullstack Developer",
    image: "/image/dositha.jpeg",
    description: "The systems architect. Bridging the gap between logic and creativity.",
    skills: ["Architecture", "Next.js", "Fullstack"],
    icon: Cpu,
  },
  {
    name: "RIRASIRABOSE Aime Nicole",
    role: "Managing Director & Graphic Designer",
    image: "/image/nicole.jpeg",
    description: "Orchestrating the Hive. Defining the visual and operational soul of the brand.",
    skills: ["Operations", "Identity", "Design"],
    icon: Palette,
  },
  {
    name: "UMUBYEYI Fortune",
    role: "Sales & Graphic Designer",
    image: "/image/fortune.jpeg",
    description: "The connection engine. Merging market strategy with visual storytelling.",
    skills: ["Strategy", "UI/UX", "Branding"],
    icon: TrendingUp,
  },
];

const principleIcons = [Zap, Palette, CheckCircle2];

export default function AboutPage() {
  const { t } = useApp();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textY = useTransform(smooth, [0, 0.25], [0, -60]);
  const heroOpacity = useTransform(smooth, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-[var(--bg)] text-[var(--text)] overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] opacity-50 dark:opacity-100" />

        {/* Subtle background glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ff0066]/5 dark:bg-[#ff0066]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div style={{ y: textY, opacity: heroOpacity }} className="lg:col-span-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-8 bg-black/5 dark:bg-white/5 w-fit px-4 py-2 rounded-full border border-black/10 dark:border-white/10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff0066] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400">{t.about.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-8"
              >
                {t.about.hero1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066]">
                  {t.about.hero2}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="border-l-2 border-[#ff0066] pl-5 max-w-lg"
              >
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{t.about.hero_desc}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex -space-x-3"
              >
                {teamMembers.map((m) => (
                  <div key={m.name} className="w-11 h-11 rounded-full border-2 border-white dark:border-[#010717] bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                    <Image src={m.image} alt={m.name} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                  </div>
                ))}
                <div className="w-11 h-11 rounded-full border-2 border-white dark:border-[#010717] bg-[#ff0066] flex items-center justify-center text-[9px] font-black text-white">+50</div>
              </motion.div>
            </motion.div>

            {/* Terminal card */}
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
                <div className="space-y-3 font-mono text-[11px] text-gray-400">
                  <p className="text-gray-900 dark:text-white">$ load mission.json</p>
                  <p>✓ Values: <span className="text-green-400">excellence</span></p>
                  <p>✓ Focus: <span className="text-[#ff0066]">Africa & beyond</span></p>
                  <p>✓ Team size: <span className="text-[#7000ff]">growing</span></p>
                  <p>✓ Projects: <span className="text-green-400">50+ delivered</span></p>
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

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#ff0066] to-transparent" />
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="group relative p-px rounded-3xl"
            style={{ background: "linear-gradient(135deg, #ff006630, transparent)" }}
          >
            <div className="relative bg-[var(--bg)] rounded-3xl p-10 border border-transparent overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={100} />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#ff0066]" />
                <span className="text-[#ff0066] font-bold tracking-[0.3em] uppercase text-[10px]">{t.about.mission_label}</span>
              </div>
              <h2 className="text-4xl font-black italic uppercase tracking-tight mb-6">{t.about.mission_title}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{t.about.mission_body}</p>
              <motion.div
                whileHover={{ rotate: 45 }}
                className="mt-8 w-12 h-12 rounded-full border border-[#ff0066]/40 flex items-center justify-center group-hover:bg-[#ff0066] group-hover:border-[#ff0066] transition-all cursor-pointer"
              >
                <ArrowUpRight size={18} className="text-[#ff0066] group-hover:text-white transition-colors" />
              </motion.div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="group relative p-px rounded-3xl mt-0 lg:mt-16"
            style={{ background: "linear-gradient(135deg, transparent, #7000ff30)" }}
          >
            <div className="relative bg-[var(--bg)] rounded-3xl p-10 border border-transparent overflow-hidden">
              <div className="absolute top-0 left-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Eye size={100} />
              </div>
              <div className="flex items-center gap-3 mb-6 justify-end">
                <span className="text-[#7000ff] font-bold tracking-[0.3em] uppercase text-[10px]">{t.about.vision_label}</span>
                <div className="w-8 h-px bg-[#7000ff]" />
              </div>
              <h2 className="text-4xl font-black italic uppercase tracking-tight mb-6 text-right">{t.about.vision_title}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed text-right">{t.about.vision_body}</p>
              <div className="flex justify-end mt-8">
                <motion.div
                  whileHover={{ rotate: 45 }}
                  className="w-12 h-12 rounded-full border border-[#7000ff]/40 flex items-center justify-center group-hover:bg-[#7000ff] group-hover:border-[#7000ff] transition-all cursor-pointer"
                >
                  <ArrowUpRight size={18} className="text-[#7000ff] group-hover:text-white transition-colors" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-28 px-6 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <span className="text-[#ff0066] font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">{t.about.team_label}</span>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">{t.about.team_title}</h2>
            </div>
            <p className="max-w-xs text-gray-500 text-sm border-l-2 border-[#ff0066] pl-4 leading-relaxed">{t.about.team_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group"
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    whileHover={{ rotateY: 8, rotateX: 4 }}
                    className="relative h-[480px] rounded-3xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] p-2 transition-all duration-500 group-hover:border-[#ff0066]/30 group-hover:shadow-xl dark:group-hover:shadow-[0_0_40px_rgba(255,0,102,0.08)] overflow-hidden"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Role badge */}
                      <div className="absolute top-5 left-5">
                        <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                          <Icon size={18} className="text-[#ff0066]" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="absolute inset-0 p-7 flex flex-col justify-end">
                        <h3 className="text-2xl font-black italic uppercase tracking-tight mb-1 text-white group-hover:text-[#ff0066] transition-colors leading-tight">
                          {member.name.split(" ").map((word, idx) => (
                            <span key={idx} className={idx >= 1 ? "text-white" : ""}>{word} </span>
                          ))}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">{member.role}</p>

                        <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500">
                          <p className="text-sm text-gray-300 mb-4 leading-relaxed">{member.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {member.skills.map((s) => (
                              <span key={s} className="text-[9px] font-bold bg-white/10 border border-white/15 px-3 py-1 rounded-lg uppercase tracking-wide text-gray-300">
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <Linkedin size={18} className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
                            <Github size={18} className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-28 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#ff0066]/5 dark:bg-[#ff0066]/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#ff0066] font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">{t.about.principles_label}</span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">{t.about.principles_title}</h2>
          </div>

          <div className="relative space-y-0">
            <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-[#ff0066] via-[#7000ff] to-transparent" />
            {t.principles_list.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative pl-16 pb-16 last:pb-0 group"
                >
                  <div className="absolute left-0 w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[#ff0066]/40 flex items-center justify-center z-10 group-hover:bg-[#ff0066] group-hover:border-[#ff0066] transition-all duration-300 shadow-sm">
                    <Icon size={20} className="text-[#ff0066] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tight mb-3 group-hover:text-[#ff0066] transition-colors">{p.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-3xl p-16 text-center relative overflow-hidden border border-black/8 dark:border-white/8 bg-gradient-to-br from-black/[0.02] to-black/[0.04] dark:from-white/[0.02] dark:to-white/[0.04]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff0066]/5 to-[#7000ff]/5 pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 relative z-10">
            {t.about.cta_title}
          </h2>
          <p className="text-gray-500 mb-8 relative z-10">{t.about.cta_sub}</p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative z-10 inline-block">
            <Button asChild className="bg-white dark:bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-xs transition-all shadow-lg">
              <Link href="/contact">{t.about.cta_btn}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
