import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  Layers, 
  Users, 
  PhoneCall, 
  ExternalLink, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  FileText,
  Sparkles
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { ServiceItem, PeopleItem } from '../../types';

type AdminTab = 'dashboard' | 'homepage' | 'services' | 'people' | 'contact';

export const AdminDashboard: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    services, 
    updateService, 
    addService, 
    deleteService, 
    people, 
    updatePerson, 
    addPerson, 
    deletePerson,
    resetToDemoDefaults 
  } = useSite();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [notification, setNotification] = useState<string | null>(null);

  // Homepage Form State
  const [hpForm, setHpForm] = useState({
    heroEyebrow: settings.heroEyebrow,
    heroHeadingLine1: settings.heroHeadingLine1,
    heroHeadingLine2: settings.heroHeadingLine2,
    heroDescription: settings.heroDescription,
    heroImage: settings.heroImage,
    heroPrimaryCtaText: settings.heroPrimaryCtaText,
    whatsappNumber: settings.whatsappNumber,
    careFinderHeading: settings.careFinderHeading,
    ctaHeading: settings.ctaHeading,
    ctaDescription: settings.ctaDescription,
  });

  // Services State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    image: '/src/assets/images/care_elder_parent_1791178267696.jpg',
    supportPoints: ['', '', '', ''],
    ctaText: 'Enquire for Care'
  });

  // People State
  const [editingPerson, setEditingPerson] = useState<PeopleItem | null>(null);
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [personForm, setPersonForm] = useState<Partial<PeopleItem>>({
    role: '',
    title: '',
    photo: '/src/assets/images/people_home_attendant_1791178332959.jpg',
    shortDescription: '',
    learnMoreText: 'Learn More'
  });

  // Contact Settings State
  const [contactForm, setContactForm] = useState({
    whatsappNumber: settings.whatsappNumber,
    phoneNumber: settings.phoneNumber,
    email: settings.email,
    heroPrimaryCtaText: settings.heroPrimaryCtaText,
    defaultWhatsAppMessage: settings.defaultWhatsAppMessage,
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handlers
  const handleSaveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(hpForm);
    showToast('Homepage updated successfully! Changes are live.');
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(contactForm);
    showToast('Contact & CTA settings updated successfully!');
  };

  const handleStartEditService = (service: ServiceItem) => {
    setEditingService(service);
    setIsAddingService(false);
    setServiceForm({
      ...service,
      supportPoints: [...service.supportPoints]
    });
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name) return;

    if (editingService) {
      updateService({
        ...editingService,
        name: serviceForm.name || editingService.name,
        shortDescription: serviceForm.shortDescription || editingService.shortDescription,
        description: serviceForm.description || editingService.description,
        image: serviceForm.image || editingService.image,
        supportPoints: serviceForm.supportPoints?.filter(p => p.trim() !== '') || editingService.supportPoints,
        ctaText: serviceForm.ctaText || editingService.ctaText,
      });
      showToast(`Service "${serviceForm.name}" updated! Changes live on site.`);
    } else if (isAddingService) {
      const slug = serviceForm.slug || serviceForm.name?.toLowerCase().replace(/\s+/g, '-') || `service-${Date.now()}`;
      addService({
        slug,
        name: serviceForm.name || 'New Care Service',
        shortDescription: serviceForm.shortDescription || 'Support for families.',
        description: serviceForm.description || 'Comprehensive home support.',
        image: serviceForm.image || '/src/assets/images/care_elder_parent_1791178267696.jpg',
        supportPoints: serviceForm.supportPoints?.filter(p => p.trim() !== '') || ['Daily assistance', 'Family updates'],
        ctaText: serviceForm.ctaText || 'Enquire for Care',
        whoIsThisFor: ['Families in Mumbai needing dedicated care support'],
        howWeHelpCards: [
          { title: 'Personalized Care', description: 'Tailored to your loved one’s specific daily routine.' },
          { title: 'Reliable Support', description: 'Regular check-ins and dedicated coordinator.' }
        ]
      });
      showToast(`New service "${serviceForm.name}" added to website!`);
    }

    setEditingService(null);
    setIsAddingService(false);
  };

  const handleStartEditPerson = (person: PeopleItem) => {
    setEditingPerson(person);
    setIsAddingPerson(false);
    setPersonForm({ ...person });
  };

  const handleSavePerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personForm.role) return;

    if (editingPerson) {
      updatePerson({
        ...editingPerson,
        role: personForm.role || editingPerson.role,
        title: personForm.role || editingPerson.title,
        photo: personForm.photo || editingPerson.photo,
        shortDescription: personForm.shortDescription || editingPerson.shortDescription,
      });
      showToast(`Person category "${personForm.role}" updated!`);
    } else if (isAddingPerson) {
      addPerson({
        role: personForm.role || 'Care Staff',
        title: personForm.role || 'Care Staff',
        photo: personForm.photo || '/src/assets/images/people_home_attendant_1791178332959.jpg',
        shortDescription: personForm.shortDescription || 'Support for home needs.',
        learnMoreText: 'Learn More',
        responsibilities: ['Daily assistance and family support']
      });
      showToast(`New staff role "${personForm.role}" added!`);
    }

    setEditingPerson(null);
    setIsAddingPerson(false);
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all website edits back to standard demo content?')) {
      resetToDemoDefaults();
      // sync local forms
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE9DD] flex flex-col text-[#17211D]">
      
      {/* Top Bar Contract for Admin */}
      <header className="bg-[#102A21] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-sm border-b border-[#173D2C]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-2">
              <span>MR. PAL</span>
              <span className="text-[10px] font-sans font-semibold tracking-wider bg-white/10 px-2 py-0.5 rounded text-emerald-300">
                WEBSITE MANAGER
              </span>
            </span>
            <span className="text-[10px] text-white/60 tracking-wider">
              Content Management Demo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetDemo}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs transition-colors cursor-pointer"
            title="Reset to default demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C96F45] hover:bg-[#b55f37] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Website</span>
            <ExternalLink className="w-3 h-3 opacity-75" />
          </Link>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-16 right-4 z-50 bg-[#1A382B] text-white border border-emerald-500/30 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{notification}</span>
        </div>
      )}

      {/* Main Admin Layout with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden md:block">
          <div className="bg-white rounded-2xl border border-[#D5C9B8] p-3 shadow-xs space-y-1">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-[#1A382B] text-white' : 'text-[#4E5651] hover:bg-[#F4EFE6]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <div className="pt-2 pb-1 px-3">
              <span className="text-[10px] font-bold text-[#8A958E] uppercase tracking-wider">
                Website
              </span>
            </div>

            <button
              onClick={() => setActiveTab('homepage')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'homepage' ? 'bg-[#1A382B] text-white' : 'text-[#4E5651] hover:bg-[#F4EFE6]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Homepage Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'services' ? 'bg-[#1A382B] text-white' : 'text-[#4E5651] hover:bg-[#F4EFE6]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Services Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('people')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'people' ? 'bg-[#1A382B] text-white' : 'text-[#4E5651] hover:bg-[#F4EFE6]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>People Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'contact' ? 'bg-[#1A382B] text-white' : 'text-[#4E5651] hover:bg-[#F4EFE6]'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact & CTA</span>
            </button>

            <div className="pt-4 border-t border-[#E8DFD3] mt-2">
              <Link
                to="/"
                className="w-full flex items-center justify-between px-3 py-2 text-[11px] text-[#5C655F] hover:text-[#1A382B] rounded-lg hover:bg-[#F4EFE6]"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          
          {/* Mobile Tab Pills */}
          <div className="flex md:hidden overflow-x-auto gap-2 pb-3 mb-3 border-b border-[#D5C9B8]">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                activeTab === 'dashboard' ? 'bg-[#1A382B] text-white' : 'bg-white text-[#4E5651]'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('homepage')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                activeTab === 'homepage' ? 'bg-[#1A382B] text-white' : 'bg-white text-[#4E5651]'
              }`}
            >
              Homepage
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                activeTab === 'services' ? 'bg-[#1A382B] text-white' : 'bg-white text-[#4E5651]'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('people')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                activeTab === 'people' ? 'bg-[#1A382B] text-white' : 'bg-white text-[#4E5651]'
              }`}
            >
              People
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                activeTab === 'contact' ? 'bg-[#1A382B] text-white' : 'bg-white text-[#4E5651]'
              }`}
            >
              Contact
            </button>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: DASHBOARD HOME                                    */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D5C9B8] shadow-xs">
                <span className="text-xs font-bold text-[#B8572A] uppercase tracking-wider">
                  Admin Overview
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A382B] mt-1">
                  Good morning
                </h2>
                <p className="text-xs sm:text-sm text-[#5C655F] mt-1">
                  Welcome to Mr. Pal Website Manager. Control your headlines, services, staff, and contact details in real-time.
                </p>

                {/* Website Overview Cards */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD3] text-center">
                    <div className="font-display text-2xl sm:text-3xl font-bold text-[#1A382B]">
                      {services.length}
                    </div>
                    <div className="text-xs text-[#5C655F] font-medium mt-0.5">Services</div>
                  </div>
                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD3] text-center">
                    <div className="font-display text-2xl sm:text-3xl font-bold text-[#1A382B]">
                      {people.length}
                    </div>
                    <div className="text-xs text-[#5C655F] font-medium mt-0.5">Staff Roles</div>
                  </div>
                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD3] text-center">
                    <div className="font-display text-2xl sm:text-3xl font-bold text-[#1A382B]">
                      7
                    </div>
                    <div className="text-xs text-[#5C655F] font-medium mt-0.5">Live Pages</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-[#E8DFD3]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A382B] mb-3">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                      onClick={() => setActiveTab('homepage')}
                      className="p-3.5 rounded-xl border border-[#D5C9B8] hover:border-[#1A382B] bg-[#FAF7F2] hover:bg-white text-left transition-colors cursor-pointer group"
                    >
                      <div className="font-semibold text-xs text-[#1A382B] group-hover:text-[#D06A3B]">
                        Edit Homepage →
                      </div>
                      <div className="text-[11px] text-[#7A887E] mt-0.5">Hero, copy & CTAs</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('services')}
                      className="p-3.5 rounded-xl border border-[#D5C9B8] hover:border-[#1A382B] bg-[#FAF7F2] hover:bg-white text-left transition-colors cursor-pointer group"
                    >
                      <div className="font-semibold text-xs text-[#1A382B] group-hover:text-[#D06A3B]">
                        Manage Services →
                      </div>
                      <div className="text-[11px] text-[#7A887E] mt-0.5">Titles & descriptions</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('people')}
                      className="p-3.5 rounded-xl border border-[#D5C9B8] hover:border-[#1A382B] bg-[#FAF7F2] hover:bg-white text-left transition-colors cursor-pointer group"
                    >
                      <div className="font-semibold text-xs text-[#1A382B] group-hover:text-[#D06A3B]">
                        Manage People →
                      </div>
                      <div className="text-[11px] text-[#7A887E] mt-0.5">Nurses, attendants, maids</div>
                    </button>

                    <button
                      onClick={() => setActiveTab('contact')}
                      className="p-3.5 rounded-xl border border-[#D5C9B8] hover:border-[#1A382B] bg-[#FAF7F2] hover:bg-white text-left transition-colors cursor-pointer group"
                    >
                      <div className="font-semibold text-xs text-[#1A382B] group-hover:text-[#D06A3B]">
                        Update Contact →
                      </div>
                      <div className="text-[11px] text-[#7A887E] mt-0.5">WhatsApp & phones</div>
                    </button>
                  </div>
                </div>

                {/* The "WOW" Demo Guide Box */}
                <div className="mt-8 bg-[#FAF7F2] border border-[#E8DFD3] rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#D06A3B] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1A382B] uppercase tracking-wider">
                        Interactive Demo Workflow
                      </h4>
                      <p className="text-xs text-[#4E5651] mt-1 leading-relaxed">
                        To demonstrate dynamic content control to the client:
                        <br />
                        1. Go to <strong>Services Manager</strong> → Edit <strong>Elder Care</strong>.
                        <br />
                        2. Change the title to <strong>"Elder Care at Home"</strong> and save.
                        <br />
                        3. Click <strong>Preview Website</strong>. Notice the homepage immediately reflects your new title!
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: HOMEPAGE EDITOR                                   */}
          {/* ======================================================== */}
          {activeTab === 'homepage' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D5C9B8] shadow-xs">
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD3]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#1A382B]">
                    Homepage Content Editor
                  </h2>
                  <p className="text-xs text-[#5C655F]">
                    Modify main headings, hero text, and call-to-actions.
                  </p>
                </div>
                <button
                  type="submit"
                  form="hp-form"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A382B] hover:bg-[#12281E] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

              <form id="hp-form" onSubmit={handleSaveHomepage} className="space-y-6 pt-6">
                
                {/* Hero Eyebrow */}
                <div>
                  <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                    Hero Eyebrow Tag
                  </label>
                  <input
                    type="text"
                    value={hpForm.heroEyebrow}
                    onChange={e => setHpForm({ ...hpForm, heroEyebrow: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                  />
                </div>

                {/* Hero Heading Lines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                      Hero Heading Line 1
                    </label>
                    <input
                      type="text"
                      value={hpForm.heroHeadingLine1}
                      onChange={e => setHpForm({ ...hpForm, heroHeadingLine1: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                      Hero Heading Line 2 (Accent Color)
                    </label>
                    <input
                      type="text"
                      value={hpForm.heroHeadingLine2}
                      onChange={e => setHpForm({ ...hpForm, heroHeadingLine2: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                    />
                  </div>
                </div>

                {/* Hero Description */}
                <div>
                  <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                    Hero Description
                  </label>
                  <textarea
                    rows={3}
                    value={hpForm.heroDescription}
                    onChange={e => setHpForm({ ...hpForm, heroDescription: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B] resize-none"
                  />
                </div>

                {/* Hero Image URL */}
                <div>
                  <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                    Hero Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={hpForm.heroImage}
                    onChange={e => setHpForm({ ...hpForm, heroImage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                  />
                </div>

                {/* Care Finder Heading */}
                <div className="pt-4 border-t border-[#E8DFD3]">
                  <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                    Care Finder Section Heading
                  </label>
                  <input
                    type="text"
                    value={hpForm.careFinderHeading}
                    onChange={e => setHpForm({ ...hpForm, careFinderHeading: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                  />
                </div>

                {/* Final CTA Heading & Description */}
                <div className="pt-4 border-t border-[#E8DFD3] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                      Final CTA Heading
                    </label>
                    <input
                      type="text"
                      value={hpForm.ctaHeading}
                      onChange={e => setHpForm({ ...hpForm, ctaHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                      Final CTA Description
                    </label>
                    <input
                      type="text"
                      value={hpForm.ctaDescription}
                      onChange={e => setHpForm({ ...hpForm, ctaDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A382B] hover:bg-[#12281E] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: SERVICES MANAGER                                  */}
          {/* ======================================================== */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D5C9B8] shadow-xs">
                <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD3]">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#1A382B]">
                      Services Manager
                    </h2>
                    <p className="text-xs text-[#5C655F]">
                      Manage home care services displayed on homepage and detail pages.
                    </p>
                  </div>
                  
                  {!editingService && !isAddingService && (
                    <button
                      onClick={() => {
                        setIsAddingService(true);
                        setServiceForm({
                          name: '',
                          slug: '',
                          shortDescription: '',
                          description: '',
                          image: '/src/assets/images/care_elder_parent_1791178267696.jpg',
                          supportPoints: ['', '', '', ''],
                          ctaText: 'Enquire for Care'
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A382B] text-white text-xs font-bold shadow-xs hover:bg-[#12281E] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Service</span>
                    </button>
                  )}
                </div>

                {/* Edit / Add Service Form */}
                {(editingService || isAddingService) ? (
                  <form onSubmit={handleSaveService} className="pt-6 space-y-4">
                    <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD3] flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-[#1A382B]">
                        {editingService ? `Editing: ${editingService.name}` : 'New Service'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingService(null);
                          setIsAddingService(false);
                        }}
                        className="text-xs text-[#7A887E] hover:text-[#1A382B]"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                          Service Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceForm.name || ''}
                          onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                          CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={serviceForm.ctaText || ''}
                          onChange={e => setServiceForm({ ...serviceForm, ctaText: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                        Short Description (Homepage Card)
                      </label>
                      <input
                        type="text"
                        value={serviceForm.shortDescription || ''}
                        onChange={e => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                        Full Description (Service Page Hero)
                      </label>
                      <textarea
                        rows={2}
                        value={serviceForm.description || ''}
                        onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                        Image URL / Asset Path
                      </label>
                      <input
                        type="text"
                        value={serviceForm.image || ''}
                        onChange={e => setServiceForm({ ...serviceForm, image: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingService(null);
                          setIsAddingService(false);
                        }}
                        className="px-4 py-2 rounded-xl border border-[#D5C9B8] text-xs font-medium text-[#5C655F]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-[#1A382B] text-white text-xs font-bold shadow-xs hover:bg-[#12281E]"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Service</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Services List */
                  <div className="pt-6 space-y-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 rounded-xl border border-[#E8DFD3] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#D5C9B8]">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-display font-bold text-sm text-[#1A382B]">
                              {service.name}
                            </div>
                            <div className="text-xs text-[#5C655F] line-clamp-1">
                              {service.shortDescription}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <Link
                            to={`/services/${service.slug}`}
                            className="p-2 rounded-lg bg-white border border-[#D5C9B8] hover:bg-[#F4EFE6] text-xs font-semibold text-[#1A382B] inline-flex items-center gap-1"
                            title="Preview service"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">View</span>
                          </Link>

                          <button
                            onClick={() => handleStartEditService(service)}
                            className="p-2 rounded-lg bg-[#1A382B] text-white hover:bg-[#12281E] text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {services.length > 1 && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${service.name}"?`)) {
                                  deleteService(service.id);
                                  showToast(`Service "${service.name}" deleted.`);
                                }
                              }}
                              className="p-2 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: PEOPLE MANAGER                                    */}
          {/* ======================================================== */}
          {activeTab === 'people' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D5C9B8] shadow-xs">
                <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD3]">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#1A382B]">
                      People & Support Staff Manager
                    </h2>
                    <p className="text-xs text-[#5C655F]">
                      Control the 4 human resource categories provided to Mumbai homes.
                    </p>
                  </div>

                  {!editingPerson && !isAddingPerson && (
                    <button
                      onClick={() => {
                        setIsAddingPerson(true);
                        setPersonForm({
                          role: '',
                          title: '',
                          photo: '/src/assets/images/people_home_attendant_1791178332959.jpg',
                          shortDescription: '',
                          learnMoreText: 'Learn More'
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A382B] text-white text-xs font-bold shadow-xs hover:bg-[#12281E] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Staff Role</span>
                    </button>
                  )}
                </div>

                {/* Edit / Add Person Form */}
                {(editingPerson || isAddingPerson) ? (
                  <form onSubmit={handleSavePerson} className="pt-6 space-y-4">
                    <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD3] flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-[#1A382B]">
                        {editingPerson ? `Editing: ${editingPerson.role}` : 'New Staff Role'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPerson(null);
                          setIsAddingPerson(false);
                        }}
                        className="text-xs text-[#7A887E] hover:text-[#1A382B]"
                      >
                        Cancel
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                        Staff Role / Category Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={personForm.role || ''}
                        onChange={e => setPersonForm({ ...personForm, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                        Short Description
                      </label>
                      <input
                        type="text"
                        value={personForm.shortDescription || ''}
                        onChange={e => setPersonForm({ ...personForm, shortDescription: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                        Photo URL / Path
                      </label>
                      <input
                        type="text"
                        value={personForm.photo || ''}
                        onChange={e => setPersonForm({ ...personForm, photo: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPerson(null);
                          setIsAddingPerson(false);
                        }}
                        className="px-4 py-2 rounded-xl border border-[#D5C9B8] text-xs font-medium text-[#5C655F]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-[#1A382B] text-white text-xs font-bold shadow-xs hover:bg-[#12281E]"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Role</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* People List */
                  <div className="pt-6 space-y-3">
                    {people.map((person) => (
                      <div
                        key={person.id}
                        className="p-4 rounded-xl border border-[#E8DFD3] bg-[#FAF7F2] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#D5C9B8]">
                            <img
                              src={person.photo}
                              alt={person.role}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-display font-bold text-sm text-[#1A382B]">
                              {person.role}
                            </div>
                            <div className="text-xs text-[#5C655F] line-clamp-1">
                              {person.shortDescription}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartEditPerson(person)}
                            className="p-2 rounded-lg bg-[#1A382B] text-white hover:bg-[#12281E] text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {people.length > 1 && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${person.role}"?`)) {
                                  deletePerson(person.id);
                                  showToast(`"${person.role}" removed.`);
                                }
                              }}
                              className="p-2 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: CONTACT & CTA SETTINGS                            */}
          {/* ======================================================== */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D5C9B8] shadow-xs">
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD3]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#1A382B]">
                    Contact & CTA Settings
                  </h2>
                  <p className="text-xs text-[#5C655F]">
                    Configure phone numbers, WhatsApp routing, and default conversion messages.
                  </p>
                </div>
                <button
                  type="submit"
                  form="contact-form"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A382B] hover:bg-[#12281E] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>

              <form id="contact-form" onSubmit={handleSaveContact} className="space-y-5 pt-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={contactForm.whatsappNumber}
                      onChange={e => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={contactForm.phoneNumber}
                      onChange={e => setContactForm({ ...contactForm, phoneNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                    Default Primary CTA Text
                  </label>
                  <input
                    type="text"
                    value={contactForm.heroPrimaryCtaText}
                    onChange={e => setContactForm({ ...contactForm, heroPrimaryCtaText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D322E] uppercase tracking-wider mb-1.5">
                    Default WhatsApp Context Message
                  </label>
                  <textarea
                    rows={3}
                    value={contactForm.defaultWhatsAppMessage}
                    onChange={e => setContactForm({ ...contactForm, defaultWhatsAppMessage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs outline-none focus:border-[#1A382B] resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1A382B] hover:bg-[#12281E] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Contact Settings</span>
                  </button>
                </div>

              </form>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
