"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

type Language = "en" | "fr" | "rw";
type ThemeMode = "dark" | "light";

const copy = {
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    gallery: "Gallery",
    request: "Request a Quote",
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    about: "A propos",
    contact: "Contact",
    gallery: "Galerie",
    request: "Demander un devis",
  },
  rw: {
    home: "Ahabanza",
    products: "Ibicuruzwa",
    about: "Ibitwerekeye",
    contact: "Twandikire",
    gallery: "Ifoto",
    request: "Saba igiciro",
  },
} as const;

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  logoMissing?: boolean;
}

export function Navigation({
  language,
  setLanguage,
  mode,
  setMode,
  logoMissing = false,
}: NavigationProps) {
  const t = useMemo(() => copy[language], [language]);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // This ensures the navbar sticks and changes appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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
    { href: "/gallery", label: t.gallery },
    { href: "/contact", label: t.contact },
  ];

  return (
    <>
      {/* Spacer: Prevents content from jumping under the fixed navbar */}
      <div className="h-0" /> 

      <header 
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ease-in-out ${
          scrolled 
            ? "py-3 bg-[#010717]/85 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
            : "py-6 bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* --- BRAND / LOGO --- */}
          <Link href="/" className="flex items-center gap-3 group relative z-[110]">
            {!logoMissing && (
              <div className="relative w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-transform group-hover:scale-110">
                 <Image
                  src="/logo.png"
                  alt="360 Hive logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-[#FF0066] to-[#200048] bg-clip-text text-transparent">
              360 Hive
            </span>
          </Link>

          {/* --- DESKTOP NAV LINKS (Standardized 14px) --- */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-[14px] font-medium text-gray-400 hover:text-white transition-all relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#FF0066] to-[#200048] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* --- DESKTOP ACTIONS --- */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Language Switcher */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1 border-opacity-50">
              {(["en", "fr", "rw"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
                    language === lang 
                      ? "bg-gradient-to-r from-[#FF0066] to-[#200048] text-white shadow-lg" 
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:border-[#FF0066]/50 transition-all text-gray-400 hover:text-white bg-white/5"
            >
              {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA Button (Standardized 16px) */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="bg-gradient-to-r from-[#FF0066] to-[#200048] text-white border-none rounded-full px-6 h-10 text-[13px] font-bold uppercase tracking-widest shadow-lg shadow-pink-500/10">
                <Link href="/contact">{t.request}</Link>
              </Button>
            </motion.div>
          </div>

          {/* --- MOBILE MENU TOGGLE --- */}
          <button 
            className="lg:hidden relative z-[110] p-2 text-white hover:bg-white/5 rounded-lg transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* --- MOBILE OVERLAY MENU --- */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 bg-[#010717] z-[105] flex flex-col pt-32 px-10 lg:hidden"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0066] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex flex-col gap-6 relative z-10">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-light text-white hover:text-[#FF0066] transition-colors italic tracking-tighter"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto mb-12 space-y-8 relative z-10 border-t border-white/5 pt-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 text-xs">Interface</span>
                    <button
                      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                      className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-xs text-white bg-white/5"
                    >
                      {mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                      {mode === "dark" ? "Light" : "Dark"}
                    </button>
                  </div>

                  <Button asChild className="w-full bg-gradient-to-r from-[#FF0066] to-[#200048] h-14 rounded-2xl text-base font-bold uppercase tracking-widest shadow-xl shadow-pink-500/20">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>{t.request}</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}