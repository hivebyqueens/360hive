"use client";

import { useState, FormEvent, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Sparkles, Bot, User, ChevronRight } from "lucide-react";
import Link from "next/link";

type Language = "en" | "fr" | "rw";
type Role = "assistant" | "user";
type ChatMessage = { role: Role; text: string; options?: string[] };

// Define the steps of the conversation
type FlowStep = "START" | "SERVICE_DETAILS" | "BUDGET" | "TIMELINE" | "SUMMARY";

const copy = {
  en: {
    title: "Hive Concierge",
    status: "Online • Ready to Build",
    placeholder: "Type your message...",
    cta: "Request a Formal Quote",
  },
  fr: {
    title: "Concierge Hive",
    status: "En ligne • Prêt à bâtir",
    placeholder: "Tapez votre message...",
    cta: "Demander un devis formel",
  },
  rw: {
    title: "Hive Concierge",
    status: "Kuri murandasi",
    placeholder: "Andika ubutumwa...",
    cta: "Saba igiciro kirambuye",
  },
} as const;

export function Chatbot({ language }: { language: Language }) {
  const t = useMemo(() => copy[language], [language]);
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hello! I am the 360 Hive digital architect. What digital experience can we create for you today?",
      options: ["Website", "Media Production", "Marketing", "Graphic Design"],
    },
  ]);
  
  // Tracking the logic state
  const [currentFlow, setCurrentFlow] = useState<FlowStep>("START");
  const [userSelections, setUserSelections] = useState({
    service: "",
    detail: "",
    budget: "",
    timeline: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const addMessage = (role: Role, text: string, options?: string[]) => {
    setMessages((prev) => [...prev, { role, text, options }]);
  };

  const handleBotLogic = (input: string) => {
    const text = input.toLowerCase();

    // STEP 1: SERVICE SELECTION
    if (currentFlow === "START") {
      if (text.includes("web") || text.includes("site")) {
        setUserSelections(prev => ({ ...prev, service: "Web Development" }));
        setCurrentFlow("SERVICE_DETAILS");
        setTimeout(() => {
          addMessage("assistant", "Excellent. High-performance architecture is our specialty. What type of site are we building?", [
            "Business Website", "E-commerce", "Portfolio", "Custom Software System"
          ]);
        }, 600);
      } else if (text.includes("media") || text.includes("video")) {
        setUserSelections(prev => ({ ...prev, service: "Media Production" }));
        setCurrentFlow("SERVICE_DETAILS");
        setTimeout(() => {
          addMessage("assistant", "Visual storytelling defines the brand. Are you looking for:", [
            "Video Post-Production", "Digital Content", "Promotional Materials"
          ]);
        }, 600);
      } else {
        addMessage("assistant", "I've noted that interest. To help me give you a better recommendation, what is your estimated budget for this project?", [
          "Under $500", "$500 - $2k", "$2k - $10k", "Enterprise/Custom"
        ]);
        setCurrentFlow("BUDGET");
      }
      return;
    }

    // STEP 2: DETAILS
    if (currentFlow === "SERVICE_DETAILS") {
      setUserSelections(prev => ({ ...prev, detail: input }));
      setCurrentFlow("BUDGET");
      setTimeout(() => {
        addMessage("assistant", `Got it: ${input}. To align our resources, what is your investment range?`, [
          "Under $500", "$500 - $2k", "$2k - $10k", "Enterprise/Custom"
        ]);
      }, 600);
      return;
    }

    // STEP 3: BUDGET
    if (currentFlow === "BUDGET") {
      setUserSelections(prev => ({ ...prev, budget: input }));
      setCurrentFlow("TIMELINE");
      setTimeout(() => {
        addMessage("assistant", "Perfect. And what is your target launch date?", [
          "Urgent (1 week)", "Short (2-4 weeks)", "Medium (1-3 months)", "Flexible"
        ]);
      }, 600);
      return;
    }

    // STEP 4: TIMELINE / SUMMARY
    if (currentFlow === "TIMELINE") {
      setUserSelections(prev => ({ ...prev, timeline: input }));
      setCurrentFlow("SUMMARY");
      setTimeout(() => {
        addMessage("assistant", "Analysis complete. Based on your inputs, I recommend our Full-Stack Digital approach to ensure 'Full Functionality' and 'Structured Software'.");
        addMessage("assistant", "Would you like to transmit these details to our human team for a formal quote?");
      }, 600);
      return;
    }

    // DEFAULT
    setTimeout(() => {
      addMessage("assistant", "I am here to help. You can also reach us directly at hello@360hive.com.");
    }, 600);
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
    <div className="fixed bottom-8 right-8 z-[9999] font-jakarta">
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#010717] border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,102,0.3)] relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0066] to-[#200048] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <AnimatePresence mode="wait">
          {isOpen ? <X key="x" className="relative z-10 text-white" /> : <MessageSquare key="m" className="relative z-10 text-white" />}
        </AnimatePresence>
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[420px] h-[550px] bg-[#010717]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <header className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF0066] to-[#200048] flex items-center justify-center">
                <Bot className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white italic font-space">{t.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t.status}</span>
                </div>
              </div>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed ${
                    msg.role === "user" 
                    ? "bg-[#FF0066] text-white rounded-tr-none" 
                    : "bg-white/5 border border-white/10 text-gray-300 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                  
                  {/* Options Chips */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => onOptionClick(opt)}
                          className="px-4 py-2 rounded-full border border-[#FF0066]/30 bg-[#FF0066]/5 text-[#FF0066] text-[11px] font-bold hover:bg-[#FF0066] hover:text-white transition-all flex items-center gap-2 group"
                        >
                          {opt} <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {currentFlow === "SUMMARY" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                   <Link href="/request-quote" className="block w-full">
                     <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF0066] to-[#7000ff] text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-pink-500/20">
                       {t.cta}
                     </button>
                   </Link>
                </motion.div>
              )}
            </div>

            {/* Footer Input */}
            <form onSubmit={onSubmit} className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm text-white focus:outline-none placeholder:text-gray-700"
              />
              <button type="submit" className="p-3 text-[#FF0066] hover:scale-110 transition-transform">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}