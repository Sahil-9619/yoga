"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

interface YogaPageProps {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: string;
}

export default function YogaTemplate({ title, subtitle, description, benefits, image }: YogaPageProps) {
  return (
    <main className="bg-[#F4F7F2] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-[#1A3320] text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={image} className="w-full h-full object-cover" alt={title} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A3320] via-transparent to-[#1A3320]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-emerald-400 font-bold text-xs tracking-[0.4em] uppercase mb-6 block"
          >
            {subtitle}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-serif mb-8 leading-[0.9] tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-emerald-100/70 font-light leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320]">The Benefits of <br/><span className="text-emerald-700 italic">{title}.</span></h2>
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 text-lg font-light text-[#4A6350]">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-none" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <div className="pt-8">
              <Button variant="premium" size="lg" className="px-10 uppercase tracking-widest text-xs font-bold">
                Join a Session
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5]"
          >
            <img src={image} className="absolute inset-0 w-full h-full object-cover" alt="Yoga Practice" />
            <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
