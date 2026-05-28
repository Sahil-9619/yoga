"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CustomerService } from '../services/customer.service';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowRight, HiExclamationCircle } from 'react-icons/hi';
import { Eye, EyeOff } from 'lucide-react';

import { Suspense } from 'react';

function LoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const res = await CustomerService.login({ email, password });
            if (res.success) {
                // Notify other components of login state change
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('loginChange'));
                }
                const redirectUrl = searchParams.get('redirect');
                if (redirectUrl) {
                    router.push(redirectUrl);
                } else {
                    router.push('/my-videos');
                }
            } else {
                setError(res.message);
            }
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F7F2] px-6 pt-40 pb-16 sm:px-12 md:px-24 flex items-center justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                {/* Left Side: Typography only */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <span className="text-emerald-600 font-bold text-[10px] tracking-[0.3em] uppercase mb-4 block">Welcome Back</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#1A3320] leading-[0.9] tracking-tight mb-6">
                        Sign In.
                    </h1>
                    <p className="text-[#5C7562] font-light text-base md:text-lg max-w-sm">
                        Return to your practice. Enter your details to continue your journey of wellness and balance.
                    </p>
                </motion.div>

                {/* Right Side: Naked Form */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="w-full max-w-sm ml-auto">
                    {error && (
                        <div className="mb-8 flex items-start gap-3 p-4 border-l-2 border-red-500 text-red-700 text-xs font-medium">
                            <HiExclamationCircle size={18} className="flex-shrink-0 text-red-500" />
                            <span className="mt-0.5">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div>
                            <label className="block text-[10px] font-bold text-[#1A3320] uppercase tracking-[0.2em] mb-3">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full pb-3 bg-transparent border-b border-[#D8E2D5] focus:outline-none focus:border-[#1A3320] transition-colors text-[#1A3320] placeholder:text-emerald-900/20 text-base md:text-lg font-light"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-[#1A3320] uppercase tracking-[0.2em] mb-3">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full pb-3 pr-10 bg-transparent border-b border-[#D8E2D5] focus:outline-none focus:border-[#1A3320] transition-colors text-[#1A3320] font-light tracking-widest text-base md:text-lg placeholder:tracking-normal placeholder:text-emerald-900/20"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-0 text-slate-400 hover:text-[#1A3320] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full py-4 mt-4 bg-[#1A3320] text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-emerald-900 transition-all flex items-center justify-between px-8 disabled:opacity-70 group rounded-full shadow-2xl shadow-emerald-900/20">
                            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                            {!isLoading && <HiArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-12 border-t border-[#D8E2D5] pt-6">
                        <p className="text-[10px] text-[#5C7562] uppercase tracking-wider font-bold">
                            Don't have an account? <Link href="/signup" className="text-[#1A3320] hover:text-emerald-600 transition-colors ml-2">Create one</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F4F7F2] flex items-center justify-center">Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}
