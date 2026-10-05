import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  PhoneCall, 
  MapPin, 
  Heart, 
  Shield, 
  Users, 
  Check, 
  MessageSquare, 
  FileText, 
  Home as HomeIcon,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { PeopleItem } from '../types';

export const HomePage: React.FC = () => {
  const { settings, services, people, openWhatsApp } = useSite();
  const navigate = useNavigate();

  // Active care selector state in the dark green block
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(1); // Default Elder Care
  const activeSelectedService = services[selectedServiceIndex] || services[0];

  // People modal state
  const [selectedPerson, setSelectedPerson] = useState<PeopleItem | null>(null);

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#17211D]">
      
      {/* ======================================================== */}
      {/* HERO SECTION                                            */}
      {/* ======================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-14 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Subtle Eyebrow Label */}
              <div className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C96F45] uppercase">
                {settings.heroEyebrow}
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[70px] font-normal tracking-tight text-[#102A21] leading-[1.08] text-balance">
                Care that{' '}
                <span className="text-[#C96F45] italic font-normal">
                  feels personal.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#5F6B64] max-w-lg leading-relaxed">
                {settings.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/book-a-call"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-smooth shadow-xs group"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{settings.heroPrimaryCtaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => openWhatsApp(settings.defaultWhatsAppMessage)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#E8D8C5]/40 text-[#102A21] border border-[#E2D7C7] text-xs font-semibold tracking-wider uppercase transition-smooth cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                  <span>{settings.heroSecondaryCtaText}</span>
                </button>
              </div>

              {/* Team Avatar Snippet */}
              <div className="pt-4 flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F5F1E8] object-cover"
                    src="/src/assets/images/people_home_attendant_1791178332959.jpg"
                    alt="Caregiver"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F5F1E8] object-cover"
                    src="/src/assets/images/care_patient_nurse_1791178278602.jpg"
                    alt="Nurse"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F5F1E8] object-cover"
                    src="/src/assets/images/hero_care_mumbai_1791178255414.jpg"
                    alt="Attendant"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F5F1E8] object-cover"
                    src="/src/assets/images/people_home_help_maid_1791178343862.jpg"
                    alt="Helper"
                  />
                </div>
                <div className="text-xs text-[#5F6B64] font-medium">
                  Supporting families across Mumbai
                </div>
              </div>

            </div>

            {/* Right Column: Prominent Indian Caregiver & Grandmother Photograph */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-[#E8D8C5]">
                  <img
                    src={settings.heroImage}
                    alt="Indian grandmother with caring caregiver at home in Mumbai"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle warm vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A21]/30 via-transparent to-transparent pointer-events-none" />

                  {/* Handwritten Emotional Accent */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-4 py-1.5 rounded-full shadow-xs">
                    <span className="font-handwriting text-lg text-[#102A21] font-semibold tracking-wide">
                      Trusted Care, Happier Days. ♡
                    </span>
                  </div>

                  {/* Location badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-md flex items-center gap-2 border border-[#E2D7C7]/60">
                    <div className="w-6 h-6 rounded-full bg-[#FAF5EE] text-[#C96F45] flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-[#C96F45]" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-[#102A21] leading-tight">Home care</div>
                      <div className="text-[10px] text-[#5F6B64] leading-tight">in Mumbai</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 01 — INTEGRATED CARE SELECTOR (DARK GREEN BLOCK) */}
      {/* ======================================================== */}
      <section className="bg-[#102A21] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/80">
                <span>01</span>
                <span className="w-8 h-[1px] bg-emerald-400/40"></span>
              </div>
              <div className="text-[11px] font-semibold tracking-[0.2em] text-[#C96F45] uppercase">
                HOW CAN WE HELP?
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-normal leading-[1.1] text-[#FAF7F2]">
                Tell us who<br />
                needs care.
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/70 max-w-sm leading-relaxed pt-1">
                Select an option to immediately understand what care is available for your family in Mumbai.
              </p>

              {/* Selected Service Quick Action & Contextual WhatsApp */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs text-white/90">
                  Selected: <strong className="text-emerald-300 font-semibold">{activeSelectedService.name}</strong>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    to={`/services/${activeSelectedService.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C96F45] hover:bg-[#b55f37] text-white text-xs font-semibold tracking-wide transition-colors"
                  >
                    <span>Explore {activeSelectedService.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => openWhatsApp(`Hi, I would like to enquire about ${activeSelectedService.name}.`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Enquiry</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Cards / Selector Grid */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-emerald-200/70 flex items-center gap-1">
                  <span>Select an option to learn more</span>
                  <ArrowRight className="w-3 h-3 text-[#C96F45]" />
                </span>
                
                {/* Navigation indicators */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedServiceIndex(prev => (prev > 0 ? prev - 1 : services.length - 1))}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous service"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedServiceIndex(prev => (prev < services.length - 1 ? prev + 1 : 0))}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next service"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service, index) => {
                  const isSelected = selectedServiceIndex === index;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceIndex(index)}
                      className={`group rounded-2xl p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                        isSelected 
                          ? 'bg-[#FAF7F2] text-[#17211D] border-[#FAF7F2] shadow-xl scale-[1.02]' 
                          : 'bg-[#173D2C]/60 text-white border-white/10 hover:border-white/20 hover:bg-[#173D2C]'
                      }`}
                    >
                      <div>
                        {/* Circular Portrait Image */}
                        <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[#E8D8C5] shadow-xs">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="font-mono text-[10px] font-semibold opacity-60 uppercase mb-1">
                          0{index + 1}
                        </div>

                        <h3 className={`font-display text-base font-bold leading-snug transition-colors ${
                          isSelected ? 'text-[#102A21]' : 'text-white'
                        }`}>
                          {service.name}
                        </h3>

                        <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                          isSelected ? 'text-[#5F6B64]' : 'text-emerald-100/70'
                        }`}>
                          {service.shortDescription}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between">
                        <span className="text-[11px] font-semibold">
                          {isSelected ? 'Selected' : 'View'}
                        </span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-[#C96F45] text-white' 
                            : 'bg-white/10 text-white group-hover:bg-[#C96F45]'
                        }`}>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 02 — "Care for every need at home."              */}
      {/* ======================================================== */}
      <section id="services" className="py-16 sm:py-24 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Editorial Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#E2D7C7]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C96F45] mb-2">
                <span>02</span>
                <span className="w-8 h-[1px] bg-[#C96F45]/50"></span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#102A21] tracking-tight">
                Care for every need at home.
              </h2>
            </div>

            <Link
              to="/book-a-call"
              className="text-xs font-semibold tracking-wider uppercase text-[#102A21] hover:text-[#C96F45] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Explore all services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Photo Service Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#102A21] shadow-md cursor-pointer flex flex-col justify-end p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Background Image with Rich Scrim */}
                <img
                  src={service.image}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A21] via-[#102A21]/50 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-2">
                  <div className="font-mono text-[10px] text-emerald-300 uppercase tracking-wider">
                    Care 0{index + 1}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-white">
                    <span className="text-[#C96F45] group-hover:underline">Explore Care</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs group-hover:bg-[#C96F45] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 03 — "Care that starts with understanding."      */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#EFE9DD] border-y border-[#E2D7C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C96F45]">
                <span>03</span>
                <span className="w-8 h-[1px] bg-[#C96F45]/50"></span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#102A21] tracking-tight leading-[1.12]">
                Care that starts<br />with understanding.
              </h2>
              <p className="text-sm sm:text-base text-[#5F6B64] leading-relaxed pt-1">
                A simple and supportive process to get you the right care. Getting dependable support begins by listening to your family's needs without pressure.
              </p>

              <div className="pt-4">
                <Link
                  to="/book-a-call"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-smooth shadow-xs group"
                >
                  <span>Discuss Your Requirement</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Connected Timeline (Editorial lines & whitespace) */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Step 01 */}
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 border border-[#E2D7C7] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C96F45]">01</span>
                    <div className="w-9 h-9 rounded-full bg-[#E8D8C5]/50 text-[#102A21] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-[#C96F45]" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#102A21]">
                    Tell us what you need
                  </h3>
                  <p className="text-xs text-[#5F6B64] leading-relaxed">
                    Share your family's care requirements and preferences with us in a brief, friendly conversation.
                  </p>
                </div>

                {/* Step 02 */}
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 border border-[#E2D7C7] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C96F45]">02</span>
                    <div className="w-9 h-9 rounded-full bg-[#E8D8C5]/50 text-[#102A21] flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#102A21]" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#102A21]">
                    We understand the situation
                  </h3>
                  <p className="text-xs text-[#5F6B64] leading-relaxed">
                    We discuss the patient's routine, medication schedule, mobility support, and daily habits.
                  </p>
                </div>

                {/* Step 03 */}
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 border border-[#E2D7C7] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C96F45]">03</span>
                    <div className="w-9 h-9 rounded-full bg-[#E8D8C5]/50 text-[#102A21] flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#C96F45]" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#102A21]">
                    Find the right support
                  </h3>
                  <p className="text-xs text-[#5F6B64] leading-relaxed">
                    We help match suitable home-care assistance and caregiver profiles based on your requirements.
                  </p>
                </div>

                {/* Step 04 */}
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 border border-[#E2D7C7] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C96F45]">04</span>
                    <div className="w-9 h-9 rounded-full bg-[#E8D8C5]/50 text-[#102A21] flex items-center justify-center">
                      <HomeIcon className="w-4 h-4 text-[#102A21]" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#102A21]">
                    Care at home
                  </h3>
                  <p className="text-xs text-[#5F6B64] leading-relaxed">
                    Your loved one receives the gentle care, routine dignity, and dependable presence they deserve.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 04 — "THE RIGHT PEOPLE FOR YOUR HOME."           */}
      {/* ======================================================== */}
      <section id="people" className="py-16 sm:py-24 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="pb-10 border-b border-[#E2D7C7]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C96F45] mb-2">
              <span>04</span>
              <span className="w-8 h-[1px] bg-[#C96F45]/50"></span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#102A21] tracking-tight">
              The right people for your home.
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6B64] mt-2">
              Trained and reliable support staff for your family's needs in Mumbai.
            </p>
          </div>

          {/* 4 People Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
            {people.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D7C7] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3] mb-4 bg-[#E8D8C5]">
                    <img
                      src={person.photo}
                      alt={person.role}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#102A21]">
                    {person.role}
                  </h3>
                  <p className="text-xs text-[#5F6B64] mt-1.5 leading-relaxed">
                    {person.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0EAE1]">
                  <button
                    onClick={() => setSelectedPerson(person)}
                    className="text-xs font-bold text-[#C96F45] hover:text-[#102A21] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{person.learnMoreText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION — "Because care is personal." (Trust Section)     */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#EFE9DD] border-t border-[#E2D7C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Large Authentic Indian Multi-Gen Photograph */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E2D7C7] aspect-[4/3] bg-[#E8D8C5]">
                <img
                  src="/src/assets/images/care_family_multigen_1791178289971.jpg"
                  alt="Multi-generational Indian family together at home in Mumbai"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Qualitative Trust Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-[11px] font-semibold tracking-[0.2em] text-[#C96F45] uppercase">
                WHY FAMILIES CHOOSE MR. PAL
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#102A21] tracking-tight leading-[1.12]">
                Because care<br />is personal.
              </h2>

              <p className="text-sm sm:text-base text-[#5F6B64] leading-relaxed">
                Every family has different needs. We believe home care should be respectful, dependable and focused on what is best for your loved one.
              </p>

              {/* 3 Qualitative Points */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#C96F45] flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 fill-[#C96F45]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A21]">Compassionate Care</h4>
                    <p className="text-xs text-[#5F6B64] mt-0.5">Care that respects the dignity of the individual.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#102A21] flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A21]">Reliable Support</h4>
                    <p className="text-xs text-[#5F6B64] mt-0.5">A dependable point of contact for families.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#C96F45] flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#102A21]">Family First</h4>
                    <p className="text-xs text-[#5F6B64] mt-0.5">Keeping the family's needs at the center.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION — HOME CARE ACROSS MUMBAI (SEA LINK SUNSET)      */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#F5F1E8] border-t border-[#E2D7C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl overflow-hidden border border-[#E2D7C7] shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full relative overflow-hidden bg-[#102A21]">
              <img
                src="/src/assets/images/mumbai_sea_link_sunset_1791178850762.jpg"
                alt="Mumbai Bandra-Worli Sea Link at golden hour"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C96F45]">
                <MapPin className="w-3.5 h-3.5" />
                <span>OUR SERVICE AREA</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#102A21] leading-tight">
                Home care across Mumbai.
              </h3>

              <p className="text-xs sm:text-sm text-[#5F6B64] leading-relaxed">
                Looking for dependable care support at home? Mr. Pal connects families with home-care assistance based on their requirements across Mumbai.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp('Hi, I am looking for home-care support in Mumbai.')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold tracking-wider uppercase transition-smooth cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Talk to Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* FINAL CTA SECTION                                       */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-24 bg-[#102A21] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          <p className="font-handwriting text-2xl sm:text-3xl text-emerald-300 font-semibold">
            Let's make home a happier place again ♡
          </p>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2]">
            {settings.ctaHeading}
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/70 max-w-lg mx-auto leading-relaxed">
            {settings.ctaDescription}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/book-a-call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C96F45] hover:bg-[#b55f37] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{settings.ctaButtonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => openWhatsApp(settings.defaultWhatsAppMessage)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#F5F1E8] text-[#102A21] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              <span>WhatsApp Us</span>
            </button>
          </div>

        </div>
      </section>

      {/* People Detail Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedPerson(null)}
              className="absolute top-4 right-4 text-xs font-bold text-[#5F6B64] hover:text-[#102A21] bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-xs cursor-pointer"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#E2D7C7] bg-[#E8D8C5]">
                <img
                  src={selectedPerson.photo}
                  alt={selectedPerson.role}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#C96F45] uppercase tracking-wider">
                  Care Staff Category
                </span>
                <h3 className="font-display text-2xl font-bold text-[#102A21]">
                  {selectedPerson.role}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#5F6B64] leading-relaxed mb-4">
              {selectedPerson.shortDescription}
            </p>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A21]">
                Typical Duties & Support:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#5F6B64]">
                {selectedPerson.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C96F45] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedPerson(null);
                  openWhatsApp(`Hi, I would like to enquire about ${selectedPerson.role} support in Mumbai.`);
                }}
                className="flex-1 py-3 px-4 rounded-full bg-[#102A21] hover:bg-[#173D2C] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Enquire on WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setSelectedPerson(null);
                  navigate('/book-a-call');
                }}
                className="py-3 px-5 rounded-full border border-[#102A21] text-[#102A21] text-xs font-semibold hover:bg-white cursor-pointer"
              >
                Book a Call
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
