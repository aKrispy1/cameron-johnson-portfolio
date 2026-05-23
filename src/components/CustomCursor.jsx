import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e) => {
      const isClickable = window.getComputedStyle(e.target).cursor === 'pointer' || e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button';
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <motion.div
      className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--color-primary)] pointer-events-none z-[999] items-center justify-center p-1"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 0.3 : 1,
        borderColor: isHovering ? 'var(--color-theme)' : 'var(--color-primary)',
        backgroundColor: isHovering ? 'var(--color-theme)' : 'rgba(0, 0, 0, 0)'
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    >
      <motion.div 
        className="w-1.5 h-1.5 rounded-full"
        animate={{
          backgroundColor: isHovering ? 'var(--color-theme)' : 'var(--color-primary)'
        }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
