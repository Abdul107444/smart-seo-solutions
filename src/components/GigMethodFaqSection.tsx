import React, { useState } from 'react';
import { GIG_METHOD_FAQS } from '../data/funnelData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const GigMethodFaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(GIG_METHOD_FAQS[0]?.id || '');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="gig-faqs-section" className="py-16 md:py-24 relative bg-black/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[11px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
              Questions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed">
            Everything you need to know about the 24-Hour Fiverr 1st Page Gig Ranking Method and instant PDF delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {GIG_METHOD_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? 'bg-white/10 border-orange-400/50 shadow-lg shadow-orange-500/5'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-orange-400 text-black' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base text-white/80 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support contact info */}
        <div className="mt-12 text-center text-xs sm:text-sm text-white/50">
          Have more questions? Contact our dedicated WhatsApp support directly at{' '}
          <a
            href="https://wa.me/923060880466"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 font-bold underline decoration-orange-400/50"
          >
            +92 306 0880466
          </a>{' '}
          for immediate assistance.
        </div>
      </div>
    </section>
  );
};
