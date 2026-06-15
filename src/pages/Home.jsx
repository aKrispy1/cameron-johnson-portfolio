import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import LiquidBackground from '../components/LiquidBackground';
import CJLogo from '../components/CJLogo';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayCount, setDisplayCount] = useState('00000');
  const [actualCount, setActualCount] = useState(0);

  // Visitor counter scrambling effect
  useEffect(() => {
    const visitKey = 'camjcreative_visits';
    let count = 12408; // Base starting number
    const stored = localStorage.getItem(visitKey);
    if (stored) {
      count = parseInt(stored, 10) + 1;
    } else {
      count = 12408 + Math.floor(Math.random() * 50);
    }
    localStorage.setItem(visitKey, count);
    setActualCount(count);

    // Scramble effect
    let duration = 1000;
    let intervalTime = 50;
    let iterations = duration / intervalTime;
    let currentIteration = 0;

    const interval = setInterval(() => {
      if (currentIteration >= iterations) {
        clearInterval(interval);
        setDisplayCount(String(count).padStart(5, '0'));
      } else {
        const scrambled = Array.from({ length: String(count).length }, () => 
          Math.floor(Math.random() * 10)
        ).join('');
        setDisplayCount(scrambled);
        currentIteration++;
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Loading animation progress
  useEffect(() => {
    if (!loading) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setLoading(false);
          }, 600);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [loading]);

  // Sync theme variables for home page
  useEffect(() => {
    document.documentElement.classList.remove('light-theme');
    document.body.classList.remove('light-theme');
    
    document.documentElement.style.setProperty('--color-theme', '#7D52FC'); // Slate Blue
    document.documentElement.style.setProperty('--color-accent', '#C380FF'); // Lavender
    document.documentElement.style.setProperty('--color-secondary', '#BCEF0C'); // Lime
    document.documentElement.style.setProperty('--color-background', '#CCCCCC'); // Light Gray
    document.documentElement.style.setProperty('--color-primary', '#0C0C11'); // Charcoal
    document.documentElement.style.setProperty('--color-panel', 'rgba(255, 255, 255, 0.45)');
    document.documentElement.style.setProperty('--color-details', 'rgba(255, 255, 255, 0.65)');
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-screen flex flex-col relative z-10 bg-[#CCCCCC] overflow-hidden select-none"
    >
      <LiquidBackground />

      <AnimatePresence mode="wait">
        {loading ? (
          /* Technical HUD Startup Loading Screen */
          <motion.div
            key="loader"
            className="fixed inset-0 w-full h-full bg-[#CCCCCC] flex flex-col items-center justify-center z-[1000] p-6 overflow-hidden"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* Viewfinder Outer Frame Bracket Overlay for Loader */}
            <div className="absolute inset-6 border pointer-events-none z-10 transition-all duration-700"
              style={{ borderColor: 'rgba(12, 12, 17, 0.05)' }}>
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: 'rgba(12, 12, 17, 0.2)' }} />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: 'rgba(12, 12, 17, 0.2)' }} />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: 'rgba(12, 12, 17, 0.2)' }} />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: 'rgba(12, 12, 17, 0.2)' }} />
            </div>

            {/* Scanning Sweep Laser Line */}
            <div className="hud-scanner-line" />

            <div className="flex flex-col items-center justify-center relative">
              {/* Glowing Background Glow Aura */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute w-48 h-48 rounded-full bg-[#7D52FC]/10 blur-3xl"
              />

              {/* Loader Ring & Logo Container */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Glowing ring */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90 z-10" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="rgba(0, 0, 0, 0.05)"
                    strokeWidth="2"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="url(#loaderGrad)"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray="264"
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * progress) / 100 }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                  />
                  <defs>
                    <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7D52FC" />
                      <stop offset="100%" stopColor="#C380FF" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Vector Logo - Centered perfectly inside the circle */}
                <div className="z-20 flex items-center justify-center w-10 h-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <CJLogo className="w-10 h-10 text-[#0C0C11]" />
                  </motion.div>
                </div>
              </div>

              {/* Small Progress Percentage with changing states */}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="font-mono text-[10px] tracking-[0.2em] text-[#0C0C11]/50 mt-6 block uppercase font-bold text-center"
              >
                {progress <= 30 && `SYS.BOOT // SCANNING GRID // ${progress}%`}
                {progress > 30 && progress <= 70 && `SECURING UPLINK // CALIBRATING TARGETS // ${progress}%`}
                {progress > 70 && progress < 100 && `CACHE.LOAD // INGESTING DOSSIERS // ${progress}%`}
                {progress === 100 && `BOOT.SUCCESS // HUD_READY // ${progress}%`}
              </motion.span>
            </div>

            {/* Technical Log Readouts */}
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-[9px] text-[#0C0C11]/50 gap-4 uppercase font-bold">
              <div className="flex flex-col gap-1.5">
                <div className={progress >= 10 ? "text-[#7D52FC] transition-colors duration-300" : "opacity-40 transition-opacity duration-300"}>
                  &gt; SYS.BOOT // INITIALIZING CORE SYSTEM {progress >= 30 ? "[OK]" : "..."}
                </div>
                <div className={progress >= 30 ? "text-[#7D52FC] transition-colors duration-300" : "opacity-40 transition-opacity duration-300"}>
                  &gt; GRID.SCAN // 3D CYCLORAMA GENERATION {progress >= 55 ? "[OK]" : "..."}
                </div>
                <div className={progress >= 55 ? "text-[#7D52FC] transition-colors duration-300" : "opacity-40 transition-opacity duration-300"}>
                  &gt; UPLINK.SECURE // ESTABLISHING BRAND SAFE ZONE {progress >= 85 ? "[OK]" : "..."}
                </div>
                <div className={progress >= 85 ? "text-[#7D52FC] transition-colors duration-300" : "opacity-40 transition-opacity duration-300"}>
                  &gt; CACHE.LOAD // INGESTING PORTFOLIO DOSSIERS {progress >= 100 ? "[OK]" : "..."}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 self-end md:self-auto">
                <div>CPU.TEMP // 42°C</div>
                <div>RESOLVE // {typeof window !== 'undefined' ? `${window.innerWidth}X${window.innerHeight}` : '1920X1080'}</div>
                <div className="text-[var(--color-secondary)]">SYS.STATUS // CALIBRATING</div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Clean Revealed Glassmorphic HUD Homepage */
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full flex flex-col items-center justify-center p-6 relative z-10"
          >
            {/* Center Brand Identity block (No floating card container, typography floats directly on backdrop) */}
            <div className="max-w-3xl w-full flex flex-col items-center text-center relative px-6 py-12">
              
              {/* Corner indicators for HUD feel */}
              <span className="absolute top-4 left-4 font-mono text-[7px] text-[#0C0C11]/30 font-bold">[SYS.MATRIX]</span>
              <span className="absolute top-4 right-4 font-mono text-[7px] text-[#0C0C11]/30 font-bold">V4.8_ACTIVE</span>
              <span className="absolute bottom-4 left-4 font-mono text-[7px] text-[#0C0C11]/30 font-bold">+</span>
              <span className="absolute bottom-4 right-4 font-mono text-[7px] text-[#0C0C11]/30 font-bold">+</span>

              <span className="font-mono text-[10px] tracking-[0.3em] text-[#7D52FC] uppercase mb-4 block font-bold">
                STRATEGY COMES BEFORE STYLE
              </span>
              
              <motion.h2 
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-7xl lg:text-[76px] font-display font-bold leading-none uppercase tracking-tight text-[#0C0C11] flex flex-wrap justify-center gap-x-[0.2em]"
              >
                <span className="flex">
                  {"CAMERON".split("").map((char, index) => (
                    <motion.span 
                      key={index} 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } }
                      }} 
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="flex">
                  {"JOHNSON".split("").map((char, index) => (
                    <motion.span 
                      key={index} 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } }
                      }} 
                      className="inline-block text-[var(--color-theme)]"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h2>
              
              {/* Thin Slate Blue Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 0.6, duration: 1.0, ease: 'easeOut' }}
                className="h-[1.5px] bg-[var(--color-theme)]/20 mt-6 mb-6"
              />

              <p className="font-sans text-sm md:text-base text-[#0C0C11]/70 max-w-lg leading-relaxed font-medium">
                A multidisciplinary creative director structuring high-fidelity interactive design systems, brand guidelines, and visual architectures.
              </p>

              {/* Call to Action Button - Solid slate blue background */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8"
              >
                <RouterLink
                  to="/works"
                  data-cursor="explore"
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#7D52FC] hover:bg-[#C380FF] text-[#FAF9FC] font-display text-xs uppercase tracking-[0.2em] font-bold rounded-[2px] border border-white/20 shadow-[0_4px_16px_rgba(125,82,252,0.25)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>ENTER WORKSTATION</span>
                  <span className="text-sm">→</span>
                </RouterLink>
              </motion.div>
            </div>

            {/* Bottom Row: Areas of Work rectangular panels (styled as dark glass for dark gradient background) */}
            <div className="absolute bottom-16 left-0 right-0 flex flex-wrap justify-center gap-3 px-6 lg:gap-4 z-20">
              {[
                { num: '01', title: 'Systems Design' },
                { num: '02', title: 'Brand Identity' },
                { num: '03', title: 'Interactive Strategy' },
                { num: '04', title: 'AI Curation' },
              ].map((item, idx) => (
                <RouterLink
                  key={idx}
                  to="/works"
                  data-cursor="view"
                  className="bg-[#14141C]/45 hover:bg-[#14141C]/65 backdrop-blur-md flex items-center overflow-hidden hover:scale-105 transition-all duration-300 rounded-[2px] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.15)] group"
                >
                  <span className="bg-white/5 text-[#BCEF0C] px-3 py-1.5 font-mono text-[10px] font-bold border-r border-white/10">
                    {item.num}
                  </span>
                  <span className="px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#FAF9FC] group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </RouterLink>
              ))}
            </div>

            {/* Bottom Left status indicator (light color for dark gradient background) */}
            <div className="absolute bottom-6 left-8 flex items-center gap-2 font-mono text-[10px] text-[#FAF9FC]/40 font-bold">
              <span>SYSTEMS ONLINE //</span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[#BCEF0C] opacity-75"></span>
                <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-[#BCEF0C]"></span>
              </span>
            </div>

            {/* Bottom Right visit counter (light color for dark gradient background) */}
            <div className="absolute bottom-6 right-8 flex items-center gap-2 font-mono text-[10px] text-[#FAF9FC]/40 font-bold">
              <span>TOTAL.VISITS //</span>
              <span className="text-[#BCEF0C] font-bold tracking-wider">{displayCount}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default Home;
