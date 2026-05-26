"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    isLoading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    message = "Are you sure you want to perform this action? This step is permanent and cannot be undone.",
    isLoading = false
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isLoading ? onClose : undefined}
                        className="absolute inset-0 bg-red-950/20 backdrop-blur-sm"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl border border-red-150 overflow-hidden z-10"
                    >
                        {/* Decorative Background Warning Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={!isLoading ? onClose : undefined}
                            className={`absolute top-6 right-6 p-2 bg-red-50 text-red-600 rounded-full transition-colors z-20 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-100'}`}
                            disabled={isLoading}
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="text-center relative z-10">
                            {/* Animated Warning Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.05 }}
                                className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-100"
                            >
                                <AlertTriangle className="w-8 h-8" />
                            </motion.div>

                            {/* Header */}
                            <h3 className="text-2xl font-serif text-[#1A3320] mb-3">{title}</h3>
                            <p className="text-xs text-[#5C7562] font-light leading-relaxed max-w-[280px] mx-auto mb-8">
                                {message}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className="w-full py-4 text-xs tracking-widest uppercase font-bold rounded-xl flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/10 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        "Delete Permanently"
                                    )}
                                </button>
                                
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="w-full py-3 text-[10px] tracking-widest uppercase font-bold text-[#5C7562] hover:text-[#1A3320] transition-colors disabled:opacity-50"
                                >
                                    Cancel & Retain
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
