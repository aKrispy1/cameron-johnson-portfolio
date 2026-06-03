import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioLegends } from '../data/legends';
import LegendMenu from '../components/LegendMenu';
import LegendDisplay from '../components/LegendDisplay';
import LegendDetails from '../components/LegendDetails';
import CaseStudyView from '../components/CaseStudyView';
import WavyGrid from '../components/WavyGrid';

const Works = () => {
  const [selectedId, setSelectedId] = useState(portfolioLegends[0].id);
  const [showGallery, setShowGallery] = useState(false);

  const currentLegend = portfolioLegends.find(l => l.id === selectedId) || portfolioLegends[0];

  const handleSelect = (id) => {
    setSelectedId(id);
    setShowGallery(false);
  };

  const handleNext = () => {
    const currentIndex = portfolioLegends.findIndex(l => l.id === selectedId);
    const nextIndex = (currentIndex + 1) % portfolioLegends.length;
    setSelectedId(portfolioLegends[nextIndex].id);
    setShowGallery(false);
  };

  const handleNextCaseStudy = () => {
    const currentIndex = portfolioLegends.findIndex(l => l.id === selectedId);
    const nextIndex = (currentIndex + 1) % portfolioLegends.length;
    setSelectedId(portfolioLegends[nextIndex].id);
  };

  // Sync theme variables based on selection
  useEffect(() => {
    if (currentLegend) {
      document.documentElement.style.setProperty('--color-theme', currentLegend.themeColor);
      document.documentElement.style.setProperty('--color-secondary', currentLegend.secondaryColor || '#BCEF0C');
      document.documentElement.style.setProperty('--color-background', currentLegend.bgColor || '#F3F3F5');
      document.documentElement.style.setProperty('--color-primary', currentLegend.textColor || '#0C0C11');
      document.documentElement.style.setProperty('--color-panel', currentLegend.bgColor === '#0a0a0a' ? '#14141c' : '#FAF9FC');
      document.documentElement.style.setProperty('--color-details', currentLegend.bgColor === '#0a0a0a' ? '#14141c' : '#CCCCCC');
    }

    return () => {
      // Reset on unmount
      document.documentElement.style.setProperty('--color-theme', '#7D52FC');
      document.documentElement.style.setProperty('--color-secondary', '#BCEF0C');
      document.documentElement.style.setProperty('--color-background', '#CCCCCC');
      document.documentElement.style.setProperty('--color-primary', '#0C0C11');
      document.documentElement.style.setProperty('--color-panel', '#FAF9FC');
      document.documentElement.style.setProperty('--color-details', '#CCCCCC');
    };
  }, [currentLegend]);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-screen flex flex-col lg:flex-row relative z-10 pt-[80px] lg:pt-0 bg-[var(--color-background)] transition-colors duration-700 lg:overflow-hidden overflow-y-auto"
    >
      <div className="ebbing-gradient" />
      <WavyGrid />

      {/* Background dimmer overlay when presentation is open */}
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-700 pointer-events-none z-0 ${
        showGallery ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Left Column - Project Directory Menu */}
      <div className={`transition-all duration-700 z-40 ${
        showGallery ? 'opacity-40 lg:opacity-30 blur-[0.5px] pointer-events-none' : 'opacity-100'
      }`}>
        <LegendMenu 
          selectedId={selectedId} 
          onSelect={handleSelect} 
          legends={portfolioLegends} 
          showGallery={showGallery}
        />
      </div>

      {/* Center & Right Column Layout (Main content area) */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        
        {/* Center Pane - Graphic Display */}
        {showGallery ? (
          <CaseStudyView 
            legend={currentLegend} 
            onClose={() => setShowGallery(false)} 
            onNextProject={handleNextCaseStudy}
          />
        ) : (
          <LegendDisplay legend={currentLegend} />
        )}

        {/* Right Pane - Details sheet */}
        {!showGallery && (
          <LegendDetails 
            legend={currentLegend} 
            onNext={handleNext} 
            showGallery={showGallery}
            onToggleGallery={() => setShowGallery(!showGallery)}
          />
        )}
        
      </div>
    </motion.main>
  );
};

export default Works;
