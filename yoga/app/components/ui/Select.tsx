"use client";

import * as React from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi";
import { cn } from "@/app/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  label?: string;
}

export function Select({ value, onChange, options, placeholder = "Select...", label }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-2" ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-xl border border-emerald-100 bg-[#FDFCF9] px-5 py-3 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all text-[#1A3320]",
            isOpen && "border-emerald-500/30 ring-4 ring-emerald-500/5"
          )}
        >
          <span className={cn("truncate", !selectedOption && "text-[#5C7562]/40")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <HiChevronDown className={cn("h-4 w-4 text-[#5C7562] transition-transform duration-200", isOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute z-50 mt-2 max-h-60 w-full overflow-hidden rounded-xl border border-emerald-100 bg-white p-1 shadow-2xl shadow-emerald-900/10"
            >
              <div className="overflow-y-auto max-h-56 custom-scrollbar">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center rounded-xl py-2.5 pl-3 pr-9 text-sm outline-none transition-colors hover:bg-emerald-50 hover:text-emerald-900",
                      value === option.value ? "bg-emerald-50 text-emerald-900 font-medium" : "text-[#1A3320]"
                    )}
                  >
                    <span className="block truncate">{option.label}</span>
                    {value === option.value && (
                      <span className="absolute inset-y-0 right-3 flex items-center">
                        <HiCheck className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
