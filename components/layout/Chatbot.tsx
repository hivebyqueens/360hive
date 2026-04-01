"use client";

import { useState, FormEvent, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, X, MessageSquare, Bot, User, ChevronRight,
  Sparkles, Zap, ArrowRight,
} from "lucide-react";
import Link from "next/link";

type Language = "en" | "fr" | "rw";
type Role = "assistant" | "user";
type ChatMessage = { role: Role; text: string; options?: string[] };
type FlowStep = "START" | "SERVICE_DETAILS" | "BUDGET" | "TIMELINE" | "SUMMARY";

const copy = {
  en: {
    title: "Hive Concierge",
    status: "Online • Ready to Build",
    placeholder: "Type your message...",
    cta: "Request a Formal Quote",
    poweredBy: "Powered by 360 Hive AI",
  },
  fr: {
    title: "Concierge Hive",
    status: "En ligne • Prêt à bâtir",
    placeholder: "Tapez votre message...",
    cta: "Demander un devis formel",
    poweredBy: "Propulsé par 360 Hive AI",
  },
  rw: {
    title: "Hive Concierge",
    status: "Kuri murandasi",
    placeholder: "Andika ubutumwa...",
    cta: "Saba igiciro kirambuye",
    poweredBy: "Ikoreshwa na 360 Hive AI",
  },
} as const;

/* ── Typing indicator ─────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ff0066] to-[#7000ff]"
        />
      ))}
    </div>
  );
}

export function Chatbot({ language }: { language: Language }) {
  const t = useMemo(() => copy[language], [language]);
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hello! I am the 360 Hive digital architect. What digital experience can we create for you today?",
      options: ["Website", "Media Production", "Marketing", "Graphic Design"],
    },
  ]);

  const [currentFlow, setCurrentFlow] = useState<FlowStep>("START");
  const [userSelections, setUserSelections] = useState({
    service: "", detail: "", budget: "", timeline: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  const addMessage = (role: Role, text: string, options?: string[]) => {
    setMessages((prev) => [...prev, { role, text, options }]);
  };

  const handleBotLogic = (input: string) => {
    const text = input.toLowerCase();
    setIsTyping(true);

    const respond = (msg: string, opts?: string[]) => {
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", msg, opts);
      }, 1000);
    };

    if (currentFlow === "START") {
      if (text.includes("web") || text.includes("site")) {
        setUserSelections((p) => ({ ...p, service: "Web Development" }));
        setCurrentFlow("SERVICE_DETAILS");
        respond("Excellent. High-performance architecture is our specialty. What type of site are we building?", [
          "Business Website", "E-commerce", "Portfolio", "Custom Software System",
        ]);
      } else if (text.includes("media") || text.includes("video")) {
        setUserSelections((p) => ({ ...p, service: "Media Production" }));
        setCurrentFlow("SERVICE_DETAILS");
        respond("Visual storytelling defines the brand. Are you looking for:", [
          "Video Post-Production", "Digital Content", "Promotional Materials",
        ]);
      } else {
        setCurrentFlow("BUDGET");
        respond("I've noted that interest. What is your estimated budget for this project?", [
          "Under $500", "$500 – $2k", "$2k – $10k", "Enterprise/Custom",
        ]);
      }
      return;
    }

    if (currentFlow === "SERVICE_DETAILS") {
      setUserSelections((p) => ({ ...p, detail: input }));
      setCurrentFlow("BUDGET");
      respond(`Got it: ${input}. To align our resources, what is your investment range?`, [
        "Under $500", "$500 – $2k", "$2k – $10k", "Enterprise/Custom",
      ]);
      return;
    }

    if (currentFlow === "BUDGET") {
      setUserSelections((p) => ({ ...p, budget: input }));
      setCurrentFlow("TIMELINE");
      respond("Perfect. And what is your target launch date?", [
        "Urgent (1 week)", "Short (2–4 weeks)", "Medium (1–3 months)", "Flexible",
      ]);
      return;
    }

    if (currentFlow === "TIMELINE") {
      setUserSelections((p) => ({ ...p, timeline: input }));
      setCurrentFlow("SUMMARY");
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", "Analysis complete. Based on your inputs, I recommend our Full-Stack Digital approach for maximum impact.");
        setTimeout(() => {
          addMessage("assistant", "Ready to transmit your brief to our human team for a formal proposal?");
        }, 800);
      }, 1000);
      return;
    }

    respond("I am here to help. You can also reach us directly at hello@360hive.com.");
  };

  const onOptionClick = (option: string) => {
    addMessage("user", option);
    handleBotLogic(option);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const val = chatInput;
    addMessage("user", val);
    setChatInput("");
    handleBotLogic(val);
  };

  return (
    <>
      {/* ── OVERLAY on mobile when open ───────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-[9999] flex flex-col items-end gap-4">

        {/* ── CHAT WINDOW ───────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="
                w-[calc(100vw-2rem)] sm:w-[400px] md:w-[440px]
                h-[80vh] sm:h-[580px]
                flex flex-col overflow-hidden
                rounded-[2rem] sm:rounded-[2.5rem]
                border border-white/10
                shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,0,102,0.08)]
              "
              style={{
                background: "linear-gradient(160deg, rgba(10,4,28,0.97) 0%, rgba(7,0,20,0.97) 100%)",
                backdropFilter: "blur(32px)",
              }}
            >
              {/* ── Header ─────────────────────────────── */}
              <div
                className="relative flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] flex-shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(255,0,102,0.07), rgba(112,0,255,0.07))" }}
              >
                {/* Gradient avatar */}
                <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,0,102,0.4)]"
                  style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)" }}>
                  <Bot size={18} className="text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0a0418]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-black uppercase tracking-widest text-white italic truncate">{t.title}</h3>
                    <Sparkles size={11} className="text-[#ff0066] flex-shrink-0" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 truncate">{t.status}</p>
                </div>

                {/* Close */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all flex-shrink-0"
                >
                  <X size={14} />
                </motion.button>
              </div>

              {/* ── Messages ───────────────────────────── */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-4"
                style={{ scrollbarWidth: "none" }}
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[88%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mb-0.5"
                          style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)" }}>
                          <Bot size={12} className="text-white" />
                        </div>
                      )}
                      {msg.role === "user" && (
                        <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 mb-0.5">
                          <User size={12} className="text-white/60" />
                        </div>
                      )}

                      {/* Bubble */}
                      <div
                        className={`px-4 py-3 text-[13px] leading-relaxed font-medium ${
                          msg.role === "user"
                            ? "text-white rounded-2xl rounded-br-sm"
                            : "text-white/80 rounded-2xl rounded-bl-sm border border-white/[0.08]"
                        }`}
                        style={
                          msg.role === "user"
                            ? { background: "linear-gradient(135deg,#ff0066,#7000ff)", boxShadow: "0 4px 20px rgba(255,0,102,0.25)" }
                            : { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }
                        }
                      >
                        {msg.text}
                      </div>
                    </div>

                    {/* Quick reply chips */}
                    {msg.options && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-wrap gap-2 pl-9"
                      >
                        {msg.options.map((opt) => (
                          <motion.button
                            key={opt}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => onOptionClick(opt)}
                            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all duration-200 border"
                            style={{
                              background: "rgba(255,0,102,0.06)",
                              borderColor: "rgba(255,0,102,0.25)",
                              color: "#ff6699",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "linear-gradient(135deg,#ff0066,#7000ff)";
                              e.currentTarget.style.borderColor = "transparent";
                              e.currentTarget.style.color = "#fff";
                              e.currentTarget.style.boxShadow = "0 0 16px rgba(255,0,102,0.35)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255,0,102,0.06)";
                              e.currentTarget.style.borderColor = "rgba(255,0,102,0.25)";
                              e.currentTarget.style.color = "#ff6699";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {opt}
                            <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-end gap-2"
                    >
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)" }}>
                        <Bot size={12} className="text-white" />
                      </div>
                      <div className="rounded-2xl rounded-bl-sm border border-white/[0.08]"
                        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Summary CTA card (purple) ──────────── */}
                <AnimatePresence>
                  {currentFlow === "SUMMARY" && (
                    <motion.div
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 22 }}
                      className="mt-2 p-px rounded-2xl"
                      style={{ background: "linear-gradient(135deg,rgba(255,0,102,0.5),rgba(112,0,255,0.5))" }}
                    >
                      <div
                        className="rounded-2xl p-5 relative overflow-hidden"
                        style={{ background: "linear-gradient(160deg, rgba(80,0,160,0.55) 0%, rgba(20,0,50,0.85) 100%)", backdropFilter: "blur(20px)" }}
                      >
                        {/* Ambient glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full pointer-events-none"
                          style={{ background: "radial-gradient(circle,rgba(255,0,102,0.35),transparent 70%)", filter: "blur(16px)" }} />

                        <div className="relative z-10 space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                              style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)" }}>
                              <Zap size={13} className="text-white" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Brief Ready</p>
                          </div>

                          {/* Summary pills */}
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { label: "Service", value: userSelections.service || userSelections.detail || "Custom" },
                              { label: "Budget", value: userSelections.budget || "Flexible" },
                              { label: "Detail", value: userSelections.detail || "Consulting" },
                              { label: "Timeline", value: userSelections.timeline || "TBD" },
                            ].map(({ label, value }) => (
                              <div key={label} className="px-3 py-2 rounded-xl"
                                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-0.5">{label}</p>
                                <p className="text-[11px] font-bold text-white truncate">{value}</p>
                              </div>
                            ))}
                          </div>

                          <Link href="/quote" onClick={() => setIsOpen(false)}>
                            <motion.div
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all"
                              style={{
                                background: "linear-gradient(135deg,#ff0066,#7000ff)",
                                boxShadow: "0 0 24px rgba(255,0,102,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                              }}
                            >
                              {t.cta}
                              <ArrowRight size={13} />
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Input ──────────────────────────────── */}
              <div className="flex-shrink-0 p-3 sm:p-4 border-t border-white/[0.06]"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <form
                  onSubmit={onSubmit}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/10"
                  style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
                >
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-white/25 min-w-0"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!chatInput.trim()}
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-30 transition-all"
                    style={chatInput.trim()
                      ? { background: "linear-gradient(135deg,#ff0066,#7000ff)", boxShadow: "0 0 14px rgba(255,0,102,0.4)" }
                      : { background: "rgba(255,255,255,0.06)" }
                    }
                  >
                    <Send size={14} className="text-white" />
                  </motion.button>
                </form>

                <p className="text-center text-[9px] font-bold uppercase tracking-widest text-white/20 mt-2.5">
                  {t.poweredBy}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FAB ───────────────────────────────────────── */}
        <div className="relative">
          {/* Unread badge */}
          <AnimatePresence>
            {hasUnread && !isOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 z-10 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)" }}
              >
                1
              </motion.span>
            )}
          </AnimatePresence>

          {/* Pulsing ring */}
          {!isOpen && (
            <motion.span
              animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)" }}
            />
          )}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(255,0,102,0.45)] overflow-hidden border border-white/10"
            style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)" }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} className="text-white" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <MessageSquare size={22} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

      </div>
    </>
  );
}
