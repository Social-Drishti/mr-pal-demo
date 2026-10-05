import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C655F] hover:text-[#1A382B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD3] shadow-xs space-y-6">
          
          <div className="border-b border-[#E8DFD3] pb-6">
            <span className="text-xs font-bold text-[#B8572A] uppercase tracking-wider">
              Transparency & Care
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1A382B] mt-1">
              Terms & Care Policy
            </h1>
            <p className="text-xs text-[#7A887E] mt-1">
              MR. PAL — Care at Home · Mumbai, India
            </p>
          </div>

          <div className="space-y-4 text-sm text-[#4E5651] leading-relaxed">
            <h3 className="font-display text-lg font-bold text-[#1A382B]">
              1. Non-Medical Home Care Scope
            </h3>
            <p>
              Mr. Pal provides non-clinical supportive care, elder companion care, patient assistance, and home support human resources. While our home nurses follow physician-prescribed orders, Mr. Pal does not provide primary medical diagnoses or hospital-level intensive emergency care. In medical emergencies, families must always contact emergency medical services or their primary hospital.
            </p>

            <h3 className="font-display text-lg font-bold text-[#1A382B]">
              2. Staff Verification & Conduct
            </h3>
            <p>
              All caregivers, nurses, attendants, and home helpers placed through Mr. Pal undergo identity verification and basic background screening. We maintain strict codes of conduct emphasizing respectful language, dignity, hygiene, and patient privacy.
            </p>

            <h3 className="font-display text-lg font-bold text-[#1A382B]">
              3. Family Privacy & Data Protection
            </h3>
            <p>
              We treat patient medical records, family contact details, and home addresses with absolute confidentiality. Information collected through our website or phone consultations is solely used to evaluate and coordinate care requirements.
            </p>

            <h3 className="font-display text-lg font-bold text-[#1A382B]">
              4. Service Adjustments & Support
            </h3>
            <p>
              We understand family situations evolve. If a care recipient requires altered hours, or if a caregiver profile is not an ideal personality match, our care coordinators assist with smooth adjustments and backup arrangements.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E8DFD3] flex items-center justify-between text-xs text-[#7A887E]">
            <span>Last reviewed: October 2026</span>
            <Link to="/book-a-call" className="font-semibold text-[#1A382B] hover:underline">
              Contact Care Desk →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
