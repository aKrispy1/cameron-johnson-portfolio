import React from 'react';

const LegendMenu = ({ selectedId, onSelect, legends, showGallery, viewMode = 'dossier', onViewModeChange }) => {
  // Helper to split title into up to two lines
  const splitTitle = (title) => {
    const parts = title.split(' ');
    if (parts.length === 1) return [title, ''];
    if (parts.length === 2) return [parts[0], parts[1]];
    const mid = Math.ceil(parts.length / 2);
    return [parts.slice(0, mid).join(' '), parts.slice(mid).join(' ')];
  };

  return (
    <>
      {/* Desktop Sidebar (lg:flex) */}
      <div className="hidden lg:flex flex-col w-[325px] h-full overflow-y-auto pt-32 pb-12 px-6 z-40 custom-scrollbar transition-all duration-700 select-none border-r border-white/10 dot-grid-bg">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { display: none; }
          .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        <div className="mb-8 px-2">
          <span className="font-mono text-[9px] tracking-widest text-[var(--color-primary)]/40 uppercase block mb-1 font-bold">PROJECT DIRECTORY</span>
          <h2 className="text-2xl font-display font-bold tracking-tight text-[var(--color-primary)] uppercase">
            LEGENDS
          </h2>
          
          {/* Workstation view mode selectors */}
          <div className="flex gap-1.5 mt-4 p-1 bg-[var(--color-primary)]/5 border border-white/10 rounded-[2px] font-display text-[9px] max-w-[210px]">
            <button 
              onClick={() => onViewModeChange && onViewModeChange('dossier')}
              data-cursor="explore"
              className={`flex-1 px-3 py-1.5 transition-all duration-300 rounded-[2px] cursor-pointer uppercase font-bold text-center ${
                viewMode === 'dossier' 
                  ? 'bg-white/40 text-[var(--color-primary)] shadow-xs' 
                  : 'text-[var(--color-primary)]/50 hover:text-[var(--color-primary)]'
              }`}
            >
              Legends
            </button>
            <button 
              onClick={() => onViewModeChange && onViewModeChange('grid')}
              data-cursor="explore"
              className={`flex-1 px-3 py-1.5 transition-all duration-300 rounded-[2px] cursor-pointer uppercase font-bold text-center ${
                viewMode === 'grid' 
                  ? 'bg-white/40 text-[var(--color-primary)] shadow-xs' 
                  : 'text-[var(--color-primary)]/50 hover:text-[var(--color-primary)]'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {legends.map((legend, index) => {
            const isSelected = selectedId === legend.id;
            const formattedIndex = `${String(index + 1).padStart(2, '0')}`;
            
            if (isSelected) {
              const [line1, line2] = splitTitle(legend.title);
              return (
                <div 
                  key={legend.id}
                  onClick={() => onSelect(legend.id)}
                  className="flex items-stretch border border-white/20 bg-white/25 shadow-xs my-1 transition-all duration-400 select-none cursor-pointer group rounded-[2px]"
                  style={{
                    boxShadow: `0 8px 32px 0 rgba(12,12,17,0.03), 0 0 12px ${legend.themeColor}1a`,
                    borderColor: `${legend.themeColor}33`
                  }}
                >
                  <div className="flex-1 flex items-center gap-3.5 p-3">
                    {/* Enlarged logo that fills the cell */}
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center p-2 border border-white/10 rounded-[2px] flex-shrink-0">
                      <img 
                        src={legend.file} 
                        alt={legend.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-display font-bold text-sm text-[var(--color-primary)] leading-tight uppercase tracking-wider">
                        {line1}
                      </span>
                      {line2 && (
                        <span className="font-display font-bold text-sm text-[var(--color-primary)] leading-tight uppercase tracking-wider">
                          {line2}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Theme/Secondary block with arrow */}
                  <div 
                    className="w-10 text-white flex items-center justify-center text-sm font-mono flex-shrink-0 transition-all duration-300 rounded-r-[2px]"
                    style={{ backgroundColor: legend.themeColor }}
                  >
                    →
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={legend.id}
                onClick={() => onSelect(legend.id)}
                className="flex items-center justify-between p-3 border border-transparent rounded-[2px] cursor-pointer group transition-all duration-300 hover:bg-white/20 hover:border-white/10"
              >
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <span className="font-mono text-xs text-[var(--color-primary)]/45 group-hover:text-[var(--color-theme)] transition-colors duration-300 font-bold">
                    {formattedIndex}
                  </span>
                  
                  {/* Thumbnail box: w-12 h-12, p-0.5, no grayscale, soft opacity */}
                  <div className="w-12 h-12 border bg-white/5 flex items-center justify-center p-2 transition-all duration-500 border-white/10 group-hover:border-white/20 flex-shrink-0 rounded-[2px]">
                    <img 
                      src={legend.file} 
                      alt={legend.title} 
                      className="w-full h-full object-contain transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>

                  <span className={`font-display font-bold text-sm tracking-wide transition-all duration-500 text-[var(--color-primary)]/60 group-hover:text-[var(--color-primary)] whitespace-nowrap ${
                    showGallery 
                      ? 'max-w-0 opacity-0 group-hover:max-w-[240px] group-hover:opacity-100 group-hover:ml-1' 
                      : 'max-w-[240px] opacity-100'
                  }`}>
                    {legend.title}
                  </span>
                </div>

                <span className={`font-mono text-xs transition-all duration-300 mr-1 text-[var(--color-primary)]/20 group-hover:text-[var(--color-theme)] group-hover:translate-x-1 ${
                  showGallery ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}>
                  →
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Horizontal Bar (lg:hidden) */}
      <div className="lg:hidden w-full overflow-x-auto flex gap-3 px-6 py-4 border-b border-white/10 bg-[var(--color-background)]/85 backdrop-blur-xl sticky top-[76px] z-30 select-none custom-scrollbar">
        {legends.map((legend, index) => {
          const isSelected = selectedId === legend.id;
          const formattedIndex = `${String(index + 1).padStart(2, '0')}`;
          
          return (
            <div 
              key={legend.id}
              onClick={() => onSelect(legend.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-2.5 border cursor-pointer transition-all duration-300 rounded-[2px] ${
                isSelected 
                  ? 'border-[var(--color-theme)] bg-white/20 shadow-xs' 
                  : 'border-white/10 bg-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <span className="font-mono text-[10px] text-[var(--color-primary)]/40 font-bold">{formattedIndex}</span>
              <img 
                src={legend.file} 
                alt={legend.title} 
                className={`w-6 h-6 object-contain transition-all duration-300 ${isSelected ? 'opacity-100 scale-105' : 'opacity-65'}`} 
              />
              <span className={`font-display font-bold text-xs tracking-wider text-[var(--color-primary)] transition-all duration-300 ${
                showGallery && !isSelected ? 'hidden' : 'block'
              }`}>{legend.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LegendMenu;
