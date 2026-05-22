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
      <section className="pt-32 pb-16 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="space-y-8"
            >
              <motion.span variants={fadeInUp} className="text-emerald-600 font-bold text-xs tracking-[0.4em] uppercase block">The Founder&apos;s Journey</motion.span>
              <div className="space-y-4">
                <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-serif text-[#1A3320] leading-tight mb-2">
                  From Healing to <br />
                  <span className="text-emerald-700 italic">Empowering Others.</span>
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-emerald-800/60 font-medium italic text-lg border-l-2 border-emerald-200 pl-4">
                  &quot;In the smiles of those I serve, I found the silence I was seeking.&quot;
                </motion.p>
              </div>

              <motion.div variants={fadeInUp} className="space-y-6 text-[#3A5340] text-lg font-light leading-relaxed">
                <p>
                  Sargam is a dedicated Breathwork and Pranayama Healer whose journey began with her own profound healing. After facing a collapsed lung, asthma, and severe respiratory challenges, she turned to the ancient wisdom of pranayama, conscious breathing, meditation and natural healing. Through consistent practice, patience, and deep self-belief, she transformed her health, restored her vitality, and discovered the extraordinary healing power of the breath.
                </p>
                <p>
                  Today, Sargam is a certified Naturopathy and Yoga Coach, passionately guiding others on their own path to wellness. Her work is rooted in both personal experience and professional expertise, allowing her to support clients with compassion, authenticity, and deep understanding. She believes that the breath is one of the most powerful tools for healing—capable of restoring balance, calming the mind, strengthening the body, and awakening inner resilience.
                </p>
                <p>
                  Through her personalized breathwork, pranayama, meditation, and holistic wellness programs, Sargam empowers people across the world to reconnect with their breath, reclaim their health, and experience greater peace, energy, and vitality. Her mission is simple yet profound: to help others heal, thrive, and discover the transformative power that already exists within them.
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


      {/* Corporate Wellness Section */}
      <section className="pt-10 pb-32 px-6 bg-[#F4F7F2] relative overflow-hidden rounded-t-[5rem]">
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
              className="text-5xl md:text-6xl font-serif text-[#1A3320] leading-tight mb-6"
            >
              Corporate Wellness <br />
              <span className="text-emerald-700 italic">Through Breathwork.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-[#3A5340] text-lg font-light leading-relaxed max-w-4xl mx-auto"
            >
              Empower your workforce with science-backed wellness practices that restore calm, enhance focus, and build resilience. Our corporate wellness sessions combine the ancient wisdom of pranayama, breathwork, and meditation with modern workplace needs—helping employees manage stress, improve mental clarity, and cultivate emotional balance.
              <br /><br />
              In today&apos;s fast-paced corporate environment, employee well-being is not just a benefit—it is a necessity. Through guided breathing techniques, mindful meditation, and practical stress-management tools, we help teams reduce anxiety, increase productivity, and foster a healthier, more harmonious workplace culture.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">
            {/* Why Corporate Wellness Matters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-[#F4F7F2] p-10 md:p-14 rounded-[3rem]"
            >
              <h3 className="text-3xl font-serif text-[#1A3320] mb-8">Why Corporate Wellness Matters</h3>
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
              className="bg-[#1A3320] text-white p-10 md:p-14 rounded-[3rem] shadow-xl shadow-emerald-900/10"
            >
              <h3 className="text-3xl font-serif text-white mb-8">Our Offerings</h3>
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
