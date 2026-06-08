import React, { useRef, useEffect } from 'react';

const WavyGridCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // We read CSS variables dynamically to match the current theme color
      const style = getComputedStyle(document.documentElement);
      const strokeColor = style.getPropertyValue('--color-primary').trim() || '#0C0C11';
      
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.06; // Soft opacity for drafting grid lines

      const gridSpacing = 70; // 70px spacing
      const steps = 8; // Step resolution in px for drawing lines
      const waveFreq = 0.004;
      const waveAmp = 12;

      // Mouse interaction config
      const mouse = mouseRef.current;
      const forceRadius = 220;
      const forceStrength = 35;

      const getDisplacement = (x, y) => {
        // Dynamic time-based sine distortion
        let dx = Math.sin(y * waveFreq + time * 0.015) * Math.cos(x * waveFreq - time * 0.01) * waveAmp;
        let dy = Math.cos(y * waveFreq + time * 0.012) * Math.sin(x * waveFreq - time * 0.018) * waveAmp;

        // Mouse warping
        if (mouse.active) {
          const mdx = x - mouse.x;
          const mdy = y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius; // 1 (at center) to 0 (at edge)
            const angle = Math.atan2(mdy, mdx);
            
            // Warp coordinates slightly away from mouse cursor
            dx += Math.cos(angle) * force * forceStrength;
            dy += Math.sin(angle) * force * forceStrength;
          }
        }

        return { x: dx, y: dy };
      };

      // Draw Vertical Lines
      const numCols = Math.ceil(canvas.width / gridSpacing) + 2;
      for (let col = -1; col < numCols; col++) {
        const baseX = col * gridSpacing;
        ctx.beginPath();
        for (let y = 0; y <= canvas.height + 20; y += steps) {
          const disp = getDisplacement(baseX, y);
          if (y === 0) {
            ctx.moveTo(baseX + disp.x, y + disp.y);
          } else {
            ctx.lineTo(baseX + disp.x, y + disp.y);
          }
        }
        ctx.stroke();
      }

      // Draw Horizontal Lines
      const numRows = Math.ceil(canvas.height / gridSpacing) + 2;
      for (let row = -1; row < numRows; row++) {
        const baseY = row * gridSpacing;
        ctx.beginPath();
        for (let x = 0; x <= canvas.width + 20; x += steps) {
          const disp = getDisplacement(x, baseY);
          if (x === 0) {
            ctx.moveTo(x + disp.x, baseY + disp.y);
          } else {
            ctx.lineTo(x + disp.x, baseY + disp.y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-75 transition-opacity duration-1000"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};

export default WavyGridCanvas;
