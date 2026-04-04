"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, Twitter, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { useApp } from "@/lib/i18n-context";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const { t } = useApp();
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (key: string, val: string) => setFormData((p) => ({ ...p, [key]: val }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const contactItems = [
    { icon: Mail, label: t.contact.email_label, value: t.contact.email_val },
    { icon: Phone, label: t.contact.phone_label, value: t.contact.phone_val },
    { icon: MapPin, label: t.contact.office_label, value: t.contact.office_val },
  ];

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b py-4 focus:outline-none transition-all duration-300 text-base placeholder:text-white/30 ${
      focused === field
        ? "border-[#ff0066] text-white"
        : "border-white/15 text-white/80"
    }`;

  const labelClass = (field: string) =>
    `block text-[10px] font-bold lowercasetracking-widest mb-2 transition-colors ${
      focused === field ? "text-[#ff0066]" : "text-white/40"
    }`;

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white pt-32 pb-20 overflow-hidden">
      {/* Layered background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,150,0.13),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(120,0,255,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">

        {/* HEADER */}
        <section className="mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold lowercasetracking-[0.3em] text-white/50 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff0066] animate-pulse" />
              {t.contact.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic lowercasetracking-tighter leading-[0.85] mb-4 text-white">
              {t.contact.title1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] to-[#7000ff]">
                {t.contact.title2}
              </span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed">{t.contact.sub}</p>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* LEFT — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-4 space-y-8"
          >
            <h3 className="text-lg font-black italic lowercasetracking-tight text-white/80">{t.contact.info_title}</h3>

            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 6, boxShadow: "0 0 40px rgba(200,0,255,0.2)" }}
                  className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#ff0066]/30 transition-all duration-300 shadow-[0_0_20px_rgba(200,0,255,0.08)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0066]/10 to-[#7000ff]/10 flex items-center justify-center group-hover:from-[#ff0066] group-hover:to-[#7000ff] transition-all duration-300 flex-shrink-0 border border-white/10">
                    <item.icon size={18} className="text-[#ff0066] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold lowercasetracking-widest text-white/40 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-white/90">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] font-bold lowercasetracking-widest text-white/40 mb-4">Follow Our Work</p>
              <div className="flex gap-3">
                {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:border-[#ff0066]/40 hover:bg-[#ff0066]/10 transition-all"
                  >
                    <Icon size={16} className="text-white/40 hover:text-[#ff0066] transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-8"
          >
            <div className="relative p-px rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(255,0,102,0.25), rgba(112,0,255,0.25))" }}>
              <div className="bg-[#0a0a0f] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/[0.02] rounded-3xl pointer-events-none" />

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle2 size={36} className="text-green-500" />
                      </motion.div>
                      <h3 className="text-3xl font-black italic lowercasemb-3 text-white">{t.contact.success_title}</h3>
                      <p className="text-white/50 mb-8">{t.contact.success_sub}</p>
                      <button
                        onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                        className="px-8 py-3 rounded-xl border border-white/15 text-white/70 hover:border-white/30 hover:text-white transition-all font-bold lowercasetracking-widest text-[11px]"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <label className={labelClass("name")}>{t.contact.name}</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => update("name", e.target.value)}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            placeholder={t.contact.name_placeholder}
                            className={inputClass("name")}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClass("email")}>{t.contact.email}</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => update("email", e.target.value)}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            placeholder={t.contact.email_placeholder}
                            className={inputClass("email")}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass("subject")}>{t.contact.subject}</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => update("subject", e.target.value)}
                          onFocus={() => setFocused("subject")}
                          onBlur={() => setFocused(null)}
                          placeholder={t.contact.subject_placeholder}
                          className={inputClass("subject")}
                        />
                      </div>

                      <div>
                        <label className={labelClass("message")}>{t.contact.message}</label>
                        <textarea
                          rows={5}
                          value={formData.message}
                          onChange={(e) => update("message", e.target.value)}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          placeholder={t.contact.message_placeholder}
                          className={`${inputClass("message")} resize-none`}
                          required
                        />
                        <div className="text-right text-[10px] text-white/30 mt-1">{formData.message.length} / 1000</div>
                      </div>

                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                        >
                          <AlertCircle size={16} />
                          {t.contact.error}
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full h-14 rounded-2xl text-white font-black lowercasetracking-widest text-[11px] disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                        style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)", boxShadow: "0 0 20px rgba(200,0,255,0.4)" }}
                      >
                        {status === "loading" ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            {t.contact.sending}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {t.contact.send} <Send size={16} />
                          </span>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_0_30px_rgba(200,0,255,0.15)] hover:shadow-[0_0_50px_rgba(200,0,255,0.25)] text-center relative overflow-hidden transition-all duration-300"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,102,0.08),transparent_60%)] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-black italic lowercasetracking-tighter mb-4 text-white">
            {t.contact.cta_title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#ff0066]">{t.contact.cta_title.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">{t.contact.cta_sub}</p>
          <Link href="/quote" className="inline-flex items-center gap-2 text-sm font-black lowercasetracking-widest text-[#ff0066] hover:gap-4 transition-all group">
            {t.contact.cta_link}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
