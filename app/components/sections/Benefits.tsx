"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveRight } from 'lucide-react';

export const Benefits = () => {
  return (
    <section id="benefits" className="py-24 px-6 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 md:flex justify-between items-end gap-8">
          <div>
            <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">Holistic Benefits</span>
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">The Anatomy <br />of Wellness.</h2>
          </div>
          <p className="text-slate-500 max-w-sm mt-6 md:mt-0 font-light text-lg leading-relaxed">
            Beyond flexibility, discover how daily practice fundamentally alters your biological and mental architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Item 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="md:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-[#FAFAFA] border border-slate-100 p-8 md:p-12 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110">
              <Sparkles className="w-32 h-32 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-serif mb-4 relative z-10 text-slate-900">Neuroplasticity & Calm</h3>
            <p className="text-slate-600 text-lg max-w-md relative z-10 font-light leading-relaxed">
              Meditation and focused breathing physically restructure the brain, shrinking the amygdala (stress center) and thickening the prefrontal cortex (awareness).
            </p>
          </motion.div>

          {/* Bento Item 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-emerald-900 p-8 group hover:-translate-y-1 transition-all duration-500 shadow-xl shadow-emerald-900/20 text-white"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500"></div>
            <h3 className="text-2xl font-serif mb-4 relative z-10">Kinetic Strength</h3>
            <p className="text-emerald-50/80 relative z-10 font-light leading-relaxed">
              Utilize bodyweight to build lean, functional muscle that protects joints and stabilizes the spine.
            </p>
          </motion.div>

          {/* Bento Item 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-[#FAFAFA] border border-slate-100 p-8 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1"
          >
            <h3 className="text-2xl font-serif mb-4 text-emerald-700">Immunity Boost</h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Inversions and twists stimulate the lymphatic system, aiding in the rapid removal of toxins and boosting cellular defense.
            </p>
          </motion.div>

          {/* Bento Item 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-[#FAFAFA] border border-slate-100 p-8 md:p-12 group flex items-center justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1"
          >
            <div>
              <h3 className="text-3xl font-serif mb-4 text-slate-900">Cardiovascular Vitality</h3>
              <p className="text-slate-600 text-lg max-w-md font-light leading-relaxed">
                Dynamic Vinyasa flows elevate the heart rate, improving circulation, lowering resting heart rate, and increasing endurance.
              </p>
            </div>
            <div className="hidden md:flex w-20 h-20 rounded-full border border-slate-200 items-center justify-center group-hover:bg-emerald-600 text-slate-400 group-hover:text-white transition-all duration-500 cursor-pointer group-hover:border-transparent shadow-sm">
              <MoveRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
