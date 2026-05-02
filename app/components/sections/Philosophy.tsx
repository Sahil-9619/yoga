"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '../ui/TextReveal';

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-16 md:py-16 px-6 relative bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-8 block">My Philosophy</span>
        <TextReveal text="True power comes from within. It begins with your breath and ends in deep, conscious stillness." />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 md:mt-20 text-[#4A6350] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4"
        >
          My mission is to help you bridge the gap between ancient tradition and modern life. Through conscious breathing and movement, we don't just exercise—we recalibrate the soul and find peace amidst the noise.
        </motion.div>
      </div>
    </section>
  );
};
