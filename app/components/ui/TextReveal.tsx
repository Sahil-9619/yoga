import React from 'react';
import { motion } from 'framer-motion';

export const TextReveal = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2 justify-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.1, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-slate-900 leading-tight"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};
