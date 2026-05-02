"use client";
import React from 'react';
import { Button } from '../ui/Button';

export const CTAStrip = () => {
  return (
    <section className="py-20 bg-[#1A3320] px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready to transform your mind?</h2>
        <p className="text-emerald-100/80 text-lg mb-10 font-light">Join thousands of others. Registration is currently open for the next batch.</p>
        <Button
          variant="default"
          size="lg"
          className="bg-white !text-slate-950 hover:bg-slate-50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform px-12 uppercase tracking-[0.2em] font-bold"
        >
          Register Now for $40
        </Button>
      </div>
    </section>
  );
};
