import React, { useState } from 'react';
import { FAQ_LIST } from '../data/funnelData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <span>Honest & Clear Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal">
            Everything you need to know about our Fiverr optimization process and scope.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_LIST.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen ? 'border-orange-500/40 bg-white/10 shadow-lg' : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <button
                  id={`faq-toggle-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-white/10 text-white/70 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-orange-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-white/80 leading-relaxed border-t border-white/10 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
