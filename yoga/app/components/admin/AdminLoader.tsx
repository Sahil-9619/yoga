"use client";

import React from 'react';

export const AdminLoader = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FDFCF9]">
      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4" />
      <p className="text-[#5C7562] font-serif animate-pulse">Loading....</p>
    </div>
  );
};
