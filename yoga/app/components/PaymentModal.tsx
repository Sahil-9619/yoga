import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { PaymentService } from '../services/payment.service';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    video: any;
    onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, video, onPaymentSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !video) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <button
                            onClick={!isProcessing ? onClose : undefined}
                            className={`absolute top-6 right-6 p-2 bg-emerald-50 text-emerald-600 rounded-full transition-colors z-50 ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-100'}`}
                            disabled={isProcessing}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-8 relative z-10">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-600 mb-2 block">Secure Checkout</span>
                            <h2 className="text-2xl font-serif text-[#1A3320]">Order Summary</h2>
                        </div>

                        <div className="bg-emerald-50/50 rounded-2xl p-5 mb-8 border border-emerald-100/50 relative z-10">
                            <div className="flex justify-between items-start mb-4 border-b border-emerald-100/50 pb-4">
                                <div>
                                    <h3 className="font-bold text-[#1A3320] text-sm mb-1">{video.title}</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-[#5C7562]">Premium Video Access</p>
                                </div>
                                <div className="text-right">
                                    <span className="font-serif text-xl text-[#1A3320]">₹{video.price}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-[#1A3320]">Total Amount</span>
                                <span className="text-emerald-700 text-lg">₹{video.price}</span>
                            </div>
                        </div>

                        <div className="relative z-10 space-y-4">
                            {error && (
                                <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-2">
                                    {error}
                                </div>
                            )}

                            <div className="relative">
                                {isProcessing && (
                                    <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 z-50 rounded-2xl py-6">
                                        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                                        <p className="text-xs text-[#5C7562] font-medium">Processing secure transaction...</p>
                                    </div>
                                )}

                                <PayPalButtons
                                    style={{ layout: "vertical", shape: "rect", color: "gold", label: "pay" }}
                                    createOrder={async () => {
                                        setError('');
                                        try {
                                            const orderId = await PaymentService.createPaypalOrder(video.price);
                                            return orderId;
                                        } catch (e: any) {
                                            setError(e.message || 'Failed to initialize PayPal payment.');
                                            throw e;
                                        }
                                    }}
                                    onApprove={async (data) => {
                                        setIsProcessing(true);
                                        try {
                                            const result = await PaymentService.capturePaypalOrder(data.orderID);
                                            if (result.status === "COMPLETED") {
                                                onPaymentSuccess();
                                            } else {
                                                setError("Payment capture was not completed successfully.");
                                            }
                                        } catch (e: any) {
                                            setError(e.message || "Failed to complete payment transaction.");
                                        } finally {
                                            setIsProcessing(false);
                                        }
                                    }}
                                    onError={(err) => {
                                        console.error("PayPal Error:", err);
                                        setError("Payment failed or was cancelled. Please try again.");
                                    }}
                                />
                            </div>

                            <div className="flex items-center justify-center gap-2 text-[10px] text-[#5C7562] uppercase tracking-widest font-bold pt-2">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                256-bit Encrypted Checkout
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
