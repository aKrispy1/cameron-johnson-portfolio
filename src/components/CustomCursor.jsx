import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Motion values for hardware-accelerated movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring trailing effect
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

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
      {/* Outer Spring Ring */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 rounded-full border border-[var(--color-primary)] pointer-events-none z-[9999] items-center justify-center font-mono text-[9px] font-bold tracking-wider shadow-sm"
        style={{
          x: trailX,
          y: trailY,
          translateX: cursorText ? '-50%' : '-16px',
          translateY: cursorText ? '-50%' : '-16px',
          // If there's cursor text, expand to fit, otherwise default ring size
          width: cursorText ? 'auto' : '32px',
          height: cursorText ? 'auto' : '32px',
          padding: cursorText ? '6px 12px' : '0px',
          borderRadius: cursorText ? '4px' : '999px',
          borderColor: isHovering ? 'var(--color-theme)' : 'var(--color-primary)',
          backgroundColor: cursorText 
            ? 'var(--color-panel)' 
            : isHovering 
              ? 'var(--color-theme)/10' 
              : 'rgba(0,0,0,0)',
          backdropFilter: cursorText ? 'blur(4px)' : 'none',
        }}
        animate={{
          scale: cursorText ? 1.0 : isHovering ? 0.4 : 1,
        }}
        transition={{ type: 'tween', duration: 0.15 }}
      >
        {cursorText ? (
          <span className="text-[var(--color-theme)] uppercase select-none">
            [{cursorText}]
          </span>
        ) : (
          // Inner dot (only visible when not showing text)
          <motion.div 
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: isHovering ? 'var(--color-theme)' : 'var(--color-primary)'
            }}
          />
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
