import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CaseStudyView = ({ legend }) => {
  const caseStudy = legend.caseStudy || {};
  const images = legend.gallery && legend.gallery.length > 0 ? legend.gallery : [legend.file];
  const [currentIndex, setCurrentIndex] = useState(0);

  const sections = [
    { label: 'CHALLENGE', key: 'challenge', content: caseStudy.challenge },
    { label: 'APPROACH', key: 'approach', content: caseStudy.approach },
    { label: 'OUTCOME', key: 'outcome', content: caseStudy.outcome },
  ].filter(s => s.content);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex-1 min-h-[50vh] lg:h-full relative flex flex-col z-10 select-none lg:overflow-y-auto custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Case Study Header */}
      <div className="px-8 lg:px-12 pt-8 lg:pt-36 pb-6">
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-[var(--color-primary)]/10">
          <span className="font-mono text-xs text-[var(--color-primary)]/40 tracking-wider uppercase">
            Case Study // {legend.title}
          </span>
          <span className="font-mono text-xs text-[var(--color-theme)] font-bold tracking-wider">
            NO // {String(legend.id).padStart(3, '0')}
          </span>
        </div>
      </div>

      {/* Hero Image Area */}
      <div className="px-8 lg:px-12 mb-8">
        <div className="relative w-full aspect-video lg:aspect-[16/9] flex items-center justify-center border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-8 lg:p-12">
          
          {/* Technical metadata at corners */}
          <span className="absolute top-3 left-4 font-mono text-[9px] text-[var(--color-primary)]/20 tracking-tight">
            [CASE.ASSET]
          </span>
          <span className="absolute top-3 right-4 font-mono text-[9px] text-[var(--color-theme)] font-bold tracking-tight">
            {String(currentIndex + 1).padStart(2, '0')} // {String(images.length).padStart(2, '0')}
          </span>

          <AnimatePresence mode="wait">
            <motion.img 
              key={`${legend.id}-${currentIndex}`}
              src={images[currentIndex]} 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-[85%] max-h-[85%] object-contain"
            />
          </AnimatePresence>
        </div>

        {/* Image Navigation */}
        {images.length > 1 && (
          <div className="flex items-center justify-between mt-4">
            <button 
              onClick={prevImage} 
              className="w-8 h-8 flex items-center justify-center border border-[var(--color-primary)]/15 hover:border-[var(--color-theme)] text-[var(--color-primary)]/60 hover:text-[var(--color-theme)] transition-all rounded-none focus:outline-none cursor-pointer"
            >
              <span className="font-mono text-xs">←</span>
            </button>

            <div className="flex gap-1.5">
              {images.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 transition-all duration-300 rounded-none cursor-pointer ${
                    idx === currentIndex 
                      ? 'bg-[var(--color-theme)]' 
                      : 'bg-[var(--color-primary)]/15 hover:bg-[var(--color-primary)]/30'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextImage} 
              className="w-8 h-8 flex items-center justify-center border border-[var(--color-primary)]/15 hover:border-[var(--color-theme)] text-[var(--color-primary)]/60 hover:text-[var(--color-theme)] transition-all rounded-none focus:outline-none cursor-pointer"
            >
              <span className="font-mono text-xs">→</span>
            </button>
          </div>
        )}
      </div>

      {/* Case Study Content Sections */}
      <div className="px-8 lg:px-12 pb-12 flex flex-col gap-8">
        {sections.map((section, idx) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] text-[var(--color-theme)] font-bold tracking-widest">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-xs text-[var(--color-primary)]/40 tracking-wider uppercase">
                {section.label}
              </span>
              <div className="flex-1 h-px bg-[var(--color-primary)]/10" />
            </div>
            
            {/* Section Content */}
            <p className="font-sans text-base text-[var(--color-primary)]/75 leading-relaxed pl-8">
              {section.content}
            </p>
          </motion.div>
        ))}

        {/* Process Images Grid */}
        {caseStudy.processImages && caseStudy.processImages.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-[var(--color-theme)] font-bold tracking-widest">
                {String(sections.length + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-xs text-[var(--color-primary)]/40 tracking-wider uppercase">
                Process & Development
              </span>
              <div className="flex-1 h-px bg-[var(--color-primary)]/10" />
            </div>
            <div className="grid grid-cols-2 gap-3 pl-8">
              {caseStudy.processImages.map((img, idx) => (
                <div key={idx} className="aspect-square border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-3 flex items-center justify-center">
                  <img src={img} alt={`Process ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State for Process Images */}
        {(!caseStudy.processImages || caseStudy.processImages.length === 0) && (
          <div className="border border-dashed border-[var(--color-primary)]/10 p-6 flex items-center justify-center">
            <span className="font-mono text-xs text-[var(--color-primary)]/25 tracking-wider uppercase">
              [ PROCESS ASSETS PENDING ]
            </span>
          </div>
        )}
      </div>

    </div>
  );
};

export default CaseStudyView;
