import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, PhoneCall, Heart, Users, Shield, Smile } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const AboutPage: React.FC = () => {
  const { openWhatsApp } = useSite();

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[11px] font-semibold text-[#C96F45] tracking-[0.2em] uppercase bg-[#E8D8C5]/60 px-3.5 py-1 rounded-full">
            ABOUT MR. PAL
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#102A21] tracking-tight">
            Care is personal.
          </h1>
          <p className="text-base sm:text-lg text-[#5F6B64] leading-relaxed pt-2">
            We started Mr. Pal with an understanding of what Mumbai families go through when an aging parent or recovering loved one needs help at home. Finding someone reliable, patient, and kind should never feel difficult.
          </p>
        </div>

        {/* Story & Indian Family Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E2D7C7] shadow-xs mb-16">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#102A21]">
              Supporting families across Mumbai with genuine care.
            </h2>
            <p className="text-sm sm:text-base text-[#5F6B64] leading-relaxed">
              Mr. Pal is a dedicated home-care assistance initiative operating throughout Mumbai. We connect families with trained, verified, and respectful home nurses, caregivers, patient attendants, and home helpers.
            </p>
            <p className="text-sm sm:text-base text-[#5F6B64] leading-relaxed">
              Whether your family requires daytime companionship for a senior parent, round-the-clock bedside nursing for a post-surgery patient, or patient assistance for paralysis recovery, we tailor the support specifically to your loved one’s routine.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#102A21]">
                <Shield className="w-4 h-4 text-[#C96F45]" />
                <span>Verified Personnel</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#102A21]">
                <Heart className="w-4 h-4 text-[#C96F45]" />
                <span>Dignified Care</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#102A21]">
                <Users className="w-4 h-4 text-[#C96F45]" />
                <span>Dedicated Coordinator</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E2D7C7] shadow-md bg-[#E8D8C5]">
              <img
                src="/src/assets/images/care_family_multigen_1791178289971.jpg"
                alt="Indian family together at home in Mumbai"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Our Approach (Understand, Support, Connect, Care) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-semibold text-[#C96F45] tracking-[0.2em] uppercase block mb-1">
              THE MR. PAL PROMISE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#102A21]">
              Our Approach
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6B64] mt-2">
              Four principles that guide every family relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-[#E2D7C7] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8D8C5]/60 text-[#C96F45] flex items-center justify-center font-bold font-mono text-sm">
                01
              </div>
              <h3 className="font-display text-lg font-bold text-[#102A21]">Understand</h3>
              <p className="text-xs text-[#5F6B64] leading-relaxed">
                We take time to listen to the family, medical history, lifestyle routines, and emotional nuances before making recommendations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E2D7C7] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#173D2C]/10 text-[#102A21] flex items-center justify-center font-bold font-mono text-sm">
                02
              </div>
              <h3 className="font-display text-lg font-bold text-[#102A21]">Support</h3>
              <p className="text-xs text-[#5F6B64] leading-relaxed">
                We help you decide whether a nurse, caregiver, or patient attendant matches the exact daily requirements.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E2D7C7] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8D8C5]/60 text-[#C96F45] flex items-center justify-center font-bold font-mono text-sm">
                03
              </div>
              <h3 className="font-display text-lg font-bold text-[#102A21]">Connect</h3>
              <p className="text-xs text-[#5F6B64] leading-relaxed">
                We introduce dependable, vetted staff suited to the home environment, language preferences, and care expectations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E2D7C7] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#173D2C]/10 text-[#102A21] flex items-center justify-center font-bold font-mono text-sm">
                04
              </div>
              <h3 className="font-display text-lg font-bold text-[#102A21]">Care</h3>
              <p className="text-xs text-[#5F6B64] leading-relaxed">
                Ongoing follow-ups, emergency continuity, and a reliable single point of contact for the family at all times.
              </p>
            </div>

          </div>
        </div>

        {/* Why Home Care */}
        <div className="bg-[#EFE9DD] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E2D7C7] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-semibold text-[#C96F45] uppercase tracking-wider">
                COMFORT & HEALING
              </span>
              <h2 className="font-display text-3xl font-normal text-[#102A21]">
                Why Home Care?
              </h2>
              <p className="text-sm text-[#5F6B64] leading-relaxed">
                Healing and aging happen best in familiar surroundings. When surrounded by their own room, family memories, cherished tea cups, and familiar sounds, seniors feel more relaxed and recover faster.
              </p>
              <p className="text-sm text-[#5F6B64] leading-relaxed">
                Home care preserves individual independence while giving family members freedom from anxiety. You get to be a loving son, daughter, or spouse—while our care staff manages the challenging bedside routines.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp('Hi, I would like to discuss home care options for my family.')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Talk with Mr. Pal</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E2D7C7] shadow-md bg-white">
                <img
                  src="/src/assets/images/holding_hands_care_1791178299720.jpg"
                  alt="Holding hands with warmth and compassion"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
