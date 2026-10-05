import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const WhatsAppModal: React.FC = () => {
  const { activeWhatsAppMsg, closeWhatsAppModal, settings } = useSite();
  const [simulatedSent, setSimulatedSent] = useState(false);

  if (!activeWhatsAppMsg) return null;

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(activeWhatsAppMsg);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  const handleOpenLiveWhatsApp = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSimulate = () => {
    setSimulatedSent(true);
    setTimeout(() => {
      // Keep it visible for demo
    }, 200);
  };

  const handleClose = () => {
    setSimulatedSent(false);
    closeWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* WhatsApp Header bar */}
        <div className="bg-[#1A382B] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-white font-display font-bold">
              MP
            </div>
            <div>
              <div className="font-semibold text-sm leading-tight">MR. PAL — Care at Home</div>
              <div className="text-[11px] text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Care Coordinator Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Chat Body */}
        <div className="p-5 bg-[#F4EFE6]/80 min-h-[160px] flex flex-col justify-end">
          {simulatedSent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900">Enquiry Simulated Successfully</h4>
              <p className="text-xs text-emerald-700 leading-relaxed">
                In production, this opens WhatsApp directly on your phone with the care team at <span className="font-semibold">{settings.whatsappNumber}</span>.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-[10px] font-medium text-[#7C857E] bg-white/70 px-2 py-0.5 rounded-full">
                  Today · Mumbai Home Care Desk
                </span>
              </div>
              <div className="self-end ml-auto bg-[#E7F8EC] border border-[#C5E8D0] text-[#1E3A2B] rounded-2xl rounded-tr-xs p-3 text-xs leading-relaxed max-w-[90%] shadow-xs">
                {activeWhatsAppMsg}
                <div className="text-[10px] text-emerald-700/70 text-right mt-1 font-mono">
                  Just now ✓✓
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-white border-t border-[#E8DFD3] space-y-2.5">
          {!simulatedSent ? (
            <>
              <button
                onClick={handleOpenLiveWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A2616] font-bold text-xs tracking-wide shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-[#0A2616]/20" />
                <span>Open in WhatsApp (+91 98200 12345)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleSimulate}
                className="w-full py-2.5 px-4 rounded-xl border border-[#D5C9B8] hover:bg-[#FAF7F2] text-[#333] text-xs font-medium transition-colors cursor-pointer"
              >
                Simulate Direct Message in Demo
              </button>
            </>
          ) : (
            <button
              onClick={handleClose}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1A382B] text-white text-xs font-semibold hover:bg-[#12281E] transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
