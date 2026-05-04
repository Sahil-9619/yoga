"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Phone,
    ShieldCheck,
    CreditCard,
    CheckCircle2,
    ArrowRight,
    Calendar,
    Clock,
    MapPin,
    Smartphone,
    Lock
} from 'lucide-react';
import { Button } from './ui/Button';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    workshop: {
        title: string;
        date: string;
        time: string;
        location: string;
        price: string;
    } | null;
}

type Step = 'phone' | 'otp' | 'payment' | 'success';

export const BookingModal = ({ isOpen, onClose, workshop }: BookingModalProps) => {
    const [step, setStep] = useState<Step>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);

    // Reset flow when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => setStep('phone'), 500);
            setPhoneNumber('');
            setOtp(['', '', '', '']);
        }
    }, [isOpen]);

    const handleNext = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (step === 'phone') setStep('otp');
            else if (step === 'otp') setStep('payment');
            else if (step === 'payment') setStep('success');
        }, 1200);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setPhoneNumber(value);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = numericValue;
        setOtp(newOtp);

        // Auto-focus next input
        if (numericValue && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    if (!workshop) return null;

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0D1A10]/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-20"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col h-full">
                            {/* Step Indicator */}
                            <div className="px-6 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                                    {step === 'phone' && 'Verification'}
                                    {step === 'otp' && 'Security'}
                                    {step === 'payment' && 'Checkout'}
                                    {step === 'success' && 'Confirmed'}
                                </span>
                                <div className="flex gap-1.5">
                                    {(['phone', 'otp', 'payment', 'success'] as Step[]).map((s, i) => (
                                        <div
                                            key={s}
                                            className={`h-1 rounded-full transition-all duration-500 ${step === s ? 'w-6 bg-emerald-600' :
                                                (['phone', 'otp', 'payment', 'success'].indexOf(step) > i ? 'w-3 bg-emerald-200' : 'w-3 bg-slate-100')
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex-1">
                                <AnimatePresence mode="wait">
                                    {step === 'phone' && (
                                        <motion.div
                                            key="phone"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-2xl font-serif text-[#1A3320] mb-1.5">Book Your Session</h3>
                                                <p className="text-[#5C7562] text-xs font-light">Enter your mobile number to receive a code.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                        <Smartphone className="w-4 h-4" />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        placeholder="Phone Number"
                                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-base font-medium text-slate-800 placeholder:text-slate-400"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </div>
                                                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                                        <Lock className="w-4 h-4" />
                                                    </div>
                                                    <p className="text-[10px] text-emerald-800/70 leading-relaxed">
                                                        Your data is encrypted. We only use your number for secure login.
                                                    </p>
                                                </div>
                                            </div>

                                            <Button
                                                variant="premium"
                                                className="w-full py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] gap-2"
                                                onClick={handleNext}
                                                disabled={phoneNumber.length < 10 || isLoading}
                                            >
                                                {isLoading ? 'Sending OTP...' : 'Send Code'} <ArrowRight className="w-3.5 h-3.5" />
                                            </Button>
                                        </motion.div>
                                    )}

                                    {step === 'otp' && (
                                        <motion.div
                                            key="otp"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-2xl font-serif text-[#1A3320] mb-1.5">Verify Identity</h3>
                                                <p className="text-[#5C7562] text-xs font-light">
                                                    Code sent to <span className="font-semibold text-emerald-700">{phoneNumber}</span>
                                                </p>
                                            </div>

                                            <div className="flex justify-between gap-3 py-2">
                                                {otp.map((digit, idx) => (
                                                    <input
                                                        key={idx}
                                                        id={`otp-${idx}`}
                                                        type="text"
                                                        maxLength={1}
                                                        className="w-12 h-16 text-center text-2xl font-serif rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-slate-800"
                                                        value={digit}
                                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                    />
                                                ))}
                                            </div>

                                            <div className="text-center">
                                                <button className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                                                    Resend Code (0:29)
                                                </button>
                                            </div>

                                            <Button
                                                variant="premium"
                                                className="w-full py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] gap-2"
                                                onClick={handleNext}
                                                disabled={otp.some(d => !d) || isLoading}
                                            >
                                                {isLoading ? 'Verifying...' : 'Verify & Continue'} <ShieldCheck className="w-3.5 h-3.5" />
                                            </Button>
                                        </motion.div>
                                    )}

                                    {step === 'payment' && (
                                        <motion.div
                                            key="payment"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-2xl font-serif text-[#1A3320] mb-1.5">Complete Payment</h3>
                                                <p className="text-[#5C7562] text-xs font-light">Secure your spot for the workshop.</p>
                                            </div>

                                            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                                    <CreditCard size={80} />
                                                </div>
                                                <div className="flex justify-between items-start relative z-10">
                                                    <div>
                                                        <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-0.5">Amount to Pay</div>
                                                        <div className="text-3xl font-serif">{workshop.price}</div>
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
                                                    <div className="flex-1">
                                                        <div className="text-xs font-bold text-[#1A3320]">UPI / Google Pay / PhonePe</div>
                                                    </div>
                                                </label>
                                                <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-emerald-200 transition-colors">
                                                    <input type="radio" name="pay" className="w-3.5 h-3.5 accent-emerald-600" />
                                                    <div className="flex-1">
                                                        <div className="text-xs font-bold text-[#1A3320]">Credit / Debit Card</div>
                                                    </div>
                                                </label>
                                            </div>

                                            <Button
                                                variant="premium"
                                                className="w-full py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] gap-2 shadow-xl shadow-emerald-900/20"
                                                onClick={handleNext}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Processing...' : `Pay ${workshop.price} Now`} <CreditCard className="w-3.5 h-3.5" />
                                            </Button>
                                        </motion.div>
                                    )}

                                    {step === 'success' && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-2"
                                        >
                                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                                                <CheckCircle2 size={32} className="animate-bounce" />
                                            </div>

                                            <h3 className="text-3xl font-serif text-[#1A3320] mb-2">Confirmed!</h3>
                                            <p className="text-[#5C7562] text-xs font-light mb-8">
                                                Confirmation details sent to your WhatsApp.
                                            </p>

                                            <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-3 mb-8">
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
                                                        <div className="text-xs font-medium text-[#1A3320]">{workshop.time}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                                    <div>
                                                        <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Location</div>
                                                        <div className="text-xs font-medium text-[#1A3320] text-ellipsis overflow-hidden">{workshop.location}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                variant="outline"
                                                className="w-full py-5 rounded-xl text-[10px] font-bold uppercase tracking-widest"
                                                onClick={onClose}
                                            >
                                                Done
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
