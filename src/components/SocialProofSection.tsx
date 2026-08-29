import React from 'react';
import { SOCIAL_PROOF_CARDS } from '../data/funnelData';
import { 
  Sparkles, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'Target':
        return <Target className="w-6 h-6 text-sky-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-purple-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="proof-section" className="py-16 md:py-24 relative bg-black/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <span>Buyer-Centric Optimization Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Built To Help You Win <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">More Fiverr Buyers</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal">
            Strategic refinements focused on buyer trust, algorithmic indexing, and higher order conversion probability.
          </p>
        </div>

        {/* 4 Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOCIAL_PROOF_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-white/10 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/20 w-fit mb-4">
                  {getIcon(card.icon)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-green-400 font-semibold">
                <span>✓</span> Included in Package
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
