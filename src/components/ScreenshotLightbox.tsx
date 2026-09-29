import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  src: string | null;
  alt: string;
  onClose: () => void;
}

export function ScreenshotLightbox({ isOpen, src, alt, onClose }: LightboxProps) {
  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div className="relative max-h-[92vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute -top-3 -right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-transform active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] w-auto max-w-full rounded-2xl border border-white/20 object-contain shadow-2xl"
        />
        <p className="mt-2 text-center text-xs text-white/70">{alt}</p>
      </div>
    </div>
  );
}

export function ImageClickable({
  src,
  alt,
  className = '',
  onOpen
}: {
  src: string;
  alt: string;
  className?: string;
  onOpen: (src: string, alt: string) => void;
}) {
  return (
    <div
      onClick={() => onOpen(src, alt)}
      className="group relative cursor-pointer overflow-hidden rounded-xl"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full transition-transform duration-300 group-hover:scale-[1.02] ${className}`}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
        <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-black shadow-md backdrop-blur-sm">
          <ZoomIn className="h-3.5 w-3.5 text-[#2b62ef]" /> Click to Enlarge
        </span>
      </div>
    </div>
  );
}
