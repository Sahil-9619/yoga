"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { InstagramIcon, FacebookIcon, YouTubeIcon } from '../ui/SocialIcons';
import { useSocialLinks } from '../../hooks/useSocialLinks';

export const Footer = () => {
  const social = useSocialLinks();

  const socialLinks = [
    { icon: InstagramIcon, label: "Instagram", color: "bg-pink-50 hover:bg-pink-100 text-pink-600", href: social.instagram },
    { icon: FacebookIcon, label: "Facebook", color: "bg-blue-50 hover:bg-blue-100 text-blue-600", href: social.facebook },
    { icon: YouTubeIcon, label: "YouTube", color: "bg-red-50 hover:bg-red-100 text-red-600", href: social.youtube },
  ];

  return (
    <footer className="bg-white pt-24 pb-12 px-6 sm:px-12 relative overflow-hidden border-t border-[#E1EAE1]">
      {/* Decorative light mode glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-emerald-50/50 blur-[120px] -translate-x-1/3 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

          {/* Brand & Motive - Spans 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 z-10">
                <Image
                  src="/logo-v2.png"
                  alt="Logo"
                  fill
                  sizes="64px"
                  className="object-contain scale-[2.5]"
                  unoptimized
                />
              </div>
              <span className="font-serif tracking-[0.2em] uppercase text-[#1A3320] text-xl font-bold">Saargaamm<br />bhartiye</span>
            </div>
            <p className="text-[#5C7562] font-light text-lg leading-relaxed max-w-md">
              Transforming lives through the ancient wisdom of Pranayama, Breathwork, and Meditation.
            </p>
            <p className="text-emerald-700/80 text-sm font-light italic leading-relaxed max-w-md border-l-2 border-emerald-100 pl-4">
              &quot;Empowering souls to reclaim their health, vitality, and inner peace through the extraordinary healing power of conscious breathing.&quot;
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Explore - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] text-[#1A3320] font-bold tracking-[0.3em] uppercase mb-8">Explore</h4>
            <ul className="space-y-5">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Saargaamm', href: '/about' },
                { name: 'Sign In', href: '/login' },
                { name: 'Create Account', href: '/signup' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#5C7562] hover:text-emerald-700 font-light transition-colors inline-flex items-center gap-2 group text-sm md:text-base">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-emerald-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] text-[#1A3320] font-bold tracking-[0.3em] uppercase mb-8">Programs</h4>
            <ul className="space-y-5">
              {[
                { name: 'Workshops', href: '/workshop' },
                { name: 'Premium Videos', href: '/workshop?tab=videos' },
                { name: 'Pranayama', href: '/yoga/pranayama' },
                { name: 'Meditation', href: '/yoga/meditation' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#5C7562] hover:text-emerald-700 font-light transition-colors inline-flex items-center gap-2 group text-sm md:text-base">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-emerald-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Spans 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] text-[#1A3320] font-bold tracking-[0.3em] uppercase mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="group">
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Pranayogahub@gmail.com'}`} className="flex gap-4 items-start text-[#5C7562] font-light text-sm md:text-base cursor-pointer hover:text-emerald-700 transition-colors">
                  <Mail className="w-5 h-5 text-emerald-500 group-hover:text-emerald-600 transition-colors mt-0.5 shrink-0" />
                  <span>{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Pranayogahub@gmail.com'}</span>
                </a>
              </li>
              <li className="group">
                <a href="https://wa.me/919119743145" target="_blank" rel="noopener noreferrer" className="flex gap-4 items-start text-[#5C7562] font-light text-sm md:text-base cursor-pointer hover:text-emerald-700 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-500 group-hover:text-emerald-600 transition-colors mt-0.5 shrink-0" />
                  <span>+91 9119743145</span>
                </a>
              </li>
            </ul>

            <div className="mt-6 flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href || '#'}
                  onClick={(e) => { if (!social.href) e.preventDefault(); }}
                  target={social.href ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${social.color} ${!social.href ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E1EAE1] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className='text-[#7A9380] text-[10px] font-bold uppercase tracking-[0.2em]'>
            &copy; {new Date().getFullYear()} Saargaamm bhartiye. All rights reserved.
          </p>

          <div className="flex gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A9380]">
            <span>Designed by</span>
            <Link href="https://startupwebsupport.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-500 transition-colors">
              Startup Web Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
