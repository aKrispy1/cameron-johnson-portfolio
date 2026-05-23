import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioLegends } from '../data/legends';
import LegendMenu from '../components/LegendMenu';
import LegendDisplay from '../components/LegendDisplay';
import LegendDetails from '../components/LegendDetails';
import WavyGrid from '../components/WavyGrid';
import GalleryCarousel from '../components/GalleryCarousel';

const Legends = () => {
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

  useEffect(() => {
    // Dynamic theme applying to global CSS variables
    document.documentElement.style.setProperty('--color-theme', currentLegend.themeColor);
    document.documentElement.style.setProperty('--color-secondary', currentLegend.secondaryColor || '#ffffff');
    document.documentElement.style.setProperty('--color-background', currentLegend.bgColor || '#0a0a0a');
    document.documentElement.style.setProperty('--color-text', currentLegend.textColor || '#ffffff');
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.setProperty('--color-theme', '#c380ff');
      document.documentElement.style.setProperty('--color-secondary', '#ffffff');
      document.documentElement.style.setProperty('--color-background', '#0a0a0a');
      document.documentElement.style.setProperty('--color-text', '#ffffff');
    };
  }, [currentLegend]);

  return (
    <motion.main 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="w-full h-screen flex flex-col lg:flex-row relative z-10 pt-[100px] lg:pt-0 pb-16 lg:pb-0 bg-[var(--color-background)]"
    >
      <LegendMenu selectedId={selectedId} onSelect={handleSelect} legends={portfolioLegends} />
      
      {/* Mobile Horizontal Menu */}
      <div className="lg:hidden w-full overflow-x-auto flex gap-4 px-8 pb-4 border-b border-[var(--color-text)]/10 transition-colors duration-700" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {portfolioLegends.map((legend) => (
          <div 
            key={legend.id}
            onClick={() => handleSelect(legend.id)}
            className={`flex-shrink-0 cursor-pointer transition-all duration-300 w-24 aspect-square bg-[var(--color-background)] border flex items-center justify-center p-4 rounded-xl ${
              selectedId === legend.id ? 'border-[var(--color-theme)] scale-105 shadow-[0_0_15px_var(--color-theme)] bg-[var(--color-theme)]/10' : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={legend.file} alt={legend.title} className="w-full h-full object-contain filter " />
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden w-full h-full relative overflow-hidden transition-colors duration-700">
        <div className="ebbing-gradient" />
        <WavyGrid />
        
        {showGallery ? (
           <GalleryCarousel legend={currentLegend} />
        ) : (
           <LegendDisplay legend={currentLegend} />
        )}

        <LegendDetails 
          legend={currentLegend} 
          onNext={handleNext} 
          showGallery={showGallery}
          onToggleGallery={() => setShowGallery(!showGallery)}
        />
      </div>
    </motion.main>
  );
};

export default Legends;
