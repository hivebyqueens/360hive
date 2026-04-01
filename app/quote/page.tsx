"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Video, Megaphone, Lightbulb, GraduationCap,
  Palette, ChevronRight, ChevronLeft, Send, Sparkles,
  ShieldCheck, Clock, CheckCircle2, Upload, Bot, Zap, Layers,
} from "lucide-react";
import { useApp } from "@/lib/i18n-context";

type ServiceId = 1 | 2 | 3 | 4 | 5 | 6;
type Status = "idle" | "loading" | "success" | "error";

const budgetRanges = ["$100 – $500", "$500 – $2,000", "$2,000 – $10,000", "$10,000+"];
const timelines = ["Urgent (1–7 days)", "Short (2–4 weeks)", "Medium (1–3 months)", "Flexible"];

function FormInput({
  label, value, onChange, type = "text", placeholder, required = false,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${focused ? "text-[#ff0066]" : "text-white/40"}`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 h-13 focus:outline-none focus:border-[#ff0066] transition-all text-sm text-white placeholder:text-white/25"
      />
    </div>
  );
}

export default function RequestQuote() {
  const { t } = useApp();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "",
    description: "", budget: budgetRanges[1], timeline: timelines[1],
  });

  const services = [
    { id: 1 as ServiceId, title: "Software & Web Development", icon: Code2, desc: "Apps, Databases & Custom Solutions" },
    { id: 2 as ServiceId, title: "Digital Content & Media", icon: Video, desc: "Post-production & Visual Materials" },
    { id: 3 as ServiceId, title: "Marketing & Advertising", icon: Megaphone, desc: "Campaigns & Customer Attraction" },
    { id: 4 as ServiceId, title: "Technical Consulting", icon: Lightbulb, desc: "Strategic Advisory Services" },
    { id: 5 as ServiceId, title: "Education & Training", icon: GraduationCap, desc: "Digital Learning & Workshops" },
    { id: 6 as ServiceId, title: "Graphic Design", icon: Palette, desc: "Branding & Visual Communication" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hive-quote-draft");
    if (saved) { try { setFormData(JSON.parse(saved)); } catch {} }
  }, []);

  useEffect(() => {
    localStorage.setItem("hive-quote-draft", JSON.stringify(formData));
  }, [formData]);

  const toggleService = (id: ServiceId) =>
    setSelectedServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const update = (key: string, val: string) => setFormData((p) => ({ ...p, [key]: val }));

  async function handleSubmit() {
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: selectedServices, ...formData }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function getAIMessage() {
    if (step === 1) return selectedServices.length === 0
      ? "Select the services you need. Our team covers software, media, marketing, and design."
      : `Great — ${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""} selected. We'll craft a proposal covering all of them.`;
    if (step === 2) return formData.description.length < 20
      ? "Describe your project in detail — the more context you give, the better our proposal will be."
      : "Good description. We'll use this to tailor our technical approach and timeline.";
    return "We're almost done. Select a budget and timeline so we can scope the right team for you.";
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-6">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,150,0.13),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(120,0,255,0.15),transparent_45%)]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
            className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 size={44} className="text-green-500" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-black italic uppercase tracking-tight mb-4 text-white">{t.quote.success_title}</h2>
            <p className="text-white/50 leading-relaxed mb-8">{t.quote.success_sub}</p>
            <button
              onClick={() => { setStatus("idle"); setStep(1); setSelectedServices([]); }}
              className="px-10 py-3 rounded-2xl font-bold uppercase tracking-widest text-[11px] text-white transition-all"
              style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)", boxShadow: "0 0 20px rgba(200,0,255,0.4)" }}
            >
              Submit Another
            </button>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-32 pb-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Layered background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,150,0.13),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(120,0,255,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff0066] mb-6">
            <Sparkles size={12} /> {t.quote.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter mb-4 text-white">
            {t.quote.title1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] to-[#7000ff]">{t.quote.title2}</span>
          </h1>
          <p className="text-white/50 max-w-lg mx-auto">{t.quote.sub}</p>
        </motion.section>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* FORM WIZARD */}
          <div className="lg:col-span-8">
            <div className="relative p-px rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(255,0,102,0.2), rgba(112,0,255,0.2))" }}>
              <div className="bg-[#0a0a0f] rounded-3xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/[0.02] rounded-3xl pointer-events-none" />

                {/* Progress */}
                <div className="flex items-center gap-3 mb-10">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
                      <motion.div
                        animate={{ scale: step === i ? 1.1 : 1 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
                          step > i ? "bg-[#ff0066] border-[#ff0066] text-white" :
                          step === i ? "border-[#ff0066] text-[#ff0066]" :
                          "border-white/15 text-white/40"
                        }`}
                      >
                        {step > i ? <CheckCircle2 size={14} /> : i}
                      </motion.div>
                      {i < 3 && (
                        <div className="flex-1 h-px rounded-full overflow-hidden bg-white/10">
                          <motion.div
                            animate={{ width: step > i ? "100%" : "0%" }}
                            transition={{ duration: 0.4 }}
                            className="h-full bg-[#ff0066]"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">
                    {t.quote.step} {step} {t.quote.of} 3
                  </span>
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-black italic uppercase tracking-tight mb-2 text-white">{t.quote.step1_title}</h2>
                      <p className="text-white/40 text-sm mb-8">Select all that apply</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map((s) => {
                          const selected = selectedServices.includes(s.id);
                          return (
                            <motion.button
                              key={s.id}
                              onClick={() => toggleService(s.id)}
                              whileTap={{ scale: 0.98 }}
                              whileHover={{ scale: 1.02 }}
                              className={`p-5 rounded-2xl border text-left transition-all relative group overflow-hidden backdrop-blur-lg ${
                                selected
                                  ? "bg-[#ff0066]/10 border-[#ff0066]/50 shadow-[0_0_20px_rgba(255,0,102,0.15)]"
                                  : "bg-white/5 border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(200,0,255,0.12)]"
                              }`}
                            >
                              <s.icon className={`mb-3 transition-colors ${selected ? "text-[#ff0066]" : "text-white/40"}`} size={24} />
                              <h3 className="font-bold text-sm mb-1 text-white">{s.title}</h3>
                              <p className="text-xs text-white/40">{s.desc}</p>
                              {selected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-3 right-3 text-[#ff0066]"
                                >
                                  <CheckCircle2 size={18} />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-black italic uppercase tracking-tight mb-2 text-white">{t.quote.step2_title}</h2>
                      <p className="text-white/40 text-sm mb-8">So we know who we're talking to</p>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <FormInput label={t.quote.name} value={formData.name} onChange={(v) => update("name", v)} placeholder={t.quote.name_placeholder} required />
                        <FormInput label={t.quote.email} type="email" value={formData.email} onChange={(v) => update("email", v)} placeholder={t.quote.email_placeholder} required />
                        <FormInput label={t.quote.phone} value={formData.phone} onChange={(v) => update("phone", v)} placeholder={t.quote.phone_placeholder} />
                        <FormInput label={t.quote.company} value={formData.company} onChange={(v) => update("company", v)} placeholder={t.quote.company_placeholder} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t.quote.description}</label>
                        <textarea
                          rows={4}
                          value={formData.description}
                          onChange={(e) => update("description", e.target.value)}
                          placeholder={t.quote.description_placeholder}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#ff0066] transition-all text-sm resize-none text-white placeholder:text-white/25"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-black italic uppercase tracking-tight mb-2 text-white">{t.quote.step3_title}</h2>
                      <p className="text-white/40 text-sm mb-8">Help us understand the scope</p>
                      <div className="grid md:grid-cols-2 gap-10">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 block">{t.quote.budget_label}</label>
                          <div className="space-y-2.5">
                            {budgetRanges.map((b) => (
                              <button
                                key={b}
                                onClick={() => update("budget", b)}
                                className={`w-full px-5 py-3.5 rounded-xl border text-sm font-bold text-left transition-all ${
                                  formData.budget === b
                                    ? "bg-[#ff0066] border-[#ff0066] text-white shadow-[0_0_20px_rgba(255,0,102,0.3)]"
                                    : "bg-white/5 border-white/10 text-white/60 hover:border-[#ff0066]/30 hover:text-white"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 block">{t.quote.timeline_label}</label>
                          <div className="space-y-2.5">
                            {timelines.map((tl) => (
                              <button
                                key={tl}
                                onClick={() => update("timeline", tl)}
                                className={`w-full px-5 py-3.5 rounded-xl border text-sm font-bold text-left transition-all ${
                                  formData.timeline === tl
                                    ? "bg-[#7000ff] border-[#7000ff] text-white shadow-[0_0_20px_rgba(112,0,255,0.3)]"
                                    : "bg-white/5 border-white/10 text-white/60 hover:border-[#7000ff]/30 hover:text-white"
                                }`}
                              >
                                {tl}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* File upload */}
                      <div className="mt-8 p-7 border-2 border-dashed border-white/10 rounded-2xl text-center group hover:border-[#ff0066]/40 transition-colors cursor-pointer">
                        <Upload className="mx-auto text-white/30 mb-3 group-hover:text-[#ff0066] transition-colors" size={28} />
                        <p className="text-sm text-white/50">
                          {t.quote.file_label}{" "}
                          <span className="text-[#ff0066] font-bold cursor-pointer">{t.quote.file_browse}</span>
                        </p>
                        <p className="text-[10px] text-white/25 mt-1.5 uppercase tracking-widest">{t.quote.file_types}</p>
                      </div>

                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                        >
                          Something went wrong. Please try again.
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-10 flex justify-between gap-4">
                  {step > 1 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="px-6 h-12 rounded-xl border border-white/15 font-bold uppercase tracking-widest text-[10px] text-white/60 hover:border-white/30 hover:text-white transition-all flex items-center gap-1"
                    >
                      <ChevronLeft size={15} /> {t.quote.back}
                    </button>
                  )}
                  <div className="ml-auto">
                    {step < 3 ? (
                      <button
                        onClick={() => setStep((s) => s + 1)}
                        disabled={step === 1 && selectedServices.length === 0}
                        className="px-8 h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] text-white transition-all disabled:opacity-40 flex items-center gap-1"
                        style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)", boxShadow: "0 0 20px rgba(200,0,255,0.3)" }}
                      >
                        {t.quote.next} <ChevronRight size={15} />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={status === "loading" || !formData.name || !formData.email}
                        className="px-10 h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] text-white disabled:opacity-50 flex items-center gap-2 transition-all"
                        style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)", boxShadow: "0 0 20px rgba(200,0,255,0.3)" }}
                      >
                        {status === "loading" ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            {t.quote.submitting}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {t.quote.submit} <Send size={14} />
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-5">
            {/* AI Assistant */}
            <div className="relative p-px rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,0,102,0.3), rgba(112,0,255,0.3))" }}>
              <div className="bg-[#0a0a0f] rounded-3xl p-7">
                <div className="absolute inset-0 bg-white/[0.02] rounded-3xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff0066] to-[#7000ff] flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <h4 className="font-black italic uppercase text-xs tracking-widest text-white">{t.quote.ai_title}</h4>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step + selectedServices.length + formData.description.length}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-white/5 rounded-2xl p-4 text-sm leading-relaxed text-white/70 border border-white/10 mb-5"
                  >
                    {getAIMessage()}
                  </motion.div>
                </AnimatePresence>
                <div className="space-y-2.5">
                  {[{ icon: Zap, text: "Structure First" }, { icon: Palette, text: "Full Design" }, { icon: Layers, text: "Full Functionality" }].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      <Icon size={12} className="text-[#ff0066]" /> {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-7 space-y-5 shadow-[0_0_30px_rgba(200,0,255,0.1)]">
              {[
                { icon: Clock, title: t.quote.trust_response, desc: t.quote.trust_response_desc },
                { icon: ShieldCheck, title: t.quote.trust_secure, desc: t.quote.trust_secure_desc },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-white/40" />
                  </div>
                  <div>
                    <h6 className="text-xs font-black uppercase tracking-widest mb-1 text-white">{title}</h6>
                    <p className="text-[11px] text-white/50 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct contact */}
            <a
              href="mailto:hello@360hive.rw"
              className="block px-7 py-5 rounded-2xl text-center group hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(200,0,255,0.3)]"
              style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)" }}
            >
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/70 mb-1">{t.quote.direct_contact}</p>
              <h5 className="font-black text-white group-hover:scale-105 transition-transform text-sm">hello@360hive.rw</h5>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
