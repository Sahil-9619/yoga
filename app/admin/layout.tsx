"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthService } from '../services/auth.service';
import { Sidebar } from '../components/admin/Sidebar';
import { Topbar } from '../components/admin/Topbar';
import { cn } from '../lib/utils';
import { AdminLoader } from '@/app/components/admin/AdminLoader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Don't show sidebar/topbar on login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (!mounted || isLoginPage) return;

    if (!AuthService.isAuthenticated()) {
      router.replace('/admin/login');
      return;
    }

    const userData = AuthService.getUser();
    if (userData) {
      setUser(userData);
    } else {
      AuthService.logout();
      router.replace('/admin/login');
    }
  }, [mounted, pathname, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!mounted || !user) {
    return <AdminLoader />;
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={cn(
        "flex-1 flex flex-col min-w-0 h-screen overflow-y-auto transition-all duration-300 ease-in-out relative",
        isSidebarOpen ? "lg:ml-[240px]" : "lg:ml-[80px]"
      )}>
        {/* Decorative background */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Mid-left soft blob */}
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-emerald-300 rounded-full opacity-25 blur-3xl" />
          {/* Bottom-right soft blob */}
          <div className="absolute bottom-0 right-0 w-[500px] h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl translate-x-1/3 translate-y-1/3" />
          {/* Center faint tint */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-100 rounded-full opacity-20 blur-3xl" />
          {/* Bottom wave — layered stylish design */}
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 220" preserveAspectRatio="none">
            {/* Back wave - darkest */}
            <path d="M0,180 C200,100 400,200 600,140 C800,80 1000,180 1200,120 C1300,90 1380,130 1440,110 L1440,220 L0,220 Z" fill="#1A3320" fillOpacity="0.06" />
            {/* Mid wave - emerald */}
            <path d="M0,200 C180,130 360,210 540,160 C720,110 900,190 1080,150 C1200,120 1340,165 1440,145 L1440,220 L0,220 Z" fill="#059669" fillOpacity="0.07" />
            {/* Front wave - lightest */}
            <path d="M0,210 C120,170 300,220 480,195 C660,168 840,210 1020,188 C1200,165 1350,200 1440,185 L1440,220 L0,220 Z" fill="#34d399" fillOpacity="0.08" />
          </svg>
        </div>

        <Topbar user={user} isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
