"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-[#D8E2D5] last:border-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
      >
        <span className="font-serif text-xl text-[#254A2E] group-hover:text-emerald-600 transition-colors pr-4">{question}</span>
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center bg-[#EAF0E5] transition-transform duration-300", isOpen ? "rotate-180 bg-emerald-50 text-emerald-600" : "text-[#7A9380]")}>
           <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#4A6350] font-light leading-relaxed text-lg pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
