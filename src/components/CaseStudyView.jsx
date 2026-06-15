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
      <div className="flex-1 flex items-center justify-center min-h-[180px] lg:min-h-[260px] border border-white/20 bg-white/10 backdrop-blur-md p-4 relative overflow-hidden rounded-[2px]">
        <span className="absolute top-3 left-4 font-mono text-[8px] text-[var(--color-primary)]/30 font-bold">
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
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedImage(img)}
            data-cursor="view"
            className={`w-12 h-12 border cursor-pointer flex-shrink-0 p-1 bg-white/5 backdrop-blur-md transition-all duration-200 rounded-[2px] ${
              selectedImage === img ? 'border-[var(--color-theme)] scale-105 bg-white/30' : 'border-white/15 opacity-60'
            }`}
          >
            <img src={img} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

const CaseStudyView = ({ legend, onClose, onPrevProject, onNextProject }) => {
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
          className="max-w-full max-h-full object-contain shadow-xs"
        />
      );
    } else if (slide.mediaType === 'gallery') {
      return <GallerySubGrid images={slide.media} />;
    } else {
      return (
        <img 
          src={slide.media} 
          alt={slide.title} 
          className="max-w-full max-h-full object-contain"
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
      <div className="w-[92%] max-w-6xl mx-auto pt-8 lg:pt-36 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-20">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[var(--color-primary)]/40 uppercase tracking-widest block mb-0.5 font-bold">
            Dossier Presentation // {legend.title}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--color-theme)] font-bold tracking-widest uppercase">
              SLIDE {String(currentSlide + 1).padStart(2, '0')} // {String(slides.length).padStart(2, '0')}
            </span>
            <span className="font-mono text-[9px] text-[var(--color-primary)]/50 font-bold uppercase tracking-widest bg-[var(--color-primary)]/5 border border-white/20 px-2.5 py-0.5 rounded-[2px]">
              {activeSlide.label}
            </span>
          </div>
        </div>

        {onClose && (
          <div className="flex gap-2">
            {onPrevProject && (
              <button 
                onClick={onPrevProject}
                data-cursor="prev"
                className="font-display text-[10px] text-[var(--color-primary)]/60 hover:text-[var(--color-primary)] bg-white/20 hover:bg-white/35 border border-white/20 rounded-[2px] px-5 py-2 transition-all duration-300 cursor-pointer focus:outline-none font-bold uppercase tracking-wider"
              >
                Prev Presentation
              </button>
            )}
            <button 
              onClick={onClose}
              data-cursor="close"
              className="font-display text-[10px] text-[var(--color-primary)]/60 hover:text-[var(--color-primary)] bg-white/20 hover:bg-white/35 border border-white/20 rounded-[2px] px-5 py-2 transition-all duration-300 cursor-pointer focus:outline-none font-bold uppercase tracking-wider"
            >
              Exit Study
            </button>
            {onNextProject && (
              <button 
                onClick={onNextProject}
                data-cursor="next"
                className="font-display text-[10px] text-white hover:opacity-90 transition-all duration-300 cursor-pointer focus:outline-none font-bold uppercase tracking-wider shadow-sm rounded-[2px] px-5 py-2 border-transparent"
                style={{ backgroundColor: 'var(--color-theme)' }}
              >
                Next Presentation
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Slide Panel (Framer Motion Slide-in Transitions) */}
      <div className="flex-grow w-[92%] max-w-6xl mx-auto flex flex-col justify-center py-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${legend.id}-slide-${currentSlide}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full glass-panel shadow-xs border border-white/20 p-6 lg:p-10 rounded-[2px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative"
          >
            {/* Left Box: Graphic Canvas */}
            <div className="lg:col-span-7 min-h-[260px] lg:min-h-[390px] border border-white/20 bg-white/10 relative flex items-center justify-center p-4 overflow-hidden shadow-inner rounded-[2px]">
              {/* Technical drafting metadata */}
              <span className="absolute top-3 left-4 font-mono text-[8px] text-[var(--color-primary)]/30 font-bold">
                [SLIDE.ASSET]
              </span>
              <span className="absolute bottom-3 right-4 font-mono text-[8px] text-[var(--color-primary)]/30 font-bold">
                SYSTEM // CJV4_SYS
              </span>
              {renderMedia(activeSlide)}
            </div>

            {/* Right Box: Text Narrative Card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 lg:p-8 border border-white/20 rounded-[2px] min-h-[300px] lg:min-h-[390px] bg-white/25 backdrop-blur-md">
              <div>
                {/* Thin horizontal accent bar */}
                <div className="w-16 h-1 rounded-none mb-5 bg-[var(--color-theme)]" />

                {/* Heading - Tomorrow Bold */}
                {activeSlide.showMeta ? (
                  <>
                    {activeSlide.subtitle && (
                      <div className="mb-3">
                        <span className="inline-block bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 font-display text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase rounded-[2px] text-[var(--color-theme)]">
                          {activeSlide.subtitle}
                        </span>
                      </div>
                    )}
                    <h2 className="text-2xl lg:text-3xl font-display font-bold leading-none uppercase tracking-tight mb-4 text-[var(--color-primary)]">
                      {activeSlide.title}
                    </h2>
                  </>
                ) : (
                  <div className="mb-4">
                    <span className="font-mono text-[9px] text-[var(--color-theme)] font-bold tracking-widest block mb-1">
                      {activeSlide.label}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-display font-bold leading-none uppercase tracking-tight text-[var(--color-primary)]">
                      {activeSlide.title}
                    </h3>
                  </div>
                )}

                {/* Narrative Content */}
                <p className="font-sans text-sm md:text-base leading-relaxed text-[var(--color-primary)]/75 font-medium">
                  {activeSlide.content}
                </p>
              </div>

              {/* Meta details if overview */}
              {activeSlide.showMeta && (
                <div className="flex flex-wrap gap-5 border-t border-black/5 pt-4 mt-6 font-mono text-[9px] text-[var(--color-primary)]/40 font-bold">
                  {legend.client && (
                    <div>
                      <span className="uppercase block font-bold">Client:</span>
                      <span className="text-[var(--color-primary)]/70 font-sans text-xs">{legend.client}</span>
                    </div>
                  )}
                  {legend.year && (
                    <div>
                      <span className="uppercase block font-bold">Year:</span>
                      <span className="text-[var(--color-primary)]/70 font-sans text-xs">{legend.year}</span>
                    </div>
                  )}
                  {legend.location && (
                    <div>
                      <span className="uppercase block font-bold">Location:</span>
                      <span className="text-[var(--color-theme)] font-bold font-sans text-xs">
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
      <div className="w-[92%] max-w-6xl mx-auto pb-8 z-20">
        
        {/* Progress Timeline indicators & Action Row */}
        <div className="w-full border-t border-[var(--color-primary)]/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Tooltip info */}
          <div className="flex-1 text-left hidden md:block">
            <span className="font-mono text-[9px] text-[var(--color-primary)]/35 tracking-widest uppercase font-bold">
              SWIPE TO NAVIGATE // USE LEFT/RIGHT ARROW KEYS
            </span>
          </div>

          {/* Middle: Timeline dots */}
          <div className="flex gap-2 justify-center flex-1">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-300 cursor-pointer rounded-none ${
                  idx === currentSlide 
                    ? 'w-8' 
                    : 'w-2 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20'
                }`}
                style={idx === currentSlide ? { backgroundColor: 'var(--color-theme)' } : {}}
                title={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right: Grouped Slide Navigation Buttons */}
          <div className="flex-1 flex justify-end items-center gap-2.5">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              data-cursor="back"
              className={`flex items-center gap-2 border px-5 py-2 font-display text-[10px] font-bold tracking-wider transition-all duration-300 rounded-[2px] focus:outline-none shadow-xs cursor-pointer ${
                currentSlide === 0 
                  ? 'opacity-20 border-white/10 text-[var(--color-primary)]/30 cursor-not-allowed bg-transparent' 
                  : 'border-white/20 text-[var(--color-primary)] bg-white/20 hover:bg-white/40'
              }`}
            >
              PREV
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              data-cursor="next"
              className={`flex items-center gap-2 border px-5 py-2 font-display text-[10px] font-bold tracking-wider transition-all duration-300 rounded-[2px] focus:outline-none shadow-xs cursor-pointer ${
                currentSlide === slides.length - 1 
                  ? 'opacity-20 border-white/10 text-[var(--color-primary)]/30 cursor-not-allowed bg-transparent' 
                  : 'text-white border-transparent hover:opacity-90'
              }`}
              style={currentSlide === slides.length - 1 ? {} : { backgroundColor: 'var(--color-theme)' }}
            >
              NEXT
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CaseStudyView;
