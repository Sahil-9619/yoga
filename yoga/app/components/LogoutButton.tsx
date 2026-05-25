"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CustomerService } from "../services/customer.service";

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    CustomerService.logout();
    router.replace("/login"); // adjust to your login route
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-red-500 backdrop-blur-md shadow-lg hover:shadow-xl transition-all hover:bg-red-600 text-white hover:text-white hover:scale-105"
      aria-label="Logout"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
        />
      </svg>
    </button>
  );
};
