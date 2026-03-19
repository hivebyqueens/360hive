"use client";

import { useState, FormEvent, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";

type Language = "en" | "fr" | "rw";
type ChatMessage = { role: "assistant" | "user"; text: string };

const copy = {
  en: {
    chat: "Chat with us",
    chatTitle: "Hive Assistant",
    chatHint: "Local assistant powered by portfolio data only.",
  },
  fr: {
    chat: "Discuter avec nous",
    chatTitle: "Assistant Hive",
    chatHint: "Assistant local base uniquement sur nos donnees.",
  },
  rw: {
    chat: "Vugana natwe",
    chatTitle: "Umufasha Hive",
    chatHint: "Umufasha ukoresha amakuru ya portfolio gusa.",
  },
} as const;

const botKnowledge = [
  {
    keys: ["quote", "price", "pricing", "igiciro", "devis"],
    answer: "Use Request a Quote and we will respond with scope, timeline, and pricing options.",
  },
  {
    keys: ["book", "call", "meeting", "ikiganiro"],
    answer: "Book a Call from the top navigation or hero section to schedule a strategy session.",
  },
  {
    keys: ["products", "ranik", "abiru", "urology", "ibicuruzwa"],
    answer: "Our products include Ranik, Abiru Real Estate, and Rwanda Urology.",
  },
];

interface ChatbotProps {
  language: Language;
}

export function Chatbot({ language }: ChatbotProps) {
  const t = useMemo(() => copy[language], [language]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Welcome to 360 Hive by Queens. Ask about quotes, products, or booking a call.",
    },
  ]);

  function submitChat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newUserMsg: ChatMessage = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, newUserMsg]);

    let reply = "I'm here to help! Please ask about quotes, products, or booking a call.";
    for (const item of botKnowledge) {
      if (item.keys.some((key) => chatInput.toLowerCase().includes(key))) {
        reply = item.answer;
        break;
      }
    }

    const newAssistantMsg: ChatMessage = { role: "assistant", text: reply };
    setTimeout(() => {
      setChatMessages((prev) => [...prev, newAssistantMsg]);
    }, 300);

    setChatInput("");
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="button"
          variant="gradient"
          className="chat-fab"
          onClick={() => setChatOpen((v) => !v)}
        >
          {t.chat}
        </Button>
      </motion.div>

      <motion.aside
        className="chat-window"
        aria-label={t.chatTitle}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={
          chatOpen
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.95, y: 20 }
        }
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: chatOpen ? "auto" : "none" }}
      >
        <header>
          <div>
            <h3>{t.chatTitle}</h3>
            <p>{t.chatHint}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setChatOpen(false)}
          >
            <X size={16} />
          </Button>
        </header>

        <div className="chat-messages" aria-live="polite">
          {chatMessages.map((msg, idx) => (
            <motion.p
              key={`${msg.role}-${idx}`}
              className={`bubble ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.p>
          ))}
        </div>

        <form className="chat-form" onSubmit={submitChat}>
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about quote, products, booking..."
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" size="sm" variant="outline">
              <Send size={14} />
            </Button>
          </motion.div>
        </form>
      </motion.aside>
    </>
  );
}
