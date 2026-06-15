import React from 'react';
import { motion } from 'framer-motion';

// Professional attributes to plot
const ATTRIBUTES = [
  { name: 'SYSTEMS DESIGN', key: 'systems' },
  { name: 'BRAND IDENTITY', key: 'branding' },
  { name: 'ART DIRECTION', key: 'art' },
  { name: 'DEV / CODE', key: 'dev' },
  { name: 'STRATEGY / CONCEPT', key: 'strategy' }
];

// Ratings out of 100 for each strategic identity facet
const FACET_RATINGS = {
  strategist: { systems: 85, branding: 75, art: 80, dev: 50, strategy: 100 },
  creator: { systems: 60, branding: 100, art: 95, dev: 45, strategy: 80 },
  systems: { systems: 100, branding: 65, art: 65, dev: 95, strategy: 80 },
  observer: { systems: 75, branding: 80, art: 85, dev: 65, strategy: 90 }
};

const CapabilitiesRadar = ({ activeFacetId }) => {
  const ratings = FACET_RATINGS[activeFacetId] || FACET_RATINGS.strategist;

  // SVG dimensions
  const width = 400;
  const height = 340;
  const cx = width / 2;
  const cy = height / 2;
  const r = 110; // maximum radius

  const getCoordinates = (index, value) => {
    const angle = (index * (Math.PI * 2)) / ATTRIBUTES.length - Math.PI / 2;
    const factor = value / 100;
    const x = cx + Math.cos(angle) * r * factor;
    const y = cy + Math.sin(angle) * r * factor;
    return { x, y };
  };

  // Grid levels (concentric rings for modern aesthetic)
  const gridLevels = [25, 50, 75, 100];

  // Calculate coordinates for active ratings
  const activePoints = ATTRIBUTES.map((attr, idx) => {
    const val = ratings[attr.key];
    return getCoordinates(idx, val);
  });

  // Closed Catmull-Rom spline path helper to create an organic rating blob
  const getSmoothClosedPath = (points) => {
    if (points.length === 0) return '';
    let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    const n = points.length;
    for (let i = 0; i < n; i++) {
      const p0 = points[(i - 1 + n) % n];
      const p1 = points[i];
      const p2 = points[(i + 1) % n];
      const p3 = points[(i + 2) % n];
      
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      
      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  const pathD = getSmoothClosedPath(activePoints);

  return (
    <div className="w-full flex flex-col items-center justify-center p-5 select-none relative bg-white/30 border border-white/40 backdrop-blur-md rounded-[2px] shadow-xs font-display text-[9px]">
      {/* Corner indicators */}
      <span className="absolute top-3 left-4 font-mono text-[7px] text-[#0C0C11]/30 tracking-widest uppercase font-bold">[METRICS.RADAR]</span>
      <span className="absolute bottom-3 right-4 font-mono text-[7px] text-[#0C0C11]/30 tracking-widest uppercase font-bold">CAPABILITY_BLOBS</span>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[340px] h-auto mt-2">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-theme)" stopOpacity="0.45" />
            <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-theme)" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* Circular Grid Rings (Concentric circles) */}
        {gridLevels.map((level, idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r={r * (level / 100)}
            fill="none"
            stroke="rgba(0, 0, 0, 0.05)"
            strokeWidth="1.2"
          />
        ))}

        {/* Axis lines (Dotted radial dividers) */}
        {ATTRIBUTES.map((_, idx) => {
          const outer = getCoordinates(idx, 100);
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(0, 0, 0, 0.05)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          );
        })}

        {/* Shaded Area Smooth Blob Path (Framer Motion morphing) */}
        <motion.path
          d={pathD}
          fill="url(#radarGlow)"
          stroke="var(--color-theme)"
          strokeWidth="2.5"
          opacity="0.8"
          animate={{ d: pathD }}
          transition={{ type: 'spring', damping: 22, stiffness: 100 }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(125, 82, 252, 0.2))' }}
        />

        {/* Value Intersection Nodes (Glowing circles) */}
        {activePoints.map((coords, idx) => {
          return (
            <motion.circle
              key={idx}
              cx={coords.x}
              cy={coords.y}
              r="4.5"
              fill="var(--color-secondary)"
              stroke="var(--color-theme)"
              strokeWidth="1.5"
              animate={{ cx: coords.x, cy: coords.y }}
              transition={{ type: 'spring', damping: 22, stiffness: 100 }}
            />
          );
        })}

        {/* Axis Labels */}
        {ATTRIBUTES.map((attr, idx) => {
          const outer = getCoordinates(idx, 100);
          const val = ratings[attr.key];
          
          const labelAngle = (idx * (Math.PI * 2)) / ATTRIBUTES.length - Math.PI / 2;
          const lx = cx + Math.cos(labelAngle) * (r + 24);
          const ly = cy + Math.sin(labelAngle) * (r + 15);
          
          let anchor = 'middle';
          if (Math.cos(labelAngle) > 0.1) anchor = 'start';
          if (Math.cos(labelAngle) < -0.1) anchor = 'end';

          return (
            <g key={idx}>
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                fill="var(--color-primary)"
                opacity="0.8"
                fontSize="7.5"
                fontWeight="bold"
                letterSpacing="0.05em"
                className="font-display font-bold"
              >
                {attr.name}
              </text>
              <text
                x={lx}
                y={ly + 9}
                textAnchor={anchor}
                fill="var(--color-theme)"
                fontWeight="bold"
                fontSize="7"
              >
                {val}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CapabilitiesRadar;
