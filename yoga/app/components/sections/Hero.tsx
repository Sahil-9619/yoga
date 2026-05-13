"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-[#EAF0E5]">
      <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7F2]/80 via-transparent to-[#F4F7F2] z-10"></div>
        <motion.img
          initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover object-top opacity-60"
        />
      </motion.div>

      <div className="relative z-10 text-center px-4 w-full max-w-5xl">


        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-8xl font-serif leading-[0.95] tracking-tight mb-8 text-[#1A3320]"
        >
          Breathe. Heal. <br className="hidden sm:block" />
          <span className="text-emerald-700 italic pr-4 relative">
            Find Your Flow.
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-emerald-200/60" viewBox="0 0 200 9" fill="none"><path d="M2.00018 7.37072C50.2989 -0.669527 122.956 -1.68412 198.057 7.37072" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-olive-200 font-light mb-10 leading-relaxed px-4"
        >
          Unlock the transformative power of ancient Pranayama, Breathwork, and Meditation to reclaim your mental clarity and physical vitality.
        </motion.p>

        {/* Coach Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex flex-col items-center p-4 bg-white rounded-2xl border border-[#D8E2D5] shadow-sm transition-shadow hover:shadow-lg"
          >
            <Calendar className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C7562] mb-1">Expertise</span>
            <span className="text-[#1A3320] font-serif text-lg">Pranayama</span>
          </motion.div>
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex flex-col items-center p-4 bg-white rounded-2xl border border-[#D8E2D5] shadow-sm transition-shadow hover:shadow-lg"
          >
            <Clock className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C7562] mb-1">Experience</span>
            <span className="text-[#1A3320] font-serif text-lg">1000+ Students</span>
          </motion.div>
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex flex-col items-center p-4 bg-white rounded-2xl border border-[#D8E2D5] shadow-sm transition-shadow hover:shadow-lg"
          >
            <Globe className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C7562] mb-1">Focus</span>
            <span className="text-[#1A3320] font-serif text-lg">Holistic Well-being</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center w-full px-6"
        >
          <Link href="/workshop" className="w-full sm:w-auto">
            <Button variant="premium" size="lg" className="w-full text-lg px-12 py-7 uppercase tracking-widest gap-3 shadow-2xl shadow-emerald-600/30">
              Book a Workshop <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-4 text-xs font-medium text-[#5C7562] uppercase tracking-widest">Join our community of mindful seekers</p>
        </motion.div>
      </div>
    </section >
  );
};
