"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExclamation, HiX } from 'react-icons/hi';
import { cn } from '@/app/lib/utils';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Delete", 
  type = 'danger' 
}: ConfirmModalProps) {
  const themes = {
    danger: {
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      buttonBg: 'bg-red-600 hover:bg-red-700',
      borderColor: 'border-red-100'
    },
    warning: {
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      buttonBg: 'bg-amber-600 hover:bg-amber-700',
      borderColor: 'border-amber-100'
    },
    info: {
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      buttonBg: 'bg-[#1A3320] hover:bg-emerald-900',
      borderColor: 'border-emerald-100'
    }
  };

  const theme = themes[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A3320]/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-100/50"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", theme.iconBg, theme.iconColor)}>
                  <HiExclamation size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-[#1A3320] leading-tight">{title}</h3>
                  <p className="text-xs text-[#5C7562] mt-1.5 leading-relaxed">{message}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-emerald-100 text-[#5C7562] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={cn(
                    "flex-1 px-4 py-2.5 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-black/5",
                    theme.buttonBg
                  )}
                >
                  {confirmText}
                </button>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-emerald-50 text-[#5C7562] rounded-full transition-colors"
            >
              <HiX size={16} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
