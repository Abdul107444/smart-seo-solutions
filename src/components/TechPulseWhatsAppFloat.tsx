import React from 'react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

export function TechPulseWhatsAppFloat() {
  const phone = TECHPULSE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    'Assalam-o-Alaikum! Mujhe Smart SEO Solutions Fiverr Profile & Gig Optimization (Rs. 8,000) ke baray mein details chahiyein.'
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-200 ease-out hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 sm:w-7 sm:h-7"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.834h-.004c-1.271-.05-2.521-.349-3.67-.877l-.263-.119-2.727.716.73-2.66-.172-.273a7.53 7.53 0 0 1-1.16-4.03c0-4.188 3.406-7.592 7.594-7.592 4.188 0 7.592 3.404 7.592 7.592 0 4.188-3.404 7.593-7.592 7.593m6.743-13.831c-1.807-1.808-4.209-2.804-6.765-2.804-5.27 0-9.56 4.29-9.56 9.56 0 1.683.439 3.321 1.271 4.762l-1.351 4.94 5.051-1.324a9.55 9.55 0 0 0 4.589 1.173c5.27 0 9.56-4.29 9.56-9.56 0-2.556-.996-4.958-2.795-6.767" />
      </svg>
    </a>
  );
}
