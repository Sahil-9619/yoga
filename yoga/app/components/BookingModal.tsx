"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ShieldCheck, CreditCard, CheckCircle2, ArrowRight,
    Calendar, Clock, MapPin, Smartphone, Lock, User, Mail
} from 'lucide-react';
import { Button } from './ui/Button';
import { BookingService } from '../services/booking.service';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    workshop: {
        id?: number | string;
        title: string;
        date: string;
        time: string;
        location?: string;
        platform?: string;
        mode: string;
        priceType: string;
        amount?: number | string;
    } | null;
}

type Step = 'details' | 'otp' | 'payment' | 'success';

export const BookingModal = ({ isOpen, onClose, workshop }: BookingModalProps) => {
    const [step, setStep] = useState<Step>('details');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('details');
                setName(''); setEmail(''); setPhone('');
                setOtp(['', '', '', '']);
                setError('');
            }, 500);
        }
    }, [isOpen]);

    const handleSendOtp = async () => {
        if (!name.trim()) return setError('Please enter your name.');
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email.');
        if (phone.length < 10) return setError('Please enter a valid 10-digit phone number.');
        setError('');
        setIsLoading(true);
        try {
            await BookingService.sendOtp(email);
            setStep('otp');
        } catch (e: any) {
            setError(e.message || 'Failed to send OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        setError('');
        try {
            const otpString = otp.join('');
            await BookingService.verifyOtp(email, otpString);
            setStep('payment');
        } catch (e: any) {
            setError(e.message || 'Invalid or expired OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePay = async () => {
        if (!workshop) return;
        setIsLoading(true);
        try {
            await BookingService.createBooking({
                name, email, phone,
                workshopId: workshop.id ?? 0,
                workshopTitle: workshop.title,
                categoryName: (workshop as any).Category?.name,
                amount: workshop.amount,
                priceType: workshop.priceType,
            });
            setStep('success');
        } catch (e: any) {
            setError(e.message || 'Booking failed. Please try again.');
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

    if (!workshop) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0D1A10]/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-xl overflow-hidden shadow-2xl z-10"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-20">
                            <X className="w-4 h-4" />
                        </button>

                        {/* Step indicator */}
                        <div className="px-6 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                                {step === 'details' && 'Your Details'}
                                {step === 'otp' && 'Verification'}
                                {step === 'payment' && 'Checkout'}
                                {step === 'success' && 'Confirmed'}
                            </span>
                            <div className="flex gap-1.5">
                                {(['details', 'otp', 'payment', 'success'] as Step[]).map((s, i) => (
                                    <div key={s} className={`h-1 rounded-full transition-all duration-500 ${step === s ? 'w-6 bg-emerald-600' : (['details', 'otp', 'payment', 'success'].indexOf(step) > i ? 'w-3 bg-emerald-200' : 'w-3 bg-slate-100')}`} />
                                ))}
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <AnimatePresence mode="wait">

                                {/* Step 1: Name / Email / Phone */}
                                {step === 'details' && (
                                    <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                        <div>
                                            <h3 className="text-2xl font-serif text-[#1A3320] mb-1">Book Your Spot</h3>
                                            <p className="text-[#5C7562] text-xs font-light">Enter your details to reserve a place.</p>
                                        </div>

                                        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

                                        {/* Name */}
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><User className="w-4 h-4" /></div>
                                            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm text-slate-800 placeholder:text-slate-400" />
                                        </div>
                                        {/* Email */}
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4" /></div>
                                            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm text-slate-800 placeholder:text-slate-400" />
                                        </div>
                                        {/* Phone */}
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Smartphone className="w-4 h-4" /></div>
                                            <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm text-slate-800 placeholder:text-slate-400" />
                                        </div>

                                        <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex gap-3">
                                            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-[10px] text-emerald-800/70 leading-relaxed">Your data is encrypted and used only for booking confirmation.</p>
                                        </div>

                                        <Button variant="premium" className="w-full py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] gap-2" onClick={handleSendOtp} disabled={isLoading}>
                                            {isLoading ? 'Please wait...' : 'Continue'} <ArrowRight className="w-3.5 h-3.5" />
                                        </Button>
                                    </motion.div>
                                )}

                                {/* Step 2: OTP */}
                                {step === 'otp' && (
                                    <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div>
                                            <h3 className="text-2xl font-serif text-[#1A3320] mb-1.5">Verify Email</h3>
                                            <p className="text-[#5C7562] text-xs font-light">Code sent to <span className="font-semibold text-emerald-700">{email}</span></p>
                                        </div>
                                        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
                                        <div className="flex justify-between gap-3 py-2">
                                            {otp.map((digit, idx) => (
                                                <input key={idx} id={`otp-${idx}`} type="text" maxLength={1}
                                                    className="w-12 h-16 text-center text-2xl font-serif rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-slate-800"
                                                    value={digit} onChange={e => handleOtpChange(idx, e.target.value)} />
                                            ))}
                                        </div>
                                        <Button variant="premium" className="w-full py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] gap-2" onClick={handleVerifyOtp} disabled={otp.some(d => !d) || isLoading}>
                                            {isLoading ? 'Verifying...' : 'Verify & Continue'} <ShieldCheck className="w-3.5 h-3.5" />
                                        </Button>
                                    </motion.div>
                                )}

                                {/* Step 3: Payment */}
                                {step === 'payment' && (
                                    <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div>
                                            <h3 className="text-2xl font-serif text-[#1A3320] mb-1.5">Complete Payment</h3>
                                            <p className="text-[#5C7562] text-xs font-light">Secure your spot for the workshop.</p>
                                        </div>
                                        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
                                        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-10"><CreditCard size={80} /></div>
                                            <div className="flex justify-between items-start relative z-10">
                                                <div>
                                                    <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-0.5">Amount</div>
                                                    <div className="text-3xl font-serif">{workshop.priceType === 'free' ? 'Free' : `₹${workshop.amount}`}</div>
                                                </div>
                                                <div className="px-2 py-0.5 rounded-full bg-white/10 text-[7px] font-bold uppercase tracking-widest">Secure</div>
                                            </div>
                                            <div className="space-y-1 relative z-10">
                                                <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">Workshop</div>
                                                <div className="text-xs font-medium truncate max-w-[200px]">{workshop.title}</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-emerald-200 transition-colors">
                                                <input type="radio" name="pay" defaultChecked className="w-3.5 h-3.5 accent-emerald-600" />
                                                <div className="text-xs font-bold text-[#1A3320]">UPI / Google Pay / PhonePe</div>
                                            </label>
                                            <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-emerald-200 transition-colors">
                                                <input type="radio" name="pay" className="w-3.5 h-3.5 accent-emerald-600" />
                                                <div className="text-xs font-bold text-[#1A3320]">Credit / Debit Card</div>
                                            </label>
                                        </div>
                                        <Button variant="premium" className="w-full py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] gap-2 shadow-xl shadow-emerald-900/20" onClick={handlePay} disabled={isLoading}>
                                            {isLoading ? 'Processing...' : `Pay ${workshop.priceType === 'free' ? 'Free' : `₹${workshop.amount}`} Now`} <CreditCard className="w-3.5 h-3.5" />
                                        </Button>
                                    </motion.div>
                                )}

                                {/* Step 4: Success */}
                                {step === 'success' && (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-2">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                                            <CheckCircle2 size={32} className="animate-bounce" />
                                        </div>
                                        <h3 className="text-3xl font-serif text-[#1A3320] mb-2">Confirmed!</h3>
                                        <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3 mb-6 mt-4">
                                            <div className="flex items-center gap-3">
                                                <User className="w-4 h-4 text-emerald-600" />
                                                <div>
                                                    <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Booked By</div>
                                                    <div className="text-xs font-medium text-[#1A3320]">{name}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-4 h-4 text-emerald-600" />
                                                <div>
                                                    <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Date</div>
                                                    <div className="text-xs font-medium text-[#1A3320]">{workshop.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-4 h-4 text-emerald-600" />
                                                <div>
                                                    <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Time</div>
                                                    <div className="text-xs font-medium text-[#1A3320]">{workshop.time} IST</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-4 h-4 text-emerald-600" />
                                                <div>
                                                    <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Location</div>
                                                    <div className="text-xs font-medium text-[#1A3320]">{workshop.mode === 'online' ? `Online (${workshop.platform})` : workshop.location}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full py-5 rounded-xl text-[10px] font-bold uppercase tracking-widest" onClick={onClose}>Done</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
