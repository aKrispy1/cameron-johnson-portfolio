import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Position coordinates
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Smooth springs for trailing outer glow (diffuse aura)
  const auraConfig = { damping: 40, stiffness: 200, mass: 1 };
  const auraX = useSpring(mouseX, auraConfig);
  const auraY = useSpring(mouseY, auraConfig);

  // Springs for the main inner cursor / tooltip
  const cursorConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, cursorConfig);
  const cursorY = useSpring(mouseY, cursorConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorText(target.getAttribute('data-cursor'));
        setIsHovering(true);
      } else {
        const isClickable = 
          window.getComputedStyle(e.target).cursor === 'pointer' || 
          e.target.tagName.toLowerCase() === 'a' || 
          e.target.tagName.toLowerCase() === 'button' ||
          e.target.closest('a') ||
          e.target.closest('button');
        
        setCursorText('');
        setIsHovering(isClickable);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. Large Diffuse Glow Aura (Trailing Background) */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9998] w-64 h-64 bg-[var(--color-theme)]/8 blur-[60px]"
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 2. Sharp Glass Tooltip / Main Dot Pointer */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[9999] items-center justify-center font-display text-[9px] font-bold tracking-widest shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          // Dynamic dimensions
          width: cursorText ? 'auto' : '16px',
          height: cursorText ? 'auto' : '16px',
          padding: cursorText ? '6px 14px' : '0px',
          borderRadius: cursorText ? '2px' : '2px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: cursorText 
            ? 'rgba(255, 255, 255, 0.08)' 
            : isHovering 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
        animate={{
          scale: cursorText ? 1.05 : isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'tween', duration: 0.15 }}
      >
        {cursorText ? (
          <span className="text-white uppercase select-none text-[8px] font-mono">
            {cursorText}
          </span>
        ) : (
          // Tiny internal pointer dot (square)
          <motion.div 
            className="w-1 h-1 rounded-none bg-white"
            animate={{
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isHovering ? 'var(--color-secondary)' : '#ffffff'
            }}
          />
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
