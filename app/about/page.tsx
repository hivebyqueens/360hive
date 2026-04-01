"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, Palette, TrendingUp, Target, Eye, Zap, CheckCircle2, Linkedin, Github, ArrowRight, ArrowUpRight } from "lucide-react";
import { useApp } from "@/lib/i18n-context";


function GlowButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        boxShadow: [
          "0 0 22px rgba(212,0,110,0.38)",
          "0 0 42px rgba(212,0,110,0.65)",
          "0 0 22px rgba(212,0,110,0.38)",
        ],
      }}
      transition={{ boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
      style={{ borderRadius: 999, display: "inline-block" }}
    >
      <Link
        href={href}
        className="flex items-center gap-3 px-9 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white rounded-full"
        style={{
          background: "linear-gradient(135deg, #d4006e 0%, #8c00c8 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 0 1px rgba(255,100,180,0.25)",
        }}
      >
        {children}
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

const teamMembers = [
  {
    name: "IGIRIMPUHWE Dositha",
    role: "CEO & Fullstack Developer",
    image: "/image/dositha.jpeg",
    description: "The systems architect. Bridging the gap between logic and creativity.",
    skills: [" System Architecture", "Next.js", "Fullstack"],
    icon: Cpu,
    glow: "rgba(212,0,110,0.28)",
    border: "rgba(212,0,110,0.30)",
  },
  {
    name: "RIRASIRABOSE Aime Nicole",
    role: "Managing Director & Graphic Designer",
    image: "/image/nicole.jpeg",
    description: "Orchestrating the Hive. Defining the visual and operational soul of the brand.",
    skills: ["Operations", "Digital Marketing", "Design"],
    icon: Palette,
    glow: "rgba(140,0,200,0.28)",
    border: "rgba(140,0,200,0.30)",
  },
  {
    name: "UMUBYEYI Fortune",
    role: "Sales & Graphic Designer",
    image: "/image/fortune.jpeg",
    description: "The connection engine. Merging market strategy with visual storytelling.",
    skills: ["Documentation", "UI/UX", "Branding"],
    icon: TrendingUp,
    glow: "rgba(212,0,110,0.28)",
    border: "rgba(212,0,110,0.30)",
  },
];

const principleIcons = [Zap, Palette, CheckCircle2];

export default function AboutPage() {
  const { t } = useApp();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smooth, [0, 0.2], [0, -55]);
  const heroOpacity = useTransform(smooth, [0, 0.18], [1, 0]);

  return (
    <main
      ref={containerRef}
      className="relative text-white overflow-x-hidden"
      style={{ background: "#070010" }}
    >

      
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      
        <motion.div
          animate={{ scale: [1, 1.07, 1], opacity: [0.52, 0.72, 0.52] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "-15%", left: "38%",
            width: 920, height: 920, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,0,100,0.52) 0%, rgba(120,0,180,0.28) 42%, transparent 70%)",
            filter: "blur(72px)",
          }}
        />
       
        <motion.div
          animate={{ scale: [1, 1.11, 1], opacity: [0.20, 0.33, 0.20] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            position: "absolute", bottom: "8%", left: "-10%",
            width: 640, height: 640, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,0,200,0.44) 0%, transparent 70%)",
            filter: "blur(88px)",
          }}
        />
       
        <motion.div
          animate={{ scale: [1, 1.09, 1], opacity: [0.14, 0.24, 0.14] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 7 }}
          style={{
            position: "absolute", top: "42%", right: "-8%",
            width: 520, height: 520, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,0,110,0.30) 0%, transparent 70%)",
            filter: "blur(82px)",
          }}
        />
    
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.013) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.013) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>


      <section className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-14 items-center">

          
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="lg:col-span-7 flex flex-col gap-7">

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="self-start flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4006e] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "rgba(255,255,255,0.48)" }}>
                  {t.about.badge}
                </span>
              </motion.div>

         
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.09 }}
                className="text-5xl md:text-6xl lg:text-[72px] font-black italic tracking-tighter leading-[0.88]"
              >
                {t.about.hero1} <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#ff4da6,#cc00ff,#ff4da6)",
                    backgroundSize: "200% auto",
                    animation: "shimmer 4s linear infinite",
                  }}
                >
                  {t.about.hero2}
                </span>
              </motion.h1>

             
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="pl-5 max-w-lg"
                style={{ borderLeft: "2px solid #d4006e" }}
              >
                <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                  {t.about.hero_desc}
                </p>
              </motion.div>

              {/* avatars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.34 }}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {teamMembers.map((m) => (
                    <div key={m.name} className="w-11 h-11 rounded-full overflow-hidden relative bg-gray-800"
                      style={{ border: "2px solid #070010" }}>
                      <Image src={m.image} alt={m.name} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                  ))}
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: "linear-gradient(135deg,#d4006e,#7000cc)", border: "2px solid #070010" }}>
                    +50
                  </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>
                  {t.home.team_label}
                </p>
              </motion.div>
            </motion.div>

            {/* Right — floating terminal */}
            <motion.div
              initial={{ opacity: 0, x: 45, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.16, duration: 0.65, ease: "easeOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 80px rgba(212,0,110,0.22)" }}
              className="lg:col-span-5 hidden lg:block relative"
              style={{
                background: "rgba(255,255,255,0.028)",
                border: "1px solid rgba(212,0,110,0.22)",
                backdropFilter: "blur(22px)",
                borderRadius: 28,
                padding: 28,
                boxShadow: "0 0 55px rgba(212,0,110,0.10), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
                transition: "all 0.4s ease",
              }}
            >
              {/* top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                style={{ background: "linear-gradient(to right,#d4006e,#8c00c8,rgba(255,255,255,0))" }} />

              <div className="flex gap-2 mb-6">
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,95,87,0.7)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,189,46,0.7)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(39,201,63,0.7)" }} />
              </div>

              <div className="space-y-3 font-mono text-[12px]" style={{ color: "rgba(255,255,255,0.42)" }}>
                <p className="text-white font-bold">$ load mission.json</p>
                <p>✓ Values: <span className="text-green-400">excellence</span></p>
                <p>✓ Focus: <span style={{ color: "#ff66b3" }}>Africa & beyond</span></p>
                <p>✓ Team size: <span style={{ color: "#b066ff" }}>growing</span></p>
                <p>✓ Projects: <span className="text-green-400">50+ delivered</span></p>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-4 ml-1 align-middle"
                  style={{ background: "#d4006e" }}
                />
              </div>

              {/* stats */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { val: "50+", label: "Projects" },
                  { val: "3+",  label: "Years" },
                  { val: "100%",label: "Committed" },
                  { val: "6",   label: "Services" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.42 + i * 0.07 }}
                    className="p-3 rounded-2xl text-center"
                    style={{
                      background: "rgba(212,0,110,0.07)",
                      border: "1px solid rgba(212,0,110,0.18)",
                    }}
                  >
                    <p className="text-xl font-black text-white">{s.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: "rgba(255,255,255,0.32)" }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.32 }}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.38)" }}>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#d4006e] to-transparent" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  MISSION & VISION  — floating staggered      */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 70px rgba(212,0,110,0.26)" }}
            className="group relative p-10 rounded-3xl overflow-hidden cursor-default"
            style={{
              background: "rgba(212,0,110,0.055)",
              border: "1px solid rgba(212,0,110,0.22)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(212,0,110,0.09), 0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
              transition: "all 0.4s ease",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(to right,#d4006e,rgba(212,0,110,0))" }} />
            {/* ghost icon */}
            <div className="absolute top-5 right-5 pointer-events-none"
              style={{ opacity: 0.04 }}>
              <Target size={120} />
            </div>

            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-px" style={{ background: "#d4006e" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.42em]" style={{ color: "#d4006e" }}>
                {t.about.mission_label}
              </span>
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tight mb-5 text-white">
              {t.about.mission_title}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
              {t.about.mission_body}
            </p>
            <motion.div
              whileHover={{ rotate: 45, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-8 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
              style={{ border: "1px solid rgba(212,0,110,0.38)" }}
            >
              <ArrowUpRight size={17} style={{ color: "#d4006e" }} />
            </motion.div>
          </motion.div>

          {/* Vision — offset */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 70px rgba(140,0,200,0.26)" }}
            className="group relative p-10 rounded-3xl overflow-hidden cursor-default lg:mt-20"
            style={{
              background: "rgba(140,0,200,0.055)",
              border: "1px solid rgba(140,0,200,0.22)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px rgba(140,0,200,0.09), 0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
              transition: "all 0.4s ease",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(to left,#8c00c8,rgba(140,0,200,0))" }} />
            <div className="absolute top-5 left-5 pointer-events-none" style={{ opacity: 0.04 }}>
              <Eye size={120} />
            </div>

            <div className="flex items-center gap-3 mb-7 justify-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.42em]" style={{ color: "#b066ff" }}>
                {t.about.vision_label}
              </span>
              <div className="w-8 h-px" style={{ background: "#8c00c8" }} />
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tight mb-5 text-white text-right">
              {t.about.vision_title}
            </h2>
            <p className="text-lg leading-relaxed text-right" style={{ color: "rgba(255,255,255,0.48)" }}>
              {t.about.vision_body}
            </p>
            <div className="flex justify-end mt-8">
              <motion.div
                whileHover={{ rotate: 45, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
                style={{ border: "1px solid rgba(140,0,200,0.38)" }}
              >
                <ArrowUpRight size={17} style={{ color: "#b066ff" }} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  TEAM  — floating photo-glass cards          */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 z-10">
        {/* section bloom */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ background: "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(100,0,180,0.09) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* heading row */}
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.42em] mb-3 block" style={{ color: "#d4006e" }}>
                {t.about.team_label}
              </span>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                {t.about.team_title}
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-xs text-sm leading-relaxed pl-4"
              style={{ color: "rgba(255,255,255,0.36)", borderLeft: "2px solid #d4006e" }}
            >
              {t.about.team_sub}
            </motion.p>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.13 }}
                  whileHover={{ scale: 1.04, boxShadow: `0 0 70px ${member.glow}, 0 25px 60px rgba(0,0,0,0.5)` }}
                  className="group relative h-[500px] rounded-3xl overflow-hidden cursor-default"
                  style={{
                    border: `1px solid ${member.border}`,
                    backdropFilter: "blur(4px)",
                    boxShadow: `0 0 30px ${member.glow.replace("0.28", "0.10")}, 0 15px 40px rgba(0,0,0,0.4)`,
                    transition: "all 0.45s ease",
                  }}
                >
                  {/* photo layer */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />

                  {/* gradient overlay — let photo bleed through */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(7,0,16,0.94) 0%, rgba(7,0,16,0.50) 45%, rgba(7,0,16,0.10) 100%)" }} />

                  {/* top gradient bar */}
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(to right, ${member.border.replace("0.30","0.8")}, transparent)` }} />

                  {/* icon badge */}
                  <div className="absolute top-5 left-5">
                    <div className="p-2.5 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.13)",
                        backdropFilter: "blur(14px)",
                      }}
                    >
                      <Icon size={17} style={{ color: "#d4006e" }} />
                    </div>
                  </div>

                  {/* bottom info */}
                  <div className="absolute inset-0 p-7 flex flex-col justify-end">
                    <h3 className="text-xl font-black italic uppercase tracking-tight mb-1 text-white group-hover:text-[#ff66b3] transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4"
                      style={{ color: "rgba(255,255,255,0.42)" }}>
                      {member.role}
                    </p>

                    {/* reveal */}
                    <div className="overflow-hidden max-h-0 group-hover:max-h-44 transition-all duration-500">
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>
                        {member.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.skills.map((s) => (
                          <span key={s}
                            className="text-[9px] font-bold px-3 py-1 rounded-lg uppercase tracking-wide"
                            style={{
                              background: "rgba(212,0,110,0.14)",
                              border: "1px solid rgba(212,0,110,0.28)",
                              color: "rgba(255,255,255,0.72)",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Linkedin size={16} style={{ color: "rgba(255,255,255,0.38)", cursor: "pointer" }} />
                        <Github   size={16} style={{ color: "rgba(255,255,255,0.38)", cursor: "pointer" }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ */}
      {/*  PRINCIPLES  — glowing vertical timeline     */}
      {/* ════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 z-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,0,110,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-18"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.42em] mb-3 block" style={{ color: "#d4006e" }}>
              {t.about.principles_label}
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-16">
              {t.about.principles_title}
            </h2>
          </motion.div>

          <div className="relative pl-14">
            {/* vertical glow line */}
            <div
              className="absolute left-[22px] top-3 bottom-3 w-px"
              style={{ background: "linear-gradient(to bottom, #d4006e 0%, #8c00c8 55%, rgba(140,0,200,0) 100%)" }}
            />

            {t.principles_list.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 }}
                  className="group relative pb-14 last:pb-0"
                >
                  {/* node */}
                  <motion.div
                    whileHover={{ scale: 1.18 }}
                    className="absolute left-[-50px] w-11 h-11 rounded-2xl flex items-center justify-center cursor-default"
                    style={{
                      background: "rgba(212,0,110,0.09)",
                      border: "1px solid rgba(212,0,110,0.32)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 0 20px rgba(212,0,110,0.15)",
                      transition: "all 0.35s ease",
                    }}
                  >
                    <Icon size={19} style={{ color: "#d4006e" }} />
                  </motion.div>

                  {/* floating glass card */}
                  <motion.div
                    whileHover={{ x: 8, scale: 1.02, boxShadow: "0 0 55px rgba(212,0,110,0.16)" }}
                    className="p-8 rounded-2xl cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.022)",
                      border: "1px solid rgba(212,0,110,0.13)",
                      backdropFilter: "blur(16px)",
                      boxShadow: "0 0 25px rgba(212,0,110,0.06), 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                      transition: "all 0.35s ease",
                    }}
                  >
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight mb-3 text-white group-hover:text-[#ff66b3] transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.46)" }}>
                      {p.desc}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      <section className="relative py-28 px-6 z-10 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 58% 55% at 50% 50%, rgba(212,0,110,0.13) 0%, rgba(100,0,200,0.08) 48%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 90px rgba(212,0,110,0.22)" }}
            className="relative p-14 rounded-3xl overflow-hidden cursor-default"
            style={{
              background: "rgba(212,0,110,0.048)",
              border: "1px solid rgba(212,0,110,0.20)",
              backdropFilter: "blur(22px)",
              boxShadow: "0 0 70px rgba(212,0,110,0.10), 0 25px 60px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)",
              transition: "all 0.45s ease",
            }}
          >
            {/* gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
              style={{ background: "linear-gradient(to right, transparent, #d4006e, #8c00c8, transparent)" }} />
            {/* inner ambient */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(212,0,110,0.09) 0%, transparent 70%)" }} />

            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-white relative z-10">
              {t.about.cta_title}
            </h2>
            <p className="mb-10 text-lg max-w-md mx-auto relative z-10" style={{ color: "rgba(255,255,255,0.44)" }}>
              {t.about.cta_sub}
            </p>
            <div className="relative z-10">
              <GlowButton href="/contact">{t.about.cta_btn}</GlowButton>
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
