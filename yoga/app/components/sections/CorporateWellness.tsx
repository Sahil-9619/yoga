"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const CorporateWellness = () => {
  return (
    <section className="py-24 px-6 bg-[#F4F7F2] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-emerald-600 font-bold text-xs tracking-[0.4em] uppercase mb-4 block"
          >
            For Organizations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#1A3320] leading-tight mb-6"
          >
            Corporate Wellness <br />
            <span className="text-emerald-700 italic">Through Breathwork.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-[#3A5340] text-lg font-light leading-relaxed max-w-4xl mx-auto"
          >
            Empower your workforce with science-backed wellness practices that restore calm, enhance focus, and build resilience. Our corporate wellness sessions combine the ancient wisdom of pranayama, breathwork, and meditation with modern workplace needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Why Corporate Wellness Matters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-emerald-50"
          >
            <h3 className="text-2xl font-serif text-[#1A3320] mb-8">Why Corporate Wellness Matters</h3>
            <ul className="space-y-5">
              {[
                "Reduces workplace stress and burnout",
                "Enhances focus, creativity, and decision-making",
                "Improves emotional resilience and mental clarity",
                "Promotes better energy, sleep, and overall well-being",
                "Strengthens team connection and workplace morale"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-none mt-0.5" />
                  <span className="text-[#3A5340] font-light text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Offerings */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-[#1A3320] text-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-emerald-900/10"
          >
            <h3 className="text-2xl font-serif text-white mb-8">Our Offerings</h3>
            <ul className="space-y-6">
              {[
                { title: "Breathwork Sessions", desc: "for stress relief and energy balance" },
                { title: "Pranayama Practices", desc: "for respiratory health and emotional stability" },
                { title: "Meditation Programs", desc: "for mindfulness, focus, and inner calm" },
                { title: "Customized Wellness Workshops", desc: "tailored to your organization's needs" },
                { title: "Online and On-Site Sessions", desc: "for teams across the globe" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-emerald-400 flex-none mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-lg">{item.title}</span>
                    <span className="text-emerald-100/70 font-light text-base">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/contact">
            <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl uppercase tracking-widest text-xs font-bold px-8 shadow-lg shadow-emerald-900/20 group gap-3">
              Book a Session for Your Team
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
