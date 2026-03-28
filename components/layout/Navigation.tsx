"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Moon, Sun, Globe, ChevronRight } from "lucide-react";

type Language = "en" | "fr" | "rw";
type ThemeMode = "dark" | "light";

const copy = {
  en: { home: "Home", products: "Products", about: "About", contact: "Contact", request: "Request a Quote" },
  fr: { home: "Accueil", products: "Produits", about: "À propos", contact: "Contact", request: "Demander un devis" },
  rw: { home: "Ahabanza", products: "Ibicuruzwa", about: "Ibitwerekeye", contact: "Twandikire", request: "Saba igiciro" },
} as const;

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export function Navigation({ language, setLanguage, mode, setMode }: NavigationProps) {
  const t = useMemo(() => copy[language], [language]);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Optimized scroll listener
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/products", label: t.products },
    { href: "/contact", label: t.contact },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          scrolled ? "pt-2" : "pt-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.nav
            layout
            className={`relative flex items-center justify-between transition-all duration-500 ease-in-out px-6 ${
              scrolled 
                ? "h-14 rounded-2xl bg-white/80 dark:bg-[#010717]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]" 
                : "h-20 rounded-none bg-transparent border-transparent"
            }`}
          >
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group z-[10001]">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="relative w-9 h-9"
              >
                <Image src="/logo.png" alt="360 Hive" fill className="object-contain" />
              </motion.div>
              <span className={`text-xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-[#FF0066] to-[#7000FF] bg-clip-text text-transparent transition-opacity duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                360 Hive
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 hover:text-[#FF0066] dark:hover:text-white transition-all relative group"
                >
                  {link.label}
                  <span className="absolute inset-x-4 bottom-1.5 h-0.5 bg-[#FF0066] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switch */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5">
                <Globe size={13} className="text-gray-400" />
                <div className="flex gap-2">
                  {(["en", "fr", "rw"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`text-[9px] font-black transition-all ${
                        language === lang ? "text-[#FF0066]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme & CTA */}
              <button
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400"
              >
                {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-[#FF0066] to-[#7000FF] hover:opacity-90 text-white border-none rounded-xl h-10 px-6 text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-pink-500/20"
                >
                  <Link href="/contact">{t.request}</Link>
                </Button>
              </motion.div>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden p-2 text-gray-900 dark:text-white z-[10001]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? <X key="close" /> : <Menu key="menu" />}
              </AnimatePresence>
            </button>
          </motion.nav>
        </div>
      </header>

      {/* MOBILE OVERLAY (PRO MAX) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] lg:hidden"
          >
            {/* Glass Background */}
            <motion.div 
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              className="absolute inset-0 bg-white/90 dark:bg-[#010717]/95" 
            />
            
            <div className="relative h-full flex flex-col justify-center p-8">
              <div className="space-y-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between text-5xl font-black tracking-tighter italic uppercase text-gray-900 dark:text-white hover:text-[#FF0066] transition-colors"
                    >
                      {link.label}
                      <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" size={40} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-20 pt-10 border-t border-black/10 dark:border-white/10"
              >
                <div className="flex items-center justify-between mb-10">
                   <div className="flex gap-6">
                    {["en", "fr", "rw"].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLanguage(l as Language)}
                        className={`text-sm font-black uppercase tracking-widest ${language === l ? "text-[#FF0066]" : "text-gray-400"}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                    className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl"
                  >
                    {mode === "dark" ? <Sun /> : <Moon />}
                  </button>
                </div>
                
                <Button asChild className="w-full bg-gradient-to-r from-[#FF0066] to-[#7000FF] h-16 rounded-2xl text-sm font-bold uppercase tracking-[0.2em]">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>{t.request}</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}