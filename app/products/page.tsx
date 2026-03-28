"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Plus, Monitor, PlayCircle, 
  BarChart3, Palette, Sparkles, Globe, ArrowRight,
  ShieldCheck, Zap, Activity
} from "lucide-react";

// --- Types & Data ---
const categories = ["All", "Web Development", "Media Production", "Marketing", "Design"] as const;
type Category = (typeof categories)[number];

// 1. Define the Project interface
interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "All">; // Projects cannot have "All" as their specific category
  description: string;
  image: string;
  tags: string[];
}

// 2. Strictly typed project array
const projects: Project[] = [
  {
    id: 1,
    title: "Ranik Creations",
    category: "Web Development",
    description: "A luxury fashion e-commerce architecture blending high-end aesthetics with custom conversion logic.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
    tags: ["High-Fashion", "Next.js", "Liquid UI"],
  },
  {
    id: 2,
    title: "Abiru Real Estate",
    category: "Web Development",
    description: "Futuristic PropTech portal featuring interactive listing matrices and immersive property viewing.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073",
    tags: ["PropTech", "Maps API", "3D-Viewing"],
  },
  {
    id: 3,
    title: "Rwanda Urology Association",
    category: "Web Development",
    description: "A specialized medical ecosystem designed for research sharing and association management.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070",
    tags: ["HealthTech", "Community", "Scale"],
  },
  {
    id: 4,
    title: "Solaris Brand Film",
    category: "Media Production",
    description: "Cinematic launch film utilizing high-speed motion control and advanced color science.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070",
    tags: ["4K Cinematic", "Post-Pro", "VFX"],
  },
  {
    id: 5,
    title: "Alpha Growth Engine",
    category: "Marketing",
    description: "Performance marketing engine that scaled digital reach by 400% through AI-driven targeting.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    tags: ["Ad-Tech", "Growth", "Analytics"],
  },
  {
    id: 6,
    title: "CyberCore Identity",
    category: "Design",
    description: "A comprehensive visual DNA system for a next-gen cybersecurity enterprise.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964",
    tags: ["Branding", "UI/UX", "3D-Assets"],
  },
];

// --- Sub-Components ---

const MouseSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      style={{
        background: useTransform([mouseX, mouseY], ([x, y]) => 
          `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 0, 102, 0.15), transparent 80%)`
        )
      }}
    />
  );
};

// 3. Updated getIcon with strict typing
function getIcon(category: Category) {
  const props = { size: 18, className: "text-white" };
  switch(category) {
    case "Web Development": return <Monitor {...props} />;
    case "Media Production": return <PlayCircle {...props} />;
    case "Marketing": return <BarChart3 {...props} />;
    case "Design": return <Palette {...props} />;
    default: return <Zap {...props} />;
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0); y.set(0);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="group relative h-[600px]"
    >
      <motion.div 
        style={{ rotateX, rotateY }}
        className="relative h-full w-full rounded-[3.5rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-[#ff0066]/50 group-hover:shadow-[0_0_50px_rgba(255,0,102,0.2)]"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010717] via-[#010717]/40 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 rounded-xl bg-[#ff0066]/20 border border-[#ff0066]/20">
                {getIcon(project.category)}
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff0066]">
                {project.category}
             </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-6 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map(tag => (
                <span key={tag} className="text-[9px] font-black border border-white/10 px-3 py-1.5 rounded-lg uppercase tracking-tighter bg-white/5">
                  {tag}
                </span>
              ))}
            </div>
            <Button className="w-full bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-14">
              Launch Prototype <ArrowRight className="ml-2" size={14} />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Filtering Logic
  const filteredProjects = useMemo(() => 
    projects.filter((p) => activeTab === "All" || p.category === activeTab),
    [activeTab]
  );

  return (
    <main ref={containerRef} className="relative bg-[#010717] text-white pt-40 pb-40 px-6 overflow-hidden">
      <MouseSpotlight />
      
      {/* 3D Background Grid */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* HEADER */}
      <motion.section 
        style={{ y: headerY, opacity: headerOpacity }}
        className="max-w-7xl mx-auto mb-32 relative text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
             <Activity size={14} className="text-[#ff0066] animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">System_Archive_v4.0</span>
          </div>
          <h1 className="text-8xl md:text-[11rem] font-black italic uppercase tracking-tighter leading-[0.8] mb-12">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066]">Impact</span>
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium">
            Dismantling the barriers between high-performance code and visionary aesthetics.
          </p>
        </motion.div>
      </motion.section>

      {/* STICKY FILTERS */}
      <section className="max-w-7xl mx-auto mb-24 relative z-20 flex justify-center">
        <div className="p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === cat 
                  ? "bg-[#ff0066] text-white shadow-[0_10px_30px_rgba(255,0,102,0.4)]" 
                  : "text-gray-500 hover:text-white"
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* FOOTER CTA */}
      <section className="mt-60 relative">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto p-20 rounded-[5rem] bg-gradient-to-br from-[#200048] via-[#010717] to-[#ff0066]/20 border border-white/10 text-center relative overflow-hidden"
        >
          <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-12">
            Initialize <br />
            <span className="text-[#ff0066]">The Future</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-white text-black hover:bg-[#ff0066] hover:text-white rounded-[2rem] h-20 px-16 font-black uppercase tracking-widest text-xs transition-all shadow-2xl">
              Start Project
            </Button>
            <div className="flex items-center gap-4 px-8 py-4 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
               <ShieldCheck size={16} className="text-[#ff0066]" />
               Enterprise Secure
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}