import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChatBubble = () => {
  const location = useLocation();
  const isHiddenPage = location.pathname.includes('/admin') || location.pathname === '/contact';

  if (isHiddenPage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50"
    >
      <Link 
        to="/contact"
        data-cursor="explore"
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 hover:border-transparent text-white transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none backdrop-blur-md cursor-pointer overflow-visible shadow-lg"
        style={{ 
          backgroundColor: 'var(--color-theme)',
          boxShadow: '0 8px 32px color-mix(in srgb, var(--color-theme) 25%, transparent)'
        }}
      >
        {/* Pulsing online status indicator dot */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-secondary)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-secondary)] border border-white/20"></span>
        </span>

        {/* Hover expanding technical tag label */}
        <span className="absolute right-14 md:right-16 bg-white/20 backdrop-blur-md border border-white/25 text-[9px] font-mono font-bold tracking-widest uppercase text-[var(--color-primary)] px-2.5 py-1 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xs">
          [INTAKE.TERMINAL]
        </span>

        {/* HUD chat/terminal envelope icon */}
        <svg 
          className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </Link>
    </motion.div>
  );
};

export default ChatBubble;
