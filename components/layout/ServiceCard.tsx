"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface ServiceCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number }>;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:border-[#ff0066]/50 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-700">
        <Icon size={140} />
      </div>
      <div className="w-16 h-16 rounded-2xl bg-[#ff0066]/10 border border-[#ff0066]/20 flex items-center justify-center mb-10 group-hover:bg-[#ff0066] group-hover:text-white transition-all duration-500">
        <Icon size={32} />
      </div>
      <h3 className="text-3xl font-black italic lowercasefont-space mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm mb-8 font-medium">{desc}</p>
      <Link href="#" className="inline-flex items-center text-[10px] font-black lowercasetracking-[0.3em] text-[#ff0066] group-hover:gap-4 transition-all">
        Explore <ArrowRight size={14} className="ml-2" />
      </Link>
    </motion.div>
  );
};
