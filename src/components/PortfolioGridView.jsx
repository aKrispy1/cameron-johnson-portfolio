import React from 'react';
import { motion } from 'framer-motion';

const PortfolioGridView = ({ legends, onSelectProject }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto pt-8 pb-24 px-6 lg:px-12 lg:pt-36 custom-scrollbar select-none z-10">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Grid Header Telemetry */}
      <div className="flex justify-between items-center mb-8 pb-3 border-b border-[var(--color-primary)]/10">
        <div>
          <span className="font-mono text-[9px] text-[var(--color-primary)]/40 tracking-widest uppercase block mb-1 font-bold">
            Core Archive // registered_legends
          </span>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-[var(--color-primary)]">
            PROJECT MATRIX GRID
          </h2>
        </div>
        <span className="font-mono text-[9px] text-[var(--color-theme)] font-bold tracking-widest uppercase bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 px-3 py-1 rounded-[2px]">
          TOTAL: {String(legends.length).padStart(2, '0')}
        </span>
      </div>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {legends.map((legend, index) => {
          const scope = legend.scope || legend.tags || [];
          
          return (
            <motion.div
              key={legend.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
              onClick={() => onSelectProject(legend.id)}
              data-cursor="explore"
              className="glass-card p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 relative group overflow-hidden rounded-[2px] border border-white/20 h-[340px]"
              style={{
                // Subtle custom hover border glow mapping to project theme
                '--hover-glow': legend.themeColor,
              }}
            >
              {/* Corner brackets/Pill */}
              <span className="absolute top-3 left-4 font-mono text-[8px] text-[var(--color-primary)]/30 tracking-widest font-bold">
                RECORD // {String(index + 1).padStart(2, '0')}
              </span>
              <span className="absolute top-3 right-4 font-mono text-[8px] text-[var(--color-primary)]/30 font-bold">
                {legend.year}
              </span>

              {/* Card Body */}
              <div className="pt-4 flex-1 flex flex-col justify-start">
                {/* Logo Frame */}
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-[2px] flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform duration-500 shadow-xs">
                  <img src={legend.file} alt={legend.title} className="w-full h-full object-contain" />
                </div>

                {/* Subtitle Badging */}
                <span className="font-mono text-[9px] text-[var(--color-theme)] uppercase tracking-wider block mt-5 mb-1.5 font-bold">
                  {legend.subtitle}
                </span>

                {/* Title - Tomorrow Bold */}
                <h3 className="text-xl font-display font-bold text-[var(--color-primary)] uppercase tracking-wide leading-tight mb-2 group-hover:translate-x-0.5 transition-transform duration-300">
                  {legend.title}
                </h3>

                {/* Short Desc snippet */}
                <p className="font-sans text-xs text-[var(--color-primary)]/60 leading-relaxed line-clamp-3 font-medium">
                  {legend.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between">
                {/* Category Tags */}
                <div className="flex gap-1.5 overflow-hidden max-w-[70%]">
                  {scope.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="font-mono text-[8px] border border-white/20 px-2.5 py-0.5 rounded-[2px] uppercase text-[var(--color-primary)]/50 bg-white/20 whitespace-nowrap font-bold">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action arrow - styled as glass box */}
                <div 
                  className="w-8 h-8 rounded-[2px] border border-white/20 flex items-center justify-center font-mono text-xs transition-all duration-300 group-hover:bg-[var(--hover-glow)] group-hover:border-[var(--hover-glow)] group-hover:text-black text-[var(--color-primary)]"
                  style={{
                    '--hover-bg': legend.themeColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = legend.themeColor;
                    e.currentTarget.style.borderColor = legend.themeColor;
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
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
