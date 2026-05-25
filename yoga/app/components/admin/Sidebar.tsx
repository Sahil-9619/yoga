"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiViewGrid,
  HiUsers,
  HiCog,
  HiLogout,
  HiX,
  HiShieldCheck,
  HiCalendar,
  HiLightningBolt,
  HiDocumentText,
  HiPhotograph,
  HiVideoCamera,
  HiGlobeAlt,
  HiAcademicCap,
  HiMenu,
  HiMail,
  HiCollection,
  HiStar,
  HiChatAlt2,
  HiPlay,
  HiCurrencyRupee
} from 'react-icons/hi';
import { FaFacebookF } from 'react-icons/fa';
import { cn } from '../../lib/utils';
import { AuthService } from '../../services/auth.service';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle?: () => void;
}

export const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HiViewGrid },
  { name: 'Users', href: '/admin/users', icon: HiUsers },
  { name: 'Transactions', href: '/admin/transactions', icon: HiCurrencyRupee },
  { name: 'Workshops', href: '/admin/workshops', icon: HiAcademicCap },
  { name: 'Bookings', href: '/admin/bookings', icon: HiCalendar },
  { name: 'Categories', href: '/admin/categories', icon: HiCollection },
  { name: 'Contacts', href: '/admin/contacts', icon: HiMail },
  { name: 'Videos', href: '/admin/videos', icon: HiVideoCamera },
  { name: 'Social Reels', href: '/admin/reels', icon: HiPlay },
  { name: 'Testimonials', href: '/admin/testimonials', icon: HiStar },
  { name: 'Social Links', href: '/admin/social', icon: HiGlobeAlt },
  { name: 'Settings', href: '/admin/settings', icon: HiCog },
];

export const Sidebar = ({ isOpen, onClose, onToggle }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    router.replace('/admin/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A3320]/40 backdrop-blur-md z-[150] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.aside
        initial={false}
        animate={{
          x: isDesktop ? 0 : (isOpen ? 0 : -280),
          width: isDesktop ? (isOpen ? 240 : 80) : 280
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed top-0 left-0 bottom-0 bg-[#1A3320] text-white z-[200] flex flex-col shadow-2xl border-r border-white/5",
          !isOpen && !isDesktop && "pointer-events-none"
        )}
      >
        {/* Header */}
        <div className={cn(
          "p-6 flex items-center border-b border-white/10 overflow-hidden transition-all duration-300",
          isOpen ? "justify-between" : "justify-center"
        )}>
          <div className="flex items-center gap-3 min-w-max">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
              <HiShieldCheck className="text-white w-6 h-6" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h2 className="font-serif text-lg leading-none">Admin Panel</h2>
                <p className="text-[10px] uppercase tracking-widest text-emerald-300/60 mt-1 font-bold">Saargaamm Bhartiye</p>
              </motion.div>
            )}
          </div>

          {/* Mobile Close Button */}
          {!isDesktop && isOpen && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all text-emerald-200 hover:text-white shrink-0"
            >
              <HiX size={20} />
            </button>
          )}
        </div>

        {/* Floating Toggle Button (Desktop only) */}
        {isDesktop && (
          <div className="absolute -right-4 top-20 z-[300]">
            <button
              onClick={onToggle}
              className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all active:scale-95 border-2 border-white group"
              title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <HiX size={16} /> : <HiMenu size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 mt-4 space-y-2 overflow-y-auto scrollbar-hide scroll-smooth">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                className={cn(
                  "flex items-center rounded-2xl transition-all duration-300 group relative",
                  isOpen ? "gap-3 px-4 py-3" : "justify-center p-3",
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                    : "text-emerald-100/70 hover:bg-white/5 hover:text-white"
                )}
                title={!isOpen ? item.name : undefined}
              >
                <item.icon size={20} className={cn("transition-transform group-hover:scale-110 shrink-0", isActive ? "text-white" : "text-emerald-400")} />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-medium tracking-wide whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
                {isActive && isOpen && (
                  <motion.div
                    layoutId="active-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={cn(
          "p-4 border-t border-white/10 bg-[#1A3320]/50 backdrop-blur-xl transition-all duration-300",
          !isOpen && "flex justify-center"
        )}>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center rounded-2xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all group",
              isOpen ? "w-full gap-3 px-4 py-3" : "p-3"
            )}
            title={!isOpen ? "Logout" : undefined}
          >
            <HiLogout size={20} className="group-hover:-translate-x-1 transition-transform shrink-0" />
            {isOpen && <span className="text-sm font-medium uppercase tracking-wider text-[11px] whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};
