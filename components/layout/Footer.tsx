"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, ArrowRight, Plus, Globe, ShieldCheck, Music2 } from "lucide-react";
import { useApp } from "@/lib/i18n-context";

const MAGENTA = "#d4006e";

export function Footer() {
  const { t } = useApp();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.work, href: "/products" },
    { label: t.nav.quote, href: "/quote" },
  ];

  const serviceNames = t.services_list.map((s) => s.title);

  return (
    <footer className="relative bg-[#05010d] text-gray-400 pt-32 pb-12 overflow-hidden border-t border-white/5">
      
      {/* ── BACKGROUND ATMOSPHERE ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-[#d4006e]/05 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8c00c8]/05 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── NEWSLETTER SECTION: PRO MAX GLASS ── */}
        <section className="mb-32 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-[11px] font-bold lowercasetracking-[0.4em] text-[#d4006e] mb-6">Newsletter</p>
            <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9]">
              Join 360 hive. <br />
              <span className="text-white/40">Stay ahead of digital.</span>
            </h3>
          </div>

          <div className="w-full lg:w-auto">
            {status === "success" ? (
              <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className="text-[#d4006e] font-bold italic text-lg">You are subscribed ✓</motion.p>
            ) : (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email || status === "loading") return;
                  setStatus("loading");
                  try {
                    const res = await fetch("/api/newsletter", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });
                    const data = await res.json();
                    setStatus(data.success ? "success" : "error");
                  } catch { setStatus("error"); }
                }}
                className="relative flex items-center p-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl w-full md:w-[450px] transition-all focus-within:border-[#d4006e]/50"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none w-full px-6 py-3 text-white text-base font-medium focus:outline-none placeholder:text-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-[#d4006e] flex items-center justify-center text-white shadow-[0_0_20px_rgba(212,0,110,0.4)]"
                >
                  {status === "loading" ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowRight size={20} />}
                </motion.button>
              </form>
            )}
            {status === "error" && <p className="text-[10px] text-red-500 mt-2 ml-4 italic">Something went wrong.</p>}
          </div>
        </section>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
     
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-black tracking-tighter italic text-white mb-4">
                360 Hive
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
                Providing end-to-end digital execution for modern brands through technical excellence.
              </p>
            </div>
            <div className="flex gap-3">
              {[Globe, Instagram, Twitter, Music2].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, backgroundColor: "rgba(212,0,110,0.1)", borderColor: "#d4006e" }}
                  className="w-11 h-11 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

        
          <div>
            <p className="text-white text-[11px] font-bold tracking-[0.3em] lowercasemb-10 opacity-30">Quick links</p>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4006e] scale-0 group-hover:scale-100 transition-transform shadow-[0_0_8px_#d4006e]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

      
          <div className="lg:col-span-2">
            <p className="text-white text-[11px] font-bold tracking-[0.3em] lowercasemb-10 opacity-30">Core services</p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-1">
              {serviceNames.map((service, i) => (
                <motion.div
                  key={service}
                  className="group flex items-center justify-between border-b border-white/[0.03] py-4 cursor-default"
                >
                  <span className="text-[13px] font-medium text-gray-500 group-hover:text-white transition-colors italic">
                    {service}
                  </span>
                  <Plus size={14} className="text-gray-700 group-hover:text-[#d4006e] transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
              <ShieldCheck size={14} className="text-[#d4006e]" />
              Secure Protocol
            </div>
            <p className="text-[10px] text-gray-600 font-bold">© 2024 360 Hive by Queen. All rights reserved.</p>
          </div>
          
          <div className="flex gap-10 text-[10px] font-bold">
            <Link href="/privacy" className="text-gray-600 hover:text-white transition-colors">Privacy policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-white transition-colors">Terms of service</Link>
          </div>
        </div>
      </div>


      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4006e]/40 to-transparent" />
    </footer>
  );
}