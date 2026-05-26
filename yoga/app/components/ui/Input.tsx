"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function Input({ label, icon, className, onWheel, onKeyDown, min, ...props }: InputProps) {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (props.type === "number") {
      e.currentTarget.blur();
    }
    if (onWheel) onWheel(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.type === "number") {
      // Block '-', 'e', 'E' keys to prevent negative values and exponential notation in number inputs
      if (e.key === '-' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
      }
    }
    if (onKeyDown) onKeyDown(e);
  };

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            "w-full bg-[#FDFCF9] border border-emerald-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 transition-all text-black placeholder:text-[#5C7562]/30",
            icon && "pr-10",
            className
          )}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          min={props.type === "number" ? (min !== undefined ? min : 0) : min}
          {...props}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600/30">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
