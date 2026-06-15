import React from 'react';

const LegendDetails = ({ legend, onNext, showGallery, onToggleGallery }) => {
  const scope = legend.scope || legend.tags || [];
  const location = legend.location || { name: "SPARTANBURG, SC // USA", lat: "34.9496° N", lon: "81.9320° W" };

  return (
    <div className="w-full lg:w-[420px] h-auto lg:h-full flex flex-col justify-between px-8 py-8 lg:pt-28 lg:pb-8 z-40 transition-colors duration-700 lg:overflow-y-auto custom-scrollbar border-l border-white/10 bg-[var(--color-panel)] backdrop-blur-md relative dot-grid-bg">
      
      <div>
        {/* Creative Dossier Header */}
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-[var(--color-primary)]/10">
          <span className="font-mono text-[10px] text-[var(--color-primary)]/40 tracking-widest uppercase font-bold">Creative Dossier</span>
          <span className="font-mono text-[10px] text-[var(--color-theme)] font-bold tracking-widest uppercase">
            ACTIVE_SYS_V4
          </span>
        </div>

        {/* Subtitle Badge - Styled as glass panel */}
        {legend.subtitle && (
          <div className="mb-4">
            <span className="inline-block bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 font-display text-[10px] font-bold px-3 py-1.5 tracking-wider uppercase rounded-[2px] text-[var(--color-theme)]">
              {legend.subtitle}
            </span>
          </div>
        )}

        {/* Title - Tomorrow Bold */}
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-4 leading-none uppercase tracking-tight text-[var(--color-primary)] transition-all duration-700">
          {legend.title}
        </h1>
        
        {/* Description */}
        <p className="font-sans text-sm md:text-base text-[var(--color-primary)]/70 leading-relaxed mb-6 transition-colors duration-700 font-medium">
          {legend.description}
        </p>
        
        {/* Core Capabilities */}
        <div className="mb-6">
          <span className="font-mono text-[10px] text-[var(--color-primary)]/30 tracking-widest block mb-3 uppercase font-bold">Core Capabilities</span>
          <div className="flex flex-wrap gap-2.5">
            {scope.map((item, i) => (
              <span 
                key={i} 
                className="inline-flex items-center border border-white/25 text-[11px] font-mono tracking-tight uppercase text-[var(--color-primary)]/70 bg-white/20 hover:border-[var(--color-theme)] hover:text-[var(--color-primary)] transition-colors duration-300 rounded-[2px] overflow-hidden"
              >
                <span className="bg-[var(--color-primary)]/5 text-[var(--color-theme)] px-2.5 py-1 font-bold text-[9px] border-r border-white/25 rounded-l-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="px-3 py-1 font-semibold">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Project Meta */}
        {(legend.client || legend.year) && (
          <div className="mb-6 flex gap-8 p-1">
            {legend.client && (
              <div>
                <span className="font-mono text-[9px] text-[var(--color-primary)]/30 tracking-widest block mb-1 uppercase font-bold">Client</span>
                <span className="font-display font-bold text-xs text-[var(--color-primary)]/80">{legend.client}</span>
              </div>
            )}
            {legend.year && (
              <div>
                <span className="font-mono text-[9px] text-[var(--color-primary)]/30 tracking-widest block mb-1 uppercase font-bold">Year</span>
                <span className="font-display font-bold text-xs text-[var(--color-primary)]/80">{legend.year}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer controls - styled as elegant circular icons and text tags */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
        <button 
          onClick={onToggleGallery}
          data-cursor="open"
          className="flex items-center gap-3.5 cursor-pointer group focus:outline-none"
        >
          <div className={`w-10 h-10 border rounded-[2px] flex items-center justify-center transition-all duration-300 ${
            showGallery 
              ? 'border-[var(--color-theme)] bg-[var(--color-theme)]/10 text-[var(--color-theme)] shadow-sm' 
              : 'border-white/20 bg-white/20 text-[var(--color-primary)] group-hover:border-[var(--color-theme)] group-hover:bg-[var(--color-theme)]/10 group-hover:text-[var(--color-theme)]'
          }`}>
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
          </div>
          <span className={`text-xs font-display tracking-wider font-bold uppercase transition-all duration-300 ${
            showGallery ? 'text-[var(--color-theme)] font-bold' : 'text-[var(--color-primary)]/60 group-hover:text-[var(--color-theme)]'
          }`}>
            {showGallery ? "Close Study" : "View Case Study"}
          </span>
        </button>

        <button 
          onClick={onNext}
          data-cursor="next"
          className="flex items-center gap-3.5 cursor-pointer group focus:outline-none"
        >
          <span className="text-xs font-display tracking-wider font-bold text-[var(--color-primary)]/60 group-hover:text-[var(--color-theme)] transition-colors duration-300 uppercase">
            Next Project
          </span>
          <div className="w-10 h-10 border border-white/20 rounded-[2px] flex items-center justify-center group-hover:border-[var(--color-theme)] group-hover:bg-[var(--color-theme)]/10 group-hover:text-[var(--color-theme)] transition-all duration-300 text-[var(--color-primary)]">
            <span className="font-mono text-xs group-hover:translate-x-0.5 transition-transform duration-300">→</span>
          </div>
        </button>
      </div>
      
    </div>
  );
};

export default LegendDetails;
