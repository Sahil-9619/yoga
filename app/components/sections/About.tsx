"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { InstagramIcon, FacebookIcon } from '../ui/SocialIcons';

export const About = () => {
  return (
    <section id="about" className="py-16 px-6 bg-white border-y border-[#E1EAE1]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl transition-transform duration-500"
        >
          <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Sargam" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-3xl font-serif mb-1">Sargam</h3>
            <p className="text-white/80 font-light tracking-wide">Coach & Social Worker</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">The Mission of Service</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A3320] mb-8 leading-tight">Empowering lives through <br />Yoga and Compassion.</h2>

          <div className="space-y-6 text-lg text-[#4A6350] font-light leading-relaxed">
            <p>
              Sargam is a dedicated Yoga, Pranayama, and Meditation coach whose journey is fueled by a deep commitment to social welfare. Beyond the mat, she is a passionate social worker who spends her time teaching and uplifting underprivileged children across India.
            </p>
            <p>
              Her approach to coaching is unique—she believes that true mindfulness begins with service. By bringing the life-changing tools of Breathwork and Yoga to both corporate professionals and the children in need, she is creating a ripple effect of healing and consciousness.
            </p>
            <p>
              Through Saargaamm Bhartiye, Sargam invites you to join a journey that transcends physical fitness. It is a path toward self-discovery, mental resilience, and a life lived with purpose and compassion.
            </p>
          </div>

          <div className="mt-10 flex flex-row items-center justify-between w-full gap-2 sm:gap-6">
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <motion.a
                href="https://www.instagram.com/sargam.bhartiya"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex-shrink-0"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-emerald-800 border-emerald-100 hover:bg-white hover:border-emerald-300 uppercase tracking-widest text-[9px] sm:text-xs font-bold gap-1 sm:gap-3 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 px-2 sm:px-6"
                >
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <InstagramIcon size={16} />
                  </motion.div>
                  <span>Instagram</span>
                </Button>
              </motion.a>

              <motion.a
                href="https://www.facebook.com/sargam.bhartiya"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex-shrink-0"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-emerald-800 border-emerald-100 hover:bg-white hover:border-emerald-300 uppercase tracking-widest text-[9px] sm:text-xs font-bold gap-1 sm:gap-3 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 px-2 sm:px-6"
                >
                  <motion.div whileHover={{ rotate: -12, scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <FacebookIcon size={16} />
                  </motion.div>
                  <span>Facebook</span>
                </Button>
              </motion.a>
            </div>

            <Link href="/workshop" className="flex-shrink-0">
              <Button variant="ghost" className="text-emerald-700 font-bold uppercase tracking-widest text-[10px] sm:text-xs gap-2 group whitespace-nowrap px-2 sm:px-4">
                <span className="hidden sm:inline">Book a Workshop</span>
                <span className="sm:hidden">Book Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
