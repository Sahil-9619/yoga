"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const Curriculum = () => {
  const modules = [
    { pillar: "Pillar 1", title: "Breathwork (Pranayama)", knowledge: "Ancient techniques to regulate the nervous system", practice: "Diaphragmatic and rhythmic breathing", med: "Cleansing the energy channels" },
    { pillar: "Pillar 2", title: "Conscious Asanas", knowledge: "Understanding the body-mind connection through posture", practice: "Gentle flows to release somatic tension", med: "Body scanning and awareness" },
    { pillar: "Pillar 3", title: "Inner Stillness", knowledge: "Tools to navigate modern stress and anxiety", practice: "Deep relaxation techniques (Yoga Nidra)", med: "Silent meditation and mantra" }
  ];

  return (
    <section id="offerings" className="py-16 px-6 bg-[#EAF0E5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:flex justify-between items-end gap-8">
          <div>
            <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">How I Help</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1A3320] leading-tight">My Methodology & <br />Core Pillars.</h2>
          </div>
          <p className="text-[#5C7562] max-w-sm mt-6 md:mt-0 font-light text-lg leading-relaxed">
            A holistic approach that integrates the physical, mental, and spiritual aspects of your well-being.
          </p>
        </div>

        <div className="space-y-6">
          {modules.map((module, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white border border-[#D8E2D5] rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start group hover:shadow-xl hover:border-emerald-200 transition-all"
            >
              <div className="flex-shrink-0 w-full md:w-48">
                <div className="bg-emerald-50 text-emerald-700 font-bold tracking-widest uppercase text-xs py-2 px-4 rounded-full inline-block mb-4">
                  {module.pillar}
                </div>
                <h3 className="text-2xl font-serif text-[#1A3320]">{module.title}</h3>
              </div>

              <div className="flex-grow space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div><span className="font-semibold text-[#1A3320]">Knowledge:</span> <span className="text-[#4A6350] font-light">{module.knowledge}</span></div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div><span className="font-semibold text-[#1A3320]">Practice:</span> <span className="text-[#4A6350] font-light">{module.practice}</span></div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div><span className="font-semibold text-[#1A3320]">Meditation:</span> <span className="text-[#4A6350] font-light">{module.med}</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
