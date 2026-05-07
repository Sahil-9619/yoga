"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthService } from '../../services/auth.service';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await AuthService.login(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Side: Visual Experience */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#1A3320]">
        <Image
          src="/images/meditation.png"
          alt="Meditation"
          fill
          className="object-cover opacity-60 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A3320] via-transparent to-[#1A3320]/20" />

        <div className="absolute inset-0 flex flex-col justify-between p-12 lg:p-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-white font-serif text-lg tracking-widest uppercase">Admin Portal</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
              Manage the Sanctuary <br />
              With Stillness.
            </h2>
            <div className="w-20 h-1 bg-emerald-500 rounded-full" />
            <p className="text-emerald-100/60 mt-6 max-w-sm font-light leading-relaxed text-sm">
              "Quiet the mind, and the soul will speak." <br />
              Welcome to the heart of Saargaamm Bhartiye management.
            </p>
          </motion.div>

          <div className="text-emerald-100/30 text-[10px] uppercase tracking-[0.4em]">
            © 2026 Saargaamm Bhartiye
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 md:p-16 bg-[#FDFCF9] overflow-y-auto md:overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md flex flex-col h-full md:h-auto justify-center"
        >
          {/* Logo and Title Header */}
          <div className="flex items-center gap-4 mb-8 shrink-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
              <Image src="/logo-v2.png" alt="Logo" fill className="object-contain scale-150" priority unoptimized />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-serif text-[#1A3320] tracking-[0.3em] uppercase leading-tight">Saargaamm Bhartiye</h1>
              <div className="h-[1px] w-full bg-emerald-100 mt-1" />
              <p className="text-[10px] text-[#5C7562] uppercase tracking-widest mt-1 opacity-60">Admin Portal</p>
            </div>
          </div>

          <div className="mb-8 shrink-0">
            <h3 className="text-2xl font-serif text-[#1A3320] mb-1">Welcome Back</h3>
            <p className="text-[#5C7562] text-xs">Please sign in to access your administrative dashboard.</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-medium"
              >
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5 shrink-0">
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#3A5340] ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-[#5C7562] group-focus-within:text-emerald-600 transition-colors">
                  <User size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-emerald-100/50 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-[#1A3320] placeholder:text-[#5C7562]/30 text-xs"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#3A5340]">
                  Password
                </label>

              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-[#5C7562] group-focus-within:text-emerald-600 transition-colors">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-emerald-100/50 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-[#1A3320] placeholder:text-[#5C7562]/30 text-xs"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4.5 flex items-center text-[#5C7562]/50 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="premium"
              className="w-full h-12 text-[10px] uppercase tracking-[0.3em] font-bold group relative overflow-hidden rounded-xl mt-2"
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Authenticating
                  </>
                ) : (
                  <>
                    Login to Portal
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-emerald-100/50 flex flex-row items-center justify-between gap-4 shrink-0">
            <Link href="/" className="text-[12px] uppercase tracking-widest text-[#5C7562] hover:text-[#1A3320] transition-colors">
              ← Go back to Home
            </Link>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
