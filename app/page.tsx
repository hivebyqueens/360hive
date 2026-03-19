"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";

type Language = "en" | "fr" | "rw";

const copy = {
  en: {
    badge: "The Sovereign Pulse",
    heroTitle: "Empowering Innovation Through",
    heroTitleGradient: "Collaboration",
    heroSubtitle:
      "A 360° ecosystem where creativity, technology, and leadership converge to redefine the architecture of digital growth.",
    request: "Request a Quote",
    call: "Book a Call",
  },
  fr: {
    badge: "Le Pulse Souverain",
    heroTitle: "L'innovation propulsée par la",
    heroTitleGradient: "Collaboration",
    heroSubtitle:
      "Un écosystème à 360° où créativité, technologie et leadership convergent pour redéfinir la croissance numérique.",
    request: "Demander un devis",
    call: "Réserver un appel",
  },
  rw: {
    badge: "Sovereign Pulse",
    heroTitle: "Duteza imbere udushya binyuze mu",
    heroTitleGradient: "Bufatanye",
    heroSubtitle:
      "Uruhurirane rwa 360° aho ubuhanzi, ikoranabuhanga n'ubuyobozi bihura kugira ngo bihindure iterambere rya digital.",
    request: "Saba igiciro",
    call: "Teganya ikiganiro",
  },
} as const;

export default function Home() {
  const language: Language = "en"; // In production, get this from your context
  const t = useMemo(() => copy[language], [language]);

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <main 
      className="relative min-h-screen bg-[#010717] flex items-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* --- BACKGROUND MOTION GRAPHICS --- */}
      {/* Perspective Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ perspective: "1000px" }}>
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'rotateX(55deg) translateY(-200px)',
            transformOrigin: 'top'
          }} 
        />
      </div>

      {/* Floating 3D Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FF0066] blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#200048] blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT CONTENT: LUXURY TYPOGRAPHY --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <Sparkles size={14} className="text-[#FF0066]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-300">
              {t.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] text-white">
            {t.heroTitle} <br />
            <span className="italic font-serif bg-gradient-to-r from-[#FF0066] via-[#9d4edd] to-[#200048] bg-clip-text text-transparent">
              {t.heroTitleGradient}
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-lg leading-relaxed font-medium">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-5 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="h-14 px-8 rounded-full bg-gradient-to-r from-[#FF0066] to-[#200048] text-white font-bold uppercase tracking-widest text-xs shadow-xl shadow-pink-500/20 border-none transition-all">
                <Link href="/contact" className="flex items-center gap-2">
                  {t.request} <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-xs backdrop-blur-sm transition-all">
                <Link href="/contact" className="flex items-center gap-2">
                  <PlayCircle size={16} className="text-[#FF0066]" /> {t.call}
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* --- RIGHT CONTENT: 3D INTERACTIVE VISUAL --- */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative 3D Glass Frame */}
          <div className="absolute inset-0 border border-white/10 rounded-[3rem] bg-white/[0.02] backdrop-blur-2xl -rotate-6 scale-105 pointer-events-none" />
          
          <div className="relative z-10 w-full aspect-square max-w-[500px] group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0066]/20 to-[#200048]/20 blur-[80px] rounded-full group-hover:scale-110 transition-transform duration-700" />
            
            {/* Main Hero Image with Floating Animation */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full flex items-center justify-center p-8"
              style={{ transform: "translateZ(100px)" }} // "Pop" out of 3D frame
            >
              <Image
                src="/image/home.png"
                alt="360 Hive Innovation"
                width={500}
                height={500}
                priority
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Floating Status UI (3D Layer) */}
            <motion.div 
              style={{ transform: "translateZ(150px)" }}
              className="absolute top-10 right-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] text-white font-black uppercase tracking-widest">Hive Active</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Subtle Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-white">Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" 
        />
      </div>
    </main>
  );
}