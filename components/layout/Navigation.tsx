"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Globe, ChevronRight, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/i18n-context";

const MAGENTA = "#d4006e";

export function Navigation() {
  const { language, setLanguage, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const navLinks = useMemo(() => [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/products", label: t.nav.work },
    { href: "/contact", label: t.nav.contact },
  ], [t]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 border-b ${
          scrolled 
            ? "bg-[#05010d]/80 backdrop-blur-2xl py-3 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]" 
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Text-Based Logo */}
          <Link href="/" className="group flex items-center gap-2 z-[10001]">
            <div className="w-2 h-2 rounded-full bg-[#d4006e] shadow-[0_0_10px_#d4006e]" />
            <span className="text-xl font-black italic tracking-tighter text-white">
              360 hive
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-white/50 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4006e] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#d4006e]" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Premium Language Switcher */}
            <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/5">
              {(["en", "fr", "rw"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all duration-300 ${
                    language === lang 
                      ? "bg-white/10 text-white shadow-inner" 
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Main CTA */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/quote"
                className="flex items-center gap-3 px-6 py-2.5 rounded-full text-[12px] font-bold text-white shadow-[0_0_20px_rgba(212,0,110,0.3)] transition-all"
                style={{ background: "linear-gradient(135deg, #d4006e, #8c00c8)" }}
              >
                {t.nav.quote}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors z-[10001]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[10000] lg:hidden bg-[#05010d] flex flex-col pt-32 px-8"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4006e]/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="space-y-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-4xl font-bold italic text-white/30 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-10 border-t border-white/5 space-y-8">
                <div className="flex gap-8">
                  {(["en", "fr", "rw"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`text-sm font-bold tracking-widest ${
                        language === l ? "text-[#d4006e]" : "text-white/20"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>

                <Link
                  href="/quote"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-base font-bold text-white shadow-[0_15px_40px_rgba(212,0,110,0.3)]"
                  style={{ background: "linear-gradient(135deg, #d4006e, #8c00c8)" }}
                >
                  {t.nav.quote}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}