"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, HeartPulse, Briefcase, ShieldAlert } from 'lucide-react';

export const Audience = () => {
  const targetItems = [
    { icon: Brain, title: "Anxious Minds", desc: "For those struggling with mental noise and seeking a way to quiet the chatter through breath." },
    { icon: HeartPulse, title: "Spiritual Seekers", desc: "For individuals looking to deepen their connection with their inner self and ancient wisdom." },
    { icon: Briefcase, title: "Busy Professionals", desc: "For those needing a sanctuary from the high-pressure demands of a modern corporate career." },
    { icon: ShieldAlert, title: "Health First", desc: "For anyone committed to long-term physical vitality and preventative holistic wellness." }
  ];

  return (
    <section id="audience" className="py-14 px-6 bg-white border-y border-[#E1EAE1]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">Is this for you?</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320]">Who I Help.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="bg-[#F8FAF6] border border-[#E1EAE1] p-8 rounded-[2rem] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#1A3320] mb-3">{item.title}</h3>
              <p className="text-[#4A6350] font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
