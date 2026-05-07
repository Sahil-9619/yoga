"use client";

import React, { useRef } from 'react';
import { HiPhotograph, HiUpload } from 'react-icons/hi';
import { cn } from '@/app/lib/utils';

interface FileUploadProps {
  label: string;
  previewUrl: string | null;
  onFileChange: (file: File) => void;
  className?: string;
}

export function FileUpload({ label, previewUrl, onFileChange, className }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <label className="block text-[10px] font-bold text-[#5C7562] uppercase tracking-[0.2em] ml-1">
        {label}
      </label>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="group relative h-24 border-2 border-dashed border-emerald-100 rounded-xl bg-[#FDFCF9] hover:bg-emerald-50/50 hover:border-emerald-300 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center"
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <HiUpload size={20} className="text-white drop-shadow-md" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <HiPhotograph size={18} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5C7562]">Click to upload</span>
          </div>
        )}
      </div>
    </div>
  );
}
