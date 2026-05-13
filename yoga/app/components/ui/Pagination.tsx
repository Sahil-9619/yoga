"use client";

import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { cn } from '@/app/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={cn("flex items-center justify-center gap-2 py-6", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 px-4 border border-emerald-100 rounded-lg text-emerald-600 disabled:opacity-30 hover:bg-emerald-50 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
      >
        <HiChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, i) => (
          page === '...' ? (
            <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-[#5C7562]">
              &hellip;
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
              className={cn(
                "w-10 h-10 rounded-lg text-sm font-bold transition-all border",
                currentPage === page
                  ? "bg-[#1A3320] text-white border-[#1A3320] shadow-lg shadow-emerald-900/10"
                  : "bg-white text-[#5C7562] border-emerald-100 hover:bg-emerald-50"
              )}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 px-4 border border-emerald-100 rounded-lg text-emerald-600 disabled:opacity-30 hover:bg-emerald-50 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
      >
        <span className="hidden sm:inline">Next</span>
        <HiChevronRight size={16} />
      </button>
    </div>
  );
}
