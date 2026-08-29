import React from 'react';
import { COMPARISON_FEATURES, BUSINESS_INFO } from '../data/funnelData';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const FeatureComparisonSection: React.FC = () => {
  return (
    <section id="comparison-section" className="py-16 md:py-24 relative bg-black/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <span>Clear Deliverable Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Everything You Need To Improve <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Your Presence</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal">
            A comprehensive side-by-side view of every element included in your {BUSINESS_INFO.price} package.
          </p>
        </div>

        {/* Feature Table Card */}
        <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10 border-b border-white/10">
                  <th className="py-4 px-5 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Optimization Area
                  </th>
                  <th className="py-4 px-5 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-400 text-center w-36">
                    Included
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {COMPARISON_FEATURES.map((row, idx) => (
                  <tr
                    key={row.area}
                    className={`transition-colors hover:bg-white/10 ${
                      idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                    }`}
                  >
                    <td className="py-3.5 px-5 sm:px-6">
                      <span className="text-sm sm:text-base font-bold text-white block">
                        {row.area}
                      </span>
                      <span className="text-xs text-white/60 block mt-0.5">
                        {row.note}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 sm:px-6 text-center">
                      <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-green-500/10 border border-green-400/30 text-green-400">
                        <span className="font-bold text-sm">✓</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
