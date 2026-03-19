"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lightbulb, Zap, Crown, Globe, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

type Language = "en" | "fr" | "rw";

// --- 3D TILT CARD COMPONENT ---
function TeamCard({ name, role, description }: { name: string; role: string; description: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group h-[450px] w-full bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm"
    >
      {/* PHOTO PLACEHOLDER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#010717] via-transparent to-transparent z-10" />
        {/* Replace the src with your actual image path */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center italic text-gray-700 uppercase tracking-widest text-[10px]">
          [ Member Photo ]
        </div>
      </div>

      {/* CONTENT LAYER */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-20" style={{ transform: "translateZ(50px)" }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] bg-gradient-to-r from-[#FF0066] to-[#200048] bg-clip-text text-transparent mb-2">
          {role}
        </p>
        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">
          {name}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {description}
        </p>
        
        <div className="flex gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
          <Linkedin size={14} className="hover:text-[#FF0066] cursor-pointer transition-colors" />
          <Github size={14} className="hover:text-[#FF0066] cursor-pointer transition-colors" />
          <Mail size={14} className="hover:text-[#FF0066] cursor-pointer transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const language: Language = "en";

  const features = [
    { icon: <Lightbulb size={20} />, title: "Collaboration", text: "Unified teams and aligned execution across products and campaigns." },
    { icon: <Zap size={20} />, title: "Innovation", text: "Future-ready solutions blending aesthetics and technical precision." },
    { icon: <Crown size={20} />, title: "Leadership", text: "Women-led strategy with bold, accountable decision-making." },
    { icon: <Globe size={20} />, title: "Full Ecosystem", text: "One loop from ideation to launch, optimization, and growth." },
  ];

  const team = [
    {
      name: "IGIRIMPUHWE Dositha",
      role: "CEO & Fullstack Developer",
      description: "Visionary leader architecting the technical foundation and strategic direction of the Hive ecosystem."
    },
    {
      name: "RIRASIRABOSE Aimme Nicole",
      role: "Managing Director & Graphic Designer",
      description: "Defining the visual language and operational excellence that bridges tech with luxury aesthetics."
    },
    {
      name: "UMUBYEYI Fortune",
      role: "System Documentalist & Salesperson",
      description: "Master of organizational integrity and global outreach, ensuring every system is documented and every client is valued."
    }
  ];

  return (
    <main className="bg-[#010717] min-h-screen text-gray-400 font-sans selection:bg-[#FF0066]/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8"
          >
            <Crown size={14} className="text-[#FF0066]" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">About the Queens</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight"
          >
            The Hive <span className="bg-gradient-to-r from-[#FF0066] to-[#200048] bg-clip-text text-transparent underline decoration-white/10">Philosophy</span>
          </motion.h1>

          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-gray-500 font-medium"
          >
            360 Hive by Queens is a dynamic platform connecting innovation, business, and creativity into one powerful ecosystem led by bold women. We redefine digital growth through technical precision and luxury design.
          </motion.p>
        </div>
        
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF0066] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF0066] to-[#200048] flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-500/10">
                {item.icon}
              </div>
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4 group-hover:text-[#FF0066] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* --- TEAM SECTION (THE QUEENS) --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#FF0066] mb-4">Leadership</h2>
            <p className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">The Architects of Innovation</p>
          </div>
          <p className="text-xs text-gray-600 uppercase tracking-widest max-w-[200px] text-right">
            Driven by technical mastery and creative vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <TeamCard 
                name={member.name} 
                role={member.role} 
                description={member.description} 
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Subtle Motion Graphic */}
      <div className="h-40 w-full relative overflow-hidden opacity-20 pointer-events-none">
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              transform: 'rotateX(60deg)',
              transformOrigin: 'bottom'
            }} 
          />
      </div>
    </main>
  );
}