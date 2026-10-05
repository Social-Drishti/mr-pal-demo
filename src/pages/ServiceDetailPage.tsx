import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageCircle, PhoneCall, Check, ArrowRight, ArrowLeft, Heart, Shield, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, openWhatsApp } = useSite();
  const navigate = useNavigate();

  const service = services.find(s => s.slug === slug) || services[0];
  const otherServices = services.filter(s => s.slug !== service.slug);

  const waMessage = `Hi, I would like to enquire about ${service.name}.`;

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link
            to="/#services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C655F] hover:text-[#1A382B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>
        </div>

        {/* ======================================================== */}
        {/* HERO SECTION                                            */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E2D7C7] shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D8C5]/60 text-[#C96F45] text-[11px] font-semibold uppercase tracking-wider">
                <Heart className="w-3 h-3 fill-[#C96F45]" />
                <span>Home Care in Mumbai</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#102A21] tracking-tight leading-[1.12]">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-[#5F6B64] leading-relaxed">
                {service.description || service.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => openWhatsApp(waMessage)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Us for {service.name}</span>
                </button>

                <Link
                  to="/book-a-call"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#102A21] text-[#102A21] hover:bg-[#F5F1E8] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book a Call</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E2D7C7]/60 flex items-center gap-6 text-xs text-[#5F6B64]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C96F45]" />
                  <span>Dedicated Care Assistant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#102A21]" />
                  <span>Verified Mumbai Personnel</span>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E2D7C7] shadow-md bg-[#E8D8C5]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* WHAT SUPPORT MAY BE NEEDED? (SUPPORT POINTS)             */}
        {/* ======================================================== */}
        <div className="mb-14">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#102A21]">
              What support may be needed?
            </h2>
            <p className="text-sm text-[#5F6B64] mt-1.5">
              Every individual is unique. Common aspects of daily assistance provided by Mr. Pal care staff include:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.supportPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-[#E2D7C7] flex items-start gap-3.5 shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#E8D8C5]/60 text-[#C96F45] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-[#17211D] leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* HOW WE CAN HELP (4 CARDS)                                */}
        {/* ======================================================== */}
        {service.howWeHelpCards && service.howWeHelpCards.length > 0 && (
          <div className="mb-14 bg-[#EFE9DD] rounded-3xl p-6 sm:p-10 border border-[#E2D7C7]">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#102A21]">
                How we can help
              </h2>
              <p className="text-xs sm:text-sm text-[#5F6B64] mt-1.5">
                Thoughtful, structured assistance designed to bring calm and dignity to your home.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.howWeHelpCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-[#E2D7C7] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#C96F45] block mb-2">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-base font-bold text-[#102A21] mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#5F6B64] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* WHO IS THIS CARE FOR?                                    */}
        {/* ======================================================== */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-[#E2D7C7]">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#C96F45] uppercase tracking-wider">
              Care Suitability
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#102A21]">
              Who is this care for?
            </h2>
            <p className="text-sm text-[#5F6B64] leading-relaxed">
              We help families find the right level of support according to current health, mobility, and family schedule.
            </p>
            <ul className="space-y-2.5 pt-2">
              {service.whoIsThisFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17211D]">
                  <Check className="w-4 h-4 text-[#C96F45] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 bg-[#F5F1E8] rounded-2xl p-6 border border-[#E2D7C7] text-center space-y-4">
            <h3 className="font-display text-xl font-bold text-[#102A21]">
              Have questions about {service.name}?
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6B64] max-w-md mx-auto leading-relaxed">
              Talk directly with Mr. Pal's care coordinator in Mumbai. We will listen to your requirements and explain the best support options.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => openWhatsApp(waMessage)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Talk to Us on WhatsApp</span>
              </button>
              <Link
                to="/book-a-call"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#102A21] text-[#102A21] hover:bg-white text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <span>Book a Call</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* OTHER CARE OPTIONS                                       */}
        {/* ======================================================== */}
        <div>
          <h3 className="font-display text-xl font-bold text-[#102A21] mb-6">
            Explore Other Care Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherServices.slice(0, 3).map((os) => (
              <div
                key={os.id}
                onClick={() => navigate(`/services/${os.slug}`)}
                className="bg-white rounded-xl p-4 border border-[#E2D7C7] hover:border-[#C96F45] transition-smooth cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <h4 className="font-display text-sm font-bold text-[#102A21] group-hover:text-[#C96F45]">
                    {os.name}
                  </h4>
                  <p className="text-xs text-[#5F6B64] line-clamp-1 mt-0.5">
                    {os.shortDescription}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#5F6B64] group-hover:text-[#C96F45] group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
