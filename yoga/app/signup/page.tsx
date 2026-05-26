"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomerService } from '../services/customer.service';
import { BookingService } from '../services/booking.service';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiExclamationCircle } from 'react-icons/hi';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState<'details' | 'otp'>('details');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleInitiateSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name.trim()) return setError('Please enter your name.');
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email.');
        if (password.length < 6) return setError('Password must be at least 6 characters long.');
        
        setIsLoading(true);
        try {
            // Check if email is already registered before sending OTP
            const check = await CustomerService.checkEmail(email);
            if (check.success && check.exists) {
                return setError('Email already in use. Please sign in or use a different email.');
            }

            await BookingService.sendOtp(email);
            setStep('otp');
        } catch (err: any) {
            setError(err.message || 'Failed to send verification code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyAndSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const otpString = otp.join('');
            await BookingService.verifyOtp(email, otpString);
            
            // Complete registration upon successful OTP verification
            const res = await CustomerService.register({ name, email, password });
            if (res.success) {
                router.push('/workshop?tab=videos');
            } else {
                setError(res.message);
                setStep('details');
            }
        } catch (err: any) {
            setError(err.message || 'Verification or signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        const num = value.replace(/\D/g, '');
        if (num.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = num;
        setOtp(newOtp);
        if (num && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
    };

    return (
        <div className="min-h-screen bg-[#F4F7F2] px-6 pt-40 pb-16 sm:px-12 md:px-24 flex items-center justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                {/* Left Side: Typography only */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="order-1 md:order-2">
                    <span className="text-emerald-600 font-bold text-[10px] tracking-[0.3em] uppercase mb-4 block">Join the Family</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#1A3320] leading-[0.9] tracking-tight mb-6">
                        Create <br/>Account.
                    </h1>
                    <p className="text-[#5C7562] font-light text-base md:text-lg max-w-sm">
                        Begin your transformation. Access exclusive workshops, holistic health tips, and premium video lessons.
                    </p>
                </motion.div>

                {/* Right Side: Naked Form */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="w-full max-w-sm mr-auto order-2 md:order-1">
                    {error && (
                        <div className="mb-8 flex items-start gap-3 p-4 border-l-2 border-red-500 text-red-700 text-xs font-medium">
                            <HiExclamationCircle size={18} className="flex-shrink-0 text-red-500" />
                            <span className="mt-0.5">{error}</span>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 'details' ? (
                            <motion.div key="details" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
                                <form onSubmit={handleInitiateSignup} className="space-y-8">
                                    <div>
                                        <label className="block text-[10px] font-bold text-[#1A3320] uppercase tracking-[0.2em] mb-3">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full pb-3 bg-transparent border-b border-[#D8E2D5] focus:outline-none focus:border-[#1A3320] transition-colors text-[#1A3320] placeholder:text-emerald-900/20 text-base md:text-lg font-light"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
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
                                        <input
                                            type="password"
                                            required
                                            className="w-full pb-3 bg-transparent border-b border-[#D8E2D5] focus:outline-none focus:border-[#1A3320] transition-colors text-[#1A3320] font-light tracking-widest text-base md:text-lg placeholder:tracking-normal placeholder:text-emerald-900/20"
                                            placeholder="Choose a password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" disabled={isLoading} className="w-full py-4 mt-4 bg-[#1A3320] text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-emerald-900 transition-all flex items-center justify-between px-8 disabled:opacity-70 group rounded-full shadow-2xl shadow-emerald-900/20">
                                        <span>{isLoading ? 'Sending OTP...' : 'Sign Up'}</span>
                                        {!isLoading && <HiArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
                                    </button>
                                </form>

                                <div className="mt-12 border-t border-[#D8E2D5] pt-6">
                                    <p className="text-[10px] text-[#5C7562] uppercase tracking-wider font-bold">
                                        Already have an account? <Link href="/login" className="text-[#1A3320] hover:text-emerald-600 transition-colors ml-2">Sign in</Link>
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="otp" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
                                <form onSubmit={handleVerifyAndSignup} className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-serif text-[#1A3320] mb-1.5">Verify Email</h3>
                                        <p className="text-[#5C7562] text-xs font-light">Code sent to <span className="font-semibold text-emerald-700">{email}</span></p>
                                    </div>
                                    
                                    <div className="flex justify-between gap-3 py-2">
                                        {otp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                id={`otp-${idx}`}
                                                type="text"
                                                maxLength={1}
                                                className="w-12 h-16 text-center text-2xl font-serif rounded-xl bg-transparent border border-[#D8E2D5] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-[#1A3320]"
                                                value={digit}
                                                onChange={e => handleOtpChange(idx, e.target.value)}
                                            />
                                        ))}
                                    </div>

                                    <button type="submit" disabled={otp.some(d => !d) || isLoading} className="w-full py-4 mt-6 bg-[#1A3320] text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-emerald-900 transition-all flex items-center justify-between px-8 disabled:opacity-70 group rounded-full shadow-2xl shadow-emerald-900/20">
                                        <span>{isLoading ? 'Verifying...' : 'Verify & Create'}</span>
                                        {!isLoading && <HiArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep('details');
                                            setOtp(['', '', '', '']);
                                            setError('');
                                        }}
                                        className="w-full text-center text-[10px] uppercase tracking-widest font-bold text-[#5C7562] hover:text-[#1A3320] mt-4 transition-colors block"
                                    >
                                        Back to Details
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
