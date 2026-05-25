import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, PlayCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    actionText: string;
    onAction: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message, actionText, onAction }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white rounded-[2rem] p-10 w-full max-w-sm shadow-2xl text-center relative overflow-hidden"
                    >
                        {/* Confetti-like ambient glows */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                            className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                        >
                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        </motion.div>

                        <div className="relative z-10 mb-8">
                            <h2 className="text-3xl font-serif text-[#1A3320] mb-3">Success!</h2>
                            <p className="text-sm text-[#5C7562] font-light leading-relaxed max-w-[250px] mx-auto">
                                {message}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 relative z-10">
                            <Button
                                onClick={onAction}
                                className="w-full py-4 text-xs tracking-widest uppercase font-bold rounded-xl flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all"
                            >
                                <PlayCircle className="w-4 h-4" /> {actionText}
                            </Button>
                            
                            <button
                                onClick={onClose}
                                className="w-full py-3 text-[10px] tracking-widest uppercase font-bold text-[#5C7562] hover:text-[#1A3320] transition-colors"
                            >
                                Close & Explore More
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
