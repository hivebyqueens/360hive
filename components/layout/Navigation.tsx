"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Globe, ChevronRight, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/i18n-context";

export function Navigation() {
  const { language, setLanguage, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = useMemo(() => [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/products", label: t.nav.work },
    { href: "/contact", label: t.nav.contact },
  ], [t]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999] pt-3 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.nav
            layout
            style={{
              background: scrolled
                ? "rgba(7, 0, 26, 0.92)"
                : "rgba(7, 0, 26, 0.65)",
              border: scrolled
                ? "1px solid rgba(255, 0, 102, 0.25)"
                : "1px solid rgba(255, 0, 102, 0.12)",
              boxShadow: scrolled
                ? "0 8px 40px rgba(255, 0, 102, 0.12), 0 0 0 1px rgba(120, 0, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
                : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
            }}
            className={`relative flex items-center justify-between transition-all duration-500 ease-in-out px-6 rounded-2xl ${
              scrolled ? "h-14" : "h-20"
            }`}
          >
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group z-[10001]">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="relative w-9 h-9">
                <Image src="/logo.png" alt="360 Hive" fill className="object-contain" />
              </motion.div>
              <span
                className="text-xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #FF0066, #7000FF)" }}
              >
                360 Hive
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                    {link.label}
                  </span>
                  <span className="absolute inset-x-4 bottom-1 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: "linear-gradient(to right, #FF0066, #7000FF)" }} />
                </Link>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switch */}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Globe size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                <div className="flex gap-2">
                  {(["en", "fr", "rw"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className="text-[9px] font-black uppercase tracking-wider transition-all duration-200"
                      style={{ color: language === lang ? "#FF0066" : "rgba(255,255,255,0.35)" }}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/quote"
                  className="flex items-center gap-2 rounded-xl px-5 h-10 text-[11px] font-bold uppercase tracking-widest text-white transition-all group"
                  style={{
                    background: "linear-gradient(135deg, #FF0066, #7000FF)",
                    boxShadow: "0 4px 20px rgba(255,0,102,0.35), 0 0 0 1px rgba(255,0,102,0.2)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 30px rgba(255,0,102,0.55), 0 0 0 1px rgba(255,0,102,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,0,102,0.35), 0 0 0 1px rgba(255,0,102,0.2)")}
                >
                  {t.nav.quote}
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden p-2 z-[10001] rounded-xl transition-all"
              style={{ color: "rgba(255,255,255,0.8)", background: isOpen ? "rgba(255,0,102,0.1)" : "transparent" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </motion.nav>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(24px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0"
              style={{ background: "rgba(7, 0, 26, 0.97)" }}
            />

            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,0,102,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

            <div className="relative h-full flex flex-col justify-center px-8">
              {/* Nav links */}
              <div className="space-y-2 mb-12">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between py-4 text-4xl font-black tracking-tighter italic uppercase transition-all duration-200"
                      style={{ color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                    >
                      <span className="group-hover:text-[#FF0066] transition-colors">{link.label}</span>
                      <ChevronRight
                        size={28}
                        className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-200 text-[#FF0066]"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom bar */}
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="space-y-6"
              >
                {/* Language */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Globe size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
                  <div className="flex gap-5">
                    {(["en", "fr", "rw"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLanguage(l)}
                        className="text-sm font-black uppercase tracking-widest transition-all"
                        style={{ color: language === l ? "#FF0066" : "rgba(255,255,255,0.35)" }}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/quote"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #FF0066, #7000FF)",
                    boxShadow: "0 8px 32px rgba(255,0,102,0.4)",
                  }}
                >
                  {t.nav.quote}
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
