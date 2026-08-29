import React from 'react';

interface SmartSeoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const SmartSeoLogo: React.FC<SmartSeoLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon SVG */}
      <div className={`relative ${iconDimensions} flex-shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#581C87" />
            </linearGradient>
            <linearGradient id="arrowGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          
          {/* Owl Wings (Left) */}
          <path
            d="M 28 22 C 16 28 8 42 12 60 C 18 52 26 48 32 46 C 22 42 24 32 28 22 Z"
            fill="url(#wingGrad)"
          />
          <path
            d="M 34 32 C 24 38 18 50 22 64 C 28 58 34 54 38 52 Z"
            fill="#0284C7"
          />

          {/* Owl Head & Body */}
          <path
            d="M 38 30 C 38 20 44 14 50 14 C 56 14 62 20 62 30 C 62 42 58 56 46 68 C 40 72 32 76 25 80 C 35 72 40 60 40 50 Z"
            fill="url(#bodyGrad)"
          />
          
          {/* Owl Ears */}
          <path d="M 40 18 L 44 26 L 38 26 Z" fill="#C084FC" />
          <path d="M 60 18 L 56 26 L 62 26 Z" fill="#C084FC" />

          {/* Owl Eyes */}
          <circle cx="44" cy="30" r="6" fill="#F8FAFC" stroke="#A855F7" strokeWidth="1.5" />
          <circle cx="44" cy="30" r="3" fill="#38BDF8" />
          <circle cx="44" cy="30" r="1.2" fill="#0F172A" />

          <circle cx="56" cy="30" r="6" fill="#F8FAFC" stroke="#A855F7" strokeWidth="1.5" />
          <circle cx="56" cy="30" r="3" fill="#38BDF8" />
          <circle cx="56" cy="30" r="1.2" fill="#0F172A" />

          {/* Upward Growth Arrow */}
          <path
            d="M 44 68 L 74 20 L 76 28 L 84 14 L 68 18 L 74 22 L 40 74 Z"
            fill="url(#arrowGrad)"
            stroke="#64748B"
            strokeWidth="0.8"
          />

          {/* Magnifying Glass with Circuit */}
          <circle cx="58" cy="48" r="15" fill="#1E1B4B" stroke="#CBD5E1" strokeWidth="2.5" />
          <circle cx="58" cy="48" r="11" fill="#0F172A" />
          
          {/* Magnifying Handle */}
          <path d="M 68 59 L 82 78 L 77 82 L 64 63 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
          
          {/* Circuit Details inside lens */}
          <circle cx="58" cy="48" r="2.5" fill="#38BDF8" />
          <path d="M 58 43 L 58 39" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="58" cy="39" r="1" fill="#38BDF8" />
          <path d="M 58 53 L 58 57" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="58" cy="57" r="1" fill="#38BDF8" />
          <path d="M 53 48 L 49 48" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="49" cy="48" r="1" fill="#38BDF8" />
          <path d="M 63 48 L 67 48" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="67" cy="48" r="1" fill="#38BDF8" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-lg md:text-xl">
            <span className="text-sky-400">Smart</span>
            <span className="text-purple-400">SEO</span>
          </div>
          <span className="text-[11px] md:text-xs font-semibold tracking-wider text-sky-400/90 uppercase mt-0.5">
            Solutions
          </span>
        </div>
      )}
    </div>
  );
};
