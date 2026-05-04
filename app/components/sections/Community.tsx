"use client";
import React from 'react';
import { InstagramIcon, FacebookIcon } from '../ui/SocialIcons';
import { InfiniteMovingCards } from '../ui/InfiniteMovingCards';

export const Community = () => {
  const socialPosts = [
    { quote: "Finding balance in the chaos. Today's flow was exactly what my soul needed.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" },
    { quote: "Strength doesn't come from what you can do. It comes from overcoming.", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80" },
    { quote: "Breathe in peace, breathe out tension. Join me live at 6 PM.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80" },
    { quote: "Your body hears everything your mind says. Be kind to yourself today.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80" },
  ];

  return (
    <section id="community" className="py-16 md:py-16 overflow-hidden relative bg-[#EAF0E5]">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-emerald-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">The Global Family</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#1A3320]">Growing Together.</h2>
        <p className="text-[#5C7562] max-w-2xl mx-auto font-light leading-relaxed">
          Join a thriving family of over 50,000 mindful seekers. I share daily flows, breathwork secrets, and holistic health tips to help you thrive in every aspect of life.
        </p>
      </div>

      <div className="py-4">
        <InfiniteMovingCards items={socialPosts} direction="right" speed="slow" />
      </div>

      <div className="flex flex-col sm:flex-row justify-center mt-16 gap-4 px-6 w-full max-w-md mx-auto sm:max-w-none">
        <a href="https://www.instagram.com/sargam.bhartiya" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-[#D8E2D5] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 group">
          <InstagramIcon size={22} />
          <span className="font-semibold tracking-wide uppercase text-sm text-[#1A3320]">Instagram</span>
        </a>
        <a href="https://www.facebook.com/sargam.bhartiya" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-[#D8E2D5] shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 group">
          <FacebookIcon size={22} />
          <span className="font-semibold tracking-wide uppercase text-sm text-[#1A3320]">Facebook</span>
        </a>
      </div>
    </section>
  );
};
