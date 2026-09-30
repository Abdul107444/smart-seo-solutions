import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Headphones,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Clock
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

// Global helper to open live chat from anywhere
export function openLiveChatWidget() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-live-chat'));
  }
}

interface Message {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
}

interface LiveChatWidgetProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onEnroll?: () => void;
}

const PRESET_QUESTIONS = [
  {
    label: '🛡️ 20–25 Days Guarantee',
    prompt: 'How does the 20-25 days money-back guarantee work?'
  },
  {
    label: '📋 What is included for Rs. 8,000?',
    prompt: 'What deliverables are included in the Rs. 8,000 optimization?'
  },
  {
    label: '🔒 Is AnyDesk safe without password sharing?',
    prompt: 'Is AnyDesk screen-sharing 100% safe? Do I need to share passwords?'
  },
  {
    label: '💳 Payment Methods (Meezan / JazzCash)',
    prompt: 'What payment methods do you accept?'
  },
  {
    label: '🎯 When will I get my 1st client?',
    prompt: 'How quickly will I get my 1st client after optimization?'
  }
];

export function LiveChatWidget({
  isOpen: controlledIsOpen,
  onOpenChange,
  onEnroll
}: LiveChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (nextState: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextState);
    } else {
      setInternalIsOpen(nextState);
    }
  };

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(1);
  const [hasOpenedOnce, setHasOpenedOnce] = useState<boolean>(false);

  const phone = TECHPULSE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-01',
      sender: 'agent',
      text: 'Assalam-o-Alaikum! 👋 Welcome to Smart SEO Solutions 24/7 Seller Support.',
      timestamp: 'Just now'
    },
    {
      id: 'msg-02',
      sender: 'agent',
      text: 'Hamari Pakistani SEO team live hai. Aap Fiverr Profile & Gig Optimization (Rs. 8,000) ya 20–25 Days 1st Client Guarantee ke baray mein koi bhi sawal pooch sakte hain!',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen to global open event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setUnreadCount(0);
    };

    window.addEventListener('open-live-chat', handleOpen);
    return () => {
      window.removeEventListener('open-live-chat', handleOpen);
    };
  }, []);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setHasOpenedOnce(true);
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isTyping]);

  // Intelligent mock answers based on user questions
  const generateAgentReply = (userText: string): { reply: string; actionLabel?: string; actionUrl?: string } => {
    const lower = userText.toLowerCase();

    if (
      lower.includes('guarantee') ||
      lower.includes('refund') ||
      lower.includes('money') ||
      lower.includes('20') ||
      lower.includes('25')
    ) {
      return {
        reply:
          'Hamari 20–25 Days 100% Money-Back Guarantee bilkul unconditional hai! Agar optimization ke 20–25 din mein aapki gig par organic impression growth aur genuine buyer inquiries aana shuru nahi hoti, toh aapki poori Rs. 8,000 fee seedha aapke Pakistani bank account mein refund kar di jayegi. Zero disputes, zero hassle.',
        actionLabel: 'Book Risk-Free (Rs. 8,000)',
        actionUrl: '#book'
      };
    }

    if (
      lower.includes('included') ||
      lower.includes('deliverable') ||
      lower.includes('kya mil') ||
      lower.includes('service') ||
      lower.includes('points') ||
      lower.includes('scope')
    ) {
      return {
        reply:
          'Rs. 8,000 package mein 10 complete Done-For-You deliverables shaamil hain:\n1. 5 High-Intent Buyer Search Tags\n2. Primary Keyword Permalink Slug Lock\n3. 1,200-char AIDA Description\n4. 3-Tier Decoy Pricing Strategy\n5. 5 Smart Buyer FAQs\n6. High-CTR Thumbnail Guidance\n7. Profile Bio & Skills Overhaul\n8. Live AnyDesk Screen-Share Setup\n9. 24/7 WhatsApp Guidance\n10. 20–25 Days Money-Back Guarantee.',
        actionLabel: 'View Deliverables',
        actionUrl: '#services'
      };
    }

    if (
      lower.includes('safe') ||
      lower.includes('password') ||
      lower.includes('anydesk') ||
      lower.includes('security') ||
      lower.includes('tos')
    ) {
      return {
        reply:
          '100% Safe aur White-Hat! Aapko apna Fiverr password kisi ke sath share karne ki bilkul zaroorat nahi hai. Hum AnyDesk par live screen-share karte hain, aapki ankhon ke samne sab kuch optimize hota hai aur Fiverr ke Terms of Service ki 100% compliance rehti hai.',
        actionLabel: 'Chat on WhatsApp',
        actionUrl: `https://wa.me/${phone}?text=${encodeURIComponent('Assalam-o-Alaikum! AnyDesk session ke baray mein sawal tha.')}`
      };
    }

    if (
      lower.includes('payment') ||
      lower.includes('meezan') ||
      lower.includes('jazzcash') ||
      lower.includes('easypaisa') ||
      lower.includes('bank') ||
      lower.includes('pay') ||
      lower.includes('raast')
    ) {
      return {
        reply:
          'Payment direct verified Pakistani bank accounts ke through accept hoti hai:\n• Official Meezan Bank IBAN Transfer\n• Easypaisa Instant Transfer\n• JazzCash Direct Transfer\n• Raast ID (Zero Charges)\nFee pay karne ke baad WhatsApp par 15 minutes mein official confirmation receipt milti hai.',
        actionLabel: 'Proceed to Payment',
        actionUrl: '#pricing'
      };
    }

    if (
      lower.includes('client') ||
      lower.includes('order') ||
      lower.includes('kab') ||
      lower.includes('time') ||
      lower.includes('din')
    ) {
      return {
        reply:
          'Optimization ke 24–48 ghante baad Fiverr crawler nayi metadata ko crawl karta hai. Day 4–10 mein green arrows ke sath organic impressions spike hote hain, aur Day 11–20 mein international buyers inbox mein custom offer maangte hain. Hamara target 20–25 din mein pehla client order close karwana hai!',
        actionLabel: 'Book Optimization Slot',
        actionUrl: '#book'
      };
    }

    if (
      lower.includes('whatsapp') ||
      lower.includes('number') ||
      lower.includes('call') ||
      lower.includes('human') ||
      lower.includes('consultant')
    ) {
      return {
        reply:
          `Aap hamare senior consultant se direct WhatsApp par 24/7 baat kar sakte hain. Number: ${TECHPULSE_CONFIG.whatsappNumber}. Click kijiye aur direct chat start karein!`,
        actionLabel: `Open WhatsApp (${TECHPULSE_CONFIG.whatsappNumber})`,
        actionUrl: `https://wa.me/${phone}?text=${encodeURIComponent('Assalam-o-Alaikum! Mujhe Live Chat se transfer hona hai.')}`
      };
    }

    // Default friendly response
    return {
      reply:
        'Bohat shukriya aapke sawal ka! Hamare expert SEO consultants AnyDesk par live baith kar aapki Fiverr gig ko full optimize karte hain taake aap 20–25 din mein apna pehla paying client hasil kar sakein. Aap direct WhatsApp par bhi baat kar sakte hain ya abhi slot book kar sakte hain.',
      actionLabel: 'Book Full Optimization (Rs. 8,000)',
      actionUrl: '#book'
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(() => {
      const { reply, actionLabel, actionUrl } = generateAgentReply(text);
      const agentMsg: Message = {
        id: `agt-${Date.now()}`,
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLabel,
        actionUrl
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleActionClick = (actionUrl?: string) => {
    if (!actionUrl) return;

    if (actionUrl === '#book' || actionUrl === '#pricing') {
      setIsOpen(false);
      if (onEnroll) {
        onEnroll();
      } else {
        const el = document.getElementById('pricing') || document.getElementById('offer');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (actionUrl === '#services') {
      setIsOpen(false);
      const el = document.getElementById('services') || document.getElementById('modules');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionUrl.startsWith('http')) {
      window.open(actionUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* --- FLOATING 'LIVE CHAT' BUTTON --- */}
      {/* Positioned cleanly above WhatsApp button at bottom-20 right-4 */}
      <div className="fixed bottom-20 right-4 sm:bottom-22 sm:right-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Live Support Chat' : 'Open 24/7 Live Support Chat'}
          className={`group flex items-center gap-2 rounded-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-white shadow-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95 border-2 border-white/40 cursor-pointer ${
            isOpen
              ? 'bg-[#0c172f] hover:bg-[#1a2b50]'
              : 'bg-gradient-to-r from-[#2b62ef] to-[#1a4bc7] hover:from-[#1d4ed8] hover:to-[#173fa8] hover:shadow-2xl hover:shadow-blue-500/40'
          }`}
        >
          <div className="relative">
            {isOpen ? (
              <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
            ) : (
              <MessageSquare className="h-5 w-5" />
            )}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 border border-white" />
              </span>
            )}
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black tracking-tight leading-none">
              <span>{isOpen ? 'Close Chat' : 'Live Chat'}</span>
              {!isOpen && (
                <span className="rounded-full bg-emerald-400/25 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-emerald-200 leading-none">
                  Online
                </span>
              )}
            </div>
            {!isOpen && (
              <div className="text-[10px] text-blue-200 font-medium hidden xs:block mt-0.5 leading-none">
                24/7 Instant Support
              </div>
            )}
          </div>

          {/* Unread badge if closed and not yet opened */}
          {!isOpen && !hasOpenedOnce && unreadCount > 0 && (
            <span className="ml-0.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-xs animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* --- MOCK LIVE CHAT INTERFACE MODAL / DRAWER --- */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="24/7 Live Support Chat"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex w-[calc(100vw-2rem)] sm:w-[380px] max-w-sm flex-col overflow-hidden rounded-2xl border-2 border-[#2b62ef]/40 bg-white shadow-2xl shadow-blue-900/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          style={{ height: 'min(580px, 85vh)' }}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#0c172f] via-[#122347] to-[#1e3a8a] p-3.5 sm:p-4 text-white">
            <div className="flex items-center justify-between">
              {/* Agent info */}
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#1dbf73] to-[#2b62ef] text-white font-bold text-sm shadow-md">
                    <Headphones className="h-5 w-5" />
                  </div>
                  {/* Pulsing online badge */}
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#0c172f] ring-2 ring-emerald-400/30" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold tracking-tight">Smart SEO Support</span>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-extrabold text-emerald-300 border border-emerald-400/30">
                      <CheckCircle2 className="h-2.5 w-2.5" /> 24/7 Live
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3 text-cyan-300" />
                    <span>Replies instantly • Urdu &amp; English</span>
                  </p>
                </div>
              </div>

              {/* Close & Minimize buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Chat"
                  className="rounded-full p-1.5 text-gray-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick trust banner inside chat */}
            <div className="mt-2.5 flex items-center justify-between rounded-lg bg-white/10 px-2.5 py-1.5 text-[11px] text-gray-200">
              <span className="flex items-center gap-1 font-semibold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" /> 20–25 Days Guarantee
              </span>
              <span className="text-gray-300">Fee: Rs. 8,000</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#f8fafc] text-xs">
            {/* Timestamp Divider */}
            <div className="text-center">
              <span className="rounded-full bg-gray-200/70 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                Today · 24/7 Verified Support
              </span>
            </div>

            {/* Messages list */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#2b62ef] text-white rounded-br-xs'
                      : 'bg-white text-[#0c172f] border border-[#e2e8f0] rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Optional action CTA in message */}
                  {msg.actionLabel && (
                    <button
                      type="button"
                      onClick={() => handleActionClick(msg.actionUrl)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#1dbf73] hover:bg-[#109655] px-3 py-1.5 text-[11px] font-bold text-white shadow-xs transition-all cursor-pointer"
                    >
                      <span>{msg.actionLabel}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <span className="mt-0.5 px-1 text-[10px] text-gray-400">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl bg-white border border-[#e2e8f0] px-3 py-2 w-16 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce delay-150" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce delay-300" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Suggestion Chips */}
          <div className="border-t border-[#e2e8f0] bg-white px-3 py-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" /> Instant Quick Questions:
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q.prompt)}
                  className="shrink-0 rounded-full border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 px-2.5 py-1 text-[11px] font-medium text-gray-700 transition-all cursor-pointer"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-[#e2e8f0] bg-white p-2.5 sm:p-3"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Poochiye (Urdu or English)..."
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#0c172f] placeholder-gray-400 focus:bg-white focus:border-[#2b62ef] focus:outline-none focus:ring-1 focus:ring-[#2b62ef]"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                aria-label="Send Message"
                className="grid h-8 w-8 place-items-center rounded-xl bg-[#2b62ef] text-white hover:bg-[#1d4ed8] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* WhatsApp Fallback Footer */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-gray-100">
              <span>Prefer WhatsApp?</span>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('Assalam-o-Alaikum! Mujhe Live Support se rabta karna hai.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#109655] hover:underline flex items-center gap-1"
              >
                <span>Direct WhatsApp ({TECHPULSE_CONFIG.whatsappNumber})</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
