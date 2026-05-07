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
        "flex-1 flex flex-col min-w-0 h-screen overflow-y-auto transition-all duration-300 ease-in-out",
        isSidebarOpen ? "lg:ml-[240px]" : "lg:ml-[80px]"
      )}>
        <Topbar user={user} isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {children}
      </div>
    </div>
  );
}
