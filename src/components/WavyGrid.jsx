import React, { useState, useEffect } from 'react';

const WavyGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to 0-1
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Map mouse interacting to subtle changes in turbulence base frequency and scale.
  const baseFreqX = 0.005 + (mousePos.x * 0.003);
  const baseFreqY = 0.005 + (mousePos.y * 0.003);
  const scale = 20 + (mousePos.x * 20);

  return (
    <div className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover pointer-events-none z-0 opacity-75 transition-opacity duration-1000">
      <svg width="100%" height="100%" style={{ position: 'absolute' }}>
        <defs>
          <filter id="wavy">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency={`${baseFreqX} ${baseFreqY}`} 
              numOctaves="2" 
              result="noise"
            >
              {/* SLOWED DOWN ANIMATION FROM 15s to 45s */}
              <animate attributeName="baseFrequency" values="0.005 0.005;0.007 0.007;0.005 0.005" dur="45s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={scale} 
              xChannelSelector="R" 
              yChannelSelector="G"
            >
               {/* SLOWED DOWN ANIMATION FROM 15s to 45s */}
               <animate attributeName="scale" values="20;30;20" dur="45s" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
          <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.08" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="50%" r="50%">
            <stop offset="30%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" filter="url(#wavy)" />
      </svg>
    </div>
  );
};

export default WavyGrid;
