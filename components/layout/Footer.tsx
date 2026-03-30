"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Instagram,
  Twitter,
  Send,
  Music2,
  ArrowRight,
  Plus,
  Activity,
  Globe,
  ShieldCheck,
  Zap
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // 3D Mouse Tracking Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const services = [
    "Software & Web Development",
    "Digital Content & Media Production",
    "Marketing & Advertising",
    "Technical Consulting",
    "Education & Training",
    "Graphic Design",
  ];

  return (
    <footer 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#010717] text-gray-400 pt-32 pb-12 overflow-hidden border-t border-white/5 perspective-1000 font-jakarta"
    >
      {/* --- BACKGROUND GRAPHIC: KINETIC 3D GRID --- */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: 'rotateX(65deg) translateY(-150px)',
            transformOrigin: 'top'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010717] via-transparent to-[#010717]" />
      </div>

      {/* Floating Energy Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#FF0066] blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#200048] blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HERO NEWSLETTER SECTION --- */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="mb-40 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16"
        >
          <div className="max-w-3xl" style={{ transform: "translateZ(60px)" }}>
            <div className="flex items-center gap-3 mb-6">
                <Activity size={18} className="text-[#FF0066] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Transmission_Active</span>
            </div>
            <h3 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] font-space">
              Initiate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#7000ff] to-[#FF0066] animate-gradient-x">
                Connection.
              </span>
            </h3>
          </div>
          
          <form
            className="w-full lg:w-auto relative"
            style={{ transform: "translateZ(40px)" }}
            onSubmit={(e) => { e.preventDefault(); setIsSubscribed(true); }}
          >
            <div className="flex items-center border-b-2 border-white/10 py-4 focus-within:border-[#FF0066] transition-all duration-700">
              <input
                type="email"
                placeholder="JOIN THE HIVE MIND"
                className="bg-transparent border-none w-full lg:w-[450px] px-0 py-2 text-white text-xl font-black uppercase tracking-widest focus:outline-none placeholder:text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button 
                whileHover={{ scale: 1.2, x: 10 }}
                whileTap={{ scale: 0.9 }}
                className="ml-4 p-2 text-[#FF0066]"
              >
                <ArrowRight size={40} strokeWidth={2.5} />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* --- MAIN GRID SYSTEM --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-40">
          
          {/* COL 1: IDENTITY */}
          <div className="space-y-10">
            <div className="relative group inline-block">
               <h2 className="text-4xl font-black tracking-tighter uppercase italic bg-gradient-to-br from-[#FF0066] to-[#7000ff] bg-clip-text text-transparent font-space">
                360 Hive
              </h2>
              <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-[#FF0066] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>

            <p className="text-sm leading-relaxed text-gray-500 max-w-xs font-medium tracking-wide">
              Architecting digital futures through the intersection of premium design and high-performance software engineering.
            </p>

            <div className="flex gap-6">
              {[Globe, Instagram, Twitter, Music2].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, scale: 1.1, color: "#FF0066" }}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 transition-all hover:border-[#FF0066]/50"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* COL 2: NAVIGATION */}
          <div className="lg:pl-10">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em] mb-12 opacity-30">Archive</h4>
            <ul className="space-y-6">
              {["Home", "About Collective", "Impact / Work", "Request Transmit"].map((link) => (
                <motion.li key={link} whileHover={{ x: 8 }}>
                  <Link href="#" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center gap-3 group">
                    <span className="w-0 h-[1px] bg-[#FF0066] group-hover:w-4 transition-all" />
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* COL 3 & 4: CAPABILITIES (NEURAL DATA LIST) */}
          <div className="lg:col-span-2 lg:pl-10">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em] mb-12 opacity-30">Core Operations</h4>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              {services.map((service, i) => (
                <motion.div 
                  key={service}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-center justify-between border-b border-white/[0.03] py-4 cursor-crosshair overflow-hidden relative"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#FF0066]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  />
                  <span className="text-[12px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors relative z-10">
                    {service}
                  </span>
                  <Plus size={14} className="text-gray-800 group-hover:text-[#FF0066] transition-colors relative z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>


        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-gray-700">
               <ShieldCheck size={12} className="text-[#FF0066]" />
               Encrypted Protocol
            </div>
            <p className="text-[9px] tracking-[0.4em] text-gray-800 uppercase font-black">
              © 2026 360 Hive Collective
            </p>
          </div>
          
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.5em]">
            <Link href="#" className="text-gray-700 hover:text-[#FF0066] transition-colors">Privacy_Auth</Link>
            <Link href="#" className="text-gray-700 hover:text-[#FF0066] transition-colors">Terms_of_Sync</Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </footer>
  );
}