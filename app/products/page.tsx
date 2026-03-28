"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, Plus, Monitor, PlayCircle, 
  BarChart3, Palette, Sparkles, Globe, ArrowRight 
} from "lucide-react";

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
  // --- REAL WEB PROJECTS ---
  {
    id: 1,
    title: "Ranik Creations",
    category: "Web Development",
    description: "A luxury fashion e-commerce platform blending high-end aesthetics with custom conversion architecture.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
    tags: ["E-Commerce", "Next.js", "Stripe"],
  },
  {
    id: 2,
    title: "Abiru Real Estate",
    category: "Web Development",
    description: "A premium PropTech portal featuring interactive listing maps and immersive property galleries.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073",
    tags: ["Real Estate", "Maps API", "Interactive"],
  },
  {
    id: 3,
    title: "Rwanda Urology Association",
    category: "Web Development",
    description: "A professional medical society portal for networking, research sharing, and association management.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
    tags: ["HealthTech", "Community", "CMS"],
  },
  // --- MOCKED MEDIA PROJECTS ---
  {
    id: 4,
    title: "Solaris Brand Film",
    category: "Media Production",
    description: "A high-octane cinematic brand launch for a renewable energy startup in East Africa.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070",
    tags: ["Cinematography", "4K", "Color Grading"],
  },
  {
    id: 5,
    title: "Urban Pulse Series",
    category: "Media Production",
    description: "Documentary-style content series exploring the intersection of street culture and digital innovation.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1932",
    tags: ["Storytelling", "Editing", "Sound Design"],
  },
  // --- MOCKED MARKETING PROJECTS ---
  {
    id: 6,
    title: "Alpha Growth Engine",
    category: "Marketing",
    description: "Performance marketing campaign that scaled a fintech startup's user base by 400% in 6 months.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    tags: ["Performance", "Ads", "Growth"],
  },
  {
    id: 7,
    title: "Luxe Retreats Global",
    category: "Marketing",
    description: "Omni-channel advertising strategy for a collection of high-end boutique hotels.",
    image: "https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=2070",
    tags: ["Strategy", "SEO", "Social"],
  },
  // --- MOCKED DESIGN PROJECTS ---
  {
    id: 8,
    title: "CyberCore Identity",
    category: "Design",
    description: "Futuristic brand visual system for a cybersecurity firm protecting digital assets.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964",
    tags: ["Branding", "UI/UX", "3D Art"],
  },
  {
    id: 9,
    title: "NeoFlow SaaS",
    category: "Design",
    description: "Clean, intuitive dashboard design for a next-generation workflow management tool.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    tags: ["Product Design", "Figma", "Design System"],
  },
];

// --- Animation Components ---

const GlowingEdge = () => (
  <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-r from-transparent via-[#ff0066] to-transparent opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 z-0 animate-gradient-x" />
);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <GlowingEdge />
      <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#010717]/80 backdrop-blur-xl group-hover:translate-y-[-8px] transition-all duration-500">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[0.4] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010717] via-[#010717]/60 to-transparent opacity-90 transition-opacity" />
        </div>

        {/* Top Meta */}
        <div className="absolute top-6 left-6 z-10">
          <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
            {getIcon(project.category)}
            <span className="text-[9px] font-black uppercase tracking-widest text-white">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-[#ff0066] transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
            {project.tags.map(tag => (
              <span key={tag} className="text-[8px] font-black border border-white/10 px-2.5 py-1.5 rounded-lg uppercase tracking-tighter bg-white/5">
                {tag}
              </span>
            ))}
          </div>

          <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">
            <Button className="w-full bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 flex gap-2 transition-all">
              Launch Case Study <Globe size={14} />
            </Button>
          </div>
        </div>

        {/* Corner Decor */}
        <div className="absolute top-6 right-6 w-10 h-10 border border-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-500">
          <Plus className="text-white" size={20} />
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const filteredProjects = useMemo(() => 
    projects.filter((p) => activeTab === "All" || p.category === activeTab),
    [activeTab]
  );

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#010717] text-white pt-40 pb-32 px-6 overflow-hidden">
      
      {/* 3D Static Background Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* PARALLAX HEADER */}
      <motion.section 
        style={{ y: headerY, opacity: headerOpacity }}
        className="max-w-7xl mx-auto mb-24 relative text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff0066]/20 bg-[#ff0066]/5 text-[#ff0066] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            <Sparkles size={14} /> Portfolio
          </span>
          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none mb-8">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066] animate-gradient-x">Impact</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium">
            A curated selection of high-performance digital architectures and cinematic experiences.
          </p>
        </motion.div>
      </motion.section>

      {/* STICKY FILTERS */}
      <section className="max-w-7xl mx-auto mb-16 relative z-20">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeTab === cat 
                  ? "bg-[#ff0066] border-[#ff0066] text-white shadow-[0_0_20px_rgba(255,0,102,0.4)]" 
                  : "bg-white/5 border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3D FOOTER CALLOUT */}
      <section className="mt-48 relative overflow-hidden">
        <div className="max-w-5xl mx-auto p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-[#200048]/40 to-[#010717] border border-white/5 text-center group">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-10">
              Ready to <br />
              <span className="text-[#ff0066]">Scale?</span>
            </h2>
            <Button size="lg" className="bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-2xl h-16 px-12 font-black uppercase tracking-[0.2em] text-xs transition-all">
              Build with the Hive <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// --- Helper Functions ---

function getIcon(category: Category) {
  const props = { size: 14, className: "text-[#ff0066]" };
  switch(category) {
    case "Web Development": return <Monitor {...props} />;
    case "Media Production": return <PlayCircle {...props} />;
    case "Marketing": return <BarChart3 {...props} />;
    case "Design": return <Palette {...props} />;
    default: return <Plus {...props} />;
  }
}