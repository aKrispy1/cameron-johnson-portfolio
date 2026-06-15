import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioLegends } from '../data/legends';
import LegendMenu from '../components/LegendMenu';
import LegendDisplay from '../components/LegendDisplay';
import LegendDetails from '../components/LegendDetails';
import CaseStudyView from '../components/CaseStudyView';
import LiquidBackground from '../components/LiquidBackground';
import MobileWorksView from '../components/MobileWorksView';
import PortfolioGridView from '../components/PortfolioGridView';

const Works = () => {
  const [selectedId, setSelectedId] = useState(portfolioLegends[0].id);
  const [showGallery, setShowGallery] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('dossier');

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

  const handlePrevCaseStudy = () => {
    const currentIndex = portfolioLegends.findIndex(l => l.id === selectedId);
    const prevIndex = (currentIndex - 1 + portfolioLegends.length) % portfolioLegends.length;
    setSelectedId(portfolioLegends[prevIndex].id);
  };

  // Sync theme variables based on selection
  useEffect(() => {
    if (currentLegend) {
      document.documentElement.style.setProperty('--color-theme', currentLegend.themeColor);
      document.documentElement.style.setProperty('--color-secondary', currentLegend.secondaryColor || '#BCEF0C');
      document.documentElement.style.setProperty('--color-background', currentLegend.bgColor || '#F3F3F5');
      document.documentElement.style.setProperty('--color-primary', currentLegend.textColor || '#0C0C11');
      document.documentElement.style.setProperty('--color-panel', currentLegend.bgColor === '#0a0a0a' ? 'rgba(20, 20, 28, 0.6)' : 'rgba(255, 255, 255, 0.45)');
      document.documentElement.style.setProperty('--color-details', currentLegend.bgColor === '#0a0a0a' ? 'rgba(20, 20, 28, 0.8)' : 'rgba(255, 255, 255, 0.65)');
    }

    return () => {
      // Reset on unmount
      document.documentElement.style.setProperty('--color-theme', '#7D52FC');
      document.documentElement.style.setProperty('--color-secondary', '#BCEF0C');
      document.documentElement.style.setProperty('--color-background', '#CCCCCC');
      document.documentElement.style.setProperty('--color-primary', '#0C0C11');
      document.documentElement.style.setProperty('--color-panel', 'rgba(255, 255, 255, 0.45)');
      document.documentElement.style.setProperty('--color-details', 'rgba(255, 255, 255, 0.65)');
    };
  }, [currentLegend]);

  // Handle resize check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <MobileWorksView 
        selectedId={selectedId}
        onSelect={handleSelect}
        legends={portfolioLegends}
        currentLegend={currentLegend}
        onNextProject={handleNextCaseStudy}
        onPrevProject={handlePrevCaseStudy}
      />
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-screen flex flex-col lg:flex-row relative z-10 pt-[80px] lg:pt-0 bg-[var(--color-background)] transition-colors duration-700 lg:overflow-hidden overflow-y-auto"
    >
      <div className="ebbing-gradient" />
      <LiquidBackground />

      {/* Background dimmer overlay when presentation is open */}
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-700 pointer-events-none z-0 ${
        showGallery ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Left Column - Project Directory Menu */}
      <div className={`transition-all duration-700 z-40 ${
        showGallery ? 'hidden' : 'opacity-100'
      }`}>
        <LegendMenu 
          selectedId={selectedId} 
          onSelect={handleSelect} 
          legends={portfolioLegends} 
          showGallery={showGallery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {/* Center & Right Column Layout (Main content area) */}
      {viewMode === 'grid' ? (
        <PortfolioGridView 
          legends={portfolioLegends} 
          onSelectProject={(id) => {
            setSelectedId(id);
            setViewMode('dossier');
          }}
        />
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row relative">
          {/* Center Pane - Graphic Display */}
          {showGallery ? (
            <CaseStudyView 
              legend={currentLegend} 
              onClose={() => setShowGallery(false)} 
              onPrevProject={handlePrevCaseStudy}
              onNextProject={handleNextCaseStudy}
            />
          ) : (
            <LegendDisplay 
              legend={currentLegend} 
              onStartPresentation={() => setShowGallery(true)}
            />
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
      )}
    </motion.main>
  );
};

export default Works;
