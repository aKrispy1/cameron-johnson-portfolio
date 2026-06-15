import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileGallerySubGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between p-2 overflow-hidden">
      {/* Mini Preview Box */}
      <div className="flex-1 flex items-center justify-center bg-black/20 p-2 relative overflow-hidden h-[150px] rounded-[2px] border border-white/10">
        <img 
          src={selectedImage} 
          alt="Process exploration preview" 
          className="max-w-full max-h-full object-contain" 
        />
      </div>
      
      {/* Thumbnails Row */}
      <div className="flex gap-2 mt-2 overflow-x-auto justify-start py-0.5 select-none flex-shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {images.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-8 h-8 border cursor-pointer flex-shrink-0 p-0.5 bg-white/10 transition-all duration-200 rounded-[2px] ${
              selectedImage === img ? 'border-[var(--color-theme)] scale-105 bg-white/30' : 'border-white/10 opacity-60'
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
      className="w-full flex flex-col justify-between p-4 pt-24 pb-4 overflow-hidden select-none bg-[#CCCCCC] h-screen relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="ebbing-gradient" />
      </div>

      {/* 1. Horizontal Scrollbar Menu at the top */}
      <div className="w-full overflow-x-auto flex gap-2.5 pb-3 border-b border-white/10 select-none no-scroll flex-shrink-0 relative z-10">
        <style>{`
          .no-scroll::-webkit-scrollbar { display: none; }
          .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {legends.map((legend, index) => {
          const isSelected = selectedId === legend.id;
          const formattedIndex = `${String(index + 1).padStart(2, '0')}`;
          
          return (
            <div 
              key={legend.id}
              onClick={() => onSelect(legend.id)}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 border cursor-pointer transition-all duration-300 rounded-[2px] ${
                isSelected 
                  ? 'border-[var(--color-theme)] bg-white/30 shadow-xs' 
                  : 'border-white/10 bg-white/10 opacity-70'
              }`}
            >
              <span className={`font-mono text-[10px] ${isSelected ? 'text-[var(--color-theme)] font-bold' : 'text-[var(--color-primary)]/30'}`}>
                {formattedIndex}
              </span>
              <div className="w-6 h-6 bg-white/5 flex items-center justify-center p-1 border border-white/15 rounded-[2px] flex-shrink-0">
                <img 
                  src={legend.file} 
                  alt={legend.title} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="font-display font-bold text-xs tracking-wider uppercase whitespace-nowrap text-[var(--color-primary)]">{legend.title}</span>
            </div>
          );
        })}
      </div>

      {/* Subtitle Banner tag */}
      <div className="flex-shrink-0 mt-3 mb-1 flex justify-start relative z-10">
        <span className="inline-block bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 font-display text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-[2px] text-[var(--color-theme)]">
          {activeSlide.subtitle || currentLegend.subtitle}
        </span>
      </div>

      {/* 2. Gallery Block - styled as glass box card */}
      <div className="w-full h-[240px] max-h-[30vh] relative flex-shrink-0 my-2 shadow-[0_8px_24px_rgba(12,12,17,0.04)] border border-white/20 overflow-hidden bg-white/25 rounded-[2px] backdrop-blur-md z-10">
        {/* Media Frame wrapper */}
        <div className="w-full h-full flex items-center justify-center">
          <span className="absolute top-2 left-3 font-mono text-[7px] text-[var(--color-primary)]/30 z-10 font-bold">[SLIDE.ASSET]</span>
          <span className="absolute bottom-2 right-3 font-mono text-[7px] text-[var(--color-primary)]/30 z-10 font-bold font-mono">SYSTEM // CJV4_SYS</span>
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
      </div>

      {/* Carousel Controls Row under the image frame */}
      <div className="w-full flex items-center justify-between mt-1 mb-2 px-1 relative z-10 flex-shrink-0">
        {/* Left Arrow */}
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`w-8 h-8 rounded-[2px] border border-white/20 bg-white/10 text-[var(--color-primary)] flex items-center justify-center font-mono text-sm cursor-pointer focus:outline-none transition-all active:scale-95 ${
            currentSlide === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:bg-white/20'
          }`}
        >
          ←
        </button>

        {/* Timeline dots indicators (Carousel slide bar) */}
        <div className="flex gap-1.5 justify-center bg-white/15 border border-white/20 px-3 py-2 rounded-[2px] backdrop-blur-md">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 cursor-pointer rounded-none ${
                idx === currentSlide 
                  ? 'w-6' 
                  : 'w-1.5 bg-white/20'
              }`}
              style={idx === currentSlide ? { backgroundColor: 'var(--color-theme)' } : {}}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`w-8 h-8 rounded-[2px] border border-white/20 bg-white/10 text-[var(--color-primary)] flex items-center justify-center font-mono text-sm cursor-pointer focus:outline-none transition-all active:scale-95 ${
            currentSlide === slides.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:bg-white/20'
          }`}
        >
          →
        </button>
      </div>

      {/* 3. Project description details sitting below the gallery */}
      <div className="flex flex-col gap-1.5 flex-grow justify-start overflow-hidden mt-1 px-1 relative z-10">
        
        {/* Row 1: Title - Tomorrow Bold */}
        <div className="flex-shrink-0">
          <h1 className="text-xl font-display font-bold uppercase tracking-tight text-[var(--color-primary)] leading-none my-0.5">
            {activeSlide.title || currentLegend.title}
          </h1>
        </div>

        {/* Row 2: Dossier label */}
        <div className="flex justify-between items-center flex-shrink-0">
          <span className="font-mono text-[8px] text-[var(--color-primary)]/35 tracking-widest uppercase font-bold">
            Creative Dossier
          </span>
        </div>

        {/* Row 3: Capabilities Tags */}
        <div className="flex flex-wrap gap-1.5 flex-shrink-0 max-h-[32px] overflow-hidden mt-1">
          {currentLegend.scope && currentLegend.scope.map((tag, i) => (
            <span 
              key={i}
              className="inline-flex items-center border border-white/25 font-mono text-[8px] uppercase text-[var(--color-primary)]/70 bg-white/20 rounded-[2px] overflow-hidden"
            >
              <span className="bg-[var(--color-primary)]/5 text-[var(--color-theme)] px-2 py-0.5 font-bold border-r border-white/25 rounded-l-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="px-2.5 py-0.5 font-sans font-bold">
                {tag}
              </span>
            </span>
          ))}
        </div>

        {/* Row 4: Text Narrative */}
        <div className="flex-1 overflow-hidden min-h-[40px] mt-2 pb-2">
          <p className="font-sans text-[12px] text-[var(--color-primary)]/75 leading-relaxed overflow-y-auto max-h-full pr-1.5 custom-scrollbar font-medium">
            {activeSlide.content}
          </p>
        </div>

      </div>

      {/* 4. Footer Project Cycle Buttons - solid slate blue */}
      <div className="flex gap-3 mt-2 pb-1 flex-shrink-0 relative z-10">
        <button 
          onClick={onPrevProject}
          className="flex-1 py-3 font-display text-[10px] font-bold uppercase tracking-wider bg-white/20 hover:bg-white/35 text-[var(--color-primary)] border border-white/20 rounded-[2px] cursor-pointer focus:outline-none transition-all active:scale-[0.98]"
        >
          Prev Project
        </button>
        <button 
          onClick={onNextProject}
          className="flex-1 py-3 font-display text-[10px] font-bold uppercase tracking-wider text-white border-transparent rounded-[2px] cursor-pointer focus:outline-none transition-all active:scale-[0.98]"
          style={{ 
            backgroundColor: 'var(--color-theme)',
            boxShadow: '0 4px 12px color-mix(in srgb, var(--color-theme) 25%, transparent)'
          }}
        >
          Next Project
        </button>
      </div>

    </div>
  );
};

export default MobileWorksView;
