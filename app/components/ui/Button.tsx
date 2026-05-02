import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'premium';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-[#1A3320] text-white hover:bg-[#254A2E] shadow-lg hover:shadow-[#1A3320]/20",
      outline: "border border-[#D8E2D5] text-[#1A3320] hover:bg-[#EAF0E5]",
      ghost: "hover:bg-[#D8E2D5] text-[#354E3B] hover:text-[#1A3320]",
      premium: "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:bg-emerald-700",
    };
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-full px-4",
      lg: "h-14 rounded-full px-8 text-md font-semibold",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
