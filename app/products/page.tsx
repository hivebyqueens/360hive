"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus, Layers, Monitor, PlayCircle, BarChart3, Palette } from "lucide-react";

// --- Language and Visual Tiles ---
type Language = "en" | "fr" | "rw";
const copy = {
  en: {
    pageTitle: "Gallery",
    mediaTitle: "Visual Showcase",
  },
  fr: {
    pageTitle: "Galerie",
    mediaTitle: "Vitrine Visuelle",
  },
  rw: {
    pageTitle: "Ifoto",
    mediaTitle: "Ibyerekanwa bya Visual",
  },
} as const;
const visualTiles = [
  "Cinematic Launch",
  "Brand Campaign",
  "Studio Production",
  "Digital Experience",
  "Health Innovation",
  "Leadership Sessions",
];

// --- Project Data ---
const categories = ["All", "Web Development", "Media Production", "Marketing", "Design"] as const;
type Category = (typeof categories)[number];
interface Project {
  id: number;
  title: string;
  category: Category;
  description: string;
  image: string;
  tags: string[];
}
const projects: Project[] = [
  {
    id: 1,
    title: "Nova Banking App",
    category: "Web Development",
    description: "A high-performance fintech platform with real-time analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=2070",
    tags: ["Next.js", "Tailwind", "Framer"],
  },
  {
    id: 2,
    title: "Elysium Cinematic",
    category: "Media Production",
    description: "Short-form brand storytelling with advanced 3D motion graphics.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070",
    tags: ["After Effects", "4K", "DaVinci"],
  },
  {
    id: 3,
    title: "HyperScale Ads",
    category: "Marketing",
    description: "Data-driven campaign that increased ROI by 300% for luxury retail.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    tags: ["Growth", "Meta Ads", "Analytics"],
  },
  {
    id: 4,
    title: "Aether Identity",
    category: "Design",
    description: "Minimalist brand identity for a silicon-valley tech startup.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964",
    tags: ["Branding", "UI/UX", "SVG"],
  },
  {
    id: 5,
    title: "Quantum Portal",
    category: "Web Development",
    description: "Bespoke 3D portfolio experience using Three.js and GLSL.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    tags: ["WebGL", "Three.js", "React"],
  },
  {
    id: 6,
    title: "Urban Flux Series",
    category: "Media Production",
    description: "Music video production featuring urban aesthetics and neon lighting.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1932",
    tags: ["Production", "Lighting", "Color"],
  },
];

// --- Components ---
const GlowHalo = ({ color = "#ff0066" }: { color?: string }) => (
  <div 
    className="absolute -z-10 w-[300px] h-[300px] blur-[120px] opacity-20 pointer-events-none" 
    style={{ backgroundColor: color }} 
  />
);

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#ff0066] to-[#7000ff] rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#010717]">
        {/* Image with Zoom */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010717] via-[#010717]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        </div>
        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-4">
             {getIcon(project.category)}
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff0066]">
                {project.category}
             </span>
          </div>
          <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-3 group-hover:text-[#ff0066] transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] font-bold border border-white/20 px-2 py-1 rounded-md uppercase tracking-tighter bg-white/5">
                {tag}
              </span>
            ))}
          </div>
          <motion.div 
             className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150"
          >
            <Button className="w-full bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 flex gap-2">
              View Project <ExternalLink size={14} />
            </Button>
          </motion.div>
        </div>
        {/* Plus Decor */}
        <div className="absolute top-6 right-6 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-500">
          <Plus className="text-white" size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function getIcon(category: Category) {
  const props = { size: 14, className: "text-[#ff0066]" };
  switch(category) {
    case "Web Development": return <Monitor {...props} />;
    case "Media Production": return <PlayCircle {...props} />;
    case "Marketing": return <BarChart3 {...props} />;
    case "Design": return <Palette {...props} />;
    default: return <Layers {...props} />;
  }
}

export default function GalleryPage() {
  const language: Language = "en";
  const t = useMemo(() => copy[language], [language]);
  const [activeTab, setActiveTab] = useState<Category>("All");
  const filteredProjects = projects.filter(
    (p) => activeTab === "All" || p.category === activeTab
  );

  return (
    <main className="min-h-screen bg-[#010717] text-white pt-32 pb-24 px-6 overflow-hidden">
      {/* 3D Decorative Grid Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* HEADER */}
      <section className="max-w-7xl mx-auto mb-20 relative text-center">
        <GlowHalo />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#ff0066] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Portfolio</span>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-6">
            Our <span className="bg-gradient-to-r from-[#ff0066] to-[#7000ff] bg-clip-text text-transparent">Work</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
            Projects that speak for themselves. We merge technical precision with creative disruption.
          </p>
        </motion.div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeTab === cat 
                  ? "bg-[#ff0066] border-[#ff0066] text-white shadow-[0_0_20px_rgba(255,0,102,0.4)]" 
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="max-w-7xl mx-auto relative">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- VISUAL SHOWCASE SECTION --- */}
      <section className="max-w-7xl mx-auto mt-32 mb-20">
        <motion.section
          className="media"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12 text-center">{t.mediaTitle}</h2>
          <div className="media-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visualTiles.map((tile, idx) => (
              <motion.article
                key={tile}
                className="media-card p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <span className="text-xs font-bold text-[#ff0066] mb-2">Featured</span>
                <h3 className="text-xl font-black uppercase tracking-tight">{tile}</h3>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </section>

      {/* 3D SECTION TRANSITION (Footer Bridge) */}
      <section className="mt-32 relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#200048]/30" />
        <motion.div 
          initial={{ rotateX: 45, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8">Ready to be our next success?</h2>
          <Button className="bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-full px-10 h-14 font-black uppercase tracking-widest transition-all">
            Start a Project
          </Button>
        </motion.div>
      </section>
    </main>
  );
}