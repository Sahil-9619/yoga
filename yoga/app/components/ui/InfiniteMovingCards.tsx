"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Item {
  quote: string;
  image: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast"
}: {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "slow";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
      setStart(true);
    }
  }, []);

  const speedClass = speed === "fast" ? "duration-[20s]" : "duration-[50s]";
  const directionClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div ref={containerRef} className="scroller relative z-20 w-full overflow-hidden">
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 sm:gap-6 py-4 w-max flex-nowrap will-change-transform",
          start && `${directionClass} ${speedClass} linear infinite`
        )}
        style={{
          animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} ${speed === 'fast' ? '30s' : '50s'} linear infinite`,
          transform: 'translateZ(0)'
        } as React.CSSProperties}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[240px] sm:w-[280px] md:w-[350px] h-[340px] sm:h-[400px] relative rounded-[2rem] border border-slate-100 bg-white shadow-lg shadow-slate-200/40 flex-shrink-0 p-1.5 sm:p-2 group overflow-hidden"
          >
            <div className="w-full h-full relative rounded-[1.5rem] overflow-hidden">
              <img 
                src={item.image} 
                alt="Yoga Pose" 
                className="absolute inset-0 w-full h-full object-cover sm:transition-transform sm:duration-700 sm:group-hover:scale-110" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70"></div>
              <div className="relative z-20 h-full flex flex-col justify-end p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                  <span className="text-white/90 text-xs sm:text-sm font-medium">@saargaamm</span>
                </div>
                <p className="text-white font-serif text-base sm:text-lg leading-tight sm:leading-[1.5] line-clamp-3 font-light">&quot;{item.quote}&quot;</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes scrollLeft {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes scrollRight {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
};
