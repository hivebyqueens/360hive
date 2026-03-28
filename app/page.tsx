"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  Code2, Video, Megaphone, Lightbulb, GraduationCap, 
  Palette, ArrowRight, CheckCircle2, Cpu, Zap, 
  Activity, Terminal, Sparkles, Globe, MousePointer2,
  ChevronRight,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Hero Parallax
  const heroTextY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const hiveScale = useTransform(smoothProgress, [0, 0.3], [1, 1.2]);
  const opacityHero = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-[#010717] text-white selection:bg-[#ff0066]/30 overflow-x-hidden font-jakarta">
      <MouseGlow />
      
      {/* 1. THE PRO MAX HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Layer: Animated Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
          <motion.div 
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff0066] to-transparent opacity-20 z-10"
          />
        </div>

        {/* Central Neural Visual */}
        <motion.div 
          style={{ scale: hiveScale, opacity: opacityHero }}
          className="absolute z-0 w-[900px] h-[900px] pointer-events-none opacity-20"
        >
          <svg className="w-full h-full animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="#ff0066" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#7000ff" strokeWidth="0.1" strokeDasharray="2 2" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              style={{ y: heroTextY, opacity: opacityHero }}
              className="lg:col-span-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-8 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
              >
                <Activity size={16} className="text-[#ff0066] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 font-sora">System_Online: 360_HIVE_OS</span>
              </motion.div>

              <h1 className="text-7xl md:text-[10rem] font-black italic uppercase leading-[0.8] tracking-tighter mb-10 font-space">
                Architecting <br />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066] animate-gradient-x">
                  The Future
                </span>
              </h1>

              <div className="flex flex-col md:flex-row items-center lg:items-start gap-10">
                <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed font-medium">
                  We dismantle the barriers between high-end software engineering and avant-garde creative production.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-[#ff0066] hover:bg-[#ff0066]/90 rounded-2xl px-8 h-16 text-[11px] font-black uppercase tracking-widest font-space group shadow-[0_10px_30px_rgba(255,0,102,0.3)]">
                    Get Started <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 rounded-2xl px-8 h-16 text-[11px] font-black uppercase tracking-widest font-space">
                    View Work
                  </Button>
                </div>
              </div>

              {/* Founder Avatars - Humanizing the tech */}
              <div className="mt-16 flex items-center gap-4">
                 <div className="flex -space-x-3">
                    {['dositha', 'nicole', 'fortune'].map((name) => (
                      <div key={name} className="w-12 h-12 rounded-full border-2 border-[#010717] bg-gray-900 overflow-hidden relative">
                         <Image src={`/image/${name}.jpeg`} alt={name} fill className="object-cover grayscale hover:grayscale-0 transition-all cursor-crosshair" />
                      </div>
                    ))}
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">The Architects behind the hive</p>
              </div>
            </motion.div>

            {/* Right Side: Data Feed Component */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ff0066] animate-pulse" />
                <Terminal className="text-[#ff0066] mb-6" size={32} />
                <div className="space-y-4 font-mono text-[10px] text-gray-500 uppercase tracking-tighter">
                  <p className="text-white">&gt; INITIALIZING_CORE_MISSION...</p>
                  <p>&gt; LOADING_STRUCTURED_SOFTWARE...</p>
                  <p>&gt; SYNCING_CREATIVE_DNA...</p>
                  <p>&gt; ACTIVE_CLIENTS: 50+</p>
                  <p className="text-[#7000ff]">&gt; STATUS: PERFORMANCE_OPTIMIZED</p>
                  <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-[#ff0066]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-xl">
              <span className="text-[#ff0066] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block font-space">The Ecosystem</span>
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter font-space">Our Core Services</h2>
            </div>
            <p className="text-gray-500 max-w-xs text-right font-medium text-sm leading-relaxed">Comprehensive digital solutions across software, media, and growth.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRINCIPLES SECTION */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[#ff0066] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block font-space">Our DNA</span>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-16 font-space leading-none">The 360 Approach</h2>
            <div className="space-y-12">
              {principles.map((p, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="flex gap-8 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-[2rem] bg-gradient-to-br from-[#ff0066] to-[#200048] flex items-center justify-center text-2xl font-black italic font-space shadow-[0_10px_20px_rgba(255,0,102,0.2)] group-hover:scale-110 transition-transform">
                    0{i+1}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black italic uppercase font-space mb-2 group-hover:text-[#ff0066] transition-colors">{p.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-medium">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff0066] to-[#200048] rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="relative rounded-[3.5rem] overflow-hidden border border-white/10 aspect-[4/5] md:aspect-auto md:h-[700px]">
              <Image src="/team-working.jpg" alt="Innovation" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-40 px-6 relative text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ff0066]/10 blur-[150px] rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-[8rem] font-black italic uppercase tracking-tighter leading-none mb-12 font-space">
            Ready to <br />
            <span className="text-[#ff0066]">Initialize?</span>
          </h2>
          <Button size="lg" className="bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-2xl px-16 h-20 text-xs font-black uppercase tracking-[0.3em] font-space transition-all shadow-2xl shadow-white/5 group">
            Connect Now <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-24 pb-12 px-6 border-t border-white/5 bg-[#010717]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <h3 className="text-3xl font-black uppercase italic mb-8 tracking-tighter font-space">360 Hive</h3>
              <p className="text-gray-500 max-w-sm mb-10 leading-relaxed font-medium">
                Elevating global brands through the intersection of high-end software architecture and creative mastery.
              </p>
              <div className="flex gap-4">
                {['TW', 'IG', 'LI', 'FB'].map(s => (
                  <Link key={s} href="#" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-[10px] font-black hover:bg-[#ff0066] hover:border-[#ff0066] transition-all">
                    {s}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-gray-400 font-space">Ecosystem</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li>Software Development</li>
                <li>Content Production</li>
                <li>Strategic Marketing</li>
                <li>Technical Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-gray-400 font-space">Connection</h4>
              <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                <input type="text" placeholder="Email" className="bg-transparent px-4 py-2 text-xs w-full focus:outline-none" />
                <button className="bg-[#ff0066] p-3 rounded-lg"><Send size={16} /></button>
              </div>
            </div>
          </div>
          <div className="text-center text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] font-space">
            © 2024 360 Hive by Queen. Designed for the Future.
          </div>
        </div>
      </footer>
    </main>
  );
}

// --- Sub-components & Data ---

function ServiceCard({ title, desc, icon: Icon, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:border-[#ff0066]/50 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-700">
        <Icon size={140} />
      </div>
      <div className="w-16 h-16 rounded-2xl bg-[#ff0066]/10 border border-[#ff0066]/20 flex items-center justify-center mb-10 group-hover:bg-[#ff0066] group-hover:text-white transition-all duration-500">
        <Icon size={32} />
      </div>
      <h3 className="text-3xl font-black italic uppercase font-space mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm mb-8 font-medium">{desc}</p>
      <Link href="#" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-[#ff0066] group-hover:gap-4 transition-all">
        Explore <ArrowRight size={14} className="ml-2" />
      </Link>
    </motion.div>
  );
}

const services = [
  { icon: Code2, title: "Software & Web", desc: "Crafting robust, scalable applications and high-end digital experiences built on modern stacks." },
  { icon: Video, title: "Media Production", desc: "Cinematic storytelling and high-quality digital content production that captures brand essence." },
  { icon: Megaphone, title: "Marketing & Ad", desc: "Data-driven strategies and disruptive advertising campaigns to scale your digital presence." },
  { icon: Lightbulb, title: "Consulting", desc: "Deep-tech advisory and strategic business consulting to navigate the digital landscape." },
  { icon: GraduationCap, title: "Training", desc: "Specialized workshops and technical training programs to empower your internal teams." },
  { icon: Palette, title: "Graphic Design", desc: "Avant-garde visual identity and UI/UX design that defines industry-leading brands." },
];

const principles = [
  { title: "Structured Software", desc: "Clean architecture and modular codebases designed for longevity and infinite scalability." },
  { title: "Full Design Intelligence", desc: "Design is strategy made visible. Every pixel serves a function in the user experience." },
  { title: "Full Functionality", desc: "Zero-compromise performance ensuring your digital assets work flawlessly across all platforms." },
];