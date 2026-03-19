"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
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
  const language: Language = "en"; 
  const t = useMemo(() => copy[language], [language]);

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <main 
      className="relative min-h-screen bg-[#010717] flex items-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {/* --- BACKGROUND MOTION GRAPHICS --- */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ perspective: "1000px" }}>
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: 'rotateX(60deg) translateY(-150px)',
            transformOrigin: 'top'
          }} 
        />
      </div>

      {/* Floating Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF0066] blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- LEFT: TEXT CONTENT --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
            <Sparkles size={12} className="text-[#FF0066]" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
              {t.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-white">
            {t.heroTitle} <br />
            <span className="italic font-serif bg-gradient-to-r from-[#FF0066] to-[#200048] bg-clip-text text-transparent">
              {t.heroTitleGradient}
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-500 max-w-lg leading-relaxed font-medium">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="h-12 px-8 rounded-full bg-gradient-to-r from-[#FF0066] to-[#200048] text-white font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-pink-500/10 transition-all border-none">
                <Link href="/contact" className="flex items-center gap-2">
                  {t.request} <ArrowRight size={14} />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" className="h-12 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[11px] backdrop-blur-sm transition-all">
                <Link href="/contact" className="flex items-center gap-2">
                  <PlayCircle size={14} className="text-[#FF0066]" /> {t.call}
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* --- RIGHT: PURE 3D IMAGE VISUAL --- */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center pointer-events-none"
        >
          {/* Central Radial Glow */}
          <div className="absolute w-64 h-64 bg-[#FF0066]/20 blur-[100px] rounded-full" />
          
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-[450px]"
          >
            <Image
              src="/image/home.png"
              alt="360 Hive Visual"
              width={600}
              height={600}
              priority
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </main>
  );
}