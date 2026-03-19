"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";

type Language = "en" | "fr" | "rw";
type ThemeMode = "dark" | "light";

const copy = {
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    request: "Request a Quote",
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    about: "À propos",
    contact: "Contact",
    request: "Demander un devis",
  },
  rw: {
    home: "Ahabanza",
    products: "Ibicuruzwa",
    about: "Ibitwerekeye",
    contact: "Twandikire",
    request: "Saba igiciro",
  },
} as const;

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export function Navigation({
  language,
  setLanguage,
  mode,
  setMode,
}: NavigationProps) {
  const t = useMemo(() => copy[language], [language]);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitors scroll position to toggle the "Floating Capsule" design
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/products", label: t.products },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-in-out ${
        scrolled ? "pt-4" : "pt-8"
      }`}
    >
      <nav 
        className={`max-w-6xl mx-auto px-6 h-16 flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? "bg-[#010717]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] mx-4 lg:mx-auto" 
            : "bg-transparent border-transparent"
        }`}
      >
        {/* --- BRAND / LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group relative z-[10001]">
          <div className="relative w-8 h-8 transition-transform duration-500 group-hover:rotate-[10deg]">
            <Image
              src="/logo.png"
              alt="360 Hive logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-black tracking-[-0.05em] uppercase italic bg-gradient-to-r from-[#FF0066] to-[#200048] bg-clip-text text-transparent">
            360 Hive
          </span>
        </Link>

        {/* --- CENTERED NAVIGATION (Desktop) --- */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.label}
              <motion.span 
                className="absolute -bottom-1 left-0 h-[1px] bg-[#FF0066]" 
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
        </div>

        {/* --- RIGHT ACTIONS (Desktop) --- */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
            <Globe size={12} className="text-gray-500" />
            <div className="flex gap-2">
              {(["en", "fr", "rw"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[10px] font-bold transition-all ${
                    language === lang ? "text-[#FF0066]" : "text-gray-600 hover:text-gray-300"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Toggle */}
          <button
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            className="p-2 text-gray-500 hover:text-white transition-colors"
          >
            {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button asChild className="bg-gradient-to-r from-[#FF0066] to-[#200048] text-white border-none rounded-full h-9 px-5 text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-pink-500/10 transition-all">
              <Link href="/contact">{t.request}</Link>
            </Button>
          </motion.div>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="lg:hidden p-2 text-white relative z-[10001] hover:bg-white/5 rounded-lg transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* --- CINEMATIC MOBILE OVERLAY --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#010717] z-[10000] flex flex-col items-center justify-center p-10 lg:hidden"
            >
              {/* Background Glow for Mobile Menu */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF0066] opacity-[0.08] blur-[100px] rounded-full pointer-events-none" />

              <div className="flex flex-col items-center gap-10 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-light tracking-tighter text-white hover:text-[#FF0066] transition-colors italic uppercase"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.4 }}
                  className="mt-16 flex flex-col items-center gap-8"
                >
                  <div className="flex gap-8 border-b border-white/10 pb-4 w-full justify-center">
                    {["en", "fr", "rw"].map((l) => (
                      <button 
                        key={l}
                        onClick={() => { setLanguage(l as Language); setIsOpen(false); }}
                        className={`text-sm font-bold tracking-widest uppercase ${language === l ? "text-[#FF0066]" : "text-gray-500"}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <Button asChild className="bg-gradient-to-r from-[#FF0066] to-[#200048] w-72 h-14 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>{t.request}</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}