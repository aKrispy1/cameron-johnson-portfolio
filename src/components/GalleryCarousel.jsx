import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryCarousel = ({ legend }) => {
  const images = legend.gallery && legend.gallery.length > 0 ? legend.gallery : [legend.file];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex-1 min-h-[50vh] lg:h-full relative flex flex-col items-center justify-center p-6 lg:p-12 z-10 select-none overflow-hidden">
      
      {/* Main Large Image Container */}
      <div className="relative w-full max-w-2xl aspect-square lg:aspect-video xl:aspect-[4/3] flex items-center justify-center border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-8 lg:p-16">
        
        {/* Technical metadata at corners */}
        <span className="absolute top-3 left-4 font-mono text-[9px] text-[var(--color-primary)]/30 tracking-tight">
          [GALLERY.VIEW]
        </span>
        <span className="absolute top-3 right-4 font-mono text-[9px] text-[var(--color-theme)] font-bold tracking-tight">
          {String(currentIndex + 1).padStart(2, '0')} // {String(images.length).padStart(2, '0')}
        </span>
        <span className="absolute bottom-3 left-4 font-mono text-[9px] text-[var(--color-primary)]/30 tracking-tight">
          ASSET DIRECTORY
        </span>
        <span className="absolute bottom-3 right-4 font-mono text-[9px] text-[var(--color-primary)]/30 tracking-tight">
          SYS_V4_8_GAL
        </span>

        <AnimatePresence mode="wait">
          <motion.img 
            key={`${legend.id}-${currentIndex}`}
            src={images[currentIndex]} 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </AnimatePresence>
      </div>

      {/* Navigation & Thumbnail Row */}
      <div className="flex items-center gap-4 w-full justify-center max-w-2xl mt-8">
        <button 
          onClick={prevImage} 
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.04] text-[var(--color-primary)] transition-all rounded-none focus:outline-none"
        >
          <span className="font-mono text-sm">←</span>
        </button>

        <div className="flex gap-2 overflow-x-auto py-2 custom-scrollbar px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar { display: none; }
            .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-14 flex-shrink-0 cursor-pointer border transition-all duration-300 p-1.5 bg-[var(--color-background)] rounded-none ${
                idx === currentIndex 
                  ? 'border-[var(--color-theme)] bg-[var(--color-primary)]/[0.03]' 
                  : 'border-[var(--color-primary)]/10 opacity-50 hover:opacity-100 hover:border-[var(--color-primary)]/30'
              }`}
            >
              <img src={img} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>

        <button 
          onClick={nextImage} 
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.04] text-[var(--color-primary)] transition-all rounded-none focus:outline-none"
        >
          <span className="font-mono text-sm">→</span>
        </button>
      </div>

    </div>
  );
};

export default GalleryCarousel;
