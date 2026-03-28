"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Code2, Video, Megaphone, Lightbulb, GraduationCap, 
  Palette, Target, Eye, Rocket, CheckCircle2, Cpu, Layers, Zap 
} from "lucide-react";
import Image from "next/image";

// --- Reusable UI Components ---

const Glow = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full mix-blend-screen filter blur-[100px] opacity-30 pointer-events-none ${className}`} />
);

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-16">
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-[#ff0066] font-bold tracking-[0.3em] uppercase text-xs"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mt-2"
    >
      {title}
    </motion.h2>
  </div>
);

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <main className="relative bg-[#010717] text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#200048] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-[#ff0066] rounded-full blur-[150px] opacity-10" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-8">
              Who We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] to-[#7000ff]">Are</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
              We are a collective of digital architects, creative storytellers, and strategic thinkers dedicated to pushing the boundaries of what’s possible.
            </p>
          </motion.div>
        </div>
        
        {/* Floating 3D-like elements */}
        <motion.div style={{ y: y1 }} className="absolute top-40 right-[10%] opacity-20 hidden lg:block">
           <Cpu size={120} className="text-[#ff0066] rotate-12" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-20 left-[10%] opacity-20 hidden lg:block">
           <Layers size={100} className="text-[#7000ff] -rotate-12" />
        </motion.div>
      </section>

      {/* --- COMPANY STORY (Mission/Vision) --- */}
      <section className="py-24 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                alt="Tech Innovation" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010717] via-transparent to-transparent" />
            </motion.div>

            <div className="space-y-12">
              <SectionHeading title="Our Essence" subtitle="The Story" />
              
              <div className="grid gap-8">
                {[
                  { icon: Target, title: "Our Mission", text: "To empower brands through hyper-structured software and disruptive creative strategies that drive real-world impact.", color: "#ff0066" },
                  { icon: Eye, title: "Our Vision", text: "To become the global hive-mind for digital excellence, where technology and creativity coexist in perfect synergy.", color: "#7000ff" },
                  { icon: Rocket, title: "Our Purpose", text: "We don't just build products; we build legacies. Every line of code and every pixel is crafted for longevity and performance.", color: "#200048" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-colors group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-[#ff0066]/50 transition-colors">
                      <item.icon className="text-[#ff0066]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES BREAKDOWN --- */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Full Spectrum Solutions" subtitle="Core Services" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative group overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <service.icon size={150} />
                </div>
                <service.icon className="text-[#ff0066] mb-6" size={40} />
                <h3 className="text-2xl font-bold mb-4 italic uppercase">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WORKING PRINCIPLES (Timeline Style) --- */}
      <section className="py-24 px-6 relative">
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7000ff]/10" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading title="How We Execute" subtitle="Our Principles" />
          
          <div className="space-y-0 relative">
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#ff0066] via-[#7000ff] to-transparent" />
            
            {[
              { title: "Structure of Software", desc: "We believe in 'Architecture First.' Our codebases are modular, scalable, and documented to ensure your tech stack is a fortress.", icon: Zap },
              { title: "Full Design Intelligence", desc: "Design isn't just how it looks; it's how it works. We apply psychological principles to UI/UX to maximize user retention.", icon: Palette },
              { title: "Full Functionality", desc: "We deliver zero-lag, cross-platform performance. If it's not blazing fast and perfectly responsive, it's not finished.", icon: CheckCircle2 }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-20 pb-16 last:pb-0"
              >
                <div className="absolute left-0 w-14 h-14 rounded-full bg-[#010717] border-2 border-[#ff0066] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,0,102,0.3)]">
                  <p.icon size={24} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[#200048]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <SectionHeading title="The Mind Behind" subtitle="Leadership" />
             <p className="text-gray-500 max-w-xs mb-4">Driving the vision of 360 Hive with a passion for excellence.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Founder Card - Large */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 group relative rounded-[3rem] overflow-hidden border border-white/10 aspect-[16/9] md:aspect-auto h-[400px]"
            >
               <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                alt="Founder" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
               <div className="absolute inset-0 bg-gradient-to-t from-[#010717] to-transparent opacity-80" />
               <div className="absolute bottom-10 left-10">
                  <p className="text-[#ff0066] font-bold tracking-widest mb-2 uppercase text-sm">Founder & CEO</p>
                  <h3 className="text-4xl font-black italic uppercase">Queen</h3>
                  <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-xs font-bold border border-white/20 px-3 py-1 rounded-full">Strategist</span>
                     <span className="text-xs font-bold border border-white/20 px-3 py-1 rounded-full">Visionary</span>
                  </div>
               </div>
            </motion.div>

            {/* Support/Team Placeholder */}
            <div className="bg-white/5 rounded-[3rem] border border-white/10 p-10 flex flex-col justify-center">
               <h4 className="text-2xl font-bold mb-4">Join the Hive</h4>
               <p className="text-gray-500 mb-8">We are always looking for creative rebels and tech geniuses to join our mission.</p>
               <button className="w-full py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-[#ff0066] hover:text-white transition-colors">
                  Apply Now
               </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const services = [
  { icon: Code2, title: "Software & Web", details: "From complex SaaS platforms to bespoke web applications, we build with React, Next.js, and high-performance backends." },
  { icon: Video, title: "Media Production", details: "Cinematic quality video editing, motion graphics, and digital content production that stops the scroll." },
  { icon: Megaphone, title: "Marketing & Ads", details: "Growth hacking, performance marketing, and data-driven ad campaigns designed for massive ROI." },
  { icon: Lightbulb, title: "Technical Consulting", details: "Strategic digital transformation and tech-stack auditing for growing enterprises." },
  { icon: GraduationCap, title: "Education", details: "Empowering teams through specialized technical workshops and leadership training." },
  { icon: Palette, title: "Graphic Design", details: "High-end brand identity, UI/UX prototyping, and visual assets that define market leaders." },
];