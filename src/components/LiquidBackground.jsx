import React, { useRef, useEffect } from 'react';

const LiquidBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse movement trailing
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initial blob properties
    const blobs = [
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.min(canvas.width, canvas.height) * 0.35,
        colorVar: '--color-theme',
        color: 'rgba(139, 92, 246, 0.15)', // fallback
        currentColor: { r: 139, g: 92, b: 246, a: 0.15 }
      },
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.min(canvas.width, canvas.height) * 0.4,
        colorVar: '--color-accent',
        color: 'rgba(219, 70, 239, 0.12)', // fallback
        currentColor: { r: 219, g: 70, b: 239, a: 0.12 }
      },
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.min(canvas.width, canvas.height) * 0.3,
        colorVar: '--color-secondary',
        color: 'rgba(6, 182, 212, 0.12)', // fallback
        currentColor: { r: 6, g: 182, b: 212, a: 0.12 }
      }
    ];

    // Helper to parse hex/rgba colors from CSS variables
    const getColorsFromCSS = (varName) => {
      const style = getComputedStyle(document.documentElement);
      let colorStr = style.getPropertyValue(varName).trim();
      if (!colorStr) {
        if (varName === '--color-theme') colorStr = '#8B5CF6';
        if (varName === '--color-accent') colorStr = '#D946EF';
        if (varName === '--color-secondary') colorStr = '#06B6D4';
      }
      
      // Convert hex to rgb
      if (colorStr.startsWith('#')) {
        let hex = colorStr.substring(1);
        if (hex.length === 3) {
          hex = hex.split('').map(c => c + c).join('');
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
      }
      
      // Parse rgb/rgba
      const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        return {
          r: parseInt(rgbMatch[1], 10),
          g: parseInt(rgbMatch[2], 10),
          b: parseInt(rgbMatch[3], 10)
        };
      }
      
      return null;
    };

    let time = 0;

    const animate = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate mouse coordinates
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw each blob
      blobs.forEach((blob, idx) => {
        // Read active CSS variable theme colors
        const targetColor = getColorsFromCSS(blob.colorVar);
        const isLightTheme = document.documentElement.classList.contains('light-theme') || document.body.classList.contains('light-theme');
        const targetAlpha = isLightTheme ? 0.08 : 0.12;

        if (targetColor) {
          blob.currentColor.r += (targetColor.r - blob.currentColor.r) * 0.05;
          blob.currentColor.g += (targetColor.g - blob.currentColor.g) * 0.05;
          blob.currentColor.b += (targetColor.b - blob.currentColor.b) * 0.05;
          blob.currentColor.a += (targetAlpha - blob.currentColor.a) * 0.05;
        }

        // Float organically
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Soft bounce boundaries
        const padding = 100;
        if (blob.x < -padding) { blob.x = -padding; blob.vx *= -1; }
        if (blob.x > canvas.width + padding) { blob.x = canvas.width + padding; blob.vx *= -1; }
        if (blob.y < -padding) { blob.y = -padding; blob.vy *= -1; }
        if (blob.y > canvas.height + padding) { blob.y = canvas.height + padding; blob.vy *= -1; }

        // Dynamic scale oscillation
        const sizeOscillation = Math.sin(time + idx * 10) * 40;
        const currentRadius = blob.radius + sizeOscillation;

        // Mouse warping: attract slightly towards mouse if mouse is active
        let renderX = blob.x;
        let renderY = blob.y;
        if (mouse.active) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 500) {
            const force = (500 - dist) / 500;
            renderX += dx * force * 0.15;
            renderY += dy * force * 0.15;
          }
        }

        // Create fluid radial gradient
        const gradient = ctx.createRadialGradient(
          renderX, renderY, 0,
          renderX, renderY, currentRadius
        );

        const colorRGBA = `rgba(${Math.round(blob.currentColor.r)}, ${Math.round(blob.currentColor.g)}, ${Math.round(blob.currentColor.b)}, ${blob.currentColor.a})`;
        const colorRGBAMid = `rgba(${Math.round(blob.currentColor.r)}, ${Math.round(blob.currentColor.g)}, ${Math.round(blob.currentColor.b)}, ${blob.currentColor.a * 0.4})`;
        const colorRGBAFade = `rgba(${Math.round(blob.currentColor.r)}, ${Math.round(blob.currentColor.g)}, ${Math.round(blob.currentColor.b)}, 0)`;

        gradient.addColorStop(0, colorRGBA);
        gradient.addColorStop(0.5, colorRGBAMid);
        gradient.addColorStop(1, colorRGBAFade);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(renderX, renderY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden studio-3d-bg perspective-container">
      {/* Outer edge white bevel/stroke overlay */}
      <div className="absolute inset-0 border border-white/30 pointer-events-none z-50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" />

      {/* 3D Perspective Grid Floor */}
      <div className="hud-3d-grid" />
      
      {/* Viewfinder Outer Frame Bracket Overlay */}
      <div className="absolute inset-6 pointer-events-none z-10 transition-all duration-700">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: 'color-mix(in srgb, var(--color-theme) 40%, transparent)' }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: 'color-mix(in srgb, var(--color-theme) 40%, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: 'color-mix(in srgb, var(--color-theme) 40%, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: 'color-mix(in srgb, var(--color-theme) 40%, transparent)' }} />
        
        {/* Center Target Indicator Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-20">
          <div className="absolute w-4 h-[1px]" style={{ backgroundColor: 'var(--color-primary)' }} />
          <div className="absolute h-4 w-[1px]" style={{ backgroundColor: 'var(--color-primary)' }} />
          <div className="w-1.5 h-1.5 border" style={{ borderColor: 'var(--color-primary)', borderRadius: '1px' }} />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65 transition-opacity duration-1000"
        style={{ filter: 'blur(50px)' }}
      />
    </div>
  );
};

export default LiquidBackground;
