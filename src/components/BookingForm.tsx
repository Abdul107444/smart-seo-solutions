import React, { useState } from 'react';
import { saveLeadToFirestore, checkIfTransactionIdExists } from '../lib/leadsService';
import { verifyPaymentScreenshot, VerificationResult } from '../lib/paymentVerifier';
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
  ShieldCheck,
  ShieldAlert,
  Loader2,
  ScanLine,
  RefreshCw,
  Lock
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
  const [paymentMethod, setPaymentMethod] = useState<string>('Meezan Bank');
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<string>('');
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Instant Verification States
  const [isVerifyingScreenshot, setIsVerifyingScreenshot] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Form Submission States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const runVerification = async (imgData: string) => {
    setIsVerifyingScreenshot(true);
    setVerificationProgress('Initiating instant verification scanner...');
    setVerificationResult(null);

    try {
      const result = await verifyPaymentScreenshot(imgData, (progress) => {
        setVerificationProgress(progress);
      });

      setVerificationResult(result);

      if (result.isValid) {
        // Clear screenshot errors
        setErrors((prev) => {
          const next = { ...prev };
          delete next.paymentScreenshot;
          return next;
        });

        // Auto-fill transaction ID if found and not yet filled
        if (result.detectedDetails.transactionId && !transactionId) {
          setTransactionId(result.detectedDetails.transactionId);
        }

        // Auto-match provider
        if (result.detectedDetails.provider === 'Meezan Bank') {
          setPaymentMethod('Meezan Bank');
        } else if (result.detectedDetails.provider) {
          setPaymentMethod(result.detectedDetails.provider);
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          paymentScreenshot: result.reason || 'Screenshot verification failed. Payment must be sent to Zeenat yasmin (Meezan Bank: PK20MEZN0000300114121316).',
        }));
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      setVerificationResult({
        isValid: false,
        status: 'error',
        confidence: 0,
        title: 'Verification Scan Error',
        reason: 'Could not complete the receipt scan. Please ensure the receipt is clear and readable.',
        detectedDetails: {
          recipientMatched: false,
          numberMatched: false,
          amountMatched: false,
        },
      });
    } finally {
      setIsVerifyingScreenshot(false);
      setVerificationProgress('');
    }
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
        let finalDataUrl = '';
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          finalDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        } else {
          finalDataUrl = event.target?.result as string;
        }

        setPaymentScreenshot(finalDataUrl);
        // Trigger instant AI verification
        runVerification(finalDataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const validateForm = async () => {
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

    // Strict payment verification checks: Prevent fake or missing screenshot
    if (!paymentScreenshot) {
      newErrors.paymentScreenshot = 'Payment screenshot is required. Please upload your Meezan Bank transfer receipt.';
    } else if (verificationResult && !verificationResult.isValid) {
      newErrors.paymentScreenshot = verificationResult.reason || 'Screenshot rejected. Please upload a genuine payment receipt.';
    }

    // Check duplicate transaction ID in Firestore database
    if (transactionId.trim()) {
      try {
        const dup = await checkIfTransactionIdExists(transactionId.trim());
        if (dup.exists) {
          newErrors.transactionId = 'This Transaction ID has already been registered in our system. Reused receipts are not allowed.';
        }
      } catch {}
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

    msg += `💳 *Payment Method:* ${selectedMethod} (Meezan Bank - PK20MEZN0000300114121316)\n`;
    msg += `👤 *Account Title:* Zeenat yasmin\n`;
    msg += `💰 *Amount:* ${BUSINESS_INFO.price}\n`;
    if (trx.trim()) {
      msg += `🔢 *Trx ID / Ref:* ${trx.trim()}\n`;
    }
    if (hasProof) {
      msg += `📸 *Payment Screenshot:* Attached with verified receipt\n`;
    }
    if (verificationResult?.isValid) {
      msg += `🛡️ *Payment Verification:* ✅ Genuine Receipt Verified (${verificationResult.detectedDetails?.provider || selectedMethod} to Zeenat yasmin - Meezan Bank)\n`;
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

    if (isVerifyingScreenshot) {
      return;
    }

    const isValid = await validateForm();
    if (!isValid) {
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const isVerified = verificationResult?.isValid ?? false;
    const verifyNote = isVerified 
      ? `Verified ${verificationResult?.detectedDetails?.provider || paymentMethod} transfer to Zeenat yasmin (TID: ${transactionId || 'In image'})`
      : undefined;

    const leadData = {
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      niche: niche.trim(),
      paymentMethod,
      transactionId: transactionId.trim() || undefined,
      paymentScreenshot: paymentScreenshot || undefined,
      isPaymentVerified: isVerified,
      verificationNote: verifyNote,
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
              <div className="grid grid-cols-1 gap-3.5">
                {PAYMENT_ACCOUNTS.map((acc) => {
                  const isSelected = paymentMethod === acc.name;
                  return (
                    <div
                      key={acc.id}
                      onClick={() => setPaymentMethod(acc.name)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected 
                          ? 'bg-blue-950/30 border-blue-400/80 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/50' 
                          : 'bg-black/40 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-md ${acc.badgeBg}`}>
                            {acc.name}
                          </span>
                          <span className="text-[10px] text-white/50">Official Direct Payment Method</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-blue-400 bg-blue-500' : 'border-white/30'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                          <span className="text-[11px] text-white/60 block mb-0.5">Account Title:</span>
                          <span className="font-bold text-white text-sm">{acc.accountTitle}</span>
                          <span className="text-[10px] text-emerald-400 block mt-0.5">✓ Verified Bank Account</span>
                        </div>

                        <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                          <span className="text-[11px] text-white/60 block mb-0.5">Meezan IBAN / Account Number:</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(acc.accountNumber, `${acc.id}-num`);
                            }}
                            className="w-full font-mono font-bold text-blue-300 hover:text-white flex items-center justify-between gap-1.5 transition-colors cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg border border-blue-500/20 text-xs mt-1"
                          >
                            <span className="truncate">{acc.accountNumber}</span>
                            {copiedAccount === `${acc.id}-num` ? (
                              <span className="text-[10px] text-emerald-400 font-sans flex items-center gap-0.5 shrink-0">
                                <Check className="w-3 h-3 text-emerald-400" /> Copied
                              </span>
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                            )}
                          </button>
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
                    Meezan Bank / Raast / IBFT Transaction ID for quick verification.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/70">
                      Upload Payment Screenshot <span className="text-orange-400">*</span>
                    </label>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Auto-Verified
                    </span>
                  </div>

                  {/* 1. Loading Scanner State */}
                  {isVerifyingScreenshot && (
                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/40 text-left space-y-2.5 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-orange-400 font-bold text-xs">
                          <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                          <span>Scanning & Verifying Screenshot...</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">
                          AI OCR
                        </span>
                      </div>
                      <p className="text-[11px] text-white/90 font-medium">
                        {verificationProgress || 'Analyzing receipt text, recipient & amount...'}
                      </p>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 animate-pulse w-full rounded-full" />
                      </div>
                      <p className="text-[10px] text-white/50">
                        Checking recipient (Zeenat yasmin - Meezan Bank PK20MEZN0000300114121316) & duplicate receipts database.
                      </p>
                    </div>
                  )}

                  {/* 2. Success: Verified Genuine Receipt */}
                  {!isVerifyingScreenshot && paymentScreenshot && verificationResult?.isValid && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/60 text-left space-y-2.5 shadow-lg shadow-emerald-950/50">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                            Authentic Payment Receipt Verified
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentScreenshot('');
                            setScreenshotFileName('');
                            setVerificationResult(null);
                          }}
                          className="p-1 rounded bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white/60 transition-colors cursor-pointer"
                          title="Remove screenshot"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <img 
                          src={paymentScreenshot} 
                          alt="Verified Payment Receipt" 
                          className="w-12 h-12 object-cover rounded-lg border border-emerald-500/40 flex-shrink-0" 
                        />
                        <div className="text-[11px] space-y-0.5 min-w-0">
                          <div className="text-white font-medium flex items-center gap-1">
                            <span className="text-white/60">Recipient:</span>
                            <span className="font-bold text-emerald-300">Zeenat yasmin (Meezan Bank)</span>
                          </div>
                          <div className="text-white/70 flex items-center gap-2">
                            <span>Method: <strong className="text-white">{verificationResult.detectedDetails.provider || paymentMethod}</strong></span>
                            {verificationResult.detectedDetails.detectedAmount && (
                              <span>• Amount: <strong className="text-emerald-400">{verificationResult.detectedDetails.detectedAmount}</strong></span>
                            )}
                          </div>
                          {verificationResult.detectedDetails.transactionId && (
                            <div className="font-mono text-[10px] text-white/60 truncate">
                              Trx ID: {verificationResult.detectedDetails.transactionId}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Rejection: Fake or Invalid Screenshot */}
                  {!isVerifyingScreenshot && paymentScreenshot && verificationResult && !verificationResult.isValid && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/60 text-left space-y-2.5 shadow-lg shadow-red-950/50">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                          </div>
                          <span className="text-xs font-black text-red-400 uppercase tracking-wide">
                            {verificationResult.title || 'Fake or Unverified Receipt Rejected'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentScreenshot('');
                            setScreenshotFileName('');
                            setVerificationResult(null);
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.paymentScreenshot;
                              return next;
                            });
                          }}
                          className="p-1 rounded bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white/60 transition-colors cursor-pointer"
                          title="Remove & re-upload"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-start gap-3">
                        <img 
                          src={paymentScreenshot} 
                          alt="Rejected Screenshot" 
                          className="w-12 h-12 object-cover rounded-lg border border-red-500/40 flex-shrink-0 opacity-60" 
                        />
                        <div className="text-[11px] text-red-200/90 leading-relaxed">
                          <p className="font-semibold text-red-400 mb-1">{verificationResult.reason}</p>
                          <p className="text-[10px] text-white/60">
                            Fake receipts, unrelated screenshots, or transfers to other accounts are strictly blocked. Payment must be sent to <strong>Zeenat yasmin (Meezan Bank: PK20MEZN0000300114121316)</strong>.
                          </p>
                        </div>
                      </div>

                      <label 
                        htmlFor="payment-screenshot-input-reupload"
                        className="w-full py-2.5 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Upload Genuine Payment Receipt</span>
                        <input
                          id="payment-screenshot-input-reupload"
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
                    </div>
                  )}

                  {/* 4. Empty: Upload Prompt */}
                  {!isVerifyingScreenshot && !paymentScreenshot && (
                    <label 
                      htmlFor="payment-screenshot-input"
                      className="w-full py-3 px-4 rounded-xl bg-black/40 border border-dashed border-white/20 hover:border-orange-400/60 text-white/70 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all hover:bg-white/5"
                    >
                      <Upload className="w-4 h-4 text-orange-400" />
                      <span>Upload Payment Screenshot (Instant Verification)</span>
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
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 mb-8 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
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

              {/* Flexible payment option note in English */}
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-400/20 text-xs leading-relaxed text-white/90 flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">💡</span>
                <div>
                  <strong className="text-orange-400 font-bold block mb-0.5">Flexible Payment Option:</strong>
                  <span>
                    If you cannot pay the full amount upfront, you can pay <strong className="text-white font-semibold">70% in advance</strong> (Rs. 5,600) to start, and the remaining <strong className="text-emerald-400 font-semibold">30% after the work is done</strong> (Rs. 2,400).
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              {isVerifyingScreenshot ? (
                <button
                  id="submit-fiverr-intake-btn"
                  type="button"
                  disabled={true}
                  className="w-full py-4 sm:py-4.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm sm:text-base font-extrabold uppercase tracking-wide flex items-center justify-center gap-3 cursor-wait"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Verifying Payment Screenshot...</span>
                </button>
              ) : verificationResult && !verificationResult.isValid ? (
                <button
                  id="submit-fiverr-intake-btn"
                  type="button"
                  disabled={true}
                  className="w-full py-4 sm:py-4.5 rounded-2xl bg-red-950/40 border border-red-500/50 text-red-300 text-sm sm:text-base font-extrabold uppercase tracking-wide flex items-center justify-center gap-3 cursor-not-allowed opacity-80"
                >
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>Valid Payment Receipt Required To Proceed</span>
                </button>
              ) : (
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
              )}

              <div className="flex items-center justify-center gap-2 text-xs text-white/50 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Automated anti-fraud protection active. Only genuine Meezan Bank transfers to Zeenat yasmin are accepted.
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
