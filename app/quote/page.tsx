"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Video, Megaphone, Lightbulb, GraduationCap, 
  Palette, ChevronRight, ChevronLeft, Send, Sparkles, 
  ShieldCheck, Clock, CheckCircle2, Upload, Bot, Zap, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ServiceId = 1 | 2 | 3 | 4 | 5 | 6;
const services = [
  { id: 1, title: "Software & Web Development", icon: Code2, desc: "Apps, Databases & Custom Solutions" },
  { id: 2, title: "Digital Content & Media", icon: Video, desc: "Post-production & Visual Materials" },
  { id: 3, title: "Marketing & Advertising", icon: Megaphone, desc: "Campaigns & Customer Attraction" },
  { id: 4, title: "Technical Consulting", icon: Lightbulb, desc: "Professional Professional Services" },
  { id: 5, title: "Education & Training", icon: GraduationCap, desc: "Digital Learning & Workshops" },
  { id: 6, title: "Graphic Design", icon: Palette, desc: "Branding & Visual Communication" },
];
const budgetRanges = ["$100 – $500", "$500 – $2,000", "$2,000 – $10,000", "$10,000+"];
const timelines = ["Urgent (1–7 days)", "Short (2–4 weeks)", "Medium (1–3 months)", "Flexible"];

export default function RequestQuote() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "",
    description: "", budget: budgetRanges[1], timeline: timelines[1]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // --- Form Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem("hive-quote-draft");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("hive-quote-draft", JSON.stringify(formData));
  }, [formData]);

  const toggleService = (id: ServiceId) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  return (
    <main className="min-h-screen bg-[#010717] text-white pt-32 pb-20 px-6 relative overflow-hidden selection:bg-[#ff0066]/30">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ff0066] rounded-full blur-[150px] opacity-10 animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#200048] rounded-full blur-[150px] opacity-20" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 104l30-17.32V17.32L30 0 0 17.32v69.36L30 104zm0-5.773L5.001 83.66V20.34L30 5.773l24.999 14.567v63.32L30 98.227z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: '100px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <section className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff0066] mb-6">
              <Sparkles size={14} /> Tailored Solutions
            </span>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
              Request a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] to-[#7000ff]">Quote</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto font-medium">
              Transform your vision into a digital masterpiece. Tell us about your project.
            </p>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* LEFT: FORM WIZARD (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="relative bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl overflow-hidden group">
              {/* Progress Indicator */}
              <div className="flex items-center gap-4 mb-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                      step >= i ? "bg-[#ff0066] border-[#ff0066] shadow-[0_0_15px_rgba(255,0,102,0.5)]" : "border-white/20 text-gray-500"
                    }`}>
                      {i}
                    </div>
                    <div className={`h-[2px] flex-1 rounded-full ${step > i ? "bg-[#ff0066]" : "bg-white/10"}`} />
                  </div>
                ))}
              </div>

              {/* STEP CONTENT */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-3xl font-black italic uppercase mb-8">Select Your Services</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => toggleService(s.id as ServiceId)}
                          className={`p-6 rounded-2xl border text-left transition-all relative group overflow-hidden ${
                            selectedServices.includes(s.id as ServiceId) 
                              ? "bg-[#ff0066]/10 border-[#ff0066] shadow-[0_0_20px_rgba(255,0,102,0.1)]" 
                              : "bg-white/5 border-white/10 hover:border-white/30"
                          }`}
                        >
                          <s.icon className={`mb-4 transition-colors ${selectedServices.includes(s.id as ServiceId) ? "text-[#ff0066]" : "text-gray-500"}`} size={28} />
                          <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                          <p className="text-xs text-gray-500">{s.desc}</p>
                          {selectedServices.includes(s.id as ServiceId) && (
                            <motion.div layoutId="check" className="absolute top-4 right-4 text-[#ff0066]">
                              <CheckCircle2 size={20} />
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-3xl font-black italic uppercase mb-8">The Specifics</h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <FormInput label="Full Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} placeholder="John Doe" />
                      <FormInput label="Email Address" type="email" value={formData.email} onChange={v => setFormData({...formData, email: v})} placeholder="john@example.com" />
                      <FormInput label="Phone (Optional)" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} placeholder="+250..." />
                      <FormInput label="Company (Optional)" value={formData.company} onChange={v => setFormData({...formData, company: v})} placeholder="HIVE Inc." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Project Description</label>
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[150px] focus:outline-none focus:border-[#ff0066] transition-colors"
                        placeholder="Tell us about the scope, features, and goals..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-3xl font-black italic uppercase mb-8">Timeline & Investment</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Budget Range</label>
                         <div className="grid gap-3">
                            {budgetRanges.map(b => (
                              <button 
                                key={b} 
                                onClick={() => setFormData({...formData, budget: b})}
                                className={`px-6 py-4 rounded-xl border text-sm font-bold transition-all ${
                                  formData.budget === b ? "bg-[#ff0066] border-[#ff0066] text-white" : "bg-white/5 border-white/10 text-gray-400"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-6">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Timeline Expectation</label>
                         <div className="grid gap-3">
                            {timelines.map(t => (
                              <button 
                                key={t} 
                                onClick={() => setFormData({...formData, timeline: t})}
                                className={`px-6 py-4 rounded-xl border text-sm font-bold transition-all ${
                                  formData.timeline === t ? "bg-[#7000ff] border-[#7000ff] text-white" : "bg-white/5 border-white/10 text-gray-400"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                         </div>
                      </div>
                    </div>
                    
                    <div className="mt-12 p-8 border-2 border-dashed border-white/10 rounded-3xl text-center group hover:border-[#ff0066]/50 transition-colors">
                        <Upload className="mx-auto text-gray-500 mb-4 group-hover:text-[#ff0066] transition-colors" size={32} />
                        <p className="text-sm font-bold text-gray-400">Drag & drop project brief or <span className="text-[#ff0066]">browse files</span></p>
                        <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest">PDF, DOCX, PNG (Max 10MB)</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* NAV BUTTONS */}
              <div className="mt-12 flex justify-between gap-4">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack} className="rounded-2xl px-8 h-14 border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[10px]">
                    <ChevronLeft className="mr-2" size={16} /> Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button onClick={handleNext} disabled={step === 1 && selectedServices.length === 0} className="ml-auto rounded-2xl px-10 h-14 bg-white text-black hover:bg-[#ff0066] hover:text-white font-black uppercase tracking-widest text-[10px]">
                    Continue <ChevronRight className="ml-2" size={16} />
                  </Button>
                ) : (
                  <Button onClick={() => setIsSubmitting(true)} className="ml-auto rounded-2xl px-10 h-14 bg-gradient-to-r from-[#ff0066] to-[#7000ff] text-white font-black uppercase tracking-widest text-[10px] shadow-[0_10px_30px_rgba(255,0,102,0.3)]">
                    {isSubmitting ? "Transmitting..." : "Submit Request"} <Send className="ml-2" size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: AI ASSISTANT & TRUST (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Assistant Card */}
            <div className="bg-gradient-to-br from-[#ff0066]/20 to-[#200048]/20 border border-[#ff0066]/20 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden">
               <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-[#ff0066] blur-[60px] opacity-20" />
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#ff0066] flex items-center justify-center animate-pulse">
                    <Bot size={20} />
                  </div>
                  <h4 className="font-black italic uppercase text-xs tracking-[0.2em]">Hive AI Assistant</h4>
               </div>
               
               <div className="space-y-4">
                  <div className="bg-[#010717]/50 rounded-2xl p-4 text-xs leading-relaxed text-gray-300 border border-white/5">
                    {getAIMessage(step, selectedServices, formData.description)}
                  </div>
                  <div className="grid gap-2">
                    <PrincipleItem icon={Zap} text="Structure First" />
                    <PrincipleItem icon={Palette} text="Full Design" />
                    <PrincipleItem icon={Layers} text="Full Functionality" />
                  </div>
               </div>
            </div>

            {/* Trust Reassurance */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
               <TrustItem icon={Clock} title="24-Hour Response" desc="We process requests within one business day." />
               <TrustItem icon={ShieldCheck} title="Secure & Private" desc="Your ideas are protected by our strict NDA." />
            </div>

            {/* Direct Contact */}
            <div className="px-8 py-6 rounded-3xl bg-[#ff0066] text-center group cursor-pointer">
               <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Direct Contact</p>
               <h5 className="font-black text-lg group-hover:scale-105 transition-transform">hello@360hive.com</h5>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// --- Sub-components ---

function FormInput({ label, value, onChange, type = "text", placeholder }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-2">
      <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${focused ? "text-[#ff0066]" : "text-gray-500"}`}>{label}</label>
      <input 
        type={type} 
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 h-14 focus:outline-none focus:border-[#ff0066] transition-all text-sm"
      />
    </div>
  );
}

function PrincipleItem({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
      <Icon size={14} className="text-[#ff0066]" /> {text}
    </div>
  );
}

function TrustItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-gray-400" />
      </div>
      <div>
        <h6 className="text-xs font-black uppercase tracking-widest mb-1">{title}</h6>
        <p className="text-[10px] text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function getAIMessage(step: number, selected: number[], desc: string) {
  if (step === 1) {
    return selected.length === 0 
      ? "Choose at least one service to start. Our Software team is currently 20% faster than industry average." 
      : `Great choice! Combining ${selected.length} services helps us ensure 'Full Functionality' across your project.`;
  }
  if (step === 2) {
    if (desc.length < 20) return "Try to describe your target audience. It helps our Graphic Design team align with your brand.";
    return "Based on your description, I recommend our 'Structure First' approach to ensure long-term scalability.";
  }
  return "Reviewing your budget and timeline... We can provide a dedicated technical lead for this project scope.";
}