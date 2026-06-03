import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getSecondaryContrastColor = (legend) => {
  const secColor = (legend.secondaryColor || '#ffffff').toLowerCase();
  if (secColor === '#ffffff' || secColor === '#ffffffff' || secColor === '#faf9fc' || secColor === '#fcfcfc') {
    return 'text-black';
  }
  return 'text-white';
};

const getThemeContrastColor = (themeColor) => {
  const color = (themeColor || '').toLowerCase();
  if (color === '#c70629ff' || color === '#61289aff' || color === '#61289a') {
    return 'text-white';
  }
  return 'text-black';
};

const MobileGallerySubGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between p-1.5 overflow-hidden">
      {/* Mini Preview Box */}
      <div className="flex-1 flex items-center justify-center bg-black/10 p-1 relative overflow-hidden h-[150px]">
        <img 
          src={selectedImage} 
          alt="Process exploration preview" 
          className="max-w-full max-h-full object-contain" 
        />
      </div>
      
      {/* Thumbnails Row */}
      <div className="flex gap-1.5 mt-1 overflow-x-auto justify-start py-0.5 select-none flex-shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-7 h-7 border cursor-pointer flex-shrink-0 p-0.5 bg-black/40 transition-all duration-200 rounded-none ${
              selectedImage === img ? 'border-[var(--color-theme)] scale-105 shadow-xs' : 'border-[var(--color-primary)]/10 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileWorksView = ({ selectedId, onSelect, legends, currentLegend, onNextProject, onPrevProject }) => {
  const caseStudy = currentLegend.caseStudy || {};
  const [currentSlide, setCurrentSlide] = useState(0);

  // Compile slides dynamically based on data availability
  const slides = [];

  // Slide 0: Overview
  slides.push({
    id: 'overview',
    label: 'PROJECT BRIEF',
    title: currentLegend.title,
    subtitle: currentLegend.subtitle,
    content: currentLegend.description,
    media: currentLegend.file,
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
      media: caseStudy.challengeMedia || currentLegend.file,
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
      media: caseStudy.approachMedia || currentLegend.file,
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
      media: caseStudy.outcomeMedia || currentLegend.file,
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

  // Reset slide index when changing active legend
  useEffect(() => {
    setCurrentSlide(0);
  }, [currentLegend.id]);

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
          className="w-full h-full object-cover"
        />
      );
    } else if (slide.mediaType === 'gallery') {
      return <MobileGallerySubGrid images={slide.media} />;
    } else {
      return (
        <img 
          src={slide.media} 
          alt={slide.title} 
          className="w-full h-full object-cover"
        />
      );
    }
  };

  return (
    <div 
      className="w-full flex flex-col justify-between p-4 pt-[104px] pb-4 overflow-hidden select-none bg-[var(--color-background)] h-screen"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Horizontal Scrollbar Menu at the top */}
      <div className="w-full overflow-x-auto flex gap-3 pb-3 border-b border-[var(--color-primary)]/10 select-none no-scroll flex-shrink-0">
        <style>{`
          .no-scroll::-webkit-scrollbar { display: none; }
          .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {legends.map((legend, index) => {
          const isSelected = selectedId === legend.id;
          const formattedIndex = `[${String(index + 1).padStart(2, '0')}]`;
          
          return (
            <div 
              key={legend.id}
              onClick={() => onSelect(legend.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 border cursor-pointer transition-all duration-300 rounded-none ${
                isSelected 
                  ? 'border-[var(--color-primary)] bg-white text-black shadow-xs' 
                  : 'border-[var(--color-primary)]/15 bg-transparent text-[var(--color-primary)]/70'
              }`}
            >
              <span className={`font-mono text-[10px] ${isSelected ? 'text-[var(--color-theme)] font-bold' : 'text-[var(--color-primary)]/50'}`}>
                {formattedIndex}
              </span>
              <div className="w-6 h-6 bg-white flex items-center justify-center p-0.5 border border-gray-100 flex-shrink-0">
                <img 
                  src={legend.file} 
                  alt={legend.title} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="font-sans font-bold text-[11px] tracking-wider uppercase whitespace-nowrap">{legend.title}</span>
            </div>
          );
        })}
      </div>

      {/* Subtitle Banner block moved here, sitting just over the gallery section */}
      <div className="flex-shrink-0 mt-2 mb-0.5 flex justify-start">
        <span className={`inline-block bg-[var(--color-secondary)] font-mono text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-none border border-[var(--color-primary)]/10 ${getSecondaryContrastColor(currentLegend)}`}>
          {activeSlide.subtitle || currentLegend.subtitle}
        </span>
      </div>

      {/* 2. Gallery Block (Expanded width with absolutely-floated arrows and indicators) */}
      <div className="w-full h-[260px] max-h-[32vh] relative flex-shrink-0 my-2 shadow-md border border-[var(--color-primary)]/15 overflow-hidden bg-black/35">
        
        {/* Left Floating Arrow */}
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-12 border border-white/20 bg-black/40 backdrop-blur-xs text-white flex items-center justify-center font-mono text-base rounded-none cursor-pointer focus:outline-none transition-all active:bg-[var(--color-theme)] active:text-black ${
            currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          ←
        </button>

        {/* Media Frame wrapper */}
        <div className="w-full h-full flex items-center justify-center">
          <span className="absolute top-1.5 left-2 font-mono text-[7px] text-white/30 z-10">[SLIDE.ASSET]</span>
          <span className="absolute bottom-1.5 right-2 font-mono text-[7px] text-white/30 z-10">SYSTEM // CJV4_SYS</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentLegend.id}-slide-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {renderMedia(activeSlide)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Floating Arrow */}
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-12 border border-white/20 bg-black/40 backdrop-blur-xs text-white flex items-center justify-center font-mono text-base rounded-none cursor-pointer focus:outline-none transition-all active:bg-[var(--color-theme)] active:text-black ${
            currentSlide === slides.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          →
        </button>

        {/* Floating Timeline dots indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 justify-center bg-black/25 px-2 py-0.5 border border-white/5 rounded-none backdrop-blur-xs">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 cursor-pointer rounded-none ${
                idx === currentSlide 
                  ? 'w-7 bg-[var(--color-theme)]' 
                  : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Project description details sitting below the gallery */}
      <div className="flex flex-col gap-1.5 flex-grow justify-start overflow-hidden">
        
        {/* Row 1: Big Bold Title */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-display font-bold uppercase tracking-tight text-[var(--color-primary)] leading-none my-0.5">
            {activeSlide.title || currentLegend.title}
          </h1>
        </div>

        {/* Row 2: Dossier telemetry label as a subtitle underneath the project name */}
        <div className="flex justify-between items-center flex-shrink-0 mt-0.5">
          <span className="font-mono text-[9px] text-[var(--color-primary)]/40 tracking-wider uppercase">
            Creative Dossier
          </span>
        </div>

        {/* Row 3: Capabilities Tags with contrast-safe index formatting */}
        <div className="flex flex-wrap gap-1.5 flex-shrink-0 max-h-[32px] overflow-hidden mt-0.5">
          {currentLegend.scope && currentLegend.scope.map((tag, i) => (
            <span 
              key={i}
              className="inline-flex items-center border border-[var(--color-primary)]/20 font-mono text-[8px] uppercase text-[var(--color-primary)]/70 bg-black/5"
            >
              <span className={`bg-[var(--color-secondary)] px-1 py-0.5 font-bold border-r border-[var(--color-primary)]/20 ${getSecondaryContrastColor(currentLegend)}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="px-1.5 py-0.5 font-sans font-bold">
                {tag}
              </span>
            </span>
          ))}
        </div>

        {/* Row 4: Text Narrative paragraph (Safe-scrollable if exceeds layout bounds) */}
        <div className="flex-1 overflow-hidden min-h-[50px] mt-1.5">
          <p className="font-sans text-[13px] text-[var(--color-primary)]/85 leading-relaxed overflow-y-auto max-h-full pr-1.5 custom-scrollbar">
            {activeSlide.content}
          </p>
        </div>

      </div>

      {/* 4. Footer Project Cycle Buttons (Side-by-side at the very bottom) */}
      <div className="flex gap-3 mt-2 pb-2 flex-shrink-0">
        <button 
          onClick={onPrevProject}
          className="flex-1 py-2.5 font-mono text-xs font-bold uppercase tracking-wider bg-[#19132d] text-white border border-[var(--color-primary)]/20 active:bg-[#19132d]/85 rounded-none cursor-pointer focus:outline-none transition-colors"
        >
          &lt; Prev Project
        </button>
        <button 
          onClick={onNextProject}
          className={`flex-1 py-2.5 font-mono text-xs font-bold uppercase tracking-wider bg-[var(--color-theme)] border border-[var(--color-primary)]/20 active:opacity-90 rounded-none cursor-pointer focus:outline-none transition-all ${
            getThemeContrastColor(currentLegend.themeColor)
          }`}
        >
          Next Project &gt;
        </button>
      </div>

    </div>
  );
};

export default MobileWorksView;
