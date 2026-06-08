import React from 'react';
import { motion } from 'framer-motion';

const getSecondaryContrastColor = (legend) => {
  const secColor = (legend.secondaryColor || '#ffffff').toLowerCase();
  if (secColor === '#ffffff' || secColor === '#ffffffff' || secColor === '#faf9fc' || secColor === '#fcfcfc') {
    return 'text-black';
  }
  return 'text-white';
};

const PortfolioGridView = ({ legends, onSelectProject }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto pt-8 pb-24 px-6 lg:px-12 lg:pt-36 custom-scrollbar select-none z-10">
      <style>{`
        .grid-scrollbar::-webkit-scrollbar { display: none; }
        .grid-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Grid Header Telemetry */}
      <div className="flex justify-between items-center mb-8 pb-3 border-b border-[var(--color-primary)]/10">
        <div>
          <span className="font-mono text-[9px] text-[var(--color-primary)]/40 tracking-widest uppercase block mb-1">
            Core Archive // registered_legends
          </span>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-[var(--color-primary)]">
            SYSTEM_MATRIX_GRID
          </h2>
        </div>
        <span className="font-mono text-[9px] text-[var(--color-theme)] font-bold">
          TOTAL_RECORDS: {String(legends.length).padStart(2, '0')}
        </span>
      </div>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {legends.map((legend, index) => {
          const isDark = legend.bgColor === '#0a0a0a';
          const scope = legend.scope || legend.tags || [];
          
          return (
            <motion.div
              key={legend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onClick={() => onSelectProject(legend.id)}
              data-cursor="explore"
              className={`border border-[var(--color-primary)]/15 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 relative group overflow-hidden rounded-none h-[340px] ${
                isDark 
                  ? 'bg-black/30 border-white/5 hover:border-white/20' 
                  : 'bg-[var(--color-primary)]/[0.02] hover:bg-white hover:border-[var(--color-primary)]/30 hover:shadow-lg'
              }`}
              style={{
                // Subtle custom hover border glow mapping to project theme
                '--hover-glow': legend.themeColor,
              }}
            >
              {/* Corner brackets (+) */}
              <span className="absolute top-2 left-3 font-mono text-[8px] text-[var(--color-primary)]/20 group-hover:text-[var(--color-primary)]/40">
                [RECORD.{String(index + 1).padStart(2, '0')}]
              </span>
              <span className="absolute top-2 right-3 font-mono text-[8px] text-[var(--color-primary)]/20">
                {legend.year}
              </span>

              {/* Card Body */}
              <div className="pt-4 flex-1 flex flex-col justify-start">
                {/* Logo Frame */}
                <div className="w-16 h-16 bg-white p-2 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500 rounded-none shadow-xs">
                  <img src={legend.file} alt={legend.title} className="w-full h-full object-contain" />
                </div>

                {/* Subtitle Badging */}
                <span className="font-mono text-[9px] text-[var(--color-primary)]/40 group-hover:text-[var(--color-theme)] transition-colors duration-300 uppercase tracking-widest block mt-4 mb-1.5">
                  {legend.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-[var(--color-primary)] uppercase tracking-wide leading-tight mb-2 group-hover:translate-x-0.5 transition-transform duration-300">
                  {legend.title}
                </h3>

                {/* Short Desc snippet */}
                <p className="font-sans text-[12px] text-[var(--color-primary)]/70 leading-relaxed line-clamp-3">
                  {legend.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="border-t border-[var(--color-primary)]/10 pt-4 mt-4 flex items-center justify-between">
                {/* Category Tags */}
                <div className="flex gap-1.5 overflow-hidden max-w-[70%]">
                  {scope.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="font-mono text-[8px] border border-[var(--color-primary)]/15 px-1.5 py-0.5 uppercase text-[var(--color-primary)]/60 bg-black/5 whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action arrow */}
                <div 
                  className="w-8 h-8 border border-[var(--color-primary)]/15 flex items-center justify-center font-mono text-xs transition-all duration-300"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  // Set style overrides on hover using standard CSS logic
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = legend.themeColor;
                    e.currentTarget.style.borderColor = legend.themeColor;
                    e.currentTarget.style.color = isDark ? '#000000' : '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--color-primary)/15';
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  →
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioGridView;
