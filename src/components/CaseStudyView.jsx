import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Interactive sub-gallery for process images inside the slide
const GallerySubGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between p-2">
      {/* Big Preview Box */}
      <div className="flex-1 flex items-center justify-center min-h-[180px] lg:min-h-[260px] border border-[var(--color-primary)]/10 bg-black/20 backdrop-blur-xs p-4 relative overflow-hidden">
        <span className="absolute top-2 left-3 font-mono text-[8px] text-[var(--color-primary)]/20">
          [PROCESS.PREVIEW]
        </span>
        <img 
          src={selectedImage} 
          alt="Process exploration preview" 
          className="max-w-[90%] max-h-[90%] object-contain transition-all duration-300" 
        />
      </div>
      
      {/* Thumbnails Row */}
      <div className="flex gap-2 mt-4 overflow-x-auto justify-start lg:justify-center py-2 select-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          .no-scroll::-webkit-scrollbar { display: none; }
          .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-12 h-12 border cursor-pointer flex-shrink-0 p-1 bg-black/30 backdrop-blur-xs transition-all duration-200 ${
              selectedImage === img ? 'border-[var(--color-theme)] scale-105 shadow-sm' : 'border-[var(--color-primary)]/10 opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

const CaseStudyView = ({ legend, onClose }) => {
  const isDark = legend.bgColor === '#0a0a0a';
  const caseStudy = legend.caseStudy || {};
  const [currentSlide, setCurrentSlide] = useState(0);

  // Compile slides dynamically based on data availability
  const slides = [];

  // Slide 0: Overview
  slides.push({
    id: 'overview',
    label: 'PROJECT BRIEF',
    title: legend.title,
    subtitle: legend.subtitle,
    content: legend.description,
    media: legend.file,
    mediaType: 'image',
    showMeta: true
  });

  // Slide 1: Challenge
  if (caseStudy.challenge) {
    const isVideo = (caseStudy.challengeMedia || '').endsWith('.mp4');
    slides.push({
      id: 'challenge',
      label: '01 // CHALLENGE',
      title: 'THE CHALLENGE',
      content: caseStudy.challenge,
      media: caseStudy.challengeMedia || legend.file,
      mediaType: isVideo ? 'video' : 'image'
    });
  }

  // Slide 2: Approach
  if (caseStudy.approach) {
    const isVideo = (caseStudy.approachMedia || '').endsWith('.mp4');
    slides.push({
      id: 'approach',
      label: '02 // APPROACH',
      title: 'THE APPROACH',
      content: caseStudy.approach,
      media: caseStudy.approachMedia || legend.file,
      mediaType: isVideo ? 'video' : 'image'
    });
  }

  // Slide 3: Outcome
  if (caseStudy.outcome) {
    const isVideo = (caseStudy.outcomeMedia || '').endsWith('.mp4');
    slides.push({
      id: 'outcome',
      label: '03 // OUTCOME',
      title: 'THE OUTCOME',
      content: caseStudy.outcome,
      media: caseStudy.outcomeMedia || legend.file,
      mediaType: isVideo ? 'video' : 'image'
    });
  }

  // Slide 4: Process Gallery
  if (caseStudy.galleryMedia && caseStudy.galleryMedia.length > 0) {
    slides.push({
      id: 'gallery',
      label: '04 // SYSTEM DESIGN',
      title: 'PROCESS GALLERY',
      content: 'A record of development phases, vector explorations, layout mockups, and early iterations constructed during visual prototyping.',
      media: caseStudy.galleryMedia,
      mediaType: 'gallery'
    });
  }

  // Handle slide index resets when changing active legend
  useEffect(() => {
    setCurrentSlide(0);
  }, [legend.id]);

  // Touch handlers for mobile swiping
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeLeft = distance > 50;
    const isSwipeRight = distance < -50;

    if (isSwipeLeft && currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
    if (isSwipeRight && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Keyboard navigation helpers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length]);

  const activeSlide = slides[currentSlide] || slides[0];

  const renderMedia = (slide) => {
    if (slide.mediaType === 'video') {
      return (
        <video 
          src={slide.media} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="max-w-[85%] max-h-[85%] object-contain shadow-sm border border-[var(--color-primary)]/10"
        />
      );
    } else if (slide.mediaType === 'gallery') {
      return <GallerySubGrid images={slide.media} />;
    } else {
      return (
        <img 
          src={slide.media} 
          alt={slide.title} 
          className="max-w-[85%] max-h-[85%] object-contain"
        />
      );
    }
  };

  return (
    <div 
      className="flex-1 min-h-[50vh] lg:h-full relative flex flex-col justify-between z-10 select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Banner / Slide Navigation Telemetry */}
      <div className="px-8 lg:px-12 pt-8 lg:pt-36 flex items-center justify-between z-20">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[var(--color-primary)]/40 uppercase tracking-widest block mb-0.5">
            Dossier Presentation // {legend.title}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--color-theme)] font-bold tracking-wider">
              SLIDE {String(currentSlide + 1).padStart(2, '0')} // {String(slides.length).padStart(2, '0')}
            </span>
            <span className="font-mono text-[9px] text-[var(--color-primary)]/30 font-bold uppercase tracking-tight bg-[var(--color-primary)]/5 px-2 py-0.5">
              {activeSlide.label}
            </span>
          </div>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            className="font-mono text-xs text-[var(--color-primary)]/40 hover:text-[var(--color-theme)] border border-[var(--color-primary)]/10 hover:border-[var(--color-theme)] px-3 py-1.5 transition-colors cursor-pointer focus:outline-none"
          >
            [ EXIT PRESENTATION ]
          </button>
        )}
      </div>

      {/* Main Slide Panel (Framer Motion Slide-in Transitions) */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${legend.id}-slide-${currentSlide}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`w-full max-w-6xl backdrop-blur-xl shadow-2xl border p-6 lg:p-10 rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              isDark 
                ? 'bg-black/40 border-white/10' 
                : 'bg-[var(--color-primary)]/[0.08] border-[var(--color-primary)]/10'
            }`}
          >
            {/* Left Box: Graphic Canvas */}
            <div className="lg:col-span-6 h-[260px] lg:h-[400px] border border-[var(--color-primary)]/15 bg-black/30 backdrop-blur-sm relative flex items-center justify-center p-6 shadow-md rounded-md">
              {/* Technical drafting metadata */}
              <span className="absolute top-2 left-3 font-mono text-[8px] text-[var(--color-primary)]/20">
                [SLIDE.ASSET]
              </span>
              <span className="absolute bottom-2 right-3 font-mono text-[8px] text-[var(--color-primary)]/20">
                SYSTEM // CJV4_SYS
              </span>
              {renderMedia(activeSlide)}
            </div>

            {/* Right Box: Text Narrative Card */}
            <div className={`lg:col-span-6 flex flex-col justify-between p-6 lg:p-8 shadow-lg border rounded-md h-full min-h-[300px] lg:h-[400px] ${
              isDark
                ? 'bg-black/60 border-white/10 text-white/95'
                : 'bg-white/80 border-white/30 text-[var(--color-primary)]'
            }`}>
              <div>
                {/* Thick accent bar matching Screenshot 3 */}
                <div className={`w-32 h-3.5 mb-5 ${
                  isDark ? 'bg-white/90' : 'bg-[var(--color-primary)]'
                }`} />

                {/* Heading */}
                {activeSlide.showMeta ? (
                  <>
                    {activeSlide.subtitle && (
                      <div className="mb-3">
                        <span className={`inline-block font-mono text-[10px] font-bold px-2 py-1 tracking-wider uppercase ${
                          isDark ? 'bg-white/10 text-white/90' : 'bg-[var(--color-secondary)] text-[var(--color-primary)]'
                        }`}>
                          {activeSlide.subtitle}
                        </span>
                      </div>
                    )}
                    <h2 className="text-3xl lg:text-4xl font-display font-bold leading-none uppercase tracking-tighter mb-4">
                      {activeSlide.title}
                    </h2>
                  </>
                ) : (
                  <div className="mb-4">
                    <span className="font-mono text-[9px] text-[var(--color-theme)] font-bold tracking-widest block mb-1">
                      {activeSlide.label}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-display font-bold leading-none uppercase tracking-tighter">
                      {activeSlide.title}
                    </h3>
                  </div>
                )}

                {/* Narrative Content */}
                <p className={`font-sans text-sm lg:text-base leading-relaxed ${
                  isDark ? 'text-white/80' : 'text-[var(--color-primary)]/85'
                }`}>
                  {activeSlide.content}
                </p>
              </div>

              {/* Meta details if overview */}
              {activeSlide.showMeta && (
                <div className={`flex flex-wrap gap-4 border-t pt-4 font-mono text-[10px] ${
                  isDark ? 'border-white/10 text-white/40' : 'border-[var(--color-primary)]/10 text-[var(--color-primary)]/40'
                }`}>
                  {legend.client && (
                    <div>
                      <span className="uppercase block font-bold">Client:</span>
                      <span className={isDark ? 'text-white/70' : 'text-[var(--color-primary)]/70'}>{legend.client}</span>
                    </div>
                  )}
                  {legend.year && (
                    <div>
                      <span className="uppercase block font-bold">Year:</span>
                      <span className={isDark ? 'text-white/70' : 'text-[var(--color-primary)]/70'}>{legend.year}</span>
                    </div>
                  )}
                  {legend.location && (
                    <div>
                      <span className="uppercase block font-bold">Location:</span>
                      <span className={`font-bold ${isDark ? 'text-white/80' : 'text-[var(--color-secondary)]'}`}>
                        {legend.location.name}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Timeline Progress & Controls */}
      <div className="px-8 lg:px-12 pb-8 flex flex-col gap-4 z-20">
        
        {/* Timeline dots indicators */}
        <div className="flex gap-2 justify-center">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 cursor-pointer rounded-none ${
                idx === currentSlide 
                  ? 'w-8 bg-[var(--color-theme)]' 
                  : 'w-2 bg-[var(--color-primary)]/15 hover:bg-[var(--color-primary)]/35'
              }`}
              title={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-[var(--color-primary)]/10 pt-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-3 cursor-pointer group focus:outline-none transition-opacity ${
              currentSlide === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
            }`}
          >
            <div className="w-10 h-10 border border-[var(--color-primary)]/20 flex items-center justify-center group-hover:border-[var(--color-theme)] group-hover:bg-[var(--color-theme)] group-hover:text-white transition-all duration-300 rounded-none text-[var(--color-primary)]">
              <span className="font-mono text-xs group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
            </div>
            <span className="text-xs font-mono tracking-widest text-[var(--color-primary)] group-hover:text-[var(--color-theme)] transition-colors uppercase">
              Prev Slide
            </span>
          </button>

          <span className="font-mono text-[9px] text-[var(--color-primary)]/30 hidden md:block">
            SWIPE TO NAVIGATE // OR USE LEFT/RIGHT ARROW KEYS
          </span>

          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-3 cursor-pointer group focus:outline-none transition-opacity ${
              currentSlide === slides.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
            }`}
          >
            <span className="text-xs font-mono tracking-widest text-[var(--color-primary)] group-hover:text-[var(--color-theme)] transition-colors uppercase">
              Next Slide
            </span>
            <div className="w-10 h-10 border border-[var(--color-primary)]/20 flex items-center justify-center group-hover:border-[var(--color-theme)] group-hover:bg-[var(--color-theme)] group-hover:text-white transition-all duration-300 rounded-none text-[var(--color-primary)]">
              <span className="font-mono text-xs group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};

export default CaseStudyView;
