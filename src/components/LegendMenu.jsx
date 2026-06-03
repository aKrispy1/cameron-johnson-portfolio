import React from 'react';

const LegendMenu = ({ selectedId, onSelect, legends, showGallery }) => {
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
      <div className="hidden lg:flex flex-col w-[320px] h-full overflow-y-auto pt-36 pb-12 px-8 z-40 custom-scrollbar transition-colors duration-700 select-none">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { display: none; }
          .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        <div className="mb-8">
          <span className="font-mono text-sm tracking-widest text-[var(--color-primary)]/40 uppercase block mb-1">PROJECT DIRECTORY</span>
          <h2 className="text-4xl font-display font-bold tracking-tighter text-[var(--color-primary)] uppercase">
            LEGENDS
          </h2>
          <span className="font-mono text-xs text-[var(--color-theme)]/70 uppercase block mt-2 tracking-wider">
            [ SELECT CASE STUDY ]
          </span>
        </div>

        <div className="flex flex-col border-t border-[var(--color-primary)]/10">
          {legends.map((legend, index) => {
            const isSelected = selectedId === legend.id;
            const formattedIndex = `[${String(index + 1).padStart(2, '0')}]`;
            
            if (isSelected) {
              const [line1, line2] = splitTitle(legend.title);
              return (
                <div 
                  key={legend.id}
                  onClick={() => onSelect(legend.id)}
                  className="flex items-stretch border border-[var(--color-primary)] bg-white my-2 transition-all duration-300 select-none shadow-sm cursor-pointer group rounded-none"
                >
                  <div className="flex-1 flex items-center gap-3 p-2.5">
                    {/* Enlarged logo that fills the cell */}
                    <div className="w-12 h-12 bg-white flex items-center justify-center p-0.5 border border-gray-100 flex-shrink-0">
                      <img 
                        src={legend.file} 
                        alt={legend.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-display font-bold text-base text-black leading-tight uppercase tracking-wider">
                        {line1}
                      </span>
                      {line2 && (
                        <span className="font-display font-bold text-base text-black leading-tight uppercase tracking-wider">
                          {line2}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Theme/Secondary block with white/black arrow on hover */}
                  <div className="w-12 bg-[var(--color-theme)] group-hover:bg-[var(--color-secondary)] text-white group-hover:text-black flex items-center justify-center text-xl font-mono flex-shrink-0 transition-all duration-300">
                    →
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={legend.id}
                onClick={() => onSelect(legend.id)}
                className="flex items-center justify-between py-4 border-b border-[var(--color-primary)]/10 cursor-pointer group transition-all duration-300 hover:bg-[var(--color-primary)]/[0.01]"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="font-mono text-sm text-[var(--color-theme)] group-hover:text-[var(--color-secondary)] tracking-tighter transition-colors duration-300">
                    {formattedIndex}
                  </span>
                  
                  {/* Thumbnail box: w-12 h-12, p-0.5, no grayscale, soft opacity */}
                  <div className="w-12 h-12 border bg-white flex items-center justify-center p-0.5 transition-all duration-500 border-[var(--color-primary)]/10 group-hover:border-[var(--color-primary)]/30 flex-shrink-0 rounded-none">
                    <img 
                      src={legend.file} 
                      alt={legend.title} 
                      className="w-full h-full object-contain transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>

                  <span className={`font-sans font-bold text-lg tracking-wider transition-all duration-500 text-[var(--color-primary)]/60 group-hover:text-[var(--color-primary)] whitespace-nowrap ${
                    showGallery 
                      ? 'max-w-0 opacity-0 group-hover:max-w-[240px] group-hover:opacity-100 group-hover:ml-1' 
                      : 'max-w-[240px] opacity-100'
                  }`}>
                    {legend.title}
                  </span>
                </div>

                <span className={`font-mono text-sm transition-all duration-300 mr-1 text-[var(--color-primary)]/20 group-hover:text-[var(--color-secondary)] group-hover:translate-x-1 ${
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
      <div className="lg:hidden w-full overflow-x-auto flex gap-4 px-6 py-4 border-b border-[var(--color-primary)]/10 bg-[var(--color-background)]/80 backdrop-blur-md sticky top-[80px] z-30 select-none custom-scrollbar">
        {legends.map((legend, index) => {
          const isSelected = selectedId === legend.id;
          const formattedIndex = `[${String(index + 1).padStart(2, '0')}]`;
          
          return (
            <div 
              key={legend.id}
              onClick={() => onSelect(legend.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-2 border cursor-pointer transition-all duration-300 rounded-none ${
                isSelected ? 'border-[var(--color-secondary)] bg-[var(--color-primary)]/[0.03]' : 'border-[var(--color-primary)]/10 bg-transparent'
              }`}
            >
              <span className="font-mono text-xs text-[var(--color-secondary)]">{formattedIndex}</span>
              <img 
                src={legend.file} 
                alt={legend.title} 
                className={`w-8 h-8 object-contain transition-all duration-300 ${isSelected ? 'opacity-100 scale-105' : 'opacity-70'}`} 
              />
              <span className={`font-sans font-bold text-sm tracking-wider text-[var(--color-primary)] transition-all duration-300 ${
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
