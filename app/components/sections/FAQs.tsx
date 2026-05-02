"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export const FAQs = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "Do I need prior experience to start yoga?", a: "Not at all. My practices are designed to meet you where you are. Whether you're a complete beginner or a seasoned seeker, we focus on personal progress rather than perfection." },
    { q: "What are the benefits of daily breathwork?", a: "Daily breathwork (Pranayama) helps regulate your nervous system, reduces cortisol levels, improves lung capacity, and sharpens mental focus. It's one of the most powerful tools for managing modern stress." },
    { q: "How can I follow your daily flows?", a: "I share new flows, techniques, and wellness tips every day on my Instagram and Facebook reels. It's the best way to stay consistent and learn something new every day." },
    { q: "Do I need special equipment?", a: "A yoga mat and comfortable clothing are all you need. Most importantly, bring an open heart and a willingness to explore your inner self." }
  ];

  return (
    <section id="faqs" className="py-20 px-6 relative overflow-hidden bg-[#F4F7F2]">
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
            x: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, -45, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-12 -right-12 w-56 h-56 bg-emerald-100/50 rounded-full blur-3xl opacity-40"
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Common Queries</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-[#1A3320] leading-tight"
          >
            Answering Your <br />
            <span className="text-emerald-700 italic">Questions.</span>
          </motion.h2>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group rounded-[1.5rem] border transition-all duration-500 overflow-hidden",
                openFaq === idx 
                  ? "bg-white border-emerald-200 shadow-lg shadow-emerald-900/5" 
                  : "bg-[#F8FAF6] border-[#E1EAE1] hover:border-emerald-200"
              )}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className={cn(
                  "text-lg md:text-xl font-serif transition-colors duration-300 leading-tight",
                  openFaq === idx ? "text-emerald-800" : "text-[#1A3320]"
                )}>
                  {faq.q}
                </span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 ml-4",
                  openFaq === idx ? "bg-emerald-600 text-white rotate-180" : "bg-white text-emerald-600 border border-emerald-100"
                )}>
                  {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 pt-1">
                      <div className="h-[1px] w-full bg-emerald-100/40 mb-4" />
                      <p className="text-[#4A6350] text-base md:text-lg font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
