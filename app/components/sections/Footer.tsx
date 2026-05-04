"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { InstagramIcon, FacebookIcon, YouTubeIcon } from '../ui/SocialIcons';

export const Footer = () => {
  const pathname = usePathname();

  const socialLinks = [
    { icon: InstagramIcon, label: "Instagram", color: "bg-pink-50 hover:bg-pink-100", textColor: "text-pink-600", href: "https://www.instagram.com/sargam.bhartiya" },
    { icon: FacebookIcon, label: "Facebook", color: "bg-blue-50 hover:bg-blue-100", textColor: "text-blue-600", href: "https://www.facebook.com/sargam.bhartiya" },
    { icon: YouTubeIcon, label: "YouTube", color: "bg-red-50 hover:bg-red-100", textColor: "text-red-600", href: "#" },
  ];

  return (
    <footer className="bg-white pt-15 pb-12 px-6 relative overflow-hidden border-t border-[#E1EAE1]">
      {/* Background Decorative Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -top-10 left-1/4 w-64 h-64 bg-emerald-50/30 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span className="font-serif tracking-widest uppercase text-[#1A3320] text-xl font-bold">Saargaamm bhartiye</span>
            </div>
            <p className="text-[#5C7562] font-light leading-relaxed">
              Transforming lives through the ancient wisdom of Yoga and humanitarian service. Join our global family of mindful seekers.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-full ${social.color} flex items-center justify-center transition-all shadow-sm`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-[#1A3320] text-lg font-semibold mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Sargam', href: '/about' },
                { name: 'Hatha Yoga', href: '/yoga/hatha' },
                { name: 'Vinyasa Flow', href: '/yoga/vinyasa' },
                { name: 'Meditation', href: '/yoga/meditation' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#5C7562] hover:text-emerald-600 font-light transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-[#1A3320] text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-center text-[#5C7562] font-light">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>hello@saargaamm.com</span>
              </li>
              <li className="flex gap-3 items-center text-[#5C7562] font-light">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 items-start text-[#5C7562] font-light">
                <MapPin className="w-4 h-4 text-emerald-500 mt-1" />
                <span>Rishikesh, Uttarakhand, India</span>
              </li>
            </ul>
          </div>

          {/* Motive Summary */}
          <div>
            <h4 className="font-serif text-[#1A3320] text-lg font-semibold mb-6">Our Motive</h4>
            <p className="text-[#5C7562] text-sm font-light italic leading-relaxed">
              &quot;To prove that the human breath is the ultimate healer and to uplift every soul we touch through service and yoga.&quot;
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E1EAE1] flex flex-col items-center gap-4 text-[#7A9380] text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 ">
            <p className='opacity-70'>&copy; {new Date().getFullYear()} Saargaamm bhartiye. All rights reserved.</p>
            <div className="flex gap-2">
              <span>Designed by</span>
              <span className="text-emerald-800/50 tracking-[0.3em]">Startup Web Support</span>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
