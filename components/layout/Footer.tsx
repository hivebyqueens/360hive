"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Instagram,
  Twitter,
  Send,
  Music2,
  ArrowRight,
  Plus,
} from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
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
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const services = [
    "Software & Web Development",
    "Digital Content & Media Production",
    "Marketing & Advertising",
    "Technical & Professional Services",
    "Education & Training",
  ];

  return (
    <footer 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#010717] text-gray-400 font-sans pt-32 pb-12 overflow-hidden border-t border-white/5 perspective-1000"
    >
      {/* --- MOTION GRAPHIC: 3D PERSPECTIVE GRID --- */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ perspective: "1000px" }}>
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) translateY(-100px)',
            transformOrigin: 'top'
          }} 
        />
      </div>

      {/* Floating 3D Orbs (Motion Graphics) */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF0066] blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#200048] blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- NEWSLETTER SECTION WITH 3D TILT --- */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="mb-32 p-1 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12"
        >
          <div className="max-w-2xl" style={{ transform: "translateZ(50px)" }}>
            <h3 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tighter leading-tight">
              Innovate with <br />
              <motion.span 
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="font-serif italic bg-gradient-to-r from-[#FF0066] via-[#9d4edd] to-[#200048] bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                the Hive.
              </motion.span>
            </h3>
          </div>
          
          <form
            className="w-full lg:w-auto relative group"
            style={{ transform: "translateZ(30px)" }}
            onSubmit={(e) => { e.preventDefault(); setIsSubscribed(true); }}
          >
            <div className="flex items-center border-b border-white/10 py-3 focus-within:border-[#FF0066] transition-all duration-700">
              <input
                type="email"
                placeholder="Join the Inner Circle"
                className="bg-transparent border-none w-full lg:w-96 px-0 py-2 text-white text-lg focus:outline-none placeholder:text-gray-800"
              />
              <motion.button 
                whileHover={{ x: 5, scale: 1.1 }}
                className="ml-4 p-2 text-[#FF0066]"
              >
                <ArrowRight size={32} strokeWidth={1.5} />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          
          {/* COL 1: 3D BRAND LOGO & DESCRIPTION */}
          <div className="space-y-12">
            <div className="relative group cursor-default">
              {/* 3D Motion Graphic Hexagon */}
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -left-8 -top-8 opacity-20 group-hover:opacity-40 transition-opacity"
              >
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                  <path d="M50 5L89.4 27.5V72.5L50 95L10.6 72.5V27.5L50 5Z" stroke="url(#grad)" strokeWidth="1" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF0066" />
                      <stop offset="100%" stopColor="#200048" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              <h2 className="text-4xl font-black tracking-tighter uppercase italic bg-gradient-to-br from-[#FF0066] to-[#200048] bg-clip-text text-transparent">
                360 Hive
              </h2>
            </div>

            <p className="text-[13px] leading-relaxed text-gray-500 max-w-xs font-medium tracking-wide">
              Architecting digital futures through the intersection of luxury design and high-performance technology.
            </p>

            <div className="flex gap-8">
              {[Music2, Instagram, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, scale: 1.2, color: "#FF0066" }}
                  href="#"
                  className="text-gray-700 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* COL 2: NAV */}
          <div className="md:pl-10">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.5em] mb-10 opacity-30">Menu</h4>
            <ul className="space-y-6">
              {["Home", "About", "Our Work", "Request Quote"].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <Link href="#" className="text-[13px] font-semibold hover:text-white transition-all">
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* COL 3 & 4: SERVICES (Motion Graphic List) */}
          <div className="lg:col-span-2 lg:pl-10">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.5em] mb-10 opacity-30">Capabilities</h4>
            <div className="space-y-2">
              {services.map((service, i) => (
                <motion.div 
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center justify-between border-b border-white/[0.03] py-4 cursor-default overflow-hidden relative"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#FF0066]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  />
                  <span className="text-[14px] font-medium text-gray-400 group-hover:text-white transition-colors relative z-10">
                    {service}
                  </span>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    className="relative z-10"
                  >
                    <Plus size={16} className="text-gray-800 group-hover:text-[#FF0066] transition-colors" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

       
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#FF0066] animate-pulse" />
            <p className="text-[9px] tracking-[0.4em] text-gray-700 uppercase font-black">
              © 2026 360 Hive by Queens
            </p>
          </div>
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.4em]">
            <Link href="#" className="text-gray-700 hover:text-white transition-colors tracking-widest">Privacy</Link>
            <Link href="#" className="text-gray-700 hover:text-white transition-colors tracking-widest">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}