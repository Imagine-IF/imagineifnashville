// Decorative geometric SVG art — orange→purple gradient spectrum
// All shapes are abstract, no AI slop, generated procedurally

window.IFArt = (() => {
  const { useEffect, useRef, useState, useMemo } = React;

  // ----- Hero orb: layered concentric rings + a sun rising over a horizon -----
  function HeroOrb({ variant = 'sunrise', className = '', style = {} }) {
    const id = useMemo(() => 'orb-' + Math.random().toString(36).slice(2, 8), []);
    return (
      <svg viewBox="0 0 600 600" className={className} style={style} aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-glow`} cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#ffd5b8" />
            <stop offset="35%" stopColor="#e68158" />
            <stop offset="75%" stopColor="#7958ed" />
            <stop offset="100%" stopColor="#070c70" />
          </radialGradient>
          <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e68158" />
            <stop offset="100%" stopColor="#7958ed" />
          </linearGradient>
          <filter id={`${id}-blur`}>
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* outer halo */}
        <circle cx="300" cy="300" r="280" fill={`url(#${id}-glow)`} opacity="0.18" filter={`url(#${id}-blur)`} />
        {/* concentric rings — door opening */}
        {[260, 220, 180, 140, 100, 60].map((r, i) => (
          <circle key={r} cx="300" cy="300" r={r}
            fill="none" stroke={`url(#${id}-line)`}
            strokeWidth={1 + i * 0.3}
            opacity={0.18 + i * 0.1}
            style={{ transformOrigin: '300px 300px', animation: `orbSpin ${30 + i * 6}s linear infinite ${i % 2 ? 'reverse' : ''}` }}
          />
        ))}
        {/* center sun */}
        <circle cx="300" cy="300" r="56" fill={`url(#${id}-glow)`} />
        <circle cx="300" cy="300" r="56" fill="none" stroke="#e68158" strokeWidth="1.5" opacity="0.6" />
        {/* horizon line */}
        <line x1="40" y1="380" x2="560" y2="380" stroke="#7958ed" strokeWidth="1" opacity="0.3" strokeDasharray="2 6" />
        {/* punctuation marks */}
        <g opacity="0.7">
          <circle cx="120" cy="160" r="3" fill="#e68158" />
          <circle cx="490" cy="220" r="2" fill="#b683ed" />
          <circle cx="450" cy="430" r="3" fill="#7958ed" />
          <circle cx="160" cy="450" r="2" fill="#e68158" />
        </g>
      </svg>
    );
  }

  // ----- Field: full-bleed gradient field with subtle topography -----
  function GradientField({ className = '', style = {}, intensity = 1 }) {
    const id = useMemo(() => 'fld-' + Math.random().toString(36).slice(2, 8), []);
    return (
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className={className} style={style} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#070c70" />
            <stop offset="50%" stopColor="#7958ed" />
            <stop offset="100%" stopColor="#e68158" />
          </linearGradient>
          <radialGradient id={`${id}-sun`} cx="78%" cy="35%" r="42%">
            <stop offset="0%" stopColor="#ffd5b8" stopOpacity={0.9 * intensity} />
            <stop offset="50%" stopColor="#e68158" stopOpacity={0.5 * intensity} />
            <stop offset="100%" stopColor="#e68158" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill={`url(#${id}-bg)`} />
        <rect width="1600" height="900" fill={`url(#${id}-sun)`} />
      </svg>
    );
  }

  // ----- Door: a doorway shape that "opens" - used as decorative -----
  function Door({ className = '', style = {}, open = false }) {
    const id = useMemo(() => 'dr-' + Math.random().toString(36).slice(2, 8), []);
    return (
      <svg viewBox="0 0 200 300" className={className} style={style} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e68158" />
            <stop offset="100%" stopColor="#7958ed" />
          </linearGradient>
        </defs>
        <path d="M20 280 L20 80 Q20 20, 100 20 Q180 20, 180 80 L180 280 Z"
          fill="none" stroke={`url(#${id}-g)`} strokeWidth="2" />
        <path d={open
          ? "M100 280 L100 80 Q100 40, 60 40 Q20 40, 20 80 L20 280 Z"
          : "M100 280 L100 80 Q100 20, 60 20 Q100 20, 100 80 L100 280 Z"}
          fill="url(#${id}-g)" opacity="0.15" />
      </svg>
    );
  }

  // ----- Ticker / accent shapes for section dividers -----
  function Convergence({ className = '', style = {} }) {
    return (
      <svg viewBox="0 0 800 200" className={className} style={style} aria-hidden="true">
        <defs>
          <linearGradient id="cv1" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0" stopColor="#e68158" />
            <stop offset="1" stopColor="#7958ed" />
          </linearGradient>
        </defs>
        {/* four lines converging */}
        <line x1="50" y1="20" x2="400" y2="100" stroke="url(#cv1)" strokeWidth="1.5" />
        <line x1="50" y1="180" x2="400" y2="100" stroke="url(#cv1)" strokeWidth="1.5" />
        <line x1="750" y1="20" x2="400" y2="100" stroke="url(#cv1)" strokeWidth="1.5" />
        <line x1="750" y1="180" x2="400" y2="100" stroke="url(#cv1)" strokeWidth="1.5" />
        <circle cx="400" cy="100" r="8" fill="#e68158" />
        <circle cx="400" cy="100" r="20" fill="none" stroke="#7958ed" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }

  // ----- A small geometric "spark" used inline -----
  function Spark({ size = 24, color = '#e68158', className = '', style = {} }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
        <path d="M12 1 L13.5 10.5 L23 12 L13.5 13.5 L12 23 L10.5 13.5 L1 12 L10.5 10.5 Z" fill={color} />
      </svg>
    );
  }

  // Generated speaker portrait — abstract geometric on gradient
  function SpeakerArt({ seed = 0, className = '', style = {} }) {
    const id = `sp-${seed}-${Math.random().toString(36).slice(2, 6)}`;
    const palettes = [
      ['#e68158', '#7958ed'],
      ['#7958ed', '#070c70'],
      ['#b683ed', '#e68158'],
      ['#ffc6c2', '#7958ed'],
      ['#e68158', '#070c70'],
    ];
    const [c1, c2] = palettes[seed % palettes.length];
    const cy = 110 + (seed * 17) % 60;
    return (
      <svg viewBox="0 0 220 280" className={className} style={style} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
        </defs>
        <rect width="220" height="280" fill={`url(#${id})`} />
        {/* abstract head silhouette */}
        <ellipse cx="110" cy={cy} rx="55" ry="58" fill="#fbf6f1" opacity="0.18" />
        <path d={`M40 280 Q40 200, 110 200 Q180 200, 180 280 Z`} fill="#fbf6f1" opacity="0.12" />
        {/* punctuation */}
        <circle cx="180" cy="40" r="4" fill="#fbf6f1" opacity="0.5" />
        <circle cx="40" cy="60" r="2" fill="#fbf6f1" opacity="0.6" />
      </svg>
    );
  }

  return { HeroOrb, GradientField, Door, Convergence, Spark, SpeakerArt };
})();

// CSS keyframe injection
const __ifArtStyle = document.createElement('style');
__ifArtStyle.textContent = `
@keyframes orbSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  @keyframes orbSpin { from {} to {} }
}
`;
document.head.appendChild(__ifArtStyle);
