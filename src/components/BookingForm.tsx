import React, { useState } from 'react';
import { saveLeadToFirestore } from '../lib/leadsService';
import { BUSINESS_INFO, PAYMENT_ACCOUNTS } from '../data/funnelData';
import { 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Briefcase,
  AlertCircle,
  Globe,
  Sparkles,
  CreditCard,
  Upload,
  Image as ImageIcon,
  X,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';

interface BookingFormProps {
  onBackToLanding: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onBackToLanding }) => {
  // Step 1: Contact Information
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  
  // Step 2: Niche & Links
  const [niche, setNiche] = useState('');
  const [showOptional, setShowOptional] = useState(false);
  const [fiverrProfileUrl, setFiverrProfileUrl] = useState('');
  const [fiverrGigUrl, setFiverrGigUrl] = useState('');
  const [improvementGoal, setImprovementGoal] = useState('');

  // Step 3: Payment Details
  const [paymentMethod, setPaymentMethod] = useState<'JazzCash' | 'SadaPay'>('JazzCash');
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<string>('');
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Form Submission States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, paymentScreenshot: 'Please upload an image file (PNG, JPG, JPEG)' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, paymentScreenshot: 'Image size should be less than 5MB' }));
      return;
    }

    setScreenshotFileName(file.name);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.paymentScreenshot;
      return next;
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress slightly onto canvas for fast storage
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setPaymentScreenshot(compressedDataUrl);
        } else {
          setPaymentScreenshot(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';

    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (whatsapp.trim().length < 8) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp number';
    }

    if (!niche.trim()) {
      newErrors.niche = 'Your service / niche is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to generate formatted WhatsApp URL with all client details + payment info
  const getWhatsAppMessageUrl = (data?: {
    fullName: string;
    whatsapp: string;
    niche: string;
    paymentMethod?: string;
    transactionId?: string;
    hasScreenshot?: boolean;
    fiverrProfileUrl?: string;
    fiverrGigUrl?: string;
    improvementGoal?: string;
  }) => {
    const name = data?.fullName || fullName;
    const phone = data?.whatsapp || whatsapp;
    const serviceNiche = data?.niche || niche;
    const selectedMethod = data?.paymentMethod || paymentMethod;
    const trx = data?.transactionId || transactionId;
    const profile = data?.fiverrProfileUrl || fiverrProfileUrl;
    const gig = data?.fiverrGigUrl || fiverrGigUrl;
    const goal = data?.improvementGoal || improvementGoal;
    const hasProof = data?.hasScreenshot || !!paymentScreenshot;

    let msg = `👋 *Assalam-o-Alaikum Smart SEO Solutions!*\n\n`;
    msg += `Maine Fiverr Optimization ke liye details submit ki hain:\n\n`;
    msg += `👤 *Client Name:* ${name.trim()}\n`;
    msg += `📱 *WhatsApp:* ${phone.trim()}\n`;
    msg += `💼 *Service / Niche:* ${serviceNiche.trim()}\n`;
    msg += `📦 *Package:* Complete Profile & Gig SEO (${BUSINESS_INFO.price})\n\n`;

    msg += `💳 *Payment Method:* ${selectedMethod} (Zeenat yasmin - 03060880466)\n`;
    msg += `💰 *Amount:* ${BUSINESS_INFO.price}\n`;
    if (trx.trim()) {
      msg += `🔢 *Trx ID / Ref:* ${trx.trim()}\n`;
    }
    if (hasProof) {
      msg += `📸 *Payment Screenshot:* Uploaded on website / attaching in this chat\n`;
    }

    if (profile && profile.trim()) {
      msg += `\n🔗 *Fiverr Profile:* ${profile.trim()}`;
    }
    if (gig && gig.trim()) {
      msg += `\n🎯 *Fiverr Gig:* ${gig.trim()}`;
    }
    if (goal && goal.trim()) {
      msg += `\n📝 *Goal:* ${goal.trim()}`;
    }

    msg += `\n\nMaine payment & details verify karwane ke liye message kiya hai. Please next steps guide karein!`;

    const encoded = encodeURIComponent(msg);
    const targetNumber = '923060880466';
    return `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encoded}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const leadData = {
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      niche: niche.trim(),
      paymentMethod,
      transactionId: transactionId.trim() || undefined,
      paymentScreenshot: paymentScreenshot || undefined,
      fiverrProfileUrl: fiverrProfileUrl.trim() || undefined,
      fiverrGigUrl: fiverrGigUrl.trim() || undefined,
      improvementGoal: improvementGoal.trim() || undefined,
      status: 'new' as const,
      price: BUSINESS_INFO.price,
    };

    // 1. Save lead to Firestore & local cache
    saveLeadToFirestore(leadData).catch(() => {});

    const targetWhatsAppUrl = getWhatsAppMessageUrl({
      ...leadData,
      hasScreenshot: !!paymentScreenshot,
    });

    // 2. Open WhatsApp safely without iframe connection refusal
    try {
      const link = document.createElement('a');
      link.href = targetWhatsAppUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open(targetWhatsAppUrl, '_blank', 'noopener,noreferrer');
    }

    // 3. Display Thank You view
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="py-12 md:py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <span>Fiverr Optimization Package • {BUSINESS_INFO.price}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Let’s Optimize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Fiverr Presence</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Fill in your profile details and payment receipt below. You'll be connected directly with our team on WhatsApp to begin your optimization!
          </p>
        </div>

        {/* SUCCESS MESSAGE VIEW (Shown after submission) */}
        {isSubmitted ? (
          <div className="bg-white/10 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-300 text-center relative overflow-hidden bg-gradient-to-b from-emerald-950/30 to-black/60">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inquiry Confirmed • High-Quality Service</span>
            </div>

            {/* Glowing Icon */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            {/* Main Thank You Headings in English */}
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Thank You for Contacting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Smart SEO Solutions!</span>
            </h2>

            <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
              We have received your Fiverr optimization requirements. You are in expert hands, and we are dedicated to delivering a <strong>premium, high-quality optimization service</strong> to elevate your profile and gigs.
            </p>

            {/* 3 High-Quality Service Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto mb-8 text-left">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xl mb-2 block">⚡</span>
                  <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider text-orange-400">
                    Highest Quality SEO
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Algorithm-aligned search tags, keyword research, and high-converting gig descriptions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xl mb-2 block">💬</span>
                  <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider text-emerald-400">
                    Direct WhatsApp Support
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Our lead specialist will guide you step-by-step through execution on WhatsApp.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xl mb-2 block">🛡️</span>
                  <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider text-yellow-400">
                    100% Money-Back Promise
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Backed by our transparent 20–25 days outreach guarantee with zero financial risk.
                  </p>
                </div>
              </div>
            </div>

            {/* Return action */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onBackToLanding();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Return to Homepage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING / REQUIREMENTS FORM */
          <form
            id="fiverr-requirements-form"
            onSubmit={handleSubmit}
            noValidate
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
          >
            {/* Form Section 1: Contact Information */}
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <User className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Step 1: Your Contact Information
                </h3>
              </div>

              {/* Full Name & WhatsApp in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/70 mb-1.5">
                    Full Name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="form-full-name"
                    type="text"
                    required
                    placeholder="e.g. Abdul Rehman"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-black/40 border ${
                      errors.fullName ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-orange-500'
                    } text-white placeholder-white/30 text-sm focus:outline-none transition-colors`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/70 mb-1.5">
                    WhatsApp Number <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="form-whatsapp"
                    type="tel"
                    required
                    placeholder="0300... or +92 306..."
                    value={whatsapp}
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                      if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-black/40 border ${
                      errors.whatsapp ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-orange-500'
                    } text-white placeholder-white/30 text-sm focus:outline-none transition-colors`}
                  />
                  {errors.whatsapp && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.whatsapp}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Section 2: Service & Niche */}
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Briefcase className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Step 2: Service & Fiverr Details
                </h3>
              </div>

              {/* Main Service / Niche */}
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/70 mb-1.5">
                  Your Main Service / Niche <span className="text-orange-400">*</span>
                </label>
                <input
                  id="form-niche"
                  type="text"
                  required
                  placeholder="e.g. WordPress Web Development, Graphic Design, Video Editing, 3D Animation..."
                  value={niche}
                  onChange={(e) => {
                    setNiche(e.target.value);
                    if (errors.niche) setErrors({ ...errors, niche: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-black/40 border ${
                    errors.niche ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-orange-500'
                  } text-white placeholder-white/30 text-sm focus:outline-none transition-colors`}
                />
                {errors.niche && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.niche}
                  </p>
                )}
              </div>

              {/* Optional Links Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{showOptional ? '− Hide Optional Fiverr Links' : '+ Add Fiverr Profile / Gig Link (Optional)'}</span>
                </button>

                {showOptional && (
                  <div className="mt-4 p-4 rounded-2xl bg-black/30 border border-white/10 space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-white/60 mb-1">
                        Fiverr Profile URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.fiverr.com/your_username"
                        value={fiverrProfileUrl}
                        onChange={(e) => setFiverrProfileUrl(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-orange-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-white/60 mb-1">
                        Fiverr Gig URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.fiverr.com/share/..."
                        value={fiverrGigUrl}
                        onChange={(e) => setFiverrGigUrl(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-orange-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-white/60 mb-1">
                        Main Challenge / Improvement Goal (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Impressions dropped, need 1st page ranking, low orders..."
                        value={improvementGoal}
                        onChange={(e) => setImprovementGoal(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-orange-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Section 3: Payment Accounts & Screenshot */}
            <div className="space-y-5 mb-8">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Step 3: Payment Transfer ({BUSINESS_INFO.price})
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Account Verified
                </span>
              </div>

              {/* Payment Account Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PAYMENT_ACCOUNTS.map((acc) => {
                  const isSelected = paymentMethod === acc.name;
                  return (
                    <div
                      key={acc.id}
                      onClick={() => setPaymentMethod(acc.name as 'JazzCash' | 'SadaPay')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected 
                          ? 'bg-white/10 border-orange-400/80 shadow-lg shadow-orange-500/10 ring-1 ring-orange-400/50' 
                          : 'bg-black/40 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-md ${acc.badgeBg}`}>
                          {acc.name}
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-orange-400 bg-orange-400' : 'border-white/30'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                        </div>
                      </div>

                      <div className="space-y-1 mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/60">Account Number:</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(acc.accountNumber, `${acc.id}-num`);
                            }}
                            className="font-mono font-bold text-white hover:text-orange-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>{acc.accountNumber}</span>
                            {copiedAccount === `${acc.id}-num` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-white/50" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/60">Account Title:</span>
                          <span className="font-bold text-white">{acc.accountTitle}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Transaction ID & Screenshot Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/70 mb-1.5">
                    Transaction ID / Reference (Optional)
                  </label>
                  <input
                    id="form-trx-id"
                    type="text"
                    placeholder="e.g. TID-982347192"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <p className="text-[10px] text-white/40 mt-1">
                    JazzCash / SadaPay Transaction ID for quick verification.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/70 mb-1.5">
                    Upload Payment Screenshot <span className="text-orange-400">*</span>
                  </label>

                  {paymentScreenshot ? (
                    <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/40 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <img 
                          src={paymentScreenshot} 
                          alt="Payment Screenshot Preview" 
                          className="w-10 h-10 object-cover rounded-lg border border-white/20 flex-shrink-0" 
                        />
                        <div className="truncate text-left">
                          <p className="text-xs font-semibold text-emerald-400 truncate">
                            {screenshotFileName || 'Screenshot attached'}
                          </p>
                          <span className="text-[10px] text-white/50">Ready to send</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentScreenshot('');
                          setScreenshotFileName('');
                        }}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white/70 transition-colors cursor-pointer"
                        title="Remove screenshot"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label 
                      htmlFor="payment-screenshot-input"
                      className="w-full py-3 px-4 rounded-xl bg-black/40 border border-dashed border-white/20 hover:border-orange-400/60 text-white/70 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all hover:bg-white/5"
                    >
                      <Upload className="w-4 h-4 text-orange-400" />
                      <span>Choose Payment Screenshot</span>
                      <input
                        id="payment-screenshot-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  )}

                  {errors.paymentScreenshot && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.paymentScreenshot}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Price review summary card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-white/50 font-semibold block">Total Package Investment:</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                  {BUSINESS_INFO.price}
                </span>
              </div>
              <div className="text-xs text-white/70 sm:text-right">
                <span className="text-emerald-400 font-bold block">✓ Full Profile & Gig SEO Included</span>
                <span>Direct WhatsApp Confirmation</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <button
                id="submit-fiverr-intake-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-black text-sm sm:text-base font-extrabold uppercase tracking-wide flex items-center justify-center gap-3 shadow-xl hover:shadow-orange-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-75"
              >
                <span>
                  {isSubmitting ? 'Saving & Opening WhatsApp...' : '🚀 Submit Details & Contact on WhatsApp'}
                </span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-white/50 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Submit karte hi saari details aur payment record ke sath WhatsApp khul jayega.
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
