import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CJLogo from './CJLogo';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl flex justify-between items-center py-2 px-4 lg:px-6 z-[100] glass-panel rounded-[2px] border border-white/20 shadow-[0_8px_32px_0_rgba(12,12,17,0.06)] transition-all duration-700">
        <Link 
          to="/" 
          data-cursor="explore" 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <CJLogo className="w-10 h-10 text-[var(--color-primary)] group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <h1 className="text-sm font-display font-bold tracking-wider text-[var(--color-primary)] leading-none uppercase">
              CAMERON JOHNSON
            </h1>
            <span className="font-mono text-[7px] text-[var(--color-primary)]/40 tracking-widest uppercase mt-0.5 hidden sm:block font-bold">
              CREATIVE DIRECTOR
            </span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1 items-center font-display text-xs">
          {navItems.map((item) => {
            const active = isLinkActive(item.path);
            return (
              <Link 
                key={item.path}
                to={item.path} 
                data-cursor="explore"
                className={`relative px-4 py-2 rounded-[2px] transition-all duration-300 font-bold uppercase tracking-wider ${
                  active 
                    ? 'text-[var(--color-primary)] font-bold' 
                    : 'text-[var(--color-primary)]/60 hover:text-[var(--color-primary)]'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[var(--color-primary)]/8 border border-[var(--color-primary)]/8 rounded-[2px] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden cursor-pointer focus:outline-none z-[101]"
          aria-label="Toggle menu"
          data-cursor={mobileMenuOpen ? "close" : "open"}
        >
          <div className="w-9 h-9 bg-[var(--color-primary)]/5 backdrop-blur-md flex items-center justify-center border border-[var(--color-primary)]/10 rounded-[2px] hover:border-[var(--color-primary)]/20 transition-all duration-300">
            <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </div>
        </button>
      </nav>

      {/* Mobile Drawer (Framer Motion slide-down transition) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
            className="fixed inset-0 bg-[var(--color-background)]/85 backdrop-blur-2xl z-[99] flex flex-col justify-center items-center gap-12 md:hidden"
          >
            {/* HUD details background on mobile overlay */}
            <div className="absolute top-28 left-8 font-mono text-[8px] text-[var(--color-primary)]/30 tracking-widest uppercase font-bold">
              SYS // PORTNAV
            </div>
            <div className="absolute top-28 right-8 font-mono text-[8px] text-[var(--color-primary)]/30 tracking-widest uppercase font-bold">
              LOC // 34.9496° N // 81.9320° W
            </div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {}
              }}
              className="flex flex-col items-center gap-8 font-display text-2xl font-bold tracking-widest uppercase text-[var(--color-primary)]"
            >
              {navItems.map((item) => {
                const active = isLinkActive(item.path);
                return (
                  <motion.div
                    key={item.path}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <Link 
                      to={item.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`transition-colors duration-300 font-display ${
                        active ? 'text-[var(--color-theme)] font-bold' : 'hover:text-[var(--color-theme)] text-[var(--color-primary)]/70'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Status bar for mobile drawer */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-[9px] text-[var(--color-primary)]/30 font-bold">
              <span>ACTIVE CONSOLE // PORTFOLIO_V4</span>
              <span className="h-0.5 w-24 bg-[var(--color-primary)]/10 relative overflow-hidden rounded-none">
                <span className="absolute left-0 top-0 h-full w-1/2 bg-[var(--color-secondary)] animate-[pulse_1.5s_infinite]" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
