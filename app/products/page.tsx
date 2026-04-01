"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Monitor, PlayCircle, BarChart3, Palette, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/i18n-context";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  { id: 1, title: "Ranik Creations", category: "Web Development", description: "A luxury fashion e-commerce platform blending high-end aesthetics with custom conversion logic.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070", tags: ["Next.js", "E-commerce", "UI/UX"] },
  { id: 2, title: "Abiru Real Estate", category: "Web Development", description: "PropTech portal featuring interactive listing matrices and immersive property viewing experiences.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073", tags: ["PropTech", "Maps API", "3D"] },
  { id: 3, title: "Rwanda Urology Association", category: "Web Development", description: "A specialized medical ecosystem designed for research sharing and association management.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070", tags: ["HealthTech", "Community", "Scale"] },
  { id: 4, title: "Solaris Brand Film", category: "Media Production", description: "Cinematic launch film utilizing motion control and advanced color science techniques.", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070", tags: ["4K", "Post-Pro", "VFX"] },
  { id: 5, title: "Alpha Growth Engine", category: "Marketing", description: "Performance marketing engine that scaled digital reach by 400% through AI-driven targeting.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015", tags: ["Ad-Tech", "Growth", "Analytics"] },
  { id: 6, title: "CyberCore Identity", category: "Design", description: "A comprehensive visual identity system for a next-generation cybersecurity enterprise.", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964", tags: ["Branding", "UI/UX", "3D Assets"] },
];

function getIcon(category: string) {
  const props = { size: 16, className: "text-[#ff0066]" };
  switch (category) {
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
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set(cx); y.set(cy);
    rotateX.set((cy / rect.height) * -10);
    rotateY.set((cx / rect.width) * 10);
  }

  function handleMouseLeave() {
    x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="group relative h-[480px]"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative h-full w-full rounded-3xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 group-hover:border-[#ff0066]/30 group-hover:shadow-[0_0_40px_rgba(200,0,255,0.25)]"
      >
        {/* Image */}
        <div className="absolute inset-0">
          <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
              {getIcon(project.category)}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff0066]">{project.category}</span>
          </div>

          <h3 className="text-3xl font-black italic uppercase tracking-tight leading-tight mb-4 text-white">
            {project.title}
          </h3>

          <div className="overflow-hidden max-h-0 group-hover:max-h-48 transition-all duration-500">
            <p className="text-white/70 text-sm leading-relaxed mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-bold border border-white/20 px-3 py-1 rounded-lg uppercase tracking-wide bg-white/10 text-white/80">
                  {tag}
                </span>
              ))}
            </div>
            <button className="w-full h-11 rounded-xl font-bold uppercase tracking-widest text-[10px] text-white transition-all flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)", boxShadow: "0 0 20px rgba(200,0,255,0.35)" }}>
              View Project <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkPage() {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState("All");

  const categories = useMemo(() => [
    { key: "All", label: t.products.filter_all },
    { key: "Web Development", label: t.products.filter_web },
    { key: "Media Production", label: t.products.filter_media },
    { key: "Marketing", label: t.products.filter_marketing },
    { key: "Design", label: t.products.filter_design },
  ], [t]);

  const filtered = useMemo(() =>
    projects.filter((p) => activeTab === "All" || p.category === activeTab),
    [activeTab]
  );

  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const fn = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mouseX, mouseY]);

  return (
    <main className="relative bg-[#0a0a0f] text-white pt-36 pb-32 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Layered background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,150,0.13),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(120,0,255,0.13),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      {/* HEADER */}
      <motion.section
        style={{ y: headerY, opacity: headerOpacity }}
        className="max-w-7xl mx-auto mb-20 text-center relative z-10"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0066] animate-pulse" />
            {t.products.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6 text-white">
            {t.products.title1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0066] via-[#7000ff] to-[#ff0066]">
              {t.products.title2}
            </span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">{t.products.sub}</p>
        </motion.div>
      </motion.section>

      {/* FILTER TABS */}
      <section className="max-w-7xl mx-auto mb-16 relative z-20 flex justify-center">
        <div className="p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-wrap justify-center gap-1">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 sm:px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === key
                  ? "bg-[#ff0066] text-white shadow-lg shadow-pink-500/25"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="max-w-7xl mx-auto relative z-10">
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* FOOTER CTA */}
      <section className="mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg text-center relative overflow-hidden shadow-[0_0_30px_rgba(200,0,255,0.15)] hover:shadow-[0_0_50px_rgba(200,0,255,0.25)] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,102,0.08),transparent_60%)] pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 relative z-10 text-white">
            {t.products.cta_title1} <br />
            <span className="text-[#ff0066]">{t.products.cta_title2}</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 relative z-10">
            <Link
              href="/quote"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] text-white flex items-center justify-center gap-2 transition-all"
              style={{ background: "linear-gradient(135deg,#ff0066,#7000ff)", boxShadow: "0 0 20px rgba(200,0,255,0.5)" }}
            >
              {t.products.cta_btn}
            </Link>
            <div className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50">
              <ShieldCheck size={14} className="text-[#ff0066]" />
              {t.products.cta_secure}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
