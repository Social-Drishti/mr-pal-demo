import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Navbar: React.FC = () => {
  const { openWhatsApp, settings } = useSite();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#E2D7C7] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Wordmark (Understated, premium text-based wordmark) */}
          <Link to="/" className="flex flex-col group text-left">
            <span className="font-display text-2xl sm:text-[27px] font-bold tracking-tight text-[#102A21] group-hover:text-[#C96F45] transition-colors">
              MR. PAL
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.26em] text-[#5F6B64] uppercase -mt-0.5">
              — CARE AT HOME —
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-[#17211D]">
            <Link
              to="/"
              className={`hover:text-[#C96F45] transition-colors relative py-1 ${
                isActive('/') ? 'text-[#102A21] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C96F45]' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`hover:text-[#C96F45] transition-colors relative py-1 ${
                isActive('/about') ? 'text-[#102A21] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C96F45]' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/#services"
              className={`hover:text-[#C96F45] transition-colors relative py-1 ${
                isActive('/services') ? 'text-[#102A21] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C96F45]' : ''
              }`}
            >
              Services
            </Link>
            <Link
              to="/team"
              className={`hover:text-[#C96F45] transition-colors relative py-1 ${
                isActive('/team') ? 'text-[#102A21] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C96F45]' : ''
              }`}
            >
              Our Team
            </Link>
            <Link
              to="/book-a-call"
              className={`hover:text-[#C96F45] transition-colors relative py-1 ${
                isActive('/book-a-call') ? 'text-[#102A21] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C96F45]' : ''
              }`}
            >
              Book a Call
            </Link>
          </nav>

          {/* Desktop Primary Action */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openWhatsApp()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#173D2C] hover:bg-[#102A21] text-white text-xs font-semibold tracking-wide transition-smooth shadow-xs cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>WhatsApp Us</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#102A21] hover:bg-[#E8D8C5]/50 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-[85%] max-w-sm bg-[#FAF7F2] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD3]">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold tracking-tight text-[#1A382B]">
                    MR. PAL
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#5C655F] uppercase">
                    CARE AT HOME
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-[#F4EFE6] text-[#222522]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-6 text-base font-medium text-[#222522]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg hover:bg-[#F4EFE6] transition-colors ${
                    isActive('/') ? 'text-[#1A382B] font-bold bg-[#F4EFE6]' : ''
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg hover:bg-[#F4EFE6] transition-colors ${
                    isActive('/about') ? 'text-[#1A382B] font-bold bg-[#F4EFE6]' : ''
                  }`}
                >
                  About Mr. Pal
                </Link>
                <div className="px-3 py-1">
                  <span className="text-xs font-semibold text-[#8B948E] uppercase tracking-wider block mb-2">
                    Care Services
                  </span>
                  <div className="pl-2 flex flex-col gap-2 text-sm text-[#3E4540]">
                    <Link
                      to="/services/patient-care"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1 hover:text-[#D06A3B]"
                    >
                      Patient Care
                    </Link>
                    <Link
                      to="/services/elder-care"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1 hover:text-[#D06A3B]"
                    >
                      Elder Care
                    </Link>
                    <Link
                      to="/services/dementia-care"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1 hover:text-[#D06A3B]"
                    >
                      Dementia Care
                    </Link>
                    <Link
                      to="/services/paralysis-care"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1 hover:text-[#D06A3B]"
                    >
                      Paralysis Care
                    </Link>
                  </div>
                </div>
                <Link
                  to="/team"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg hover:bg-[#F4EFE6] transition-colors ${
                    isActive('/team') ? 'text-[#1A382B] font-bold bg-[#F4EFE6]' : ''
                  }`}
                >
                  Our Team
                </Link>
                <Link
                  to="/book-a-call"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg hover:bg-[#F4EFE6] transition-colors ${
                    isActive('/book-a-call') ? 'text-[#1A382B] font-bold bg-[#F4EFE6]' : ''
                  }`}
                >
                  Book a Call
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-[#F4EFE6] transition-colors text-xs text-[#5C655F] flex items-center gap-1.5 mt-2 border-t border-[#E8DFD3] pt-4"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D06A3B]" />
                  <span>Website Manager (CMS Demo)</span>
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8DFD3] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1A382B] text-white text-sm font-semibold shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Us</span>
              </button>

              <Link
                to="/book-a-call"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#1A382B] text-[#1A382B] text-sm font-semibold hover:bg-[#F4EFE6]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Book a Call</span>
              </Link>

              <p className="text-center text-[11px] text-[#8B948E] pt-2">
                Available across Mumbai · {settings.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
