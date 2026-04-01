"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Code2, Video, Megaphone, Lightbulb, GraduationCap, Palette, 
  Cpu, Zap, Layers, Monitor, ArrowRight 
} from "lucide-react";

const MAGENTA = "#d4006e";

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
        className="flex items-center gap-3 px-10 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white rounded-full"
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

/* ─── Signature Magenta Dot ─────────────────────── */
const Dot = () => (
  <div className="absolute top-8 left-8 flex items-center justify-center">
    <div className="w-1.5 h-1.5 rounded-full bg-[#d4006e] shadow-[0_0_12px_#d4006e] z-10" />
    <motion.div 
      animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute w-5 h-5 rounded-full bg-[#d4006e]/40" 
    />
  </div>
);

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smooth, [0, 0.15], [1, 0]);

  return (
    <main ref={containerRef} className="relative text-white overflow-x-hidden" style={{ background: "#070010" }}>
      
      {/* ══ PERSISTENT BACKGROUND CANVAS (From About Page) ══ */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.07, 1], opacity: [0.52, 0.72, 0.52] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "-15%", left: "38%", width: 920, height: 920, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,0,100,0.52) 0%, rgba(120,0,180,0.28) 42%, transparent 70%)",
            filter: "blur(72px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.11, 1], opacity: [0.20, 0.33, 0.20] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            position: "absolute", bottom: "8%", left: "-10%", width: 640, height: 640, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,0,200,0.44) 0%, transparent 70%)",
            filter: "blur(88px)",
          }}
        />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.013) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.013) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10">
        
        {/* ── HERO SECTION ── */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="flex gap-6 mb-12 text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4006e]"
          >
            <span>360 Hive by Queen</span>
            <span className="opacity-20">•</span>
            <span>Digital evolution</span>
          </motion.div>

          <motion.h1 
            style={{ opacity: heroOpacity }}
            className="text-5xl md:text-[8.5vw] font-black tracking-tighter leading-[0.85] italic mb-10"
          >
            The full-stack <br /> 
            <span className="text-white/95">digital machine</span>
          </motion.h1>

          <motion.p className="text-base md:text-xl text-white/30 font-medium max-w-2xl mx-auto leading-relaxed mb-16">
            Designing websites, applications, and cinematic media to provide end-to-end digital execution for modern brands.
          </motion.p>

          <GlowButton href="/quote">Get started now</GlowButton>
        </section>

        {/* ── SECTION 01: ENGINEERING (Bento Layout) ── */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter italic mb-6">Engineering</h2>
            <p className="text-white/20 text-[11px] font-bold tracking-[0.3em] uppercase max-w-md mx-auto">Designing websites, applications, and searchable databases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { t: "Software development", b: "Customizing software solutions and high-performance databases to meet user needs.", i: Code2 },
              { t: "Graphic design", b: "Designing visual content for branding, marketing, and communication materials.", i: Palette },
              { t: "Technical consulting", b: "Offering technical consulting services to solve complex growth challenges.", i: Lightbulb }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.05)" }}
                className="group relative p-12 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl min-h-[320px] transition-all duration-500 shadow-2xl"
              >
                <Dot />
                <card.i className="mt-12 mb-5 text-[#d4006e]" size={36} />
                <h4 className="text-[18px] font-bold text-white mb-2 italic">{card.t}</h4>
                <p className="text-[14px] font-medium text-white/40 leading-relaxed">{card.b}</p>
              </motion.div>
            ))}
            
            <motion.div 
              whileHover={{ y: -10, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.06)" }}
              className="lg:col-span-3 relative p-16 rounded-[3.5rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 backdrop-blur-2xl min-h-[220px] flex items-center transition-all duration-500"
            >
              <Dot />
              <div className="w-18 h-18 rounded-2xl bg-white/5 flex items-center justify-center mr-10 shrink-0">
                 <Monitor className="text-[#d4006e]" size={36} />
              </div>
              <h4 className="text-xl md:text-3xl font-black text-white leading-[1.1] max-w-3xl mt-2 tracking-tight italic">
                Managing and operating web platforms and searchable online systems for global efficiency.
              </h4>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 02: EXPRESSION (Tall first/last cards) ── */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter italic mb-6">Expression</h2>
            <p className="text-white/20 text-[11px] font-bold tracking-[0.3em] uppercase max-w-md mx-auto">Video production and promotional advertising.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end mb-24">
            {/* Tall Card 1 */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative p-12 rounded-[3.5rem] bg-[#d4006e] border border-white/20 h-[540px] flex flex-col justify-end overflow-hidden shadow-[0_30px_70px_-10px_rgba(212,0,110,0.4)] transition-all duration-500"
            >
               <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_15px_#fff] z-10" />
               <div className="absolute top-10 right-[-15%] w-96 h-96 bg-white/10 blur-[120px] rounded-full" />
               <Video className="relative mb-6 text-white opacity-90" size={48} />
               <h3 className="relative text-[20px] font-bold italic text-white mb-2 leading-tight">Media production</h3>
               <p className="relative text-[14px] font-medium leading-relaxed text-white/90">Video post-production including editing, subtitles, graphics, and animation.</p>
            </motion.div>
            
            {/* Short Middle 1 */}
            <motion.div whileHover={{ y: -15, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.3)" }} className="relative p-12 rounded-[2.8rem] bg-white/[0.04] border border-white/5 h-[380px] flex flex-col justify-end transition-all duration-500 group">
               <Dot />
               <Megaphone className="mb-5 text-[#d4006e]" size={32} />
               <h4 className="text-white font-bold mb-3 italic text-[18px]">Marketing & advertising</h4>
               <p className="text-[13px] font-medium text-white/40 leading-relaxed">Running campaigns (videograph) and advertising to attract global customers.</p>
            </motion.div>

            {/* Short Middle 2 */}
            <motion.div whileHover={{ y: -15, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.3)" }} className="relative p-12 rounded-[2.8rem] bg-white/[0.04] border border-white/5 h-[380px] flex flex-col justify-end transition-all duration-500 group">
               <Dot />
               <GraduationCap className="mb-5 text-[#d4006e]" size={32} />
               <h4 className="text-white font-bold mb-3 italic text-[18px]">Education & training</h4>
               <p className="text-[13px] font-medium text-white/40 leading-relaxed">Educational services, digital learning platforms, and professional upskilling.</p>
            </motion.div>

            {/* Tall Card 4 */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -5, backgroundColor: "rgba(212,0,110,0.15)", borderColor: "#d4006e" }}
              className="relative p-12 rounded-[3.5rem] bg-white/[0.03] border border-white/5 h-[540px] flex flex-col justify-end overflow-hidden transition-all duration-500 shadow-2xl"
            >
               <Dot />
               <Layers className="relative mb-6 text-[#d4006e]" size={42} />
               <h3 className="relative text-[20px] font-bold italic text-white mb-2 leading-tight">360 Hive ecosystem</h3>
               <p className="relative text-[14px] font-medium leading-relaxed text-white/60">Integrating technology and storytelling into one professional branding machine.</p>
            </motion.div>
          </div>
        </section>

        {/* ── PRINCIPLES SECTION ── */}
        <section className="py-24 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
             <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 leading-tight">Principles <br/>of hive</h2>
             <p className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase">The foundation of quality.</p>
          </div>
          <div className="lg:w-2/3 space-y-4 w-full">
            {[
              { t: "Structure of software", b: "Architecting logical and highly scalable foundations for every platform.", i: Cpu },
              { t: "Full design", b: "Achieving visual excellence and consistent brand identity across all media.", i: Palette },
              { t: "Full functionality", b: "Delivering engineering features that work flawlessly to solve real impact.", i: Zap }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 18, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.2)" }}
                className="flex items-center gap-10 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 transition-all duration-300 cursor-default"
              >
                <p.i size={28} className="text-[#d4006e]" />
                <div className="space-y-1">
                  <h4 className="text-[18px] font-bold italic text-white/90">{p.t}</h4>
                  <p className="text-[14px] font-medium text-white/40 leading-relaxed">{p.b}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-40 px-6 text-center">
           <GlowButton href="/quote">Get started now</GlowButton>
        </section>

      </div>
      
   
      <div className="h-3 w-full bg-gradient-to-r from-transparent via-[#d4006e] to-transparent opacity-40" />
    </main>
  );
}