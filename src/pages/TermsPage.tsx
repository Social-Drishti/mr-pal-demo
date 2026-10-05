import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Rule } from '../components/ui';

const SECTIONS = [
  {
    title: 'What MR. PAL does',
    body: [
      'MR. PAL is a placement agency. We find, verify and introduce independent care staff and home helpers to families in Mumbai. The person who works in your home is employed by you, or by a partner agency — not by MR. PAL.',
      'We are not a medical provider. We do not diagnose, treat, or supply clinical care beyond the agreed duties of the person placed with you.',
    ],
  },
  {
    title: 'How we verify',
    body: [
      'Before any introduction we check government photo ID and a current address proof. We speak to two references and record what they actually said. We hold a structured conversation about the duties relevant to your situation.',
      'Verification reduces risk. It does not eliminate it, and no agency can honestly claim otherwise.',
    ],
  },
  {
    title: 'Responsibilities at your home',
    body: [
      'Duties, hours, days off and payment terms are agreed in writing between you and the person placed, before the placement begins. Keep that agreement. It is the clearest protection for both sides.',
      'MR. PAL is a point of contact for the introduction, for follow-up after the first week, and for arranging cover when someone is unwell.',
    ],
  },
  {
    title: 'Charges and cancellation',
    body: [
      'We quote only after we understand the routine, because hours, duties and locality all affect the number. Any fee is disclosed before you commit, in writing.',
      'There is no lock-in. The first few days are a trial, and if the fit is wrong we replace the person. You are not asked to argue for it.',
    ],
  },
  {
    title: 'Your details',
    body: [
      'Information you send is used to arrange the placement and to contact you about it. It is not sold, and it is not added to a marketing list.',
      'You can ask us to delete what we hold about you at any time.',
    ],
  },
];

export const TermsPage: React.FC = () => {
  const { settings } = useSite();

  return (
    <div className="bg-paper py-12 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="docket-meta text-terracotta">Terms &amp; plain English</div>
        <h1 className="mt-5 text-h1">What we agree to, and what we do not.</h1>
        <p className="mt-5 text-lead text-ink-muted">
          Written to be read, not to be agreed to without reading. Last reviewed: October 2026.
        </p>

        <Rule className="mt-10" />

        <div className="mt-10 space-y-10">
          {SECTIONS.map((section, index) => (
            <section key={section.title}>
              <div className="flex items-baseline gap-4">
                <span className="docket-meta tabular text-ink-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-h3">{section.title}</h2>
              </div>
              <div className="mt-4 space-y-3 pl-10">
                {section.body.map(paragraph => (
                  <p key={paragraph} className="text-body text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Rule className="mt-12" />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-ink-muted">
            Something unclear?{' '}
            <a
              href={`mailto:${settings.email}`}
              className="underline decoration-terracotta underline-offset-4 transition-settle hover:decoration-2"
            >
              {settings.email}
            </a>
          </p>
          <Link
            to="/#request"
            className="text-small font-semibold underline decoration-terracotta underline-offset-[6px] transition-settle hover:decoration-2"
          >
            Build a request
          </Link>
        </div>
      </div>
    </div>
  );
};