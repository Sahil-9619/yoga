"use client";

import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { menuItems } from './Sidebar';

interface TopbarProps {
  user: any;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Topbar = ({ user, isSidebarOpen, onToggleSidebar }: TopbarProps) => {
  const pathname = usePathname();

  // Find the current active menu item by matching the href with the current pathname
  const currentItem = menuItems.find(item => item.href === pathname);
  const currentTitle = currentItem?.name || 'Dashboard';

  return (
    <header className="bg-white border-b border-emerald-100/50 px-6 py-2.5 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className={cn(
            "p-2 hover:bg-emerald-50 rounded-xl text-emerald-700 transition-all duration-300 lg:hidden flex"
          )}
        >
          <HiMenu size={24} />
        </button>
        <div>
          <h1 className="font-serif text-xl text-[#1A3320]">{currentTitle}</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#5C7562] mt-0.5">
            Welcome back, {user?.name || 'Admin'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-xs font-bold text-[#1A3320]">{user?.email}</span>
          <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-tighter">Admin</span>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white shadow-sm flex items-center justify-center text-emerald-700 font-bold cursor-pointer"
        >
          {user?.email?.[0].toUpperCase() || 'A'}
        </motion.div>
      </div>
    </header>
  );
};
