import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, PhoneCall, Shield, Clock, Heart } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const BookCallPage: React.FC = () => {
  const { openWhatsApp, settings } = useSite();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    careRequired: 'Elder Care',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <span className="text-[11px] font-semibold text-[#C96F45] tracking-[0.2em] uppercase bg-[#E8D8C5]/60 px-3.5 py-1 rounded-full">
            QUICK FAMILY CONSULTATION
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#102A21] tracking-tight">
            Let's talk about your requirement.
          </h1>
          <p className="text-sm sm:text-base text-[#5F6B64] leading-relaxed">
            Fill out the details below. Our Mumbai care coordinator will call you back to understand your situation without any obligation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#E2D7C7] shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#102A21]">
                  Thank you. We've received your request.
                </h3>
                <p className="text-sm text-[#5F6B64] max-w-md mx-auto leading-relaxed">
                  Our coordinator will reach out to <span className="font-semibold text-[#102A21]">{formData.phone}</span> shortly to discuss care arrangements for your loved one.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => {
                      const msg = `Hi, I just submitted a call request for ${formData.careRequired} in ${formData.location || 'Mumbai'}. My name is ${formData.name}.`;
                      openWhatsApp(msg);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Connect Immediately on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full border border-[#E2D7C7] text-xs font-semibold text-[#5F6B64] hover:bg-[#F5F1E8]"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#17211D] uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Joshi"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2D7C7] focus:border-[#102A21] focus:ring-1 focus:ring-[#102A21] bg-[#F5F1E8]/50 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17211D] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98200 XXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2D7C7] focus:border-[#102A21] focus:ring-1 focus:ring-[#102A21] bg-[#F5F1E8]/50 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#17211D] uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2D7C7] focus:border-[#102A21] focus:ring-1 focus:ring-[#102A21] bg-[#F5F1E8]/50 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17211D] uppercase tracking-wider mb-1.5">
                      Care Required *
                    </label>
                    <select
                      value={formData.careRequired}
                      onChange={e => setFormData({ ...formData, careRequired: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2D7C7] focus:border-[#102A21] focus:ring-1 focus:ring-[#102A21] bg-[#F5F1E8]/50 text-sm outline-none transition-colors cursor-pointer"
                    >
                      <option value="Patient Care">Patient Care</option>
                      <option value="Elder Care">Elder Care</option>
                      <option value="Dementia Care">Dementia Care</option>
                      <option value="Paralysis Care">Paralysis Care</option>
                      <option value="Caregiver / Attendant">Caregiver / Attendant</option>
                      <option value="Maids / Home Help">Maids / Home Help</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17211D] uppercase tracking-wider mb-1.5">
                    Location in Mumbai
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Andheri West, Bandra, Powai, Borivali, Chembur, Worli..."
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2D7C7] focus:border-[#102A21] focus:ring-1 focus:ring-[#102A21] bg-[#F5F1E8]/50 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17211D] uppercase tracking-wider mb-1.5">
                    Brief Care Requirement / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your loved one's age, medical condition, hours needed (day, night, 24/7)..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2D7C7] focus:border-[#102A21] focus:ring-1 focus:ring-[#102A21] bg-[#F5F1E8]/50 text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white font-semibold text-xs tracking-wider uppercase shadow-xs transition-smooth cursor-pointer"
                  >
                    Request a Call
                  </button>
                </div>

                <p className="text-[11px] text-[#5F6B64] text-center pt-2">
                  🔒 We respect your family's privacy. No spam. No unsolicited marketing.
                </p>

              </form>
            )}
          </div>

          {/* Right info side */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-[#EFE9DD] rounded-3xl p-6 border border-[#E2D7C7] space-y-4">
              <h3 className="font-display text-lg font-bold text-[#102A21]">
                Prefer instant messaging?
              </h3>
              <p className="text-xs text-[#5F6B64] leading-relaxed">
                You can chat directly with Mr. Pal's care coordinator right now. Quick, friendly, and informal.
              </p>
              <button
                onClick={() => openWhatsApp('Hi, I would like to enquire about home-care services in Mumbai.')}
                className="w-full py-3 px-4 rounded-full bg-[#173D2C] hover:bg-[#102A21] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>WhatsApp Us Directly</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E2D7C7] space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C96F45]" />
                <div>
                  <h4 className="text-xs font-bold text-[#102A21]">Prompt Response</h4>
                  <p className="text-[11px] text-[#5F6B64]">Calls returned within 15–30 minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-[#F0EAE1]">
                <Shield className="w-5 h-5 text-[#102A21]" />
                <div>
                  <h4 className="text-xs font-bold text-[#102A21]">Mumbai Vetted Care</h4>
                  <p className="text-[11px] text-[#5F6B64]">Reliable background checks on staff</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
