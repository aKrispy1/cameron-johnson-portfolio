import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CJLogo from './CJLogo';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      <nav className="w-full flex justify-between items-center py-5 px-6 lg:px-12 z-50 absolute top-0 pointer-events-auto bg-transparent">
        <Link to="/" className="flex items-center gap-4 cursor-pointer group">
          <CJLogo className="w-16 h-16 lg:w-20 lg:h-20 transition-all duration-500 group-hover:scale-105" />
          <h1 className="text-xl lg:text-2xl font-display font-bold tracking-wider hidden sm:block text-[var(--color-primary)] transition-colors duration-700">
            CAMERON JOHNSON
          </h1>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 font-sans text-lg tracking-wider font-semibold items-center uppercase text-[var(--color-primary)] transition-colors duration-700">
          <Link to="/" className="hover:text-[var(--color-theme)] transition-colors duration-300">Home</Link>
          <Link to="/works" className="hover:text-[var(--color-theme)] transition-colors duration-300">Works</Link>
          <Link to="/about" className="hover:text-[var(--color-theme)] transition-colors duration-300">About</Link>
          <Link to="/contact" className="hover:text-[var(--color-theme)] transition-colors duration-300">Contact</Link>
        </div>
        
        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden cursor-pointer focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          <div className="w-10 h-10 bg-[var(--color-panel)] flex items-center justify-center border border-[var(--color-primary)]/10 hover:border-[var(--color-theme)] transition-colors duration-300">
            <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </div>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--color-background)] z-40 flex flex-col justify-center items-center gap-8 md:hidden">
          <div className="flex flex-col items-center gap-6 font-display text-2xl font-bold tracking-widest uppercase text-[var(--color-primary)]">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[var(--color-theme)] transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/works" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[var(--color-theme)] transition-colors"
            >
              Works
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[var(--color-theme)] transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[var(--color-theme)] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
