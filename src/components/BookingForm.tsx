import React, { useState } from 'react';
import { saveLeadSubmission } from '../lib/supabaseClient';
import { BUSINESS_INFO } from '../data/funnelData';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  User, 
  Briefcase,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface BookingFormProps {
  onBackToLanding: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onBackToLanding }) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [niche, setNiche] = useState('');

  // Form states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [submittedLeadData, setSubmittedLeadData] = useState<any>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';

    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    }

    if (!niche.trim()) {
      newErrors.niche = 'Your main service / niche is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const leadData = {
      fullName,
      whatsapp,
      niche,
    };

    const res = await saveLeadSubmission(leadData);

    setIsSubmitting(false);
    if (res.success) {
      setSubmittedLeadData(res.data);
      setIsSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      alert('Could not submit details. Please check connection and try again.');
    }
  };

  // Generate WhatsApp Direct link prefilled with lead details
  const getWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `👋 Hi Smart SEO Solutions!\n\nI just submitted my details for Fiverr Optimization (Rs. 10,000).\n\n👤 Name: ${fullName}\n📱 WhatsApp: ${whatsapp}\n💼 Niche: ${niche}\n\nPlease review my details and let's get started!`
    );
    return `https://wa.me/923060880466?text=${text}`;
  };

  const copyLeadSummary = () => {
    const summary = `Smart SEO Solutions Intake Summary:\nName: ${fullName}\nWhatsApp: ${whatsapp}\nNiche: ${niche}`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
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
            Share your contact details and service niche with us to start your complete Fiverr ranking and conversion optimization.
          </p>
        </div>

        {/* SUCCESS MESSAGE VIEW (Shown after submission) */}
        {isSubmitted ? (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-300 text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              🎉 Your details have been received!
            </h2>

            <p className="text-sm sm:text-base text-white/80 mb-6 leading-relaxed font-medium">
              Our team will review your requirements and reach out to you directly on WhatsApp.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 max-w-lg mx-auto mb-8 text-sm text-white/90 text-left space-y-2">
              <div className="flex justify-between items-center text-xs text-orange-400 font-bold border-b border-white/10 pb-2">
                <span>Submitted Intake Summary</span>
                <span>Ready for Review</span>
              </div>
              <p><strong>Name:</strong> {submittedLeadData?.fullName}</p>
              <p><strong>WhatsApp:</strong> {submittedLeadData?.whatsapp}</p>
              <p><strong>Target Niche:</strong> {submittedLeadData?.niche}</p>
            </div>

            <p className="text-sm font-semibold text-orange-400 mb-6">
              For faster communication, message us directly on WhatsApp:
            </p>

            {/* Direct WhatsApp Action with Prefilled Message */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
              <a
                id="thankyou-whatsapp-direct-btn"
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-black font-extrabold text-sm uppercase tracking-wide flex items-center justify-center gap-3 shadow-xl transition-all glow-gold"
              >
                <MessageSquare className="w-5 h-5 text-black" />
                <span>💬 Chat on WhatsApp Now</span>
              </a>
            </div>

            {/* Secondary actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-white/10">
              <button
                onClick={copyLeadSummary}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/90 transition-colors"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Copied Summary!' : 'Copy Summary'}</span>
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onBackToLanding();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/90 transition-colors"
              >
                <span>Back to Landing Page</span>
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
                  Step 1: Contact Information
                </h3>
              </div>

              {/* Full Name & WhatsApp in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/50 mb-1.5">
                    Full Name <span className="text-orange-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="form-full-name"
                      type="text"
                      required
                      placeholder="e.g. Hamza Saeed"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border ${
                        errors.fullName ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-orange-500'
                      } text-white placeholder-white/30 text-sm focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/50 mb-1.5">
                    WhatsApp Number <span className="text-orange-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="form-whatsapp"
                      type="tel"
                      required
                      placeholder="+92 306 0880466 or 03XX..."
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(e.target.value);
                        if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border ${
                        errors.whatsapp ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-orange-500'
                      } text-white placeholder-white/30 text-sm focus:outline-none transition-colors`}
                    />
                  </div>
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
                  Step 2: Service Niche
                </h3>
              </div>

              {/* Main Service / Niche */}
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-white/50 mb-1.5">
                  Your Main Service / Niche <span className="text-orange-400">*</span>
                </label>
                <input
                  id="form-niche"
                  type="text"
                  required
                  placeholder="e.g. WordPress & Laravel, Video Editing, 3D Animation, Graphic Design, etc."
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
            </div>

            {/* Price review chip */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-white/50 font-semibold block">Total Package Investment:</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">{BUSINESS_INFO.price}</span>
              </div>
              <div className="text-xs text-white/70 sm:text-right">
                <span className="text-green-400 font-bold block">✓ One-Time Complete Optimization</span>
                <span>Delivery in 2–4 Business Days</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <button
                id="submit-fiverr-intake-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-sm sm:text-base font-extrabold uppercase tracking-wide flex items-center justify-center gap-3 shadow-xl hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-75"
              >
                <span>{isSubmitting ? 'Saving Details...' : '🚀 Submit My Details & Start Optimization'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-white/40 text-center">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>Your information is strictly confidential. Work can be done directly or via AnyDesk remote screen.</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
