"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Code2, Video, Megaphone, Lightbulb, GraduationCap, 
  Palette, Target, Eye, CheckCircle2, Cpu, Layers, 
  Zap, Linkedin, Github, TrendingUp, MousePointer2, Sparkles
} from "lucide-react";
import Image from "next/image";

// --- Reusable UI Elements ---

const Glow = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full mix-blend-screen filter blur-[120px] opacity-30 pointer-events-none ${className}`} />
);

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-20">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="w-10 h-[1px] bg-[#ff0066]" />
      <span className="text-[#ff0066] font-bold tracking-[0.4em] uppercase text-xs">
        {subtitle}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none"
    >
      {title}
    </motion.h2>
  </div>
);

// --- Data ---

const teamMembers = [
  {
    name: "IGIRIMPUHWE Dositha",
    role: "CEO & Fullstack Developer",
    image: "/image/dositha.jpeg",
    description: "The architect behind the Hive's technical foundation. Dositha bridges the gap between complex logic and visionary leadership.",
    skills: ["System Architecture", "Next.js", "Fullstack Engineering"],
    icon: <Cpu size={20} />,
  },
  {
    name: "RIRASIRABOSE Aime Nicole",
    role: "Managing Director & Graphic Designer",
    image: "/image/nicole.jpeg",
    description: "Orchestrating the Hive's operations while defining its visual DNA. Nicole ensures every project meets the gold standard of creativity.",
    skills: ["Operations", "Visual Identity", "Brand Design"],
    icon: <Palette size={20} />,
  },
  {
    name: "NIYOMUBYEYI Fortune",
    role: "Sales & Graphic Designer",
    image: "/image/fortune.jpeg",
    description: "Merging business growth with aesthetic precision. Fortune connects our innovative solutions to the world through design and strategy.",
    skills: ["Growth Strategy", "UI/UX", "Business Design"],
    icon: <TrendingUp size={20} />,
  }
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-[#010717] text-white overflow-x-hidden selection:bg-[#ff0066]/30">
      
      {/* 1. IMMERSIVE HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 pointer-events-none">
          <Glow className="top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#ff0066]" />
          <Glow className="bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#200048]" />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="max-w-6xl mx-auto text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff0066]/30 bg-[#ff0066]/10 text-[#ff0066] text-[10px] font-black uppercase tracking-[0.4em] mb-10">
              <Sparkles size={14} /> Established Excellence
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] mb-12">
              The Hive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066] animate-gradient-x">Universe</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
              At 360 Hive by Queen, we dismantle the barriers between high-end software engineering and avant-garde creative production.
            </p>
          </motion.div>
        </motion.div>

        {/* Floating Background 3D Icons */}
        <motion.div style={{ y: y1 }} className="absolute top-1/4 right-[8%] opacity-20 hidden lg:block">
          <Cpu size={180} className="text-[#ff0066] rotate-12" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 left-[8%] opacity-20 hidden lg:block">
          <Layers size={150} className="text-[#7000ff] -rotate-12" />
        </motion.div>
      </section>

      {/* 2. THE TEAM (THE ARCHITECTS) */}
      <section className="py-32 px-6 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <SectionHeading title="The Hive Minds" subtitle="Leadership" />
            <p className="text-gray-500 font-medium max-w-xs text-right hidden md:block border-r-2 border-[#ff0066] pr-6">
              The creative rebels and technical architects driving the 360 vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="group relative"
              >
                {/* Profile Card */}
                <div className="relative h-[600px] w-full rounded-[3.5rem] overflow-hidden bg-white/5 border border-white/10 group-hover:border-[#ff0066]/50 transition-all duration-700 ease-out">
                  
                  {/* Team Photo */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                  />
                  
                  {/* Dark Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010717] via-[#010717]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category Icon Badge */}
                  <div className="absolute top-8 left-8 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-[#ff0066] group-hover:border-[#ff0066] transition-all duration-500">
                    {member.icon}
                  </div>

                  {/* Member Content */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-3xl font-black uppercase italic leading-[0.95] tracking-tighter mb-3">
                        {member.name.split(' ').map((word, idx) => (
                          <span key={idx} className={idx >= 1 ? "text-[#ff0066]" : ""}>{word} </span>
                        ))}
                      </h3>
                      <p className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                        {member.role}
                      </p>
                    </div>

                    {/* Hover Detail Expansion */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        {member.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {member.skills.map((skill, idx) => (
                          <span key={idx} className="text-[9px] font-black tracking-widest uppercase px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <button className="w-12 h-12 rounded-xl bg-white/10 hover:bg-[#ff0066] transition-colors flex items-center justify-center">
                          <Linkedin size={18} />
                        </button>
                        <button className="w-12 h-12 rounded-xl bg-white/10 hover:bg-[#ff0066] transition-colors flex items-center justify-center">
                          <Github size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Glow Bar */}
                  <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-[#ff0066] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (CARDS) */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {[
              { 
                title: "The Mission", 
                text: "Empowering global brands through structured tech and high-end design intelligence.",
                icon: Target,
                bg: "bg-[#ff0066]/5"
              },
              { 
                title: "The Vision", 
                text: "Creating a future where digital experiences are indistinguishable from magic.",
                icon: Eye,
                bg: "bg-[#7000ff]/5"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-12 rounded-[3.5rem] border border-white/5 ${item.bg} backdrop-blur-3xl group`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff0066] mb-8 group-hover:bg-[#ff0066] group-hover:text-white transition-all">
                  <item.icon size={32} />
                </div>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-6">{item.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRINCIPLES (TIMELINE) */}
      <section className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Our Core Values" subtitle="Principles" />
          
          <div className="space-y-0 relative">
            <div className="absolute left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-[#ff0066] via-[#7000ff] to-transparent" />
            
            {[
              { title: "Structured Software", desc: "Architecture first. We build modular codebases that are scalable, documented, and secure.", icon: Zap },
              { title: "Full Design Approach", desc: "Design is intelligence made visible. Every pixel serves a purpose in the user journey.", icon: Palette },
              { title: "Full Functionality", desc: "Cross-platform performance with zero compromises on speed or accessibility.", icon: CheckCircle2 }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-24 pb-24 last:pb-0 group"
              >
                <div className="absolute left-0 w-16 h-16 rounded-full bg-[#010717] border-2 border-[#ff0066] flex items-center justify-center z-10 shadow-[0_0_30px_rgba(255,0,102,0.3)] group-hover:scale-110 transition-transform">
                  <p.icon size={28} className="text-white" />
                </div>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-[#ff0066] transition-colors">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HIRING CTA */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-16 rounded-[4rem] bg-gradient-to-br from-[#200048] to-[#010717] border border-white/5 text-center relative overflow-hidden group"
          >
             <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-10">
               Join the <span className="text-[#ff0066]">Hive</span>
             </h2>
             <p className="text-gray-400 text-lg max-w-xl mx-auto mb-12">
               We are constantly seeking brilliant engineers and creative rebels to expand our collective intelligence.
             </p>
             <button className="px-12 h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-[#ff0066] hover:text-white transition-all">
               View Openings
             </button>
             
             <div className="mt-12 flex items-center gap-4 justify-center text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff0066] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff0066]"></span>
                </span>
                Hiring Now
                <MousePointer2 size={14} className="text-[#ff0066]" />
             </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}