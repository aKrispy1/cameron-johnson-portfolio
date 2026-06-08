import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WavyGridCanvas from '../components/WavyGridCanvas';
import CapabilitiesRadar from '../components/CapabilitiesRadar';

// Facets of identity for the carousel
const identityFacets = [
  {
    id: 'strategist',
    title: 'THE STRATEGIST',
    subtitle: 'RESEARCH & CONCEPT FIRST',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const [expandedSection, setExpandedSection] = useState('bio');

  const activeFacet = identityFacets.find(f => f.id === activeFacetId);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-28 lg:pt-36 px-6 lg:px-16 pb-24 bg-[var(--color-background)] transition-colors duration-700 select-none overflow-x-hidden relative"
    >
      <div className="ebbing-gradient" />
      <WavyGridCanvas />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--color-primary)]/10 pb-8 mb-16">
          <div>
            <span className="font-mono text-xs tracking-widest text-[var(--color-primary)]/40 uppercase block mb-1">DOSSIER // INDEX [02]</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-[var(--color-primary)] uppercase leading-none">
              ABOUT CAMERON
            </h1>
          </div>
          <p className="font-mono text-xs text-[var(--color-theme)] mt-4 md:mt-0">
            LAT: 34.9496° N // LON: 81.9320° W
          </p>
        </div>

        {/* SECTION 1: IDENTITY CAROUSEL */}
        <div className="mb-20">
          <div className="mb-6">
            <span className="font-mono text-[10px] text-[var(--color-primary)]/40 tracking-wider block mb-1">INTERACTIVE IDENTITY PROFILES</span>
            <p className="font-sans text-lg text-[var(--color-primary)]/70">Click a profile card to display a new aspect of my strategist identity.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left part: Selection list (vertical menu structure) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {identityFacets.map((facet) => {
                const isActive = activeFacetId === facet.id;
                return (
                  <div
                    key={facet.id}
                    onClick={() => setActiveFacetId(facet.id)}
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-300 rounded-none group ${
                      isActive 
                        ? 'border-[var(--color-theme)] bg-[var(--color-panel)]' 
                        : 'border-[var(--color-primary)]/10 bg-transparent hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/[0.01]'
                    }`}
                  >
                    <div className={`p-2 transition-colors duration-300 ${
                      isActive ? 'text-[var(--color-theme)]' : 'text-[var(--color-primary)]/40 group-hover:text-[var(--color-primary)]'
                    }`}>
                      {facet.icon}
                    </div>
                    <div>
                      <span className={`font-mono text-[9px] block ${isActive ? 'text-[var(--color-theme)]' : 'text-[var(--color-primary)]/30'}`}>
                        {facet.coordinate}
                      </span>
                      <span className={`font-display font-bold text-base tracking-wider block ${
                        isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary)]/60'
                      }`}>
                        {facet.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right part: Detail Display card */}
            <div className="lg:col-span-7 border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-8 flex flex-col justify-between relative overflow-hidden hud-anchor hud-anchor-tl hud-anchor-tr hud-anchor-bl hud-anchor-br shadow-sm">
              <span className="absolute top-3 left-4 font-mono text-[9px] text-[var(--color-primary)]/30">[FACET.DOSSIER]</span>
              <span className="absolute top-3 right-4 font-mono text-[9px] text-[var(--color-theme)] font-bold">ACTIVE</span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFacetId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-7 flex flex-col justify-center">
                    <span className="font-mono text-xs text-[var(--color-theme)] tracking-widest block mb-1 font-bold">
                      {activeFacet.subtitle}
                    </span>
                    <h3 className="text-2xl font-display font-bold tracking-tight text-[var(--color-primary)] mb-4 uppercase">
                      {activeFacet.title}
                    </h3>
                    <p className="font-sans text-sm lg:text-base text-[var(--color-primary)]/85 leading-relaxed">
                      {activeFacet.description}
                    </p>
                  </div>
                  <div className="md:col-span-5 flex justify-center w-full">
                    <CapabilitiesRadar activeFacetId={activeFacetId} />
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="border-t border-[var(--color-primary)]/10 pt-6 mt-8 flex justify-between items-center">
                <span className="font-mono text-[9px] text-[var(--color-primary)]/30">SYSTEM REVISION // V4.8</span>
                <span className="font-mono text-[9px] text-[var(--color-theme)] font-bold">{activeFacet.coordinate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ACCORDION GRID DETAILS */}
        <div className="border-t border-[var(--color-primary)]/10 pt-16">
          <div className="mb-8">
            <span className="font-mono text-[10px] text-[var(--color-primary)]/40 tracking-wider block mb-1">EXPANDABLE STRUCTURAL MATRIX</span>
            <h2 className="text-2xl font-display font-bold tracking-tight text-[var(--color-primary)] uppercase">
              PHILOSOPHY, BIO & BLUEPRINT
            </h2>
          </div>

          <div className="flex flex-col border-t border-[var(--color-primary)]/10">
            {/* Accordion 1: Biography */}
            <div className="border-b border-[var(--color-primary)]/10">
              <button 
                onClick={() => toggleSection('bio')}
                data-cursor="explore"
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--color-theme)]">[01]</span>
                  <span className="font-display font-bold text-lg sm:text-xl text-[var(--color-primary)] group-hover:text-[var(--color-theme)] transition-colors">
                    BIOGRAPHY & ORIGINS
                  </span>
                </div>
                <span className="font-mono text-lg text-[var(--color-primary)]/40 group-hover:text-[var(--color-theme)]">
                  {expandedSection === 'bio' ? '—' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {expandedSection === 'bio' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-[var(--color-primary)]/80">
                      <div>
                        <p className="font-sans text-base leading-relaxed">
                          Cameron Johnson operates at the intersection of branding logic and visual architecture. Born and based in Spartanburg, South Carolina, his creative footprint is defined by a rigorous focus on research-driven design systems rather than superficial visual trends.
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-base leading-relaxed">
                          His visual work represents a delicate balance of clean geometric structures with organic, conceptual accents. Over the past several years, Cameron has focused on developing robust brand architectures, digital portfolios, and illustrative frameworks.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: Philosophy */}
            <div className="border-b border-[var(--color-primary)]/10">
              <button 
                onClick={() => toggleSection('phil')}
                data-cursor="explore"
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--color-theme)]">[02]</span>
                  <span className="font-display font-bold text-lg sm:text-xl text-[var(--color-primary)] group-hover:text-[var(--color-theme)] transition-colors">
                    BRAND PHILOSOPHY
                  </span>
                </div>
                <span className="font-mono text-lg text-[var(--color-primary)]/40 group-hover:text-[var(--color-theme)]">
                  {expandedSection === 'phil' ? '—' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {expandedSection === 'phil' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 text-[var(--color-primary)]/80 font-sans text-base leading-relaxed max-w-3xl">
                      <p className="mb-4 font-bold text-[var(--color-primary)]">
                        "Strategy comes before style."
                      </p>
                      <p className="mb-4">
                        Many design frameworks start with style. They prioritize aesthetic trends, palettes, and typography before understanding the core thesis of the brand. I reverse this equation.
                      </p>
                      <p>
                        A visual identity should be the inevitable, logical conclusion of a comprehensive strategy. The grid lines, the alignment, the choices of color—each must earn its place on the canvas. Precision, logic, and meticulous curation are the defining values.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3: Record */}
            <div className="border-b border-[var(--color-primary)]/10">
              <button 
                onClick={() => toggleSection('rec')}
                data-cursor="explore"
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--color-theme)]">[03]</span>
                  <span className="font-display font-bold text-lg sm:text-xl text-[var(--color-primary)] group-hover:text-[var(--color-theme)] transition-colors">
                    EXPERIENCE & RECORD
                  </span>
                </div>
                <span className="font-mono text-lg text-[var(--color-primary)]/40 group-hover:text-[var(--color-theme)]">
                  {expandedSection === 'rec' ? '—' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {expandedSection === 'rec' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-l border-[var(--color-theme)] pl-4">
                        <div>
                          <span className="font-mono text-xs text-[var(--color-primary)]/40 block">INTERVAL</span>
                          <span className="font-mono text-sm text-[var(--color-primary)] font-bold">2023 - PRESENT</span>
                        </div>
                        <div>
                          <span className="font-mono text-xs text-[var(--color-primary)]/40 block">ROLE</span>
                          <span className="font-sans text-sm text-[var(--color-primary)] font-bold">LEAD CREATIVE STRATEGIST</span>
                        </div>
                        <div>
                          <span className="font-mono text-xs text-[var(--color-primary)]/40 block">FOCUS</span>
                          <span className="font-sans text-sm text-[var(--color-primary)]/80">Interactive brand systems, visual campaigns, guidelines.</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-l border-[var(--color-primary)]/10 pl-4">
                        <div>
                          <span className="font-mono text-xs text-[var(--color-primary)]/40 block">INTERVAL</span>
                          <span className="font-mono text-sm text-[var(--color-primary)] font-bold">2021 - 2023</span>
                        </div>
                        <div>
                          <span className="font-mono text-xs text-[var(--color-primary)]/40 block">ROLE</span>
                          <span className="font-sans text-sm text-[var(--color-primary)] font-bold">MULTIDISCIPLINARY DESIGNER</span>
                        </div>
                        <div>
                          <span className="font-mono text-xs text-[var(--color-primary)]/40 block">FOCUS</span>
                          <span className="font-sans text-sm text-[var(--color-primary)]/80">Vector illustration, podcasts visual packaging, logo suites.</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 4: Objective */}
            <div className="border-b border-[var(--color-primary)]/10">
              <button 
                onClick={() => toggleSection('obj')}
                data-cursor="explore"
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--color-theme)]">[04]</span>
                  <span className="font-display font-bold text-lg sm:text-xl text-[var(--color-primary)] group-hover:text-[var(--color-theme)] transition-colors">
                    STRATEGIC MISSION
                  </span>
                </div>
                <span className="font-mono text-lg text-[var(--color-primary)]/40 group-hover:text-[var(--color-theme)]">
                  {expandedSection === 'obj' ? '—' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {expandedSection === 'obj' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 text-[var(--color-primary)]/80 font-sans text-base leading-relaxed max-w-3xl">
                      <p className="mb-4">
                        To construct design frameworks that resolve complex communications dilemmas. I aim to elevate visual logic, ensuring companies and creators stand on robust, intentional graphic pillars.
                      </p>
                      <p>
                        A design system is only as good as its execution. By blending Swiss typographic precision with brutalist structural grids, I provide high-integrity, memorable design systems built to perform across all modern touchpoints.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default About;
