import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import WavyGrid from '../components/WavyGrid';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bootLogs, setBootLogs] = useState([]);

  // Boot loader sequence to feel like loading into a game experience
  useEffect(() => {
    if (!loading) return;

    const logs = [
      'SYS_INIT: LAUNCHING SYSTEM UTILITIES...',
      'CORE: ATTACHING BRAND MATRIX V4.1...',
      'MODULES: INJECTING CAPABILITIES...',
      'GRID: DETECTED (80x80px) // ALIGNING VERTICES...',
      'STATUS: SYSTEM RENDER ONLINE.',
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLogs((prev) => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 350);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setLoading(false);
          }, 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [loading]);

  // Sync theme variables for home page
  useEffect(() => {
    document.documentElement.style.setProperty('--color-theme', '#7D52FC');
    document.documentElement.style.setProperty('--color-secondary', '#BCEF0C');
    document.documentElement.style.setProperty('--color-background', '#CCCCCC');
    document.documentElement.style.setProperty('--color-primary', '#0C0C11');
    document.documentElement.style.setProperty('--color-panel', '#FAF9FC');
    document.documentElement.style.setProperty('--color-details', '#CCCCCC');
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen flex flex-col relative z-10 bg-[var(--color-background)] lg:overflow-hidden overflow-y-auto"
    >
      <div className="ebbing-gradient" />
      <WavyGrid />

      <AnimatePresence mode="wait">
        {loading ? (
          /* Game-like Boot Loading Experience Screen */
          <motion.div
            key="loader"
            className="fixed inset-0 w-full h-full bg-[#CCCCCC] flex flex-col justify-between p-8 z-[1000] font-mono text-xs select-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Top Info Grid */}
            <div className="flex justify-between items-start text-[var(--color-primary)]/50 tracking-wider">
              <div className="flex flex-col gap-1">
                <span>[INITIALIZATION_SEQUENCE_V4]</span>
                <span>[HOST: PORTFOLIO_CORE]</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span>LOC: 34.9496° N, 81.9320° W</span>
                <span>SYS_STATUS: INJECTING</span>
              </div>
            </div>

            {/* Center Loading progress bar */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <h3 className="font-display font-bold text-lg text-[var(--color-primary)] uppercase tracking-widest">
                LAUNCHING SYSTEM... {progress}%
              </h3>
              <div className="w-64 h-1.5 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 relative overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--color-theme)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.08 }}
                />
              </div>
            </div>

            {/* Scrolling boot logs at bottom */}
            <div className="h-28 overflow-hidden text-[var(--color-primary)]/40 leading-relaxed font-mono text-[10px] flex flex-col justify-end">
              {bootLogs.map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  &gt;_ {log}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Clean, Simplistic Revealed Experience */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-col items-center justify-center p-6 relative"
          >
            {/* Center Brand Identity block */}
            <div className="flex flex-col items-center text-center mt-[40px] lg:mt-0">
              <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-primary)]/40 uppercase mb-3">
                CREATIVE STRATEGIST
              </span>
              
              <h2 className="text-5xl md:text-7xl lg:text-[84px] font-display font-bold leading-none uppercase tracking-tighter text-[var(--color-primary)]">
                C<span style={{ paddingLeft: '0.08em' }}>AMERON</span> JOHNSON
              </h2>
              
              {/* Thick Expanding Theme Underline Block */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                className="w-full max-w-2xl h-[5px] bg-[var(--color-theme)] mt-2"
              />

              {/* Call to Action to Works Page */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12"
              >
                <Link
                  to="/works"
                  className="inline-flex items-center gap-4 px-8 py-3 bg-[var(--color-theme)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] text-white font-mono text-xs uppercase tracking-[0.25em] font-bold border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/20 transition-all duration-300 rounded-sm shadow-sm cursor-pointer group"
                >
                  <span>[ EXPLORE WORKS SYSTEM ]</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </motion.div>
            </div>

            {/* Bottom Row: Areas of Work rectangular panels */}
            <div className="absolute bottom-16 left-0 right-0 flex flex-wrap justify-center gap-3 px-6 lg:gap-4">
              {[
                { num: '01', title: 'Systems Design' },
                { num: '02', title: 'Brand Identity' },
                { num: '03', title: 'Interactive Strategy' },
                { num: '04', title: 'AI Curation' },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to="/works"
                  className="flex items-center border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-mono text-xs overflow-hidden rounded-xs hover:border-[var(--color-theme)] hover:bg-[var(--color-primary)]/15 transition-all duration-300 cursor-pointer group"
                >
                  <span className="bg-[var(--color-secondary)] text-[var(--color-primary)] px-2.5 py-1.5 font-bold border-r border-[var(--color-primary)]/40 group-hover:bg-[var(--color-theme)] group-hover:text-white transition-colors duration-300">
                    {item.num}
                  </span>
                  <span className="px-3.5 py-1.5 font-bold uppercase tracking-wider text-[var(--color-primary)]/90">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* Bottom Left status indicator */}
            <div className="absolute bottom-6 left-8 flex items-center gap-2 font-mono text-[10px] text-[var(--color-primary)]/50">
              <span>ACTIVE //</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-secondary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-secondary)]"></span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default Home;
