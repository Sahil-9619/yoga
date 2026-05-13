"use client";
import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Audience } from '../components/sections/Audience';
import { About } from '../components/sections/About';
import { Community } from '../components/sections/Community';
import { FAQs } from '../components/sections/FAQs';
import { Contact } from '../components/sections/Contact';
import { CTAStrip } from '../components/sections/CTAStrip';

export default function Home() {
  return (
    <div className="bg-[#F4F7F2] min-h-screen text-[#254A2E] selection:bg-emerald-200 selection:text-emerald-900 font-sans overflow-x-hidden">

      {/* Light Noise Texture */}
      <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>


      <main>
        <Hero />
        <About />
        <Audience />
        <Community />
        <CTAStrip />
        <Contact />
        <FAQs />
      </main>

    </div>
  );
}