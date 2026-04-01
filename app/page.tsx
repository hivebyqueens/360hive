"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, TrendingDown, AlertCircle, BarChart3, Clock, 
  Cpu, Zap, Globe, Layers, XCircle 
} from "lucide-react";
import { useApp } from "@/lib/i18n-context";

const MAGENTA = "#e1007a";

/* ─── Magenta Indicator Dot (Signature Wildberries Style) ─── */
const Dot = () => (
  <div className="absolute top-8 left-8 flex items-center justify-center">
    <div className="w-1.5 h-1.5 rounded-full bg-[#e1007a] shadow-[0_0_12px_#e1007a] z-10" />
    <motion.div 
      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute w-5 h-5 rounded-full bg-[#e1007a]/40" 
    />
  </div>
);

/* ─── Timeline UI ─── */
const TimelineLine = ({ items }) => (
  <div className="relative w-full py-20 overflow-x-auto lg:overflow-visible no-scrollbar">
    <div className="absolute top-[88px] left-0 w-full h-[1px] bg-white/10" />
    <div className="relative flex justify-between min-w-[800px] lg:min-w-full px-4">
      {items.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="flex flex-col items-center text-center px-6 flex-1"
        >
          <div className="w-3 h-3 rounded-full bg-[#e1007a] shadow-[0_0_20px_#e1007a] z-10 mb-10" />
          <h4 className="text-[12px] font-black text-white uppercase tracking-tighter mb-2 max-w-[140px] leading-tight">{item.title}</h4>
          <p className="text-[11px] text-white/30 leading-relaxed max-w-[180px] font-medium">{item.body}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function HomePage() {
  const { t } = useApp();

  return (
    <main className="relative bg-[#000000] text-white selection:bg-[#e1007a]/40 font-sans overflow-x-hidden">
      
      {/* ── PRO MAX HERO RAINBOW DESIGN ── */}
      <div className="absolute top-0 left-0 w-full h-[130vh] pointer-events-none z-0 overflow-hidden">
        {/* Layered Mesh Gradients */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#e1007a]/20 blur-[160px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[-15%] w-[70%] h-[70%] bg-[#8c00c8]/15 blur-[160px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[20%] w-[50%] h-[50%] bg-[#4f46e5]/10 blur-[160px] rounded-full mix-blend-screen" 
        />
        {/* The Signature Arc from the reference image */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[150%] h-[80%] border-t-[1px] border-[#e1007a]/10 rounded-[100%] opacity-40" />
      </div>

      <div className="relative z-10">
        
        {/* ── HERO SECTION ── */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-12 flex gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/40"
          >
            <span>{t.home.badge || '29 сентября'}</span>
            <span className="opacity-20">•</span>
            <span>4 недели</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.85] italic mb-10"
          >
            {t.home.hero1} <br /> 
            <span className="text-white/95">{t.home.hero2}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-xl text-white/30 font-medium max-w-2xl mx-auto leading-relaxed mb-16 px-4"
          >
            {t.home.sub}
          </motion.p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link href="/quote" className="group flex items-center gap-5 px-14 py-5 rounded-full bg-[#e1007a] transition-all shadow-[0_0_50px_rgba(225,0,122,0.5)] hover:shadow-[0_0_80px_rgba(225,0,122,0.7)] active:scale-95">
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">Записаться сейчас</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
                <ArrowRight size={14} />
              </div>
            </Link>
          </motion.div>
        </section>

        {/* ── FOR SELLERS (Layout: 3 top + 1 wide bottom) ── */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter italic mb-6">Для селлеров</h2>
            <p className="text-white/20 text-[11px] font-black tracking-[0.3em] uppercase max-w-md mx-auto leading-relaxed">Вы продаёте на Wildberries, и у вас есть товары. Но...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {[
              "Сливаете бюджет, не понимая, что сработало, а что — нет",
              "Нет стратегии: запускаете рекламу 'методом тыка', работаете по ощущениям",
              "Сомневаетесь в ключах: какие исключить, какие оставить, что просто тянет деньги"
            ].map((text, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12, borderColor: "rgba(225,0,122,0.5)", backgroundColor: "rgba(255,255,255,0.05)" }}
                className="group relative p-12 rounded-[2.8rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl min-h-[260px] transition-all duration-500 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
              >
                <Dot />
                <p className="mt-10 text-[14px] font-bold text-white/60 leading-relaxed group-hover:text-white transition-colors duration-500">{text}</p>
              </motion.div>
            ))}
            
            <motion.div 
              whileHover={{ y: -12, borderColor: "rgba(225,0,122,0.5)", backgroundColor: "rgba(255,255,255,0.06)" }}
              className="lg:col-span-3 relative p-14 rounded-[3rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 backdrop-blur-2xl min-h-[240px] flex items-center transition-all duration-500 hover:shadow-2xl"
            >
              <Dot />
              <h4 className="text-xl md:text-3xl font-black text-white leading-[1.1] max-w-4xl mt-6 tracking-tight italic">
                Нет структуры: хочется наконец-то опереться на цифры, воронку, аналитику и УПРАВЛЯТЬ ростом
              </h4>
            </motion.div>
          </div>

          <div className="text-center mb-6 italic text-3xl font-black tracking-tighter uppercase">Что получите:</div>
          <TimelineLine items={[
            { title: "Чёткое понимание", body: "что делать, зачем и в какой момент" },
            { title: "Стратегия", body: "на запуск, рост, масштаб и слив" },
            { title: "Воронка", body: "усиление каждого её этапа" },
            { title: "Управление", body: "рекламой по цифрам" },
          ]} />
        </section>

        {/* ── FOR MANAGERS (Tall first/last + Pro Max Interactive) ── */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter italic mb-6">Для менеджеров</h2>
            <p className="text-white/20 text-[11px] font-black tracking-[0.3em] uppercase max-w-md mx-auto leading-relaxed">Вы работаете с клиентами и запускаете рекламу, но...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-24">
            {/* Tall First Card */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative p-12 rounded-[3rem] bg-[#e1007a] border border-[#ff319a] h-[480px] flex flex-col justify-end overflow-hidden shadow-[0_20px_60px_-10px_rgba(225,0,122,0.4)] transition-all duration-500"
            >
               <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_15px_#fff] z-10" />
               <div className="absolute top-10 right-[-15%] w-80 h-80 bg-white/20 blur-[100px] rounded-full" />
               <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-black/10 blur-[60px] rounded-full" />
               <p className="relative text-[15px] font-black uppercase leading-relaxed text-white tracking-wide">Трудно объяснить клиенту, что вы делаете и зачем</p>
            </motion.div>
            
            {/* Middle Cards */}
            <motion.div whileHover={{ y: -15, backgroundColor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.2)" }} className="relative p-12 rounded-[2.8rem] bg-white/[0.04] border border-white/5 h-[360px] flex flex-col justify-end transition-all duration-500 group">
               <Dot />
               <p className="text-[13px] font-black uppercase text-white/40 tracking-wider group-hover:text-white/80 transition-colors">Нет уверенности в своих действиях: запускаете РК, но не знаете — правильно ли?</p>
            </motion.div>
            <motion.div whileHover={{ y: -15, backgroundColor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.2)" }} className="relative p-12 rounded-[2.8rem] bg-white/[0.04] border border-white/5 h-[360px] flex flex-col justify-end transition-all duration-500 group">
               <Dot />
               <p className="text-[13px] font-black uppercase text-white/40 tracking-wider group-hover:text-white/80 transition-colors">Настраиваете одно и то же — без понимания стратегии, цифр, структуры</p>
            </motion.div>

            {/* Tall Last Card */}
            <motion.div 
              whileHover={{ scale: 1.03, y: -5, backgroundColor: "rgba(225,0,122,0.25)", borderColor: "#e1007a" }}
              className="relative p-12 rounded-[3rem] bg-[#e1007a]/15 border border-[#e1007a]/30 h-[480px] flex flex-col justify-end overflow-hidden transition-all duration-500 shadow-2xl"
            >
               <Dot />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full opacity-10 rotate-45" />
               <p className="relative text-[15px] font-black uppercase leading-relaxed text-white tracking-wide">Ощущение потолка: боитесь не справиться, если клиентов станет больше</p>
            </motion.div>
          </div>

          <div className="text-center mb-6 italic text-3xl font-black tracking-tighter uppercase">Что получите:</div>
          <TimelineLine items={[
            { title: "Системный подход", body: "не просто запуск, а стратегия продвижения" },
            { title: "Работа по этапам", body: "анализ, прогноз, целевые действия" },
            { title: "Навык объяснять", body: "клиенту, почему это работает" },
            { title: "Уверенность", body: "в масштабировании крупных магазинов" },
          ]} />
        </section>

        {/* ── NOT FOR SECTION ── */}
        <section className="py-32 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
             <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-6 leading-tight">А кому <br/><span className="text-[#e1007a]">НЕ</span> подойдёт?</h2>
             <p className="text-white/20 text-[10px] font-black tracking-[0.5em] uppercase">Branding selection matters.</p>
          </div>
          <div className="lg:w-2/3 space-y-4 w-full">
            {["Тем, кто не готов внедрять и работать с цифрами", "Тем, кто ищет 'волшебную кнопку' или быстрый способ", "Тем, кто хочет 'послушать фоном', но не будет применять"].map((text, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 18, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(225,0,122,0.3)" }}
                className="flex items-center gap-8 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 transition-all duration-300 cursor-default"
              >
                <XCircle size={24} className="text-[#e1007a] shrink-0" />
                <p className="text-base font-bold text-white/40">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PROGRAM MODULES ── */}
        <section className="py-24 px-6 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl font-black italic uppercase tracking-[0.4em] mb-24 text-center text-white/60">Подробнее о программе</h2>
          <div className="space-y-0">
            {[
              { n: 1, t: "Введение", l: ["Термины и формулы", "Аналитический отчёт", "Юнит-экономика", "Воронка продаж"] },
              { n: 2, t: "SEO и Контент", l: ["Анализ конкурентов", "Сбор семантики", "Оптимизация карточки", "Контентная воронка"] },
              { n: 3, t: "Внутренняя реклама", l: ["Типы кампаний", "Стратегии ставок", "Масштабирование", "Аналитика"] },
            ].map((m, i) => (
              <motion.div 
                key={i} 
                whileHover={{ backgroundColor: "rgba(255,255,255,0.015)" }}
                className="flex gap-14 items-start py-14 border-b border-white/5 group transition-all duration-500 cursor-default"
              >
                <div className="w-16 h-16 rounded-full bg-[#e1007a] flex items-center justify-center shrink-0 shadow-[0_0_35px_rgba(225,0,122,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_55px_rgba(225,0,122,0.7)] transition-all duration-500">
                  <span className="text-lg font-black text-white">{m.n}</span>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl font-black uppercase tracking-widest text-white/90">Модуль {m.n}. {m.t}</h4>
                  <div className="flex flex-wrap gap-x-10 gap-y-4">
                    {m.l.map((item, idx) => (
                      <span key={idx} className="text-[13px] text-white/30 tracking-wide font-bold transition-colors group-hover:text-white/50">• {item}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-48 px-6 text-center">
           <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
             <Link href="/quote" className="inline-flex items-center gap-6 px-20 py-7 rounded-full bg-[#e1007a] shadow-[0_0_80px_rgba(225,0,122,0.6)] transition-all duration-300">
              <span className="text-[16px] font-black uppercase tracking-[0.6em] text-white">Записаться сейчас</span>
              <ArrowRight size={22} className="opacity-80" />
            </Link>
           </motion.div>
        </section>

      </div>
    </main>
  );
}