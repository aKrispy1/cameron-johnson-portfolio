import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LegendDisplay = ({ legend }) => {
  return (
    <div className="flex-1 min-h-[50vh] lg:h-full relative flex flex-col items-center justify-center p-6 lg:p-12 lg:pt-36 z-10 select-none">
      <div className="relative w-full max-w-3xl aspect-square lg:aspect-video xl:aspect-[4/3] flex items-center justify-center z-10 p-4 lg:p-8">
        
        {/* Technical drafting marks pushed to far edges */}
        <span className="absolute top-0 left-0 font-mono text-[10px] text-[var(--color-primary)]/20 tracking-tight">
          [PREVIEW.SYS]
        </span>
        <span className="absolute top-0 right-0 font-mono text-[10px] text-[var(--color-primary)]/20 tracking-tight">
          SYS_V4_8
        </span>
        <span className="absolute bottom-0 left-0 font-mono text-[10px] text-[var(--color-primary)]/20 tracking-tight">
          SCALE // 2.0X
        </span>
        <span className="absolute bottom-0 right-0 font-mono text-[10px] text-[var(--color-primary)]/20 tracking-tight">
          LOC // 34.9496° N, 81.9320° W
        </span>

        <AnimatePresence mode="wait">
          <motion.div 
            key={legend.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full relative group flex flex-col items-center justify-center"
          >
            <img 
              src={legend.file} 
              alt={legend.title} 
              className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LegendDisplay;
