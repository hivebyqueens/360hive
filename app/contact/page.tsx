"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Linkedin, Instagram, Twitter, ChevronRight, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Sub-components for Immersive UI ---

const Glow = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full mix-blend-screen filter blur-[120px] opacity-40 pointer-events-none ${className}`} />
);

const HexGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-[0.05] pointer-events-none">
    <div className="absolute inset-0" 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 104l30-17.32V17.32L30 0 0 17.32v69.36L30 104zm0-5.773L5.001 83.66V20.34L30 5.773l24.999 14.567v63.32L30 98.227z' fill='%23ff0066' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '120px'
      }}
    />
  </div>
);

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen bg-[#010717] text-white pt-32 pb-20 overflow-hidden selection:bg-[#ff0066]/30">
      <HexGrid />
      
      {/* Dynamic Background Glows */}
      <Glow className="top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ff0066]" />
      <Glow className="bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#200048]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <section className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              <Sparkles size={12} className="text-[#ff0066]" /> Open for Innovation
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] to-[#7000ff]">Touch</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
              Ready to transcend the ordinary? Let’s bring your digital vision into reality with the Hive.
            </p>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* --- CONTACT INFO (4 Columns) --- */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold italic uppercase tracking-tight">Hive Coordinates</h3>
              
              <div className="grid gap-4">
                {[
                  { icon: Mail, label: "Email", val: "hello@360hive.com", color: "#ff0066" },
                  { icon: Phone, label: "Phone", val: "+250 788 000 000", color: "#7000ff" },
                  { icon: MapPin, label: "Office", val: "Kigali Innovation City, Rwanda", color: "#200048" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-6 group hover:bg-white/[0.08] transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center group-hover:scale-110 group-hover:bg-[#ff0066] transition-all">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                      <p className="text-lg font-semibold">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Socials */}
              <div className="pt-8 flex gap-4">
                {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#ff0066]/50 transition-colors"
                  >
                    <Icon size={20} className="text-gray-400 hover:text-white" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- CONTACT FORM (7 Columns) --- */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              {/* Animated Glowing Edge */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066] rounded-[3rem] opacity-20 blur-[2px] group-hover:opacity-40 transition-opacity animate-gradient-x" />
              
              <div className="relative bg-[#010717]/80 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[3rem]">
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div className="relative">
                      <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${focused === 'name' ? 'text-[#ff0066]' : 'text-gray-500'}`}>Full Name</label>
                      <input 
                        type="text" 
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#ff0066] transition-colors text-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    {/* Email Field */}
                    <div className="relative">
                      <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${focused === 'email' ? 'text-[#ff0066]' : 'text-gray-500'}`}>Email Address</label>
                      <input 
                        type="email" 
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#ff0066] transition-colors text-lg"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${focused === 'message' ? 'text-[#ff0066]' : 'text-gray-500'}`}>Your Vision</label>
                    <textarea 
                      rows={4}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-[#ff0066] transition-colors text-lg resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#ff0066] to-[#7000ff] text-white font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,0,102,0.2)]">
                      Transmit Message <Send size={18} className="ml-3" />
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- BOTTOM CTA --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-12 rounded-[4rem] bg-gradient-to-br from-[#200048] to-[#010717] border border-white/5 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#ff0066]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 relative z-10">
            Start Your Project <span className="text-[#ff0066]">Today</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto relative z-10">
            Our team is standing by to turn your ambitious ideas into digital reality. No project is too complex for the Hive.
          </p>
          <button className="flex items-center gap-2 mx-auto text-sm font-black uppercase tracking-[0.3em] group relative z-10">
            View Project Brief <ChevronRight className="group-hover:translate-x-2 transition-transform text-[#ff0066]" />
          </button>
        </motion.div>
      </div>

      {/* --- FLOATING CHAT WIDGET --- */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-[#ff0066] flex items-center justify-center shadow-[0_0_30px_rgba(255,0,102,0.5)] z-[10002] group"
      >
        <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#010717]" />
      </motion.button>
    </main>
  );
}