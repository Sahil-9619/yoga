"use client";
import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const CTAStrip = () => {
  return (
    <section className="py-24 bg-[#0D1A10] px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay scale-110"></div>
      
      {/* Animated Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-8">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-300">Begin Your Journey</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
          Ready to Begin <br />
          <span className="text-emerald-400 italic text-3xl md:text-5xl">Your Transformation?</span>
        </h2>
        
        <p className="text-emerald-100/60 text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto leading-relaxed">
          Join our global community of mindful seekers. Secure your spot in our upcoming workshop and reclaim your vitality.
        </p>

        <Link href="/workshop">
          <Button
            variant="premium"
            size="lg"
            className="px-12 py-8 uppercase tracking-[0.2em] font-bold gap-3 shadow-2xl shadow-emerald-500/20 group"
          >
            Join a Session <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
