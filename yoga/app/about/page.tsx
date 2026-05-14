"use client";
import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Sparkles, Heart, Shield, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CTAStrip } from '../components/sections/CTAStrip';
import Link from 'next/link';

export default function AboutPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="bg-white overflow-x-hidden">
      {/* Immersive Hero Section - Dark Green */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#1A3320]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A3320] via-transparent to-[#1A3320] z-10" />
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="About Sargam"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-300">A Mission of Mindfulness & Service</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-6xl sm:text-8xl md:text-7xl font-serif text-white leading-[0.85] tracking-tight mb-10"
          >
            The Heart Behind<br />
            <span className="text-emerald-400 italic">Saargaamm Bhartiye</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-emerald-50/90 font-light leading-relaxed mb-12"
          >
            “Empowering souls through the union of ancient yogic wisdom and humanitarian service.”
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] text-white uppercase tracking-[0.3em]">Our Story</span>
        </motion.div>
      </section>

      {/* The Origin Section - White */}
      <section className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="space-y-8"
            >
              <motion.span variants={fadeInUp} className="text-emerald-600 font-bold text-xs tracking-[0.4em] uppercase block">The Founder&apos;s Journey</motion.span>
              <div className="space-y-4">
                <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-serif text-[#1A3320] leading-tight mb-2">
                  From Service to <br />
                  <span className="text-emerald-700 italic">Self-Discovery.</span>
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-emerald-800/60 font-medium italic text-lg border-l-2 border-emerald-200 pl-4">
                  &quot;In the smiles of those I serve, I found the silence I was seeking.&quot;
                </motion.p>
              </div>

              <motion.div variants={fadeInUp} className="space-y-6 text-[#3A5340] text-lg font-light leading-relaxed">
                <p>
                  Sargam, the founder of Saargaamm Bhartiye, has always believed that the truest form of spirituality is found in service. As a dedicated social worker, her mission began in the heart of India, where she spent years teaching and uplifting underprivileged children.
                </p>
                <p>
                  It was through this selfless service that she discovered the profound power of Yoga and Breathwork—not just as a physical practice, but as a tool for resilience, healing, and absolute mental clarity.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-4xl font-serif text-[#1A3320] mb-2">50k+</h4>
                  <p className="text-xs uppercase tracking-widest text-emerald-700 font-bold">Lives Impacted</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif text-[#1A3320] mb-2">100+</h4>
                  <p className="text-xs uppercase tracking-widest text-emerald-700 font-bold">Community Projects</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
              className="relative"
            >
              <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" className="w-full aspect-[4/5] object-cover" alt="Sargam with children" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-50 rounded-[3rem] -z-10" />
              <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center z-20">
                <Heart className="w-10 h-10 text-pink-500 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Healing Impact Section - Light Color (Soft Sage) */}
      <section className="py-32 px-6 bg-[#F4F7F2] relative overflow-hidden rounded-t-[5rem]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px] -z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className="text-emerald-600 font-bold text-xs tracking-[0.4em] uppercase mb-4 block"
            >
              The Power of Healing
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif leading-tight text-[#1A3320]"
            >
              Bringing Souls Back <br />
              <span className="text-emerald-700 italic">from the Brink.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              className="bg-white border border-emerald-100 p-12 rounded-[3.5rem] space-y-6 shadow-sm"
            >
              <h3 className="text-3xl font-serif text-emerald-900">A Journey of Recovery</h3>
              <p className="text-[#3A5340] text-lg font-light leading-relaxed">
                Sargam&apos;s journey is marked by stories that many would call miracles. Through the precise application of Pranayama and specialized Kriya Yoga, she has guided numerous individuals back from the brink of severe health crises.
              </p>
              <p className="text-[#3A5340] text-lg font-light leading-relaxed">
                From patients struggling with chronic, life-threatening conditions to those facing absolute mental collapse, her interventions have served as a lifeline. She has helped people literally &quot;come back from the mouth of death,&quot; reclaiming their vitality when medical science reached its limits.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { title: "Critical Recovery", desc: "Assisting patients in regaining lung and heart function through rhythmic breathwork." },
                { title: "Mental Resilience", desc: "Lifting individuals from deep depression and absolute mental burnout using meditative stillness." },
                { title: "Chronic Relief", desc: "Providing hope and physical ease to those suffering from long-term autoimmune and respiratory issues." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-none border border-emerald-100 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1A3320] mb-2">{item.title}</h4>
                    <p className="text-[#4A6350] font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-[#5C7562] italic text-lg max-w-3xl mx-auto leading-relaxed">
              &quot;My motive is not just to teach yoga, but to prove that the human breath is the ultimate healer, capable of restoring life even in its most fragile state.&quot;
              <br />
              <span className="text-emerald-700 font-bold not-italic block mt-4 uppercase tracking-[0.2em] text-sm">— Sargam</span>
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Pillars - White */}
      <section className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-emerald-700 font-bold text-xs tracking-[0.4em] uppercase mb-4 block"
            >
              Our Purpose
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-5xl md:text-6xl font-serif text-[#1A3320]"
            >
              Three Pillars of Our Motive.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Shield,
                title: "Authentic Wisdom",
                desc: "Preserving the purity of ancient Pranayama and Yoga techniques, making them accessible to the modern world.",
                color: "bg-[#F4F7F2] text-[#1A3320]"
              },
              {
                icon: Heart,
                title: "Social Impact",
                desc: "A portion of our efforts and resources is dedicated to the education and well-being of underprivileged children.",
                color: "bg-emerald-900 text-white shadow-xl shadow-emerald-900/10"
              },
              {
                icon: Users,
                title: "Conscious Community",
                desc: "Building a global family where every member grows together through shared vibration and support.",
                color: "bg-[#F4F7F2] text-[#1A3320]"
              }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`${pillar.color} p-12 rounded-[3.5rem] hover:shadow-2xl transition-all duration-500 group`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${i === 1 ? 'bg-white/20' : 'bg-emerald-100'}`}>
                  <pillar.icon className={`w-8 h-8 ${i === 1 ? 'text-white' : 'text-emerald-800'}`} />
                </div>
                <h3 className="text-3xl font-serif mb-6">{pillar.title}</h3>
                <p className={`text-lg font-light leading-relaxed ${i === 1 ? 'text-emerald-50/90' : 'text-[#3A5340]'}`}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Integrity - Light Color (Muted Sage) */}
      <section className="py-32 px-6 bg-[#EAF0E5] overflow-hidden rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-[#1A3320] mb-12">Integrity in every step.</h2>
            <div className="space-y-6 text-left inline-block">
              {[
                "Teaching mindfulness to the leaders of tomorrow.",
                "Uplifting underprivileged children through education.",
                "Authentic lineage-based Yoga and Breathwork.",
                "Mental health & somatic awareness for all.",
                "A community built on the foundation of service."
              ].map((text, i) => (
                <motion.div
                  key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-xl font-light text-[#1A3320]"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-none" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTAStrip />
    </main>
  );
}
