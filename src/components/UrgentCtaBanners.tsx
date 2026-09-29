import React from 'react';
import { Clock, Zap, ArrowRight } from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface UrgentCtaProps {
  onEnroll: () => void;
}

export function UrgentCtaBanners({ onEnroll }: UrgentCtaProps) {
  return (
    <>
      {/* 1. Dark Navy High-Impact Banner */}
      <section className="bg-[#0c172f] px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Clock className="mx-auto h-12 w-12 text-[#00bad2] animate-pulse" />
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight sm:text-5xl">
            Every day your gig stays un-optimized is a day{' '}
            <span className="text-gradient">competitors take</span> your dollar orders.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-gray-300">
            Thousands of international buyers search Fiverr every minute for your exact skill. Don't lose high-ticket orders because of poor keywords, weak descriptions, or bad tags.
          </p>
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand mt-8 inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-bold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
          >
            <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 2. Light Final CTA Banner */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 bg-[#f7fbfd]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <Zap className="mx-auto h-10 w-10 text-[#2b62ef]" />
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0c172f] sm:text-6xl">
            Start getting orders <span className="text-gradient">today.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#535f6f] sm:text-lg">
            Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()} one-time fee. 100% Done-For-You Profile & Gig Optimization with a 20–25 days money-back guarantee.
          </p>
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand mt-8 inline-flex items-center gap-2 rounded-full px-10 py-4 text-lg font-bold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
          >
            <span>Book Optimization (Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()})</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </>
  );
}
