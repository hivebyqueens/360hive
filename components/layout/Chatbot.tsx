"use client";

import { useState, FormEvent, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Sparkles } from "lucide-react";

type Language = "en" | "fr" | "rw";
type ChatMessage = { role: "assistant" | "user"; text: string };

const copy = {
  en: {
    chat: "Assistant",
    chatTitle: "360 Hive",
    chatHint: "AI Concierge • Online",
    placeholder: "How can we innovate together?",
  },
  fr: {
    chat: "Assistant",
    chatTitle: "360 Hive",
    chatHint: "Concierge IA • En ligne",
    placeholder: "Comment pouvons-nous innover ?",
  },
  rw: {
    chat: "Umufasha",
    chatTitle: "360 Hive",
    chatHint: "Umutabazi • Kuri murandasi",
    placeholder: "Twagufasha iki uyu munsi?",
  },
} as const;

const botKnowledge = [
  {
    keys: ["quote", "price", "pricing", "igiciro", "devis", "cost"],
    answer: "To provide an accurate quote, please use our 'Request a Quote' section in the footer. We'll analyze your scope and respond within 24 hours.",
  },
  {
    keys: ["book", "call", "meeting", "ikiganiro", "schedule"],
    answer: "You can schedule a strategy session directly through our 'Book a Call' link. We look forward to discussing your vision.",
  },
  {
    keys: ["products", "ranik", "abiru", "urology", "ibicuruzwa", "services"],
    answer: "Our ecosystem includes Ranik (Media), Abiru (Real Estate), and Rwanda Urology (Healthcare). Which one would you like to explore?",
  },
];

interface ChatbotProps {
  language: Language;
}

export function Chatbot({ language }: ChatbotProps) {
  const t = useMemo(() => copy[language], [language]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Welcome to 360 Hive. I am your digital concierge. How may I assist your journey today?",
    },
  ]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  function submitChat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newUserMsg: ChatMessage = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, newUserMsg]);

    let reply = "I've noted that. Would you like to schedule a call with our leadership team to discuss this further?";
    
    for (const item of botKnowledge) {
      if (item.keys.some((key) => chatInput.toLowerCase().includes(key))) {
        reply = item.answer;
        break;
      }
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    }, 600);

    setChatInput("");
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {/* --- FAB (Floating Action Button) --- */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="relative group w-14 h-14 rounded-full flex items-center justify-center bg-[#010717] border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0066] to-[#200048] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="relative z-10 text-white" size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageSquare className="relative z-10 text-white" size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Subtle Pulse */}
        <div className="absolute inset-0 rounded-full border border-[#FF0066]/50 animate-ping opacity-20" />
      </motion.button>

      {/* --- CHAT WINDOW --- */}
      <AnimatePresence>
        {chatOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 40, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-[#010717]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <header className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0066] to-[#200048] flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest bg-gradient-to-r from-[#FF0066] to-[#200048] bg-clip-text text-transparent italic">
                    {t.chatTitle}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {t.chatHint}
                  </p>
                </div>
              </div>
            </header>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide select-none"
            >
              {chatMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 text-[13px] leading-relaxed shadow-sm ${
                      msg.role === "user" 
                      ? "bg-gradient-to-br from-[#FF0066] to-[#200048] text-white rounded-[1.5rem] rounded-tr-none" 
                      : "bg-white/5 border border-white/10 text-gray-300 rounded-[1.5rem] rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={submitChat}
              className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center gap-3"
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-gray-700"
              />
              <button 
                type="submit" 
                className="p-2 text-white hover:text-[#FF0066] transition-colors"
                disabled={!chatInput.trim()}
              >
                <Send size={18} strokeWidth={1.5} />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}