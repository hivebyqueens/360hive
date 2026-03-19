import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const headingFont = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "360 Hive by Queens",
  description:
    "Premium women-led ecosystem for products, media, and growth services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
