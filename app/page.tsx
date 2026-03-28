"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Code2, Video, Megaphone, Lightbulb, GraduationCap, 
  Palette, ArrowRight, CheckCircle2, Quote, Send 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Components ---

const Glow = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse ${className}`} />
);

const HexagonBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <div className="absolute inset-0" 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 104l30-17.32V17.32L30 0 0 17.32v69.36L30 104zm0-5.773L5.001 83.66V20.34L30 5.773l24.999 14.567v63.32L30 98.227z' fill='%23ff0066' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '80px'
      }}
    />
  </div>
);

export default function HomePage() {
  return (
    <main className="relative bg-[#010717] text-white selection:bg-[#ff0066]/30 overflow-x-hidden">
      <HexagonBackground />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20">
        <Glow className="top-1/4 -left-20 w-[500px] h-[500px] bg-[#ff0066]" />
        <Glow className="bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#200048]" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full border border-[#ff0066]/30 bg-[#ff0066]/10 text-[#ff0066] text-xs font-bold uppercase tracking-widest mb-6"
            >
              The Hive is Open
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 italic uppercase">
              Building <br />
              <span className="bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066] bg-clip-text text-transparent animate-gradient-x">
                Digital Experiences
              </span> <br />
              That Matter
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium">
              360 Hive by Queen is a high-performance creative agency specializing in software engineering, digital media, and strategic marketing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#ff0066] hover:bg-[#ff0066]/90 rounded-full px-8 h-14 text-sm font-bold uppercase tracking-widest group">
                Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 rounded-full px-8 h-14 text-sm font-bold uppercase tracking-widest">
                View Our Work
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center items-center"
          >
            {/* Animated Hexagon Visual */}
            <div className="relative w-full max-w-[500px] aspect-square">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 15 + (i * 5), 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute inset-0 border border-white/5 rounded-[40px] md:rounded-[80px]"
                    style={{ rotate: `${i * 30}deg` }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-64 h-64 bg-gradient-to-tr from-[#ff0066] to-[#200048] rounded-full blur-[80px] opacity-30 animate-pulse" />
                   <Image 
                    src="/logo.png" 
                    alt="Hero Visual" 
                    width={400} 
                    height={400} 
                    className="relative z-10 drop-shadow-[0_0_50px_rgba(255,0,102,0.5)]"
                   />
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Our Ecosystem</h2>
              <p className="text-gray-500 text-lg">Comprehensive solutions across the digital lifecycle.</p>
            </div>
            <div className="h-px flex-1 bg-white/10 mx-10 hidden md:block" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 bg-white/5 backdrop-blur-3xl border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12">The 360 Approach</h2>
            <div className="space-y-12">
              {principles.map((p, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff0066] to-[#200048] flex items-center justify-center text-xl font-bold">
                    0{i+1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{p.desc}</p>
                    <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="h-full bg-[#ff0066]"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff0066] to-[#200048] rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-square lg:aspect-auto lg:h-[600px]">
              <Image src="/team-working.jpg" alt="Innovation" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-32 relative text-center">
        <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ff0066]/20" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-10">
            Let’s Build Something <br />
            <span className="text-[#ff0066]">Great Together</span>
          </h2>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-12 h-16 text-sm font-black uppercase tracking-widest">
            Contact Us Now
          </Button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pt-24 pb-12 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <h3 className="text-2xl font-black uppercase italic mb-6 tracking-tighter">360 Hive</h3>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                Elevating brands through the intersection of advanced technology and creative mastery.
              </p>
              <div className="flex gap-4">
                {['TW', 'IG', 'LI', 'FB'].map(s => (
                  <Link key={s} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold hover:bg-[#ff0066] hover:border-[#ff0066] transition-all">
                    {s}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-400">Services</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>Development</li>
                <li>Production</li>
                <li>Marketing</li>
                <li>Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-400">Newsletter</h4>
              <div className="flex gap-2">
                <input type="text" placeholder="Your email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-[#ff0066]" />
                <button className="bg-[#ff0066] p-2 rounded-lg"><Send size={18} /></button>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-600 font-bold uppercase tracking-[0.3em]">
            © 2024 360 Hive by Queen. All Rights Reserved.
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
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#ff0066]/50 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
        <Icon size={120} />
      </div>
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff0066]/20 to-[#200048]/20 border border-[#ff0066]/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
        <Icon className="text-[#ff0066]" size={28} />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm mb-6">{desc}</p>
      <Link href="#" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-[#ff0066] group-hover:gap-3 transition-all">
        Learn More <ArrowRight size={14} className="ml-2" />
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
  { title: "Full Design Approach", desc: "A holistic design philosophy where aesthetics and functionality exist in perfect harmony." },
  { title: "Full Functionality", desc: "Zero-compromise performance ensuring your digital assets work flawlessly across all platforms." },
];