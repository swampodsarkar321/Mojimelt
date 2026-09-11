import { useId } from 'react';

// ── Mojimelt original layered artwork engine ────────────────────────────────
// 100% original vector art: a parametric face renderer. `spec` comes from
// data/combinationRules.js or the generative fallback in utils/mixer.js:
//   { base, eyes, mouth, extras:[], effects:[] }

const BASES = {
  yellow: ['#FFE45E', '#FFB703'],
  blend: ['#FFDE59', '#FF9E3D'],
  orange: ['#FFC46B', '#F4842B'],
  red: ['#FF8A7A', '#E5484D'],
  lava: ['#FFB347', '#E5484D'],
  pink: ['#FFC2DD', '#F472A6'],
  purple: ['#C4B5FD', '#7C3AED'],
  lavender: ['#DDD6FE', '#A78BFA'],
  blue: ['#A5D8FF', '#3B82F6'],
  cyan: ['#A5F3FC', '#06B6D4'],
  ice: ['#E0F7FF', '#7DD3FC'],
  green: ['#BBF7D0', '#22C55E'],
  alien: ['#B5F3B0', '#34D399'],
  gold: ['#FDE68A', '#F59E0B'],
  brown: ['#E7C39B', '#A16207'],
  pale: ['#FFF7ED', '#FDBA74'],
  ghost: ['#FFFFFF', '#CBD5E1'],
  bone: ['#FFFFFF', '#D6D3D1'],
  robot: ['#E2E8F0', '#94A3B8'],
  panda: ['#FFFFFF', '#CBD5E1'],
  poop: ['#D9A066', '#8B5A2B'],
  midnight: ['#4C1D95', '#1E1B4B'],
  donut: ['#FBD38D', '#F6AD55'],
  'split-angel-devil': ['#FFE45E', '#8B5CF6'],
};

function baseColors(base) {
  return BASES[base] || BASES.yellow;
}

function FaceShape({ base, gid }) {
  const common = { fill: `url(#${gid})`, stroke: 'rgba(0,0,0,0.12)', strokeWidth: 3 };
  switch (base) {
    case 'alien':
      return <ellipse cx="120" cy="128" rx="78" ry="88" {...common} />;
    case 'robot':
      return <rect x="48" y="52" width="144" height="150" rx="42" {...common} />;
    case 'ghost':
      return (
        <path
          d="M48 210 V130 C48 80 82 48 120 48 C158 48 192 80 192 130 V210 L176 198 L160 210 L144 198 L128 210 L112 198 L96 210 L80 198 L64 210 Z"
          {...common}
        />
      );
    case 'poop':
      return (
        <path
          d="M120 44 C108 44 112 60 100 66 C86 73 80 86 88 94 C74 98 66 110 72 122 C60 130 58 148 70 158 C52 170 60 196 88 202 C100 210 140 210 152 202 C180 196 188 170 170 158 C182 148 180 130 168 122 C174 110 166 98 152 94 C160 86 154 73 140 66 C128 60 132 44 120 44 Z"
          {...common}
        />
      );
    case 'panda':
      return (
        <g>
          <circle cx="62" cy="70" r="24" fill="#1F2937" />
          <circle cx="178" cy="70" r="24" fill="#1F2937" />
          <circle cx="62" cy="70" r="11" fill="#374151" />
          <circle cx="178" cy="70" r="11" fill="#374151" />
          <circle cx="120" cy="130" r="80" {...common} fill="#FFFFFF" />
        </g>
      );
    default:
      return <circle cx="120" cy="130" r="80" {...common} />;
  }
}

function Eyes({ kind }) {
  const ink = '#1F2937';
  switch (kind) {
    case 'laughing':
      return (
        <g stroke={ink} strokeWidth="7" strokeLinecap="round" fill="none">
          <path d="M72 118 Q86 104 100 118" />
          <path d="M140 118 Q154 104 168 118" />
        </g>
      );
    case 'happy':
      return (
        <g fill={ink}>
          <ellipse cx="88" cy="118" rx="9" ry="12" />
          <ellipse cx="152" cy="118" rx="9" ry="12" />
          <circle cx="91" cy="114" r="3" fill="#fff" />
          <circle cx="155" cy="114" r="3" fill="#fff" />
        </g>
      );
    case 'devil':
      return (
        <g>
          <path d="M70 100 L106 116 L70 126 Z" fill={ink} />
          <path d="M170 100 L134 116 L170 126 Z" fill={ink} />
          <circle cx="90" cy="118" r="3.5" fill="#F87171" />
          <circle cx="150" cy="118" r="3.5" fill="#F87171" />
        </g>
      );
    case 'cool':
      return null; // shades drawn as extra
    case 'crying':
      return (
        <g>
          <path d="M72 112 Q88 104 102 114" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M138 114 Q152 104 168 112" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="88" cy="126" rx="6" ry="8" fill={ink} />
          <ellipse cx="152" cy="126" rx="6" ry="8" fill={ink} />
        </g>
      );
    case 'cold':
      return (
        <g fill="#0C4A6E">
          <circle cx="88" cy="118" r="8" />
          <circle cx="152" cy="118" r="8" />
          <circle cx="88" cy="118" r="3" fill="#E0F2FE" />
          <circle cx="152" cy="118" r="3" fill="#E0F2FE" />
        </g>
      );
    case 'tired':
    case 'sleepy':
      return (
        <g stroke={ink} strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M74 120 Q88 128 102 120" />
          <path d="M138 120 Q152 128 166 120" />
        </g>
      );
    case 'surprised':
      return (
        <g fill="#fff" stroke={ink} strokeWidth="4">
          <circle cx="88" cy="116" r="14" />
          <circle cx="152" cy="116" r="14" />
          <circle cx="88" cy="118" r="5" fill={ink} stroke="none" />
          <circle cx="152" cy="118" r="5" fill={ink} stroke="none" />
        </g>
      );
    case 'starry':
      return (
        <g fill="#B45309">
          <path d="M88 104 l3.5 7 7 3.5 -7 3.5 -3.5 7 -3.5-7 -7-3.5 7-3.5 Z" />
          <path d="M152 104 l3.5 7 7 3.5 -7 3.5 -3.5 7 -3.5-7 -7-3.5 7-3.5 Z" />
        </g>
      );
    case 'hearts':
      return (
        <g fill="#E11D48">
          <path d="M88 124 c-8-7-13-11-13-16 0-4 3-7 7-7 3 0 5 2 6 4 1-2 3-4 6-4 4 0 7 3 7 7 0 5-5 9-13 16Z" />
          <path d="M152 124 c-8-7-13-11-13-16 0-4 3-7 7-7 3 0 5 2 6 4 1-2 3-4 6-4 4 0 7 3 7 7 0 5-5 9-13 16Z" />
        </g>
      );
    case 'angry':
      return (
        <g>
          <path d="M68 100 L104 112" stroke={ink} strokeWidth="7" strokeLinecap="round" />
          <path d="M172 100 L136 112" stroke={ink} strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="90" cy="126" rx="7" ry="9" fill={ink} />
          <ellipse cx="150" cy="126" rx="7" ry="9" fill={ink} />
        </g>
      );
    case 'robot':
      return (
        <g>
          <rect x="70" y="104" width="34" height="24" rx="12" fill="#0EA5E9" stroke="#0C4A6E" strokeWidth="4" />
          <rect x="136" y="104" width="34" height="24" rx="12" fill="#0EA5E9" stroke="#0C4A6E" strokeWidth="4" />
          <circle cx="87" cy="116" r="4" fill="#fff" />
          <circle cx="153" cy="116" r="4" fill="#fff" />
        </g>
      );
    case 'alien':
      return (
        <g fill="#052E16">
          <ellipse cx="86" cy="116" rx="14" ry="22" transform="rotate(-18 86 116)" />
          <ellipse cx="154" cy="116" rx="14" ry="22" transform="rotate(18 154 116)" />
          <circle cx="90" cy="108" r="4" fill="#BBF7D0" />
          <circle cx="150" cy="108" r="4" fill="#BBF7D0" />
        </g>
      );
    case 'skull':
      return (
        <g fill="#111827">
          <circle cx="88" cy="118" r="15" />
          <circle cx="152" cy="118" r="15" />
          <circle cx="88" cy="118" r="5" fill="#EF4444" />
          <circle cx="152" cy="118" r="5" fill="#EF4444" />
        </g>
      );
    case 'frog':
      return (
        <g>
          <circle cx="88" cy="112" r="17" fill="#fff" stroke="#14532D" strokeWidth="4" />
          <circle cx="152" cy="112" r="17" fill="#fff" stroke="#14532D" strokeWidth="4" />
          <circle cx="88" cy="114" r="7" fill="#111827" />
          <circle cx="152" cy="114" r="7" fill="#111827" />
          <circle cx="90" cy="111" r="2.5" fill="#fff" />
          <circle cx="154" cy="111" r="2.5" fill="#fff" />
        </g>
      );
    case 'fiery':
      return (
        <g fill="#7F1D1D">
          <path d="M70 108 Q88 96 104 110 L96 124 Q88 130 78 124 Z" />
          <path d="M170 108 Q152 96 136 110 L144 124 Q152 130 162 124 Z" />
          <circle cx="89" cy="118" r="4" fill="#FBBF24" />
          <circle cx="151" cy="118" r="4" fill="#FBBF24" />
        </g>
      );
    case 'rolling':
      return (
        <g fill="#fff" stroke={ink} strokeWidth="4">
          <circle cx="88" cy="116" r="13" />
          <circle cx="152" cy="116" r="13" />
          <circle cx="88" cy="109" r="4.5" fill={ink} stroke="none" />
          <circle cx="152" cy="109" r="4.5" fill={ink} stroke="none" />
        </g>
      );
    case 'pleading':
      return (
        <g>
          <circle cx="88" cy="118" r="15" fill="#fff" stroke={ink} strokeWidth="4" />
          <circle cx="152" cy="118" r="15" fill="#fff" stroke={ink} strokeWidth="4" />
          <circle cx="88" cy="121" r="7" fill="#7C3AED" />
          <circle cx="152" cy="121" r="7" fill="#7C3AED" />
          <circle cx="88" cy="119" r="2.5" fill="#fff" />
          <circle cx="152" cy="119" r="2.5" fill="#fff" />
        </g>
      );
    case 'wink':
      return (
        <g>
          <ellipse cx="88" cy="118" rx="9" ry="12" fill={ink} />
          <path d="M138 118 Q152 110 166 118" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'mischievous':
      return (
        <g fill={ink}>
          <ellipse cx="88" cy="118" rx="9" ry="11" />
          <path d="M138 112 Q152 116 165 108" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'monocle':
      return (
        <g>
          <ellipse cx="84" cy="118" rx="8" ry="10" fill={ink} />
          <circle cx="152" cy="118" r="16" fill="rgba(186,230,253,0.55)" stroke={ink} strokeWidth="4" />
          <circle cx="152" cy="118" r="5" fill={ink} />
        </g>
      );
    case 'panda':
      return (
        <g fill="#111827">
          <ellipse cx="88" cy="118" rx="13" ry="16" transform="rotate(-12 88 118)" />
          <ellipse cx="152" cy="118" rx="13" ry="16" transform="rotate(12 152 118)" />
          <circle cx="90" cy="115" r="3.5" fill="#fff" />
          <circle cx="150" cy="115" r="3.5" fill="#fff" />
        </g>
      );
    case 'sparkle-royal':
      return (
        <g fill="#78350A">
          <ellipse cx="88" cy="118" rx="9" ry="12" />
          <ellipse cx="152" cy="118" rx="9" ry="12" />
          <path d="M64 96 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5-5 -5-2.5 5-2.5 Z" fill="#FBBF24" />
          <path d="M176 96 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5-5 -5-2.5 5-2.5 Z" fill="#FBBF24" />
        </g>
      );
    case 'third-eye-big':
      return (
        <g>
          <ellipse cx="88" cy="120" rx="9" ry="11" fill={ink} />
          <ellipse cx="152" cy="120" rx="9" ry="11" fill={ink} />
          <ellipse cx="120" cy="88" rx="11" ry="13" fill="#fff" stroke={ink} strokeWidth="3.5" />
          <circle cx="120" cy="90" r="5" fill="#7C3AED" />
        </g>
      );
    default:
      return (
        <g fill={ink}>
          <ellipse cx="88" cy="118" rx="9" ry="12" />
          <ellipse cx="152" cy="118" rx="9" ry="12" />
        </g>
      );
  }
}

function Mouth({ kind }) {
  const ink = '#1F2937';
  switch (kind) {
    case 'laugh-open':
      return (
        <g>
          <ellipse cx="120" cy="164" rx="26" ry="22" fill="#7F1D1D" stroke={ink} strokeWidth="4" />
          <ellipse cx="120" cy="174" rx="14" ry="9" fill="#F87171" />
          <rect x="100" y="150" width="40" height="9" rx="4.5" fill="#fff" />
        </g>
      );
    case 'grin':
      return (
        <g>
          <path d="M92 156 Q120 178 148 156 Q120 166 92 156Z" fill="#fff" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
          <path d="M92 156 Q120 178 148 156" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case 'smile':
      return <path d="M94 154 Q120 174 146 154" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />;
    case 'smirk':
      return <path d="M100 158 Q128 172 148 150" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />;
    case 'royal-smile':
      return (
        <g>
          <path d="M94 154 Q120 174 146 154" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M112 165 l8 6 8-6" stroke="#B45309" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'cry-open':
      return (
        <g>
          <ellipse cx="120" cy="168" rx="18" ry="20" fill="#7F1D1D" stroke={ink} strokeWidth="4" />
          <ellipse cx="120" cy="176" rx="9" ry="6" fill="#F87171" />
        </g>
      );
    case 'frown':
      return <path d="M96 168 Q120 152 144 168" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />;
    case 'flat':
      return <line x1="102" y1="162" x2="138" y2="162" stroke={ink} strokeWidth="6" strokeLinecap="round" />;
    case 'small':
      return <ellipse cx="120" cy="162" rx="8" ry="10" fill={ink} />;
    case 'amazed':
      return <ellipse cx="120" cy="164" rx="13" ry="16" fill={ink} />;
    case 'sleep':
      return <ellipse cx="132" cy="164" rx="10" ry="12" fill="none" stroke={ink} strokeWidth="5" />;
    case 'panting':
      return (
        <g>
          <ellipse cx="120" cy="164" rx="16" ry="14" fill="#7F1D1D" stroke={ink} strokeWidth="4" />
          <ellipse cx="120" cy="166" rx="8" ry="10" fill="#FCA5A5" />
        </g>
      );
    case 'robot':
      return (
        <g>
          <rect x="98" y="156" width="44" height="14" rx="7" fill="#0C4A6E" />
          <line x1="106" y1="156" x2="106" y2="170" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="114" y1="156" x2="114" y2="170" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="122" y1="156" x2="122" y2="170" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="130" y1="156" x2="130" y2="170" stroke="#38BDF8" strokeWidth="2.5" />
        </g>
      );
    case 'skull':
      return (
        <g fill="#111827">
          <rect x="104" y="156" width="32" height="10" rx="5" />
          <line x1="112" y1="156" x2="112" y2="166" stroke="#fff" strokeWidth="2" />
          <line x1="120" y1="156" x2="120" y2="166" stroke="#fff" strokeWidth="2" />
          <line x1="128" y1="156" x2="128" y2="166" stroke="#fff" strokeWidth="2" />
        </g>
      );
    case 'clown':
      return (
        <g>
          <path d="M84 150 Q120 190 156 150" stroke="#BE123C" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="120" cy="142" r="10" fill="#E11D48" stroke="#881337" strokeWidth="3" />
        </g>
      );
    case 'cat':
      return (
        <g stroke={ink} strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M120 152 v6 M120 158 Q110 168 100 162 M120 158 Q130 168 140 162" />
        </g>
      );
    case 'frog-smile':
      return <path d="M84 152 Q120 172 156 152" stroke="#14532D" strokeWidth="6" fill="none" strokeLinecap="round" />;
    case 'dino':
      return (
        <g>
          <path d="M90 154 Q120 176 152 152 L146 168 Q120 184 96 168 Z" fill="#fff" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
          <path d="M102 160 l4 7 4-7 M120 164 l4 7 4-7 M138 160 l4 7 4-7" stroke={ink} strokeWidth="2.5" fill="none" />
        </g>
      );
    case 'snout':
      return (
        <g>
          <ellipse cx="120" cy="160" rx="20" ry="15" fill="#F9A8D4" stroke="#9D174D" strokeWidth="3.5" />
          <circle cx="113" cy="160" r="3.5" fill="#9D174D" />
          <circle cx="127" cy="160" r="3.5" fill="#9D174D" />
        </g>
      );
    case 'kiss':
      return (
        <g>
          <ellipse cx="120" cy="162" rx="12" ry="10" fill="#E11D48" />
          <ellipse cx="120" cy="162" rx="6" ry="5" fill="#FB7185" />
        </g>
      );
    default:
      return <path d="M94 154 Q120 174 146 154" stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />;
  }
}

function BackExtras({ extras }) {
  return (
    <g>
      {extras.includes('horns') && (
        <g>
          <path d="M66 62 C54 44 58 28 72 20 C74 34 80 46 90 54 Z" fill="#7C3AED" stroke="#4C1D95" strokeWidth="3" />
          <path d="M174 62 C186 44 182 28 168 20 C166 34 160 46 150 54 Z" fill="#7C3AED" stroke="#4C1D95" strokeWidth="3" />
        </g>
      )}
      {extras.includes('cat-ears') && (
        <g>
          <path d="M58 72 L54 34 L92 54 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="3" strokeLinejoin="round" />
          <path d="M182 72 L186 34 L148 54 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="3" strokeLinejoin="round" />
          <path d="M63 63 L61 43 L80 54 Z" fill="#FBCFE8" />
          <path d="M177 63 L179 43 L160 54 Z" fill="#FBCFE8" />
        </g>
      )}
      {extras.includes('bear-ears') && (
        <g>
          <circle cx="60" cy="66" r="18" fill="#92400E" />
          <circle cx="60" cy="66" r="8" fill="#FDE68A" />
          <circle cx="180" cy="66" r="18" fill="#92400E" />
          <circle cx="180" cy="66" r="8" fill="#FDE68A" />
        </g>
      )}
      {extras.includes('fox-ears') && (
        <g>
          <path d="M62 70 L50 26 L100 52 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
          <path d="M178 70 L190 26 L140 52 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
        </g>
      )}
      {extras.includes('pig-ears') && (
        <g>
          <path d="M66 68 L58 40 L88 54 Z" fill="#F9A8D4" stroke="#9D174D" strokeWidth="3" strokeLinejoin="round" />
          <path d="M174 68 L182 40 L152 54 Z" fill="#F9A8D4" stroke="#9D174D" strokeWidth="3" strokeLinejoin="round" />
        </g>
      )}
      {extras.includes('panda-ears') && (
        <g>
          <circle cx="60" cy="64" r="17" fill="#111827" />
          <circle cx="180" cy="64" r="17" fill="#111827" />
        </g>
      )}
      {extras.includes('mane') && (
        <g fill="#B45309">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x = 120 + Math.cos(a) * 92;
            const y = 130 + Math.sin(a) * 92;
            return <circle key={i} cx={x} cy={y} r="20" opacity="0.95" />;
          })}
        </g>
      )}
      {extras.includes('mane-rainbow') && (
        <g>
          {['#EF4444', '#F59E0B', '#84CC16', '#06B6D4', '#8B5CF6'].map((c, i) => (
            <circle key={c} cx={52 + i * 6} cy={96 + i * 22} r="26" fill={c} opacity="0.85" />
          ))}
          {['#EF4444', '#F59E0B', '#84CC16', '#06B6D4', '#8B5CF6'].map((c, i) => (
            <circle key={c + 'r'} cx={188 - i * 6} cy={96 + i * 22} r="26" fill={c} opacity="0.85" />
          ))}
        </g>
      )}
      {extras.includes('rainbow-hair') && (
        <g>
          <circle cx="48" cy="120" r="26" fill="#EF4444" />
          <circle cx="192" cy="120" r="26" fill="#3B82F6" />
          <circle cx="52" cy="90" r="20" fill="#F59E0B" />
          <circle cx="188" cy="90" r="20" fill="#8B5CF6" />
        </g>
      )}
      {extras.includes('tentacles') && (
        <g stroke="#7C3AED" strokeWidth="13" strokeLinecap="round" fill="none">
          <path d="M60 170 Q34 186 40 208" />
          <path d="M180 170 Q206 186 200 208" />
          <path d="M76 196 Q64 210 70 222" />
          <path d="M164 196 Q176 210 170 222" />
        </g>
      )}
      {extras.includes('bee-wings') && (
        <g fill="rgba(224,242,254,0.9)" stroke="#0284C7" strokeWidth="2.5">
          <ellipse cx="52" cy="96" rx="22" ry="32" transform="rotate(-24 52 96)" />
          <ellipse cx="188" cy="96" rx="22" ry="32" transform="rotate(24 188 96)" />
        </g>
      )}
      {extras.includes('rays') && (
        <g stroke="#F59E0B" strokeWidth="7" strokeLinecap="round">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((d) => {
            const r1 = 94;
            const r2 = 108;
            const a = (d * Math.PI) / 180;
            return (
              <line
                key={d}
                x1={120 + Math.cos(a) * r1}
                y1={130 + Math.sin(a) * r1}
                x2={120 + Math.cos(a) * r2}
                y2={130 + Math.sin(a) * r2}
              />
            );
          })}
        </g>
      )}
      {extras.includes('fire') && (
        <g>
          <path d="M56 84 C40 60 52 40 60 28 C62 44 74 48 78 36 C86 52 100 58 96 78 C110 70 118 54 118 40 C132 58 140 78 128 98 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
          <path d="M184 84 C200 60 188 40 180 28 C178 44 166 48 162 36 C154 52 140 58 144 78 C130 70 122 54 122 40 C108 58 100 78 112 98 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
        </g>
      )}
      {extras.includes('spikes') && (
        <g fill="#15803D" stroke="#14532D" strokeWidth="2.5">
          <path d="M104 52 L112 30 L120 52 Z" />
          <path d="M122 52 L130 30 L138 52 Z" />
          <path d="M86 58 L90 38 L100 56 Z" />
          <path d="M140 58 L150 38 L154 56 Z" />
        </g>
      )}
      {extras.includes('bunny-ears') && (
        <g>
          <ellipse cx="86" cy="30" rx="15" ry="34" fill="#FFF" stroke="#F9A8D4" strokeWidth="4" />
          <ellipse cx="86" cy="32" rx="7" ry="22" fill="#F9A8D4" />
          <ellipse cx="154" cy="30" rx="15" ry="34" fill="#FFF" stroke="#F9A8D4" strokeWidth="4" />
          <ellipse cx="154" cy="32" rx="7" ry="22" fill="#F9A8D4" />
        </g>
      )}
      {extras.includes('dog-ears') && (
        <g fill="#92400E" stroke="#451A03" strokeWidth="3">
          <ellipse cx="44" cy="116" rx="16" ry="36" transform="rotate(18 44 116)" />
          <ellipse cx="196" cy="116" rx="16" ry="36" transform="rotate(-18 196 116)" />
        </g>
      )}
    </g>
  );
}

function TopExtras({ extras }) {
  return (
    <g>
      {extras.includes('halo') && (
        <ellipse cx="120" cy="34" rx="38" ry="12" fill="none" stroke="#FBBF24" strokeWidth="8" />
      )}
      {extras.includes('crown') && (
        <g>
          <path d="M78 56 L74 22 L100 38 L120 14 L140 38 L166 22 L162 56 Z" fill="#FBBF24" stroke="#92400E" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="74" cy="20" r="6" fill="#EF4444" />
          <circle cx="120" cy="12" r="7" fill="#3B82F6" />
          <circle cx="166" cy="20" r="6" fill="#EF4444" />
          <rect x="78" y="56" width="84" height="10" rx="5" fill="#92400E" />
        </g>
      )}
      {extras.includes('party') && (
        <g>
          <path d="M104 52 L120 8 L136 52 Z" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="120" cy="8" r="6" fill="#FBBF24" />
          <path d="M108 40 h24 M111 30 h18" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {extras.includes('cowboy-hat') && (
        <g>
          <ellipse cx="120" cy="58" rx="66" ry="14" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          <path d="M84 58 C84 30 100 22 120 22 C140 22 156 30 156 58 Z" fill="#B45309" stroke="#451A03" strokeWidth="3" />
          <rect x="84" y="46" width="72" height="10" fill="#451A03" />
        </g>
      )}
      {extras.includes('top-hat') && (
        <g>
          <rect x="92" y="8" width="56" height="48" rx="6" fill="#111827" />
          <rect x="92" y="42" width="56" height="10" fill="#E11D48" />
          <ellipse cx="120" cy="58" rx="48" ry="9" fill="#111827" />
        </g>
      )}
      {extras.includes('wizard-hat') && (
        <g>
          <path d="M76 62 L118 6 L146 60 Z" fill="#4C1D95" stroke="#1E1B4B" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="111" cy="61" rx="42" ry="10" fill="#4C1D95" stroke="#1E1B4B" strokeWidth="3" />
          <path d="M104 40 l4 8 8 4 -8 4 -4 8 -4-8 -8-4 8-4 Z" fill="#FDE68A" />
          <path d="M122 30 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5-5 -5-2.5 5-2.5 Z" fill="#FDE68A" />
        </g>
      )}
      {extras.includes('unicorn-horn') && (
        <g>
          <path d="M110 54 L120 12 L130 54 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
          <path d="M114 42 h12 M116 32 h8" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {extras.includes('antennae') && (
        <g stroke="#166534" strokeWidth="5" strokeLinecap="round">
          <line x1="96" y1="52" x2="84" y2="26" />
          <line x1="144" y1="52" x2="156" y2="26" />
          <circle cx="84" cy="24" r="8" fill="#22C55E" stroke="#166534" strokeWidth="3" />
          <circle cx="156" cy="24" r="8" fill="#22C55E" stroke="#166534" strokeWidth="3" />
        </g>
      )}
      {extras.includes('antennae-bee') && (
        <g stroke="#451A03" strokeWidth="4" strokeLinecap="round">
          <line x1="100" y1="54" x2="92" y2="34" />
          <line x1="140" y1="54" x2="148" y2="34" />
          <circle cx="92" cy="32" r="5" fill="#451A03" />
          <circle cx="148" cy="32" r="5" fill="#451A03" />
        </g>
      )}
      {extras.includes('antennae-metal') && (
        <g stroke="#475569" strokeWidth="5" strokeLinecap="round">
          <line x1="120" y1="52" x2="120" y2="26" />
          <circle cx="120" cy="22" r="7" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3" />
        </g>
      )}
      {extras.includes('third-eye') && (
        <g>
          <ellipse cx="120" cy="88" rx="12" ry="14" fill="#fff" stroke="#1F2937" strokeWidth="3.5" />
          <circle cx="120" cy="90" r="5.5" fill="#7C3AED" />
          <circle cx="120" cy="90" r="2" fill="#fff" />
        </g>
      )}
      {extras.includes('star-top') && (
        <path d="M120 8 l6 12 13 2 -9.5 9 2.5 13 -12-6.5 -12 6.5 2.5-13 -9.5-9 13-2 Z" fill="#FBBF24" stroke="#92400E" strokeWidth="2.5" />
      )}
      {extras.includes('bow') && (
        <g>
          <path d="M120 52 L100 38 L102 60 Z" fill="#E11D48" stroke="#881337" strokeWidth="3" strokeLinejoin="round" />
          <path d="M120 52 L140 38 L138 60 Z" fill="#E11D48" stroke="#881337" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="120" cy="52" r="7" fill="#881337" />
        </g>
      )}
      {extras.includes('steam') && (
        <g stroke="rgba(100,116,139,0.8)" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M100 44 q6 -8 0 -16 q-6 -8 0 -16" />
          <path d="M124 46 q6 -8 0 -16 q-6 -8 0 -16" />
          <path d="M146 44 q6 -8 0 -16 q-6 -8 0 -16" />
        </g>
      )}
      {extras.includes('flame-jet') && (
        <g>
          <path d="M96 200 C90 214 100 224 108 232 C112 220 120 218 120 208 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          <path d="M144 200 C150 214 140 224 132 232 C128 220 120 218 120 208 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
        </g>
      )}
      {extras.includes('headset') && (
        <g>
          <path d="M52 130 C52 84 82 62 120 62 C158 62 188 84 188 130" fill="none" stroke="#1F2937" strokeWidth="10" strokeLinecap="round" />
          <rect x="44" y="118" width="24" height="40" rx="12" fill="#1F2937" />
          <rect x="172" y="118" width="24" height="40" rx="12" fill="#1F2937" />
          <rect x="48" y="126" width="16" height="24" rx="8" fill="#38BDF8" />
          <rect x="176" y="126" width="16" height="24" rx="8" fill="#38BDF8" />
        </g>
      )}
      {extras.includes('santa-hat') && (
        <g>
          <path d="M78 54 C88 18 128 8 154 26 C144 30 136 40 134 56 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="156" cy="26" r="10" fill="#FFF" stroke="#E5E7EB" strokeWidth="3" />
          <rect x="68" y="50" width="104" height="18" rx="9" fill="#FFF" stroke="#E5E7EB" strokeWidth="3" />
        </g>
      )}
      {extras.includes('cap') && (
        <g>
          <path d="M76 58 C76 30 102 22 120 22 C138 22 164 30 164 58 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="3" />
          <ellipse cx="164" cy="60" rx="30" ry="8" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="3" />
          <circle cx="120" cy="22" r="5" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="2.5" />
          <path d="M120 24 C118 36 118 46 120 56" stroke="#BFDBFE" strokeWidth="2.5" fill="none" />
        </g>
      )}
    </g>
  );
}

function FrontExtras({ extras }) {
  return (
    <g>
      {extras.includes('shades') && (
        <g>
          <rect x="60" y="102" width="52" height="36" rx="12" fill="#111827" />
          <rect x="128" y="102" width="52" height="36" rx="12" fill="#111827" />
          <rect x="112" y="110" width="16" height="8" fill="#111827" />
          <path d="M70 108 l18 18 M84 108 l-8 8" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" />
          <path d="M138 108 l18 18" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {extras.includes('monocle') && (
        <g>
          <circle cx="152" cy="118" r="19" fill="rgba(186,230,253,0.35)" stroke="#111827" strokeWidth="4" />
          <line x1="160" y1="136" x2="166" y2="158" stroke="#111827" strokeWidth="3" />
        </g>
      )}
      {extras.includes('tears-happy') && (
        <g fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5">
          <path d="M60 132 C54 142 52 150 60 154 C68 150 66 142 60 132Z" />
          <path d="M180 132 C174 142 172 150 180 154 C188 150 186 142 180 132Z" />
        </g>
      )}
      {extras.includes('tears-sad') && (
        <g fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5">
          <path d="M72 136 C66 150 64 160 72 165 C80 160 78 150 72 136Z" />
          <path d="M168 136 C162 150 160 160 168 165 C176 160 174 150 168 136Z" />
          <circle cx="64" cy="172" r="4" fill="#7DD3FC" stroke="none" />
          <circle cx="176" cy="172" r="4" fill="#7DD3FC" stroke="none" />
        </g>
      )}
      {extras.includes('sweat') && (
        <path d="M176 84 C170 94 168 102 176 106 C184 102 182 94 176 84Z" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2.5" />
      )}
      {extras.includes('blush') && (
        <g fill="rgba(244,114,182,0.55)">
          <ellipse cx="72" cy="146" rx="12" ry="7" />
          <ellipse cx="168" cy="146" rx="12" ry="7" />
        </g>
      )}
      {extras.includes('whiskers') && (
        <g stroke="#65350f" strokeWidth="2.5" strokeLinecap="round">
          <line x1="40" y1="148" x2="72" y2="152" />
          <line x1="40" y1="160" x2="72" y2="158" />
          <line x1="168" y1="152" x2="200" y2="148" />
          <line x1="168" y1="158" x2="200" y2="160" />
        </g>
      )}
      {extras.includes('clown-nose') && <circle cx="120" cy="142" r="10" fill="#E11D48" stroke="#881337" strokeWidth="3" />}
      {extras.includes('sprinkles') && (
        <g strokeLinecap="round" strokeWidth="4">
          <line x1="80" y1="70" x2="88" y2="76" stroke="#EC4899" />
          <line x1="150" y1="66" x2="156" y2="74" stroke="#3B82F6" />
          <line x1="120" y1="62" x2="128" y2="66" stroke="#22C55E" />
          <line x1="96" y1="190" x2="104" y2="194" stroke="#8B5CF6" />
          <line x1="142" y1="190" x2="148" y2="184" stroke="#F59E0B" />
        </g>
      )}
      {extras.includes('pepperoni') && (
        <g>
          <circle cx="82" cy="80" r="10" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
          <circle cx="160" cy="86" r="10" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
          <circle cx="150" cy="186" r="10" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
        </g>
      )}
      {extras.includes('frosting') && (
        <path d="M60 92 C70 66 90 58 120 58 C150 58 170 66 180 92 C168 84 158 88 150 82 C142 90 130 86 120 80 C110 86 98 90 90 82 C82 88 72 84 60 92Z" fill="#FDF4FF" stroke="#E9D5FF" strokeWidth="3" />
      )}
      {extras.includes('cherry') && (
        <g>
          <line x1="120" y1="58" x2="132" y2="38" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
          <circle cx="134" cy="34" r="9" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
          <circle cx="131" cy="31" r="2.5" fill="#FECACA" />
        </g>
      )}
      {extras.includes('seeds') && (
        <g fill="#166534">
          <ellipse cx="90" cy="70" rx="3" ry="5" />
          <ellipse cx="150" cy="72" rx="3" ry="5" />
          <ellipse cx="120" cy="64" rx="3" ry="5" />
        </g>
      )}
      {extras.includes('patches') && (
        <g fill="#111827">
          <path d="M78 84 l14 8 -6 14 -14-8 Z" />
          <path d="M162 84 l-14 8 6 14 14-8 Z" />
        </g>
      )}
      {extras.includes('ornaments') && (
        <g>
          <circle cx="88" cy="160" r="6" fill="#EF4444" />
          <circle cx="152" cy="160" r="6" fill="#3B82F6" />
          <circle cx="120" cy="190" r="6" fill="#FBBF24" />
        </g>
      )}
      {extras.includes('ice') && (
        <g fill="rgba(224,242,254,0.9)" stroke="#0284C7" strokeWidth="2">
          <path d="M62 70 l10 10 M72 70 l-10 10" strokeLinecap="round" />
          <path d="M178 70 l10 10 M188 70 l-10 10" strokeLinecap="round" />
          <circle cx="58" cy="150" r="4" />
          <circle cx="182" cy="150" r="4" />
        </g>
      )}
      {extras.includes('burst') && (
        <g fill="#FDE68A" stroke="#B45309" strokeWidth="2.5">
          <path d="M120 44 l5 10 11 1 -8 8 2 11 -10-5 -10 5 2-11 -8-8 11-1 Z" />
        </g>
      )}
      {extras.includes('facets') && (
        <g stroke="rgba(255,255,255,0.8)" strokeWidth="2.5">
          <line x1="80" y1="90" x2="160" y2="170" />
          <line x1="160" y1="90" x2="80" y2="170" />
          <line x1="120" y1="55" x2="120" y2="205" />
        </g>
      )}
      {extras.includes('swirl') && (
        <path d="M104 188 q16 12 32 0" stroke="#5C3A1E" strokeWidth="5" fill="none" strokeLinecap="round" />
      )}
      {extras.includes('flies') && (
        <g fill="#1F2937">
          <circle cx="52" cy="60" r="3" />
          <circle cx="190" cy="66" r="3" />
          <ellipse cx="54" cy="57" rx="5" ry="3" fill="rgba(255,255,255,0.7)" />
          <ellipse cx="192" cy="63" rx="5" ry="3" fill="rgba(255,255,255,0.7)" />
        </g>
      )}
      {extras.includes('swirl-face') && (
        <g fill="none" stroke="#1D4ED8" strokeWidth="3">
          <circle cx="88" cy="118" r="12" />
          <path d="M88 118 m-6 0 a6 6 0 1 1 12 0 a3 3 0 1 0 -6 0" />
          <circle cx="152" cy="118" r="12" />
          <path d="M152 118 m-6 0 a6 6 0 1 1 12 0 a3 3 0 1 0 -6 0" />
        </g>
      )}
      {extras.includes('tiger-stripes') && (
        <g stroke="#7C2D12" strokeWidth="5" strokeLinecap="round">
          <line x1="100" y1="68" x2="100" y2="82" />
          <line x1="120" y1="64" x2="120" y2="78" />
          <line x1="140" y1="68" x2="140" y2="82" />
        </g>
      )}
      {extras.includes('beard') && (
        <path
          d="M70 148 C70 198 94 216 120 216 C146 216 170 198 170 148 C160 162 150 158 140 168 C130 158 120 166 110 158 C100 166 90 158 80 166 C75 160 72 154 70 148 Z"
          fill="#FFF"
          stroke="#E5E7EB"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      )}
      {extras.includes('mask') && (
        <g>
          <line x1="80" y1="150" x2="56" y2="138" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
          <line x1="160" y1="150" x2="184" y2="138" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
          <rect x="78" y="144" width="84" height="42" rx="16" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
          <line x1="86" y1="158" x2="154" y2="158" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
          <line x1="86" y1="170" x2="154" y2="170" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

function Effects({ effects }) {
  return (
    <g>
      {(effects.includes('sparkles') || effects.includes('stars')) &&
        [
          [30, 60], [210, 52], [28, 170], [212, 178], [120, 18],
        ].map(([x, y], i) => (
          <path
            key={`sp-${x}-${y}`}
            d={`M${x} ${y} l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5-5 -5-2.5 5-2.5 Z`}
            fill={i % 2 ? '#FBBF24' : '#F9A8D4'}
          />
        ))}
      {effects.includes('hearts') &&
        [
          [36, 100], [204, 100],
        ].map(([x, y]) => (
          <path
            key={`h-${x}`}
            d={`M${x} ${y} c-6-5-9-8-9-12 0-3 2-5 5-5 2 0 3.5 1.2 4 2.8 0.5-1.6 2-2.8 4-2.8 3 0 5 2 5 5 0 4-3 7-9 12Z`}
            fill="#FB7185"
          />
        ))}
      {effects.includes('flames') &&
        [
          [30, 150], [210, 150],
        ].map(([x, y]) => (
          <path
            key={`f-${x}`}
            d={`M${x} ${y} c-6-8-4-14 0-20 1 5 6 6 7 2 5 6 7 12 1 18 -2 2 -6 2 -8 0Z`}
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="1.5"
          />
        ))}
      {effects.includes('snow') &&
        [
          [36, 84], [204, 84], [52, 190], [188, 190],
        ].map(([x, y]) => (
          <g key={`sn-${x}-${y}`} stroke="#0284C7" strokeWidth="2" strokeLinecap="round">
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
          </g>
        ))}
      {effects.includes('droplets') &&
        [
          [44, 120], [196, 120],
        ].map(([x, y]) => (
          <path key={`d-${x}`} d={`M${x} ${y} c-4 6-5 10 0 13 5-3 4-7 0-13Z`} fill="#38BDF8" />
        ))}
      {effects.includes('lightning') && (
        <g fill="#FBBF24" stroke="#92400E" strokeWidth="1.5">
          <path d="M28 110 l8 2 -4 8 8 2 -10 12 2-8 -8-2 4-8 -8-2 8-4Z" />
          <path d="M212 110 l-8 2 4 8 -8 2 10 12 -2-8 8-2 -4-8 8-2 -8-4Z" />
        </g>
      )}
      {effects.includes('confetti') &&
        [
          [36, 70, '#EC4899'], [204, 70, '#3B82F6'], [44, 190, '#22C55E'], [196, 190, '#F59E0B'],
        ].map(([x, y, c]) => (
          <g key={`c-${x}-${y}`}>
            <rect x={x} y={y} width="10" height="6" rx="2" fill={c} transform={`rotate(24 ${x} ${y})`} />
            <circle cx={x + 14} cy={y + 8} r="3" fill={c} />
          </g>
        ))}
      {effects.includes('zzz') && (
        <g fill="#818CF8" fontFamily="Nunito, sans-serif" fontWeight="900">
          <text x="186" y="60" fontSize="20">z</text>
          <text x="198" y="44" fontSize="26">Z</text>
          <text x="184" y="200" fontSize="16" opacity="0.7">z</text>
        </g>
      )}
      {effects.includes('rainbow') && (
        <g fill="none" strokeLinecap="round" strokeWidth="6">
          <path d="M14 200 A60 60 0 0 1 74 200" stroke="#EF4444" />
          <path d="M20 200 A54 54 0 0 1 68 200" stroke="#F59E0B" />
          <path d="M26 200 A48 48 0 0 1 62 200" stroke="#84CC16" />
          <path d="M166 200 A60 60 0 0 1 226 200" stroke="#06B6D4" />
          <path d="M172 200 A54 54 0 0 1 220 200" stroke="#8B5CF6" />
        </g>
      )}
      {effects.includes('music') && (
        <g fill="#8B5CF6" fontSize="22" fontFamily="sans-serif" fontWeight="bold">
          <text x="30" y="90">♪</text>
          <text x="200" y="90">♫</text>
        </g>
      )}
    </g>
  );
}

export default function EmojiArt({ spec, size = 240, className = '', title = 'Mixed emoji artwork', svgRef = null }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gid = `g${uid}`;
  const [from, to] = baseColors(spec?.base);
  const extras = spec?.extras || [];
  const effects = spec?.effects || [];
  const eyes = spec?.eyes || 'happy';
  const mouth = spec?.mouth || 'smile';
  const isSplit = spec?.base === 'split-angel-devil';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <radialGradient id={gid} cx="38%" cy="30%" r="85%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </radialGradient>
        {isSplit && (
          <linearGradient id={`${gid}-split`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stopColor="#FFE45E" />
            <stop offset="50%" stopColor="#8B5CF6" />
          </linearGradient>
        )}
      </defs>

      <Effects effects={effects} />
      <BackExtras extras={extras} />

      {isSplit ? (
        <circle cx="120" cy="130" r="80" fill={`url(#${gid}-split)`} stroke="rgba(0,0,0,0.12)" strokeWidth="3" />
      ) : (
        <FaceShape base={spec?.base} gid={gid} />
      )}

      {/* soft highlight */}
      <ellipse cx="92" cy="82" rx="26" ry="14" fill="rgba(255,255,255,0.35)" transform="rotate(-18 92 82)" />

      <Eyes kind={eyes} />
      <Mouth kind={mouth} />
      <FrontExtras extras={extras} />
      <TopExtras extras={extras} />
    </svg>
  );
}
