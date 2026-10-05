import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const StickyMobileBar: React.FC = () => {
  const { openWhatsApp } = useSite();
  const location = useLocation();

  // Determine contextual message if on a service page
  let contextualMessage: string | undefined = undefined;
  if (location.pathname === '/services/elder-care') {
    contextualMessage = 'Hi, I would like to enquire about Elder Care.';
  } else if (location.pathname === '/services/patient-care') {
    contextualMessage = 'Hi, I would like to enquire about Patient Care.';
  } else if (location.pathname === '/services/dementia-care') {
    contextualMessage = 'Hi, I would like to enquire about Dementia Care.';
  } else if (location.pathname === '/services/paralysis-care') {
    contextualMessage = 'Hi, I would like to enquire about Paralysis Care.';
  }

  // Hide on admin routes so admin has full screen
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#F5F1E8]/95 backdrop-blur-md border-t border-[#E2D7C7] p-2.5 px-4 shadow-lg">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <Link
          to="/book-a-call"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#102A21] text-white text-xs font-semibold tracking-wide shadow-xs active:scale-[0.98] transition-transform truncate"
        >
          <PhoneCall className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Book a Call</span>
        </Link>

        <button
          onClick={() => openWhatsApp(contextualMessage)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#173D2C] hover:bg-[#102A21] text-white text-xs font-bold tracking-wide shadow-xs active:scale-[0.98] transition-transform truncate cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 shrink-0 text-emerald-400 fill-emerald-400/20" />
          <span className="truncate">WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
