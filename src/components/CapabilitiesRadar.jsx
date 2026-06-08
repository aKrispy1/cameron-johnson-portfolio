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
  const width = 360;
  const height = 300;
  const cx = width / 2;
  const cy = height / 2;
  const r = 90; // maximum radius

  const getCoordinates = (index, value) => {
    const angle = (index * (Math.PI * 2)) / ATTRIBUTES.length - Math.PI / 2;
    const factor = value / 100;
    const x = cx + Math.cos(angle) * r * factor;
    const y = cy + Math.sin(angle) * r * factor;
    return { x, y };
  };

  // Generate grid lines (polygons at 25%, 50%, 75%, 100%)
  const gridLevels = [25, 50, 75, 100];
  const gridPoints = gridLevels.map(level => {
    return ATTRIBUTES.map((_, idx) => {
      const { x, y } = getCoordinates(idx, level);
      return `${x},${y}`;
    }).join(' ');
  });

  // Calculate coordinates for active ratings to construct the SVG path
  const activePoints = ATTRIBUTES.map((attr, idx) => {
    const val = ratings[attr.key];
    const { x, y } = getCoordinates(idx, val);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  // Generate path string for Framer Motion animation (M x0 y0 L x1 y1 ... Z)
  const pathD = `M ${activePoints.map(p => p.replace(',', ' ')).join(' L ')} Z`;

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 select-none relative bg-black/5 border border-[var(--color-primary)]/5 backdrop-blur-xs font-mono text-[9px] text-[var(--color-primary)]/50">
      {/* Corner indicators */}
      <span className="absolute top-2 left-3 font-mono text-[7px] text-[var(--color-primary)]/30">[TELEMETRY_RADAR.SYS]</span>
      <span className="absolute bottom-2 right-3 font-mono text-[7px] text-[var(--color-primary)]/30">CAPABILITIES_MATRIX</span>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[320px] h-auto">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-theme)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-theme)" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* Grid Circles / Polygons */}
        {gridPoints.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1"
            opacity="0.06"
          />
        ))}

        {/* Axis lines from center to outer limit */}
        {ATTRIBUTES.map((_, idx) => {
          const outer = getCoordinates(idx, 100);
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--color-primary)"
              strokeWidth="1"
              opacity="0.06"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Axis Labels */}
        {ATTRIBUTES.map((attr, idx) => {
          const outer = getCoordinates(idx, 100);
          const val = ratings[attr.key];
          
          // Nudge labels slightly outwards to prevent overlapping
          const labelAngle = (idx * (Math.PI * 2)) / ATTRIBUTES.length - Math.PI / 2;
          const lx = cx + Math.cos(labelAngle) * (r + 20);
          const ly = cy + Math.sin(labelAngle) * (r + 12);
          
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
                opacity="0.7"
                fontSize="8"
                fontWeight="bold"
                letterSpacing="0.05em"
              >
                {attr.name}
              </text>
              <text
                x={lx}
                y={ly + 8}
                textAnchor={anchor}
                fill="var(--color-theme)"
                fontWeight="black"
                fontSize="7"
              >
                {val}%
              </text>
            </g>
          );
        })}

        {/* Shaded Area Polygon with Framer Motion path morphing */}
        <motion.path
          d={pathD}
          fill="url(#radarGlow)"
          stroke="var(--color-theme)"
          strokeWidth="2"
          opacity="0.85"
          animate={{ d: pathD }}
          transition={{ type: 'spring', damping: 20, stiffness: 120 }}
        />

        {/* Value Points (glowing circles at active coordinate intersections) */}
        {ATTRIBUTES.map((attr, idx) => {
          const val = ratings[attr.key];
          const coords = getCoordinates(idx, val);
          return (
            <motion.circle
              key={idx}
              cx={coords.x}
              cy={coords.y}
              r="3.5"
              fill="var(--color-secondary)"
              stroke="var(--color-theme)"
              strokeWidth="1.5"
              animate={{ cx: coords.x, cy: coords.y }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default CapabilitiesRadar;
