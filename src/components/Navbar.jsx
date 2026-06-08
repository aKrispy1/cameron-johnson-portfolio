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

  // Check if link is active
  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-3.5 px-6 lg:px-12 z-[100] bg-[var(--color-background)]/20 backdrop-blur-md border-b border-[var(--color-primary)]/5 transition-all duration-700">
        <Link 
          to="/" 
          data-cursor="explore" 
          className="flex items-center gap-3.5 cursor-pointer group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <CJLogo className="w-12 h-12 lg:w-14 lg:h-14 transition-all duration-500 group-hover:scale-105" />
          <div className="flex flex-col">
            <h1 className="text-base lg:text-lg font-display font-bold tracking-widest text-[var(--color-primary)] transition-colors duration-700 leading-none">
              CAMERON JOHNSON
            </h1>
            <span className="font-mono text-[8px] text-[var(--color-primary)]/40 tracking-wider uppercase mt-1 hidden sm:block">
              SYS // DOSSIER_V4.8 // SPARTANBURG, SC
            </span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 font-mono text-xs items-center uppercase tracking-widest text-[var(--color-primary)] transition-colors duration-700">
          {navItems.map((item) => {
            const active = isLinkActive(item.path);
            return (
              <Link 
                key={item.path}
                to={item.path} 
                data-cursor="explore"
                className={`px-4 py-2 border transition-all duration-300 rounded-none relative group overflow-hidden ${
                  active 
                    ? 'border-[var(--color-theme)] bg-[var(--color-theme)]/5 text-[var(--color-primary)] font-bold' 
                    : 'border-transparent text-[var(--color-primary)]/60 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/[0.02]'
                }`}
              >
                {active ? `[ ${item.name} ]` : item.name}
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
          <div className="w-10 h-10 bg-[var(--color-panel)]/80 backdrop-blur-md flex items-center justify-center border border-[var(--color-primary)]/10 hover:border-[var(--color-theme)] transition-colors duration-300">
            <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
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
            className="fixed inset-0 bg-[var(--color-background)]/95 backdrop-blur-xl z-[99] flex flex-col justify-center items-center gap-12 md:hidden"
          >
            {/* Tech details background on mobile overlay */}
            <div className="absolute top-[104px] left-6 font-mono text-[9px] text-[var(--color-primary)]/30">
              SYS // INTERACTIVE_PORTFOLIO_NAV
            </div>
            <div className="absolute top-[104px] right-6 font-mono text-[9px] text-[var(--color-primary)]/30">
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
              {navItems.map((item, idx) => {
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
                        active ? 'text-[var(--color-theme)] font-black' : 'hover:text-[var(--color-theme)] text-[var(--color-primary)]/75'
                      }`}
                    >
                      {active ? `[ ${item.name} ]` : item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Status bar for mobile drawer */}
            <div className="absolute bottom-10 flex flex-col items-center gap-1.5 font-mono text-[9px] text-[var(--color-primary)]/40">
              <span>ACTIVE SYSTEM CONSOLE // PORTFOLIO_V4</span>
              <span className="h-1 w-24 bg-[var(--color-theme)]/20 relative overflow-hidden">
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
