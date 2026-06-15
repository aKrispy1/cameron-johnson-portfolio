import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidBackground from '../components/LiquidBackground';
import CapabilitiesRadar from '../components/CapabilitiesRadar';

// Facets of identity for the carousel
const identityFacets = [
  {
    id: 'strategist',
    title: 'THE STRATEGIST',
    subtitle: 'RESEARCH & CONCEPT FIRST',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    description: 'Every project begins with a question, not a sketch. I dissect brand positioning, analyze market dynamics, and establish structural blueprints before defining visual style. Concept-led architecture ensures long-term viability.',
    coordinate: 'COORD // STRAT_01'
  },
  {
    id: 'creator',
    title: 'THE CREATOR',
    subtitle: 'GRAPHIC & BRAND DESIGN',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    description: 'Transforming complex conceptual ideas into high-impact visual identities. Specialized in premium logos, branding structures, vectors, and layouts. The design merges mathematical grid layouts with raw expressive accents.',
    coordinate: 'COORD // CREA_02'
  },
  {
    id: 'systems',
    title: 'SYSTEMS BUILDER',
    subtitle: 'INTERACTIVE FRAMEWORKS',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description: 'Structuring components and design systems that scale. I code and build layout grids that bridges design theory with engineering rigor. Clean structure, 1px rules, and precise visual logic are the baseline.',
    coordinate: 'COORD // SYS_03'
  },
  {
    id: 'observer',
    title: 'THE RAVEN',
    subtitle: 'INTROSPECTIVE WATCHER',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    description: 'Inspired by the recurring Raven archetype—observation preceding action. I analyze behavioral patterns, visual cultures, and historic design movements. Introspection yields clarity and direction.',
    coordinate: 'COORD // OBS_04'
  }
];

const About = () => {
  const [activeFacetId, setActiveFacetId] = useState('strategist');
  const activeFacet = identityFacets.find(f => f.id === activeFacetId);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-28 lg:pt-36 px-6 lg:px-16 pb-24 bg-[#CCCCCC] select-none overflow-x-hidden relative"
    >
      <LiquidBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-8 mb-16">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#0C0C11]/40 uppercase block mb-1 font-bold">DOSSIER // INDEX [02]</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#0C0C11] uppercase leading-none">
              ABOUT CAMERON
            </h1>
          </div>
          <p className="font-mono text-xs text-[#7D52FC] mt-4 md:mt-0 font-bold uppercase tracking-widest">
            LAT: 34.9496° N // LON: 81.9320° W
          </p>
        </div>

        {/* SECTION 0: PROFILE & BIOMETRIC BRIEF */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Left: Grayscale Portrait in HUD Viewfinder */}
          <div className="lg:col-span-4 glass-panel p-4 rounded-[2px] border border-white/20 relative flex flex-col justify-center items-center overflow-hidden scanner-lines dot-grid-bg">
            <span className="absolute top-2 left-3 font-mono text-[7px] text-[#0C0C11]/30 font-bold">[BIOMETRIC.SCAN]</span>
            <span className="absolute top-2 right-3 font-mono text-[7px] text-[#7D52FC] font-bold">GRID_ON</span>
            
            <div className="w-full h-[320px] relative overflow-hidden halftone-overlay border border-white/25 rounded-[2px] bg-black/5 flex items-center justify-center">
              {/* Corner tick marks */}
              <span className="absolute top-2 left-2 text-[#7D52FC] text-xs font-mono select-none pointer-events-none">+</span>
              <span className="absolute top-2 right-2 text-[#7D52FC] text-xs font-mono select-none pointer-events-none">+</span>
              <span className="absolute bottom-2 left-2 text-[#7D52FC] text-xs font-mono select-none pointer-events-none">+</span>
              <span className="absolute bottom-2 right-2 text-[#7D52FC] text-xs font-mono select-none pointer-events-none">+</span>

              <img 
                src="/assets/portrait.jpg" 
                alt="Cameron Johnson Portrait" 
                className="w-full h-full object-cover filter grayscale contrast-115 transition-transform duration-700 ease-out hover:scale-105" 
              />
            </div>
            
            {/* Telemetry metadata footer */}
            <div className="w-full flex justify-between items-center mt-3 border-t border-black/5 pt-3 font-mono text-[8px] text-[#0C0C11]/45 font-bold">
              <span>PHOTO_SYS_4.8</span>
              <span>INDEX: 9283_A</span>
            </div>
          </div>

          {/* Right: Technical Profile details */}
          <div className="lg:col-span-8 glass-panel p-8 md:p-10 rounded-[2px] border border-white/20 relative flex flex-col justify-between overflow-hidden dot-grid-bg">
            <span className="absolute top-4 left-5 font-mono text-[9px] text-[#0C0C11]/30 font-bold">[METRIC.LOGS]</span>
            <span className="absolute top-4 right-5 font-mono text-[9px] text-[var(--color-theme)] font-bold tracking-widest">STABLE</span>
            
            <div>
              <span className="font-mono text-[10px] text-[var(--color-theme)] tracking-widest block mb-2 font-bold">
                OPERATIONAL INDEX //
              </span>
              <h2 className="text-2xl font-display font-bold text-[#0C0C11] uppercase tracking-wide mb-6">
                CAMERON JOHNSON // BIOGRAPHY
              </h2>
              <p className="font-sans text-sm md:text-base text-[#0C0C11]/80 leading-relaxed font-medium mb-6">
                I am a Spartanburg-based Creative Director and systems designer who structures raw visual concepts into highly detailed interactive identity frameworks. By layering mathematical layouts with modern user experiences, I bridge the gap between creative strategy and technical design engineering.
              </p>
            </div>

            {/* Matrix details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-6 border-t border-black/5 font-mono text-[10px]">
              <div>
                <span className="text-[#0C0C11]/40 block font-bold mb-1">[ROLE]</span>
                <span className="text-[#0C0C11] font-bold uppercase">Creative Director</span>
              </div>
              <div>
                <span className="text-[#0C0C11]/40 block font-bold mb-1">[FOCUS]</span>
                <span className="text-[#0C0C11] font-bold uppercase">System Design</span>
              </div>
              <div>
                <span className="text-[#0C0C11]/40 block font-bold mb-1">[STATUS]</span>
                <span className="text-[#7D52FC] font-bold uppercase">Active Uplink</span>
              </div>
              <div>
                <span className="text-[#0C0C11]/40 block font-bold mb-1">[SECTOR]</span>
                <span className="text-[#0C0C11] font-bold uppercase">SPARTANBURG, SC</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: IDENTITY CAROUSEL */}
        <div className="mb-24">
          <div className="mb-8">
            <span className="font-mono text-[10px] text-[#7D52FC] tracking-wider block mb-1 font-bold">INTERACTIVE IDENTITY PROFILES</span>
            <p className="font-sans text-base text-[#0C0C11]/70 font-medium">Select a card to examine my visual strategy and research methodology.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left part: Selection list */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {identityFacets.map((facet) => {
                const isActive = activeFacetId === facet.id;
                return (
                  <div
                    key={facet.id}
                    onClick={() => setActiveFacetId(facet.id)}
                    className={`flex items-center gap-4 p-5 cursor-pointer transition-all duration-300 rounded-[2px] ${
                      isActive 
                        ? 'bg-white/45 border border-white/40 shadow-sm' 
                        : 'bg-white/20 border border-white/10 hover:border-white/30 hover:bg-white/35 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className={`p-2 rounded-[2px] transition-colors duration-300 ${
                      isActive ? 'text-[#7D52FC] bg-white/20' : 'text-[#0C0C11]/40'
                    }`}>
                      {facet.icon}
                    </div>
                    <div>
                      <span className={`font-mono text-[9px] block tracking-wider ${isActive ? 'text-[#7D52FC] font-bold' : 'text-[#0C0C11]/30'}`}>
                        {facet.coordinate}
                      </span>
                      <span className={`font-display font-bold text-base tracking-wide block ${
                        isActive ? 'text-[#0C0C11]' : 'text-[#0C0C11]/60'
                      }`}>
                        {facet.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right part: Detail Display card */}
            <div className="lg:col-span-8 glass-panel p-8 md:p-10 flex flex-col justify-between relative overflow-hidden rounded-[2px] border border-white/20 shadow-[0_8px_32px_0_rgba(12,12,17,0.06)] dot-grid-bg">
              
              {/* Corner indicators for HUD look */}
              <span className="absolute top-4 left-5 font-mono text-[9px] text-[#0C0C11]/30 font-bold">[FACET.DOSSIER]</span>
              <span className="absolute top-4 right-5 font-mono text-[9px] text-[#7D52FC] font-bold tracking-widest">ACTIVE</span>
              <span className="absolute bottom-4 left-5 font-mono text-[9px] text-[#0C0C11]/20">+</span>
              <span className="absolute bottom-4 right-5 font-mono text-[9px] text-[#0C0C11]/20">+</span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFacetId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-6 flex flex-col justify-center">
                    <span className="font-mono text-[10px] text-[#7D52FC] tracking-widest block mb-1 font-bold">
                      {activeFacet.subtitle}
                    </span>
                    <h3 className="text-2xl font-display font-bold tracking-tight text-[#0C0C11] mb-4 uppercase">
                      {activeFacet.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-[#0C0C11]/80 leading-relaxed font-medium">
                      {activeFacet.description}
                    </p>
                  </div>
                  <div className="md:col-span-6 flex justify-center w-full">
                    <CapabilitiesRadar activeFacetId={activeFacetId} />
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="border-t border-black/5 pt-6 mt-8 flex justify-between items-center">
                <span className="font-mono text-[9px] text-[#0C0C11]/30 font-bold">SYSTEM REVISION // V4.8</span>
                <span className="font-mono text-[9px] text-[#7D52FC] font-bold">{activeFacet.coordinate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: VERTICAL GLASS TIMELINE */}
        <div className="border-t border-black/10 pt-16">
          <div className="mb-12">
            <span className="font-mono text-[10px] text-[#7D52FC] tracking-wider block mb-1 font-bold">STRATEGIC JOURNEY</span>
            <h2 className="text-3xl font-display font-bold tracking-tight text-[#0C0C11] uppercase">
              PHILOSOPHY, BIO & RECORD
            </h2>
          </div>

          <div className="relative border-l border-black/10 pl-6 md:pl-10 ml-4 space-y-12">
            
            {/* Timeline Node 1: Current Era */}
            <div className="relative">
              {/* Pulsing indicator */}
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-none bg-[#CCCCCC] border-2 border-[var(--color-theme)]">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-none bg-[var(--color-theme)] opacity-75"></span>
                <span className="h-1.5 w-1.5 rounded-none bg-[var(--color-theme)]"></span>
              </span>

              <div className="glass-card p-6 md:p-8 border border-white/25 shadow-sm dot-grid-bg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-black/5 pb-3">
                  <div>
                    <span className="font-mono text-xs text-[#7D52FC] font-bold">2023 - PRESENT</span>
                    <h3 className="font-display font-bold text-xl text-[#0C0C11] uppercase mt-0.5">LEAD CREATIVE STRATEGIST</h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#0C0C11]/30 tracking-widest mt-1 md:mt-0 font-bold">[CURR_FACET]</span>
                </div>
                <p className="font-sans text-sm md:text-base text-[#0C0C11]/70 leading-relaxed mb-4 font-medium">
                  Cameron operates at the intersection of branding logic and visual architecture. Operating from Spartanburg, SC, he structures robust brand guidelines, visual identity packages, and hardware-accelerated interactive web portfolios.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-black/5">
                  <div>
                    <h4 className="font-mono text-[10px] text-[#7D52FC] uppercase tracking-wider font-bold mb-2">Philosophy</h4>
                    <p className="font-sans text-xs text-[#0C0C11]/60 italic leading-relaxed font-semibold">
                      "Strategy comes before style. Many frameworks prioritize aesthetic trends, palettes, and typography before understanding the brand's core thesis. I reverse this equation. Precision and logic must define every placement."
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-[#7D52FC] uppercase tracking-wider font-bold mb-2">Focus Scope</h4>
                    <p className="font-sans text-xs text-[#0C0C11]/60 leading-relaxed font-semibold">
                      Interactive brand systems, visual campaigns, scalable guidelines, and bridging visual design with code engineering.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Node 2: Professional Origins */}
            <div className="relative">
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-none bg-[#CCCCCC] border-2 border-[#0C0C11]/20">
                <span className="h-1.5 w-1.5 rounded-none bg-[#0C0C11]/20"></span>
              </span>

              <div className="glass-card p-6 md:p-8 border border-white/25 shadow-sm dot-grid-bg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-black/5 pb-3">
                  <div>
                    <span className="font-mono text-xs text-[#0C0C11]/50 font-bold">2021 - 2023</span>
                    <h3 className="font-display font-bold text-xl text-[#0C0C11] uppercase mt-0.5">MULTIDISCIPLINARY DESIGNER</h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#0C0C11]/30 tracking-widest mt-1 md:mt-0 font-bold">[ORIG_FACET]</span>
                </div>
                <p className="font-sans text-sm md:text-base text-[#0C0C11]/70 leading-relaxed font-medium">
                  Cameron focused on developing robust brand architectures, digital portfolios, vector illustrations, and visual packaging for media entities (such as podcasts, brand suites, and identity graphics).
                </p>
                <div className="mt-6 pt-6 border-t border-black/5">
                  <h4 className="font-mono text-[10px] text-[#7D52FC] uppercase tracking-wider font-bold mb-2">Visual Logic Baseline</h4>
                  <p className="font-sans text-xs text-[#0C0C11]/60 leading-relaxed font-semibold">
                    Balance of geometric grids with raw expressive accents, ensuring all graphics remain clean, scalable, and responsive to modern publishing guidelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Node 3: The Strategic Mission */}
            <div className="relative">
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-none bg-[#CCCCCC] border-2 border-[#0C0C11]/20">
                <span className="h-1.5 w-1.5 rounded-none bg-[#0C0C11]/20"></span>
              </span>

              <div className="glass-card p-6 md:p-8 border border-white/25 shadow-sm dot-grid-bg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-black/5 pb-3">
                  <div>
                    <span className="font-mono text-xs text-[#0C0C11]/50 font-bold">CORE OBJECTIVE</span>
                    <h3 className="font-display font-bold text-xl text-[#0C0C11] uppercase mt-0.5">THE MISSION</h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#0C0C11]/30 tracking-widest mt-1 md:mt-0 font-bold">[STRAT_MISSION]</span>
                </div>
                <p className="font-sans text-sm md:text-base text-[#0C0C11]/70 leading-relaxed font-medium">
                  To construct visual design systems that resolve complex communication dilemmas, ensuring clients and projects stand on premium, intentional graphic pillars. By blending typography precision with a refined glassmorphic canvas, I deliver memorable, high-integrity design layouts built to perform.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default About;
