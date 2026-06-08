import React from 'react';

const getSecondaryContrastColor = (legend) => {
  const secColor = (legend.secondaryColor || '#ffffff').toLowerCase();
  if (secColor === '#ffffff' || secColor === '#ffffffff' || secColor === '#faf9fc' || secColor === '#fcfcfc') {
    return 'text-black';
  }
  return 'text-white';
};

const LegendDetails = ({ legend, onNext, showGallery, onToggleGallery }) => {
  const scope = legend.scope || legend.tags || [];
  const location = legend.location || { name: "SPARTANBURG, SC // USA", lat: "34.9496° N", lon: "81.9320° W" };

  return (
    <div className="w-full lg:w-[420px] h-auto lg:h-full flex flex-col justify-between px-8 py-12 lg:pt-36 lg:pb-20 z-40 transition-colors duration-700 lg:overflow-y-auto custom-scrollbar border-l border-[var(--color-primary)]/5 bg-[var(--color-panel)]/40 backdrop-blur-xs relative hud-anchor hud-anchor-tl hud-anchor-tr hud-anchor-bl hud-anchor-br">
      
      <div>
        {/* Creative Dossier Header */}
        <div className="flex justify-between items-center mb-8 pb-2 border-b border-[var(--color-primary)]/10">
          <span className="font-mono text-xs text-[var(--color-primary)]/40 tracking-wider uppercase">Creative Dossier</span>
          <span className="font-mono text-xs text-[var(--color-theme)] font-bold tracking-wider">
            ACTIVE_SYS_V4
          </span>
        </div>

        {/* Subtitle Badge */}
        {legend.subtitle && (
          <div className="mb-4">
            <span className={`inline-block bg-[var(--color-secondary)] font-mono text-xs font-bold px-3 py-1.5 tracking-wider uppercase ${getSecondaryContrastColor(legend)}`}>
              {legend.subtitle}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-none uppercase tracking-tighter text-[var(--color-primary)] transition-all duration-700">
          {legend.title}
        </h1>
        
        {/* Description */}
        <p className="font-sans text-base lg:text-lg text-[var(--color-primary)]/80 leading-relaxed mb-8 transition-colors duration-700">
          {legend.description}
        </p>
        
        {/* Coordinates & Locale */}
        <div className="mb-8">
          <span className="font-mono text-xs text-[var(--color-primary)]/40 tracking-wider block mb-4 uppercase">Coordinates & Locale</span>
          <div className="flex flex-col gap-2 font-mono text-sm">
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-primary)]/50">LOC:</span>
              <span className="text-[var(--color-secondary)] font-bold tracking-wider">{location.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-primary)]/50">LAT:</span>
              <span className="text-[var(--color-primary)]/80 tracking-wider">{location.lat}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-primary)]/50">LON:</span>
              <span className="text-[var(--color-primary)]/80 tracking-wider">{location.lon}</span>
            </div>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-10">
          <span className="font-mono text-xs text-[var(--color-primary)]/40 tracking-wider block mb-4 uppercase">Core Capabilities</span>
          <div className="flex flex-wrap gap-2">
            {scope.map((item, i) => (
              <span 
                key={i} 
                className="inline-flex items-center border border-[var(--color-primary)]/20 text-sm font-mono tracking-tight uppercase text-[var(--color-primary)]/70 hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] transition-colors duration-300 overflow-hidden"
              >
                <span className={`bg-[var(--color-secondary)] px-2 py-1.5 font-bold text-xs border-r border-[var(--color-primary)]/20 ${getSecondaryContrastColor(legend)}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="px-3 py-1.5">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Project Meta */}
        {(legend.client || legend.year) && (
          <div className="mb-8 flex gap-6">
            {legend.client && (
              <div>
                <span className="font-mono text-[10px] text-[var(--color-primary)]/30 tracking-wider block mb-1 uppercase">Client</span>
                <span className="font-mono text-xs text-[var(--color-primary)]/70">{legend.client}</span>
              </div>
            )}
            {legend.year && (
              <div>
                <span className="font-mono text-[10px] text-[var(--color-primary)]/30 tracking-wider block mb-1 uppercase">Year</span>
                <span className="font-mono text-xs text-[var(--color-primary)]/70">{legend.year}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="pt-6 border-t border-[var(--color-primary)]/10 flex items-center justify-between">
        <button 
          onClick={onToggleGallery}
          data-cursor="open"
          className="flex items-center gap-3 cursor-pointer group focus:outline-none"
        >
          <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 rounded-none ${
            showGallery 
              ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)] text-black' 
              : 'border-[var(--color-primary)]/20 bg-transparent text-[var(--color-primary)] group-hover:border-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)] group-hover:text-black'
          }`}>
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
          </div>
          <span className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
            showGallery ? 'text-[var(--color-secondary)] font-bold' : 'text-[var(--color-primary)] group-hover:text-[var(--color-secondary)]'
          }`}>
            {showGallery ? "Dossier" : "Case Study"}
          </span>
        </button>

        <button 
          onClick={onNext}
          data-cursor="next"
          className="flex items-center gap-3 cursor-pointer group focus:outline-none"
        >
          <span className="text-xs font-mono tracking-widest text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors duration-300 uppercase">
            Next Project
          </span>
          <div className="w-10 h-10 border border-[var(--color-primary)]/20 flex items-center justify-center group-hover:border-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)] group-hover:text-black transition-all duration-300 rounded-none text-[var(--color-primary)]">
            <span className="font-mono text-xs group-hover:translate-x-0.5 transition-transform duration-300">→</span>
          </div>
        </button>
      </div>
      
    </div>
  );
};

export default LegendDetails;
