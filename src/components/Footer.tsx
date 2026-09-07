import React from 'react';
import { SmartSeoLogo } from './SmartSeoLogo';
import { BUSINESS_INFO } from '../data/funnelData';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigateToThankYou: () => void;
  onNavigateHome: () => void;
  onNavigateToAdmin?: () => void;
  onNavigateToGigMethod?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateToThankYou, 
  onNavigateHome, 
  onNavigateToAdmin,
  onNavigateToGigMethod 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="pt-16 pb-12 border-t border-white/10 bg-black/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <button onClick={onNavigateHome} className="text-left focus:outline-none cursor-pointer">
              <SmartSeoLogo size="md" />
            </button>

            <p className="text-sm font-semibold text-orange-400 italic">
              “Your Fiverr profile is more than a profile — it’s your digital storefront.”
            </p>

            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm">
              Professional optimization. Better positioning. Stronger buyer experience. Helping freelancers build authority and convert high-intent buyers.
            </p>

            <div className="flex items-center gap-2 text-xs text-green-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Ethical SEO & Copywriting Specialists</span>
            </div>
          </div>

          {/* Col 2: Fast Funnel Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <button
                  onClick={() => {
                    onNavigateHome();
                    setTimeout(() => {
                      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Services Breakdown
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateHome();
                    setTimeout(() => {
                      document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Previous Client Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateHome();
                    setTimeout(() => {
                      document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Pricing (Rs. 10,000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateHome();
                    setTimeout(() => {
                      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              {onNavigateToGigMethod && (
                <li>
                  <button
                    onClick={onNavigateToGigMethod}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>⚡ 24-Hour Gig Rank Method (599 PKR PDF)</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onNavigateToThankYou}
                  className="text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
                >
                  Client Intake Form (/thank-you)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct WhatsApp Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Direct WhatsApp Support
            </h4>
            <p className="text-xs text-white/60">
              Have questions before getting started? Speak directly with our optimization team.
            </p>

            <div className="space-y-2">
              <button
                id="footer-whatsapp-primary"
                onClick={onNavigateToThankYou}
                className="w-full flex items-center justify-center sm:justify-start gap-2.5 px-4 py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-sm font-bold transition-all shadow-md group cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span>Chat With Us on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Smart SEO Solutions. All rights reserved.</span>
            {onNavigateToAdmin && (
              <button
                onClick={onNavigateToAdmin}
                className="opacity-20 hover:opacity-100 hover:text-orange-400 transition-opacity p-0.5 cursor-pointer ml-1"
                title="Staff Portal"
                aria-label="Staff Login"
              >
                🔒
              </button>
            )}
          </p>
          <div className="flex items-center gap-4">
            <span>Fiverr Profile & Gig Optimization Agency</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
