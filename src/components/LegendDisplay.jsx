import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LegendDisplay = ({ legend, onStartPresentation }) => {
  return (
    <div className="flex-1 min-h-[50vh] lg:h-full relative flex flex-col items-center justify-center p-6 lg:p-12 lg:pt-36 z-10 select-none">
      {/* Clickable Graphic Display Box */}
      <div 
        onClick={onStartPresentation}
        data-cursor="explore"
        className="relative w-full max-w-2xl aspect-square lg:aspect-video flex items-center justify-center z-10 p-6 md:p-12 glass-card rounded-[2px] border border-white/20 hover:border-[var(--color-theme)] hover:shadow-[0_0_24px_rgba(125,82,252,0.12)] shadow-xs transition-all duration-300 cursor-pointer group"
      >
        
        {/* Technical drafting marks in adaptive style */}
        <span className="absolute top-4 left-5 font-mono text-[9px] text-[var(--color-primary)]/30 tracking-widest uppercase font-bold">
          [PREVIEW.SYS]
        </span>
        <span className="absolute top-4 right-5 font-mono text-[9px] text-[var(--color-primary)]/30 tracking-widest uppercase font-bold">
          SYS_V4.8
        </span>
        <span className="absolute bottom-4 left-5 font-mono text-[9px] text-[var(--color-primary)]/30 tracking-widest uppercase font-bold">
          SCALE // 2.0X
        </span>
        <span className="absolute bottom-4 right-5 font-mono text-[9px] text-[var(--color-theme)] font-bold tracking-widest uppercase">
          LOC // SPARTANBURG, SC
        </span>

        <AnimatePresence mode="wait">
          <motion.div 
            key={legend.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full h-full relative flex flex-col items-center justify-center pt-4"
          >
            {/* Enlarged image logo with max-w-[90%] and max-h-[90%] */}
            <img 
              src={legend.file} 
              alt={legend.title} 
              className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Start Presentation Play Button underneath */}
      <div className="mt-8 z-20">
        <button
          onClick={onStartPresentation}
          data-cursor="explore"
          className="flex items-center gap-3 px-8 py-3.5 hover:opacity-90 text-[#FAF9FC] font-display text-xs uppercase tracking-[0.2em] font-bold rounded-[2px] border border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none"
          style={{ 
            backgroundColor: 'var(--color-theme)',
            boxShadow: '0 4px 16px color-mix(in srgb, var(--color-theme) 25%, transparent)'
          }}
        >
          <span>START PRESENTATION</span>
          <span className="text-sm ml-2">▶</span>
        </button>
      </div>
    </div>
  );
};

export default LegendDisplay;
