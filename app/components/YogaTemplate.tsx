"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { CTAStrip } from './sections/CTAStrip';
import Link from 'next/link';

interface YogaPageProps {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: string;
}

export default function YogaTemplate({ title, subtitle, description, benefits, image }: YogaPageProps) {
  return (
    <main className="bg-[#F8FAF7] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-[#0D1A10] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src={image} className="w-full h-full object-cover" alt={title} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1A10] via-transparent to-[#0D1A10]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-300">{subtitle}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="text-6xl md:text-9xl font-serif mb-8 leading-[0.85] tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-emerald-50/80 font-light leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-emerald-600 font-bold text-xs tracking-[0.4em] uppercase block">Deep Mastery</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1A3320]">The Path to <br/><span className="text-emerald-700 italic">{title}.</span></h2>
            
            <div className="space-y-5">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 text-lg font-light text-[#4A6350]"
                >
                  <div className="mt-1 flex-none w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-10">
              <Link href="/workshop">
                <Button 
                  variant="premium" 
                  size="lg" 
                  className="px-12 py-7 uppercase tracking-[0.2em] font-bold gap-3 group shadow-2xl shadow-emerald-500/10"
                >
                  Join a Session <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative rounded-[3.5rem] overflow-hidden shadow-2xl aspect-[4/5] group"
          >
            <img src={image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Yoga Practice" />
            <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>
      </section>

      <CTAStrip />
    </main>
  );
}
