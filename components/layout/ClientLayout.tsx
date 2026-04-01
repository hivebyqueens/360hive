"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/layout/Chatbot";
import { Sora, Manrope } from "next/font/google";
import { AppProvider, useApp } from "@/lib/i18n-context";

const headingFont = Sora({ variable: "--font-heading", subsets: ["latin"] });
const bodyFont = Manrope({ variable: "--font-body", subsets: ["latin"] });

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { language } = useApp();

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
      <div className="queen-shell">
        <Navigation />
        <main className="content">{children}</main>
        <Footer />
        <Chatbot language={language} />
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <LayoutInner>{children}</LayoutInner>
    </AppProvider>
  );
}
