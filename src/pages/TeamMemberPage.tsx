import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, PhoneCall, Check, Shield, UserCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const TeamMemberPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { team, openWhatsApp } = useSite();

  const member = team.find(m => m.slug === slug) || team[0];

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/team"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C655F] hover:text-[#1A382B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Team Members</span>
          </Link>
        </div>

        {/* Member Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2D7C7] shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E2D7C7] shadow-xs bg-[#E8D8C5]">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] font-bold text-[#C96F45] uppercase tracking-wider bg-[#E8D8C5]/60 px-3 py-1 rounded-full">
                {member.designation}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#102A21]">
                {member.name}
              </h1>
              <p className="text-sm text-[#5F6B64] leading-relaxed">
                {member.bio}
              </p>
              
              <div className="pt-2 text-xs text-[#5F6B64]">
                {member.phoneOrContactNote}
              </div>
            </div>

          </div>
        </div>

        {/* Expertise & Responsibilities */}
        <div className="bg-[#EFE9DD] rounded-3xl p-6 sm:p-8 border border-[#E2D7C7] mb-10">
          <h2 className="font-display text-xl font-normal text-[#102A21] mb-4">
            Areas of Focus & Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {member.expertise.map((exp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 border border-[#E2D7C7] flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-[#173D2C]/10 text-[#102A21] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-[#17211D]">
                  {exp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl p-6 border border-[#E2D7C7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-[#102A21]">
              Need to consult with {member.name}?
            </h3>
            <p className="text-xs text-[#5F6B64]">
              Connect through WhatsApp or book a phone consultation with Mr. Pal.
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => openWhatsApp(`Hi ${member.name}, I would like to consult regarding home care.`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Message on WhatsApp</span>
            </button>
            <Link
              to="/book-a-call"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#102A21] text-[#102A21] hover:bg-[#F5F1E8] text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <span>Book Call</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
