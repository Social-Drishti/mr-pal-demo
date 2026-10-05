import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin, Mail, ArrowUpRight, Settings } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Footer: React.FC = () => {
  const { settings, openWhatsApp } = useSite();

  return (
    <footer className="bg-[#102A21] text-[#FAF7F2] pt-16 pb-24 md:pb-16 border-t border-[#173D2C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#173D2C]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F2]">
                MR. PAL
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.24em] text-[#C96F45] uppercase mt-0.5">
                — CARE AT HOME —
              </span>
            </Link>
            <p className="text-sm text-emerald-100/70 max-w-sm leading-relaxed">
              Compassionate, dependable home-care support for patients, senior citizens, and families across Mumbai. Respectful care in the comfort of your own home.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#173D2C] hover:bg-[#1C4B36] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {settings.whatsappNumber}</span>
              </button>
            </div>
          </div>

          {/* Care Services */}
          <div>
            <h4 className="text-xs font-bold text-[#E8DFD3] uppercase tracking-wider mb-4">
              Care Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A9B5AC]">
              <li>
                <Link to="/services/patient-care" className="hover:text-white transition-colors">
                  Patient Care
                </Link>
              </li>
              <li>
                <Link to="/services/elder-care" className="hover:text-white transition-colors">
                  Elder Care
                </Link>
              </li>
              <li>
                <Link to="/services/dementia-care" className="hover:text-white transition-colors">
                  Dementia Care
                </Link>
              </li>
              <li>
                <Link to="/services/paralysis-care" className="hover:text-white transition-colors">
                  Paralysis Care
                </Link>
              </li>
              <li>
                <Link to="/#helper" className="hover:text-white transition-colors text-xs text-[#D06A3B] flex items-center gap-1 mt-1">
                  <span>Care Decision Guide</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* People We Provide */}
          <div>
            <h4 className="text-xs font-bold text-[#E8DFD3] uppercase tracking-wider mb-4">
              Support Staff
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A9B5AC]">
              <li>
                <Link to="/#people" className="hover:text-white transition-colors">
                  Home Nurses
                </Link>
              </li>
              <li>
                <Link to="/#people" className="hover:text-white transition-colors">
                  Caregivers
                </Link>
              </li>
              <li>
                <Link to="/#people" className="hover:text-white transition-colors">
                  Patient Attendants
                </Link>
              </li>
              <li>
                <Link to="/#people" className="hover:text-white transition-colors">
                  Maids & Home Help
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">
                  Meet Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Mumbai Coverage & Contact */}
          <div>
            <h4 className="text-xs font-bold text-[#E8DFD3] uppercase tracking-wider mb-4">
              Service Area
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A9B5AC]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D06A3B] shrink-0 mt-0.5" />
                <span>Across Mumbai, Western & Central Suburbs</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D06A3B] shrink-0" />
                <span>{settings.phoneNumber}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D06A3B] shrink-0" />
                <span>{settings.email}</span>
              </li>
              <li className="pt-2">
                <span className="text-xs text-[#7A887E]">
                  Mon – Sun: 8:00 AM – 9:00 PM (Emergency calls answered 24/7)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A887E] gap-4">
          <p>© {new Date().getFullYear()} MR. PAL — Care at Home. Mumbai, India. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Care Policy
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24352B] text-[#D06A3B] hover:text-white hover:bg-[#2C4135] transition-colors"
              title="Access the CMS website editor demo"
            >
              <Settings className="w-3 h-3" />
              <span>Website Manager</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
