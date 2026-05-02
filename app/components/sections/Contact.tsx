"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320] mb-6 leading-tight">Let&apos;s Connect.</h2>
          <p className="text-[#4A6350] text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Whether you have a question about my coaching, want to collaborate, or just want to share your progress, I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Full Name</label>
                <input type="text" placeholder="Your Name" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Phone Number</label>
                <input type="tel" placeholder="+91 00000 00000" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562] ml-1">Message</label>
              <textarea rows={4} placeholder="How can we help you?" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-[#D8E2D5] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none text-sm"></textarea>
            </div>
            <div className="flex justify-center pt-2">
              <Button variant="default" size="lg" className="w-full sm:w-auto px-12 uppercase tracking-widest gap-3 shadow-md py-6 text-sm">
                Send Message <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
