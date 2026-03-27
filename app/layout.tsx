"use client";

import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/layout/Chatbot";

type Language = "en" | "fr" | "rw";
type ThemeMode = "dark" | "light";

const headingFont = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [language, setLanguage] = useState<Language>("en");
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [logoMissing, setLogoMissing] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    const handleImageError = () => setLogoMissing(true);
    const img = new window.Image();
    img.onload = () => setLogoMissing(false);
    img.onerror = handleImageError;
    img.src = "/logo.png";
  }, []);

  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <div className="queen-shell">
          <Navigation
            language={language}
            setLanguage={setLanguage}
            mode={mode}
            setMode={setMode}
           
          />
          <main className="content">
            {children}
          </main>
          <Footer />
          <Chatbot language={language} />
        </div>
      </body>
    </html>
  );
}
