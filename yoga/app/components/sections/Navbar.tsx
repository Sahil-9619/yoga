"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ChevronDown, Activity, Wind, Moon, Sun, Zap, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isYogaHovered, setIsYogaHovered] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const isAboutPage = pathname === '/about' || pathname.startsWith('/yoga');

  useEffect(() => {
    import('../../services/customer.service').then(m => setUser(m.CustomerService.getCurrentUser()));
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const yogaSections = [
    { name: "Pranayama", href: "/yoga/pranayama", icon: Wind, desc: "Mastering the life force through breath." },
    { name: "Breathwork", href: "/yoga/breathwork", icon: Zap, desc: "Dynamic techniques for energy and focus." },
    { name: "Meditation", href: "/yoga/meditation", icon: Moon, desc: "Cultivating stillness and inner peace." },
  ];

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[100] flex justify-center px-4 pt-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-700 ease-in-out",
            isScrolled
              ? "w-[95%] md:w-[80%] max-w-5xl bg-white/90 backdrop-blur-xl border border-[#D8E2D5]/50 rounded-full py-3 px-6 shadow-xl shadow-[#D8E2D5]/50"
              : "w-full max-w-7xl bg-transparent py-4 px-2 md:px-6"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex-none flex items-center gap-3 cursor-pointer group z-10">
            <div className={cn(
              "relative flex items-center justify-center transition-all duration-500 z-[110]",
              isScrolled ? "w-12 h-12" : "w-20 h-20"
            )}>
              <Image
                src="/logo-v2.png"
                alt="Logo"
                fill
                sizes="(max-width: 768px) 48px, 80px"
                className="object-contain scale-200"
                priority
                unoptimized
              />
            </div>
            <span className={cn(
              "font-serif uppercase transition-all duration-500",
              isScrolled
                ? "text-[10px] sm:text-xs font-bold tracking-tight text-[#1A3320]"
                : (isAboutPage ? "text-base sm:text-xl font-medium tracking-widest text-white" : "text-base sm:text-xl font-medium tracking-widest text-[#1A3320]")
            )}>
              Saargaamm bhartiye
            </span>
          </Link>

          {/* Navigation Items */}
          <div className={cn("hidden md:flex flex-1 justify-center items-center", isScrolled ? "gap-6" : "gap-10")}>
            {/* Yoga Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsYogaHovered(true)}
              onMouseLeave={() => setIsYogaHovered(false)}
            >
              <button className={cn(
                "nav-link-underline flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors",
                isScrolled ? "text-[#3A5340] hover:text-[#1A3320]" : (isAboutPage ? "text-white/80 hover:text-white" : "text-[#3A5340] hover:text-[#1A3320]")
              )}>
                Practices <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isYogaHovered && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isYogaHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[480px] pointer-events-auto"
                  >
                    <div className="bg-white rounded-[2rem] border border-emerald-100 shadow-2xl overflow-hidden p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {yogaSections.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-4 p-4 rounded-2xl hover:bg-emerald-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#1A3320]">{item.name}</div>
                              <div className="text-[10px] text-[#5C7562] font-light leading-tight mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/workshop" className={cn("nav-link-underline text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors", isScrolled ? "text-[#3A5340] hover:text-[#1A3320]" : (isAboutPage ? "text-white/80 hover:text-white" : "text-[#3A5340] hover:text-[#1A3320]"))}>
              Workshop
            </Link>

            <Link href="/about" className={cn("nav-link-underline text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors", isScrolled ? "text-[#3A5340] hover:text-[#1A3320]" : (isAboutPage ? "text-white/80 hover:text-white" : "text-[#3A5340] hover:text-[#1A3320]"))}>
              About
            </Link>



            <Link
              href="/contact"
              className={cn("nav-link-underline text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors", isScrolled ? "text-[#3A5340] hover:text-[#1A3320]" : (isAboutPage ? "text-white/80 hover:text-white" : "text-[#3A5340] hover:text-[#1A3320]"))}
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link href="/my-videos" className={cn("nav-link-underline text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors", isScrolled ? "text-[#3A5340] hover:text-[#1A3320]" : (isAboutPage ? "text-white/80 hover:text-white" : "text-[#3A5340] hover:text-[#1A3320]"))}>
                  My Videos
                </Link>

              </>
            ) : (
              <Link href="/login" className={cn("nav-link-underline text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors", isScrolled ? "text-[#3A5340] hover:text-[#1A3320]" : (isAboutPage ? "text-white/80 hover:text-white" : "text-[#3A5340] hover:text-[#1A3320]"))}>
                Login
              </Link>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex-none flex items-center gap-3 z-10">
            <Link href="/workshop">
              <Button variant={isScrolled ? "premium" : (isAboutPage ? "outline" : "premium")} size={isScrolled ? "sm" : "default"} className={cn("!hidden lg:!flex uppercase tracking-wider text-xs", !isScrolled && isAboutPage && "text-white border-white/30 hover:bg-white/10")}>
                Book a Session
              </Button>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(true)} className={cn("lg:hidden transition-all p-2 rounded-full border shadow-sm", isScrolled ? "text-[#354E3B] hover:text-[#1A3320] bg-white/50 backdrop-blur-sm border-[#D8E2D5]" : (isAboutPage ? "text-white border-white/20 bg-white/10 backdrop-blur-md" : "text-[#354E3B] hover:text-[#1A3320] bg-white/50 backdrop-blur-sm border-[#D8E2D5]"))}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl text-[#1A3320]">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-emerald-50 rounded-full text-emerald-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600">Explore Practices</span>
                {yogaSections.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-active:bg-emerald-600 group-active:text-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif text-2xl text-[#1A3320]">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="h-[1px] bg-emerald-100/50 w-full" />

              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-3xl text-[#1A3320]">About</Link>
              <Link href="/workshop" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-3xl text-[#1A3320]">Workshop</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-3xl text-[#1A3320]">Contact</Link>
              {user ? (
                <>
                  <Link href="/my-videos" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-3xl text-[#1A3320]">My Videos</Link>
                  <button onClick={() => {
                    import('../../services/customer.service').then(m => {
                      m.CustomerService.logout();
                      setUser(null);
                      setIsMobileMenuOpen(false);
                    });
                  }} className="font-serif text-3xl text-[#1A3320] text-left">Logout</button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-3xl text-[#1A3320]">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
