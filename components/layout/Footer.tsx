"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Instagram, Twitter, ArrowRight, Plus, Globe, ShieldCheck, Music2 } from "lucide-react";
import { useApp } from "@/lib/i18n-context";

export function Footer() {
  const { t } = useApp();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  }

  function handleMouseLeave() { x.set(0); y.set(0); }

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.work, href: "/products" },
    { label: t.nav.quote, href: "/quote" },
  ];

  const serviceNames = t.services_list.map((s) => s.title);

  return (
    <footer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#010717] dark:bg-[#010717] text-gray-400 pt-24 pb-10 overflow-hidden border-t border-white/5"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, #ffffff06 1px, transparent 1px), linear-gradient(to bottom, #ffffff06 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            transform: "rotateX(60deg) translateY(-120px)",
            transformOrigin: "top",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010717] via-transparent to-[#010717]" />
      </div>

      {/* Ambient orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 w-[450px] h-[450px] bg-[#FF0066] blur-[140px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#200048] blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Newsletter CTA */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="mb-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12"
        >
          <div className="max-w-2xl" style={{ transform: "translateZ(40px)" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-600 mb-4">{t.footer.newsletter}</p>
            <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.85]">
              {t.footer.newsletter_sub.split(" ").slice(0, 3).join(" ")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#7000ff] to-[#FF0066]">
                360 Hive.
              </span>
            </h3>
          </div>

          <form
            style={{ transform: "translateZ(30px)" }}
            className="w-full lg:w-auto"
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
              } catch {
                setStatus("error");
              }
            }}
          >
            {status === "success" ? (
              <p className="text-[#FF0066] font-black uppercase tracking-widest text-lg">{t.footer.subscribed} ✓</p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center border-b-2 border-white/10 py-3 focus-within:border-[#FF0066] transition-all duration-500">
                  <input
                    type="email"
                    placeholder={t.footer.placeholder.toUpperCase()}
                    className="bg-transparent border-none w-full lg:w-[380px] px-0 py-2 text-white text-lg font-black uppercase tracking-widest focus:outline-none placeholder:text-gray-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.2, x: 8 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-4 text-[#FF0066] disabled:opacity-50"
                    disabled={status === "loading"}
                  >
                    {status === "loading"
                      ? <span className="w-5 h-5 border-2 border-[#FF0066] border-t-transparent rounded-full animate-spin inline-block" />
                      : <ArrowRight size={32} strokeWidth={2.5} />}
                  </motion.button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-400 font-bold uppercase tracking-widest">Something went wrong. Try again.</p>
                )}
              </div>
            )}
          </form>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic bg-gradient-to-br from-[#FF0066] to-[#7000ff] bg-clip-text text-transparent mb-2">
                360 Hive
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed max-w-[180px]">{t.footer.tagline}</p>
            </div>
            <div className="flex gap-4">
              {[Globe, Instagram, Twitter, Music2].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-gray-600 hover:text-[#FF0066] hover:border-[#FF0066]/30 transition-all"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <p className="text-[10px] text-gray-700 uppercase tracking-widest">{t.footer.location}</p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-white text-[9px] font-black uppercase tracking-[0.5em] mb-8 opacity-25">{t.footer.links}</h4>
            <ul className="space-y-5">
              {navLinks.map((link) => (
                <motion.li key={link.href} whileHover={{ x: 6 }}>
                  <Link
                    href={link.href}
                    className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center gap-3 group"
                  >
                    <span className="w-0 h-px bg-[#FF0066] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-[9px] font-black uppercase tracking-[0.5em] mb-8 opacity-25">{t.footer.services_label}</h4>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-1">
              {serviceNames.map((service, i) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group flex items-center justify-between border-b border-white/[0.04] py-3 cursor-default overflow-hidden relative"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#FF0066]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 group-hover:text-white transition-colors relative z-10">
                    {service}
                  </span>
                  <Plus size={12} className="text-gray-700 group-hover:text-[#FF0066] transition-colors relative z-10 flex-shrink-0 ml-2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-700">
              <ShieldCheck size={11} className="text-[#FF0066]" />
              Encrypted Protocol
            </div>
            <p className="text-[9px] text-gray-700 uppercase tracking-widest font-bold">{t.footer.copyright}</p>
          </div>
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest">
            <Link href="/privacy" className="text-gray-700 hover:text-[#FF0066] transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="text-gray-700 hover:text-[#FF0066] transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
