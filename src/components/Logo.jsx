import { useId } from 'react';

// ── Mojimelt original logo: a cute melting-face mascot ──────────────────────

export function LogoMark({ size = 38, className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gid = `moji${uid}`;
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Mojimelt melting emoji logo"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE45E" />
          <stop offset="1" stopColor="#FF9E3D" />
        </linearGradient>
      </defs>
      {/* melty bottom */}
      <path
        d="M12 26 C12 32 13 37 16 37 C18.5 37 18.5 33 19.5 30 C20.5 34 21.5 39 25.5 39 C29.5 39 29.5 34 30.5 30 C31.5 33 32 35.5 34.5 35.5 C37 35.5 37.5 31 37.5 26 Z"
        fill={`url(#${gid})`}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* face */}
      <circle cx="24.5" cy="19" r="13.5" fill={`url(#${gid})`} stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
      {/* shine */}
      <ellipse cx="19" cy="12.5" rx="5" ry="3" fill="rgba(255,255,255,0.55)" transform="rotate(-18 19 12.5)" />
      {/* happy eyes */}
      <g stroke="#1F2937" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M16.5 19 Q19 16.5 21.5 19" />
        <path d="M27.5 19 Q30 16.5 32.5 19" />
      </g>
      {/* smile */}
      <path d="M20 24 Q24.5 27.5 29 24" stroke="#1F2937" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* blush */}
      <ellipse cx="16" cy="23" rx="2.4" ry="1.5" fill="rgba(244,114,182,0.7)" />
      <ellipse cx="33" cy="23" rx="2.4" ry="1.5" fill="rgba(244,114,182,0.7)" />
      {/* sparkle on face */}
      <path d="M32 8.5 l1.1 2.6 2.6 1.1 -2.6 1.1 -1.1 2.6 -1.1-2.6 -2.6-1.1 2.6-1.1 Z" fill="#fff" />
      {/* fuchsia star outside */}
      <path d="M40.5 12.5 l1 2.3 2.3 1 -2.3 1 -1 2.3 -1-2.3 -2.3-1 2.3-1 Z" fill="#E879F9" />
      {/* droplet */}
      <path d="M40 33 C37.5 36.5 37 39 40 40.5 C43 39 42.5 36.5 40 33 Z" fill="#FFB347" stroke="#E8930C" strokeWidth="1.2" />
    </svg>
  );
}

export default function Logo({ markSize = 38, textClass = 'text-2xl' }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark size={markSize} className="drop-shadow-[0_4px_10px_rgba(245,158,11,0.35)] transition-transform duration-200 hover:rotate-6 hover:scale-110" />
      <span className={`font-display font-black tracking-tight text-slate-900 dark:text-white ${textClass}`}>
        Moji<span className="text-gradient">melt</span>
      </span>
    </span>
  );
}
