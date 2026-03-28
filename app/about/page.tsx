"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { 
  Code2, Video, Megaphone, Lightbulb, GraduationCap, 
  Palette, Target, Eye, CheckCircle2, Cpu, Layers, 
  Zap, Linkedin, Github, TrendingUp, MousePointer2, Sparkles,
  ArrowUpRight, Atom, Activity, Terminal
} from "lucide-react";
import Image from "next/image";

// --- High-End UI Components ---

const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 opacity-40"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 0, 102, 0.15), transparent 80%)`
        ),
      }}
    />
  );
};

const SectionHeading = ({ title, subtitle, align = "left" }: { title: string; subtitle: string; align?: "left" | "center" }) => (
  <div className={`mb-20 ${align === "center" ? "text-center flex flex-col items-center" : ""}`}>
    <motion.div
      initial={{ opacity: 0, x: align === "center" ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="w-10 h-[1px] bg-[#ff0066]" />
      <span className="text-[#ff0066] font-black tracking-[0.5em] uppercase text-[10px]">
        {subtitle}
      </span>
      {align === "center" && <div className="w-10 h-[1px] bg-[#ff0066]" />}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9]"
    >
      {title}
    </motion.h2>
  </div>
);

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Hero Parallax Transforms
  const textY = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const hiveRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const hiveScale = useTransform(smoothProgress, [0, 0.3], [1, 1.5]);
  const opacityHero = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-[#010717] text-white overflow-hidden selection:bg-[#ff0066]/30">
      <MouseGlow />
      
      {/* 1. THE PRO MAX HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Layer: Animated Scan Lines & Grids */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
          <motion.div 
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff0066] to-transparent opacity-20 z-10"
          />
        </div>

        {/* Central Neural Hive Visual */}
        <motion.div 
          style={{ rotate: hiveRotate, scale: hiveScale, opacity: opacityHero }}
          className="absolute z-0 w-[800px] h-[800px] pointer-events-none"
        >
          <div className="absolute inset-0 rounded-full border border-[#ff0066]/20 blur-sm" />
          <div className="absolute inset-20 rounded-full border border-[#7000ff]/10" />
          <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0066" />
                <stop offset="100%" stopColor="#200048" />
              </linearGradient>
            </defs>
            <path 
              d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
              fill="none" 
              stroke="url(#grad)" 
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>

        {/* Foreground Kinetic Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center lg:text-left">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              style={{ y: textY, opacity: opacityHero }}
              className="lg:col-span-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
              >
                <Activity size={16} className="text-[#ff0066] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">System Online: 360_HIVE_OS</span>
              </motion.div>

              <h1 className="text-7xl md:text-[10rem] font-black italic uppercase leading-[0.85] tracking-tighter mb-8">
                The <span className="text-outline text-transparent opacity-20">Creative</span> <br />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066] animate-gradient-x">
                  Architects
                </span>
              </h1>

              <div className="flex flex-col md:flex-row items-center lg:items-start gap-8 mt-12">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 border-l-2 border-[#ff0066] bg-white/5 backdrop-blur-sm max-w-sm"
                >
                  <p className="text-gray-400 text-sm leading-relaxed uppercase tracking-widest font-bold">
                    [Status] <span className="text-white">Dismantling barriers between high-end software engineering and avant-garde creative production.</span>
                  </p>
                </motion.div>
                
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#010717] bg-gray-900 overflow-hidden relative">
                       <Image src={`/image/${['dositha', 'nicole', 'fortune'][i-1]}.jpeg`} alt="Team" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-[#010717] bg-[#ff0066] flex items-center justify-center text-[10px] font-bold">
                    +50
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Data Feed Component */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ff0066] animate-pulse" />
                <Terminal className="text-[#ff0066] mb-6" size={32} />
                <div className="space-y-4 font-mono text-[10px] text-gray-500">
                  <p className="text-white">&gt; INITIALIZING_CORE_MISSION...</p>
                  <p>&gt; LOADING_HIVE_ASSETS: 100%</p>
                  <p>&gt; DEPLOYING_STRUCTURED_SOFTWARE...</p>
                  <p>&gt; SYNCING_CREATIVE_SOUL...</p>
                  <p className="text-[#7000ff]">&gt; STATUS: OPTIMIZED</p>
                  <motion.div 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-4 bg-[#ff0066]"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-gray-500">Navigate</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff0066] to-transparent" />
        </motion.div>
      </section>

      {/* 2. MISSION & VISION SECTION (Keeping your Neural Core Design) */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-2 text-center lg:text-left">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              className="relative p-1 bg-[#ff0066]/10 rounded-tr-[10rem] rounded-bl-[10rem] group"
            >
              <div className="relative h-full w-full bg-[#010717] p-16 rounded-tr-[9.8rem] rounded-bl-[9.8rem] border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Target size={120} />
                </div>
                <h4 className="text-[#ff0066] font-black tracking-[0.4em] uppercase text-xs mb-6 flex items-center gap-3">
                  <div className="w-12 h-[2px] bg-[#ff0066]" /> Mission Statement
                </h4>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-8">The Execution</h2>
                <p className="text-2xl text-gray-400 leading-relaxed">
                  Empowering global brands through <span className="text-white font-bold italic">Hyper-Structured Software</span>. We build digital fortresses that solve real-world problems with disruptive creativity.
                </p>
                <motion.div 
                  className="mt-12 w-16 h-16 rounded-full border border-[#ff0066] flex items-center justify-center group-hover:bg-[#ff0066] transition-all"
                  whileHover={{ rotate: 45 }}
                >
                  <ArrowUpRight />
                </motion.div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              className="relative p-1 bg-[#7000ff]/10 rounded-tl-[10rem] rounded-br-[10rem] group mt-20 lg:mt-40"
            >
              <div className="relative h-full w-full bg-[#010717] p-16 rounded-tl-[9.8rem] rounded-br-[9.8rem] border border-white/10 overflow-hidden">
                <div className="absolute top-0 left-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Eye size={120} />
                </div>
                <h4 className="text-[#7000ff] font-black tracking-[0.4em] uppercase text-xs mb-6 flex items-center gap-3">
                  Vision Statement <div className="w-12 h-[2px] bg-[#7000ff]" />
                </h4>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-8">The Destination</h2>
                <p className="text-2xl text-gray-400 leading-relaxed">
                  To become the <span className="text-white font-bold italic">Global Hive-Mind</span>. A future where digital experiences are so seamless they feel like an extension of human consciousness.
                </p>
                <motion.div 
                  className="mt-12 w-16 h-16 rounded-full border border-[#7000ff] flex items-center justify-center group-hover:bg-[#7000ff] transition-all"
                  whileHover={{ rotate: 45 }}
                >
                  <Atom />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE ARCHITECTS SECTION */}
      <section className="py-40 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
             <div>
                <h4 className="text-[#ff0066] font-black tracking-[0.5em] uppercase text-xs mb-4">The Collective</h4>
                <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">Hive Minds</h2>
             </div>
             <p className="max-w-sm text-gray-500 font-bold uppercase tracking-widest text-[10px] border-l border-[#ff0066] pl-6">
               A specialized unit of designers and engineers operating at the edge of possibility.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative"
              >
                <div className="relative h-[700px] w-full perspective-1000">
                  <motion.div 
                    whileHover={{ rotateY: 15, rotateX: 5 }}
                    className="relative h-full w-full rounded-[4rem] border border-white/10 bg-[#010717] p-2 transition-all duration-500 group-hover:border-[#ff0066]/50 group-hover:shadow-[0_0_50px_rgba(255,0,102,0.1)]"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[3.8rem]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#010717] via-[#010717]/40 to-transparent" />
                      <div className="absolute top-8 left-8 flex items-center gap-3">
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-[#ff0066]">
                           {member.icon}
                        </div>
                        <div className="h-[1px] w-20 bg-white/20" />
                      </div>
                      <div className="absolute inset-0 p-12 flex flex-col justify-end">
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-[#ff0066] transition-colors leading-none">
                           {member.name.split(' ').map((word, idx) => (
                              <span key={idx} className={idx >= 1 ? "text-[#ff0066]" : ""}>{word} </span>
                           ))}
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6">{member.role}</p>
                        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500">
                          <p className="text-sm text-gray-400 mb-8 leading-relaxed italic">{member.description}</p>
                          <div className="flex flex-wrap gap-2 mb-8">
                             {member.skills.map((s, idx) => (
                               <span key={idx} className="text-[8px] font-black bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg uppercase">
                                  {s}
                               </span>
                             ))}
                          </div>
                          <div className="flex gap-4">
                             <Linkedin size={20} className="text-gray-600 hover:text-white transition-colors cursor-pointer" />
                             <Github size={20} className="text-gray-600 hover:text-white transition-colors cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRINCIPLES SECTION */}
      <section className="py-40 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#ff0066]/10 blur-[150px] rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading title="The Neural Core" subtitle="Operational Code" align="center" />
          <div className="mt-32 space-y-0 relative">
            <div className="absolute left-[39px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff0066] via-[#7000ff] to-transparent" />
            {[
              { title: "Structured Software", desc: "Code is the skeletal system. We build modular, unshakeable architectures.", icon: Zap },
              { title: "Full Design Intelligence", desc: "Aesthetics serve the user. Every pixel is a calculated strategic move.", icon: Palette },
              { title: "Universal Functionality", desc: "No lag. No crashes. No excuses. Performance at the speed of light.", icon: CheckCircle2 }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-32 pb-32 last:pb-0 group"
              >
                <div className="absolute left-0 w-20 h-20 rounded-[2rem] bg-[#010717] border border-[#ff0066] flex items-center justify-center z-10 group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_30px_rgba(255,0,102,0.3)]">
                  <p.icon size={32} className="text-white -rotate-0 group-hover:-rotate-45 transition-transform" />
                </div>
                <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-[#ff0066] transition-colors">{p.title}</h3>
                <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-40 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-7xl mx-auto p-20 rounded-[5rem] bg-gradient-to-br from-[#200048] via-[#010717] to-[#ff0066]/20 border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#ff0066] opacity-0 group-hover:opacity-[0.02] transition-opacity" />
          <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-12">
            Initialize <br />
            <span className="text-[#ff0066]">Connection</span>
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-20 h-24 rounded-3xl bg-white text-black font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-white/10 hover:bg-[#ff0066] hover:text-white transition-all"
          >
            Enter The Collective
          </motion.button>
          <div className="mt-16 flex items-center justify-center gap-6">
             <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#010717] bg-gray-800" />
                ))}
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                Join <span className="text-white">50+ Rebels</span> In Orbit
             </p>
          </div>
        </motion.div>
      </section>
      
      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </main>
  );
}

const teamMembers = [
  {
    name: "IGIRIMPUHWE Dositha",
    role: "CEO & Fullstack Developer",
    image: "/image/dositha.jpeg",
    description: "The systems architect. Bridging the gap between cold logic and organic creativity.",
    skills: ["Architecture", "Next.js", "Fullstack"],
    icon: <Cpu size={24} />,
  },
  {
    name: "RIRASIRABOSE Aime Nicole",
    role: "Managing Director & Graphic Designer",
    image: "/image/nicole.jpeg",
    description: "Orchestrating the Hive. Defining the visual and operational soul of the brand.",
    skills: ["Operations", "Identity", "Design"],
    icon: <Palette size={24} />,
  },
  {
    name: "UMUBYEYI Fortune",
    role: "Sales & Graphic Designer",
    image: "/image/fortune.jpeg",
    description: "The connection engine. Merging market strategy with visual storytelling.",
    skills: ["Strategy", "UI/UX", "Branding"],
    icon: <TrendingUp size={24} />,
  }
];