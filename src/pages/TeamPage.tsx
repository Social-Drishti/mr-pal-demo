import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, MessageCircle, Heart, Shield } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const TeamPage: React.FC = () => {
  const { team, openWhatsApp } = useSite();

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[11px] font-semibold text-[#C96F45] tracking-[0.2em] uppercase bg-[#E8D8C5]/60 px-3.5 py-1 rounded-full">
            OUR DEDICATED TEAM
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#102A21] tracking-tight">
            Meet the people behind the care.
          </h1>
          <p className="text-base sm:text-lg text-[#5F6B64] leading-relaxed">
            Our team coordinates, vets, and supports every caregiver and family across Mumbai. We are always one call away.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-5 border border-[#E2D7C7] shadow-xs hover:shadow-md transition-smooth flex flex-col justify-between"
            >
              <div>
                <div className="rounded-xl overflow-hidden aspect-[4/3] mb-4 bg-[#E8D8C5]">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] font-bold text-[#C96F45] uppercase tracking-wider block mb-1">
                  {member.designation}
                </span>
                <h3 className="font-display text-xl font-bold text-[#102A21]">
                  {member.name}
                </h3>
                <p className="text-xs text-[#5F6B64] mt-2 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F0EAE1]">
                <Link
                  to={`/team/${member.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#102A21] hover:text-[#C96F45] transition-colors"
                >
                  <span>View Profile & Expertise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="bg-[#EFE9DD] rounded-3xl p-8 sm:p-10 border border-[#E2D7C7] text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#102A21] text-white flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-display text-2xl font-normal text-[#102A21]">
            Need advice on which care plan suits your family?
          </h3>
          <p className="text-sm text-[#5F6B64] max-w-lg mx-auto">
            Our care coordinators can speak with you over a 10-minute friendly phone call or WhatsApp chat.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/book-a-call"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book a Discovery Call</span>
            </Link>
            <button
              onClick={() => openWhatsApp('Hi, I would like to speak with Mr. Pal team.')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#102A21] text-[#102A21] hover:bg-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Coordinator</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
