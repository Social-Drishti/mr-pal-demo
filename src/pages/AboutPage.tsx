import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { PHOTOS } from '../data/images';
import { Photo } from '../components/Photo';
import { Button, ButtonLink, ButtonAnchor, Rule, SectionHeader } from '../components/ui';
import { DEFAULT_VERIFY_STEPS } from '../data/defaultData';

export const AboutPage: React.FC = () => {
  const { settings, openWhatsApp } = useSite();
  const telHref = `tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`;

  return (
    <>
      {/* ---- Header ---- */}
      <section className="bg-paper pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="docket-meta text-terracotta">About MR. PAL</div>
            <h1 className="mt-6 text-display">
              We started by hiring help
              <br />
              <span className="italic text-terracotta">for our own father.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lead text-ink-muted">
              The agency that turned up was vague about who the person was, what they had
              actually done, and what would happen if they were not right. We are the
              opposite of that: we check first, we write it down, and we replace it if the
              fit is wrong.
            </p>
          </div>
        </div>
      </section>

      {/* ---- The story ---- */}
      <section className="bg-paper-sunk py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] w-full overflow-hidden bg-sand">
                <Photo
                  {...PHOTOS.familyCare}
                  alt="A family at home in Mumbai"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="docket-meta text-terracotta">What we do</div>
              <h2 className="mt-4 text-h2">
                A placement agency, not a medical provider.
              </h2>
              <div className="mt-6 space-y-4 text-body text-ink-muted">
                <p>
                  MR. PAL finds, checks and places independent care staff and home helpers
                  into homes across Mumbai. We do not employ a hospital ward and we are not
                  a nursing home.
                </p>
                <p>
                  What we do own completely is the thing families actually complain about:
                  not knowing who is about to walk through their door. So the checks are
                  ours, the matching is ours, and so is the phone number you call when it
                  is not right.
                </p>
              </div>

              <Rule className="mt-8" />
              <dl className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-small font-semibold">Founded</dt>
                  <dd className="mt-1 text-small text-ink-muted">In Mumbai, by a family</dd>
                </div>
                <div>
                  <dt className="text-small font-semibold">Areas</dt>
                  <dd className="mt-1 text-small text-ink-muted">12 across the city</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---- How we check ---- */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={settings.verifyEyebrow}
            heading={settings.verifyHeading}
            lead={settings.verifyIntro}
          />

          <div className="mt-12 border-t-2 border-ink">
            {DEFAULT_VERIFY_STEPS.map((step, index) => (
              <div key={step.title} className="grid grid-cols-1 gap-3 border-b border-rule py-7 sm:grid-cols-12 sm:gap-8">
                <span className="docket-meta tabular text-ink-faint sm:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-h3 sm:col-span-4">{step.title}</h3>
                <p className="text-body text-ink-muted sm:col-span-7">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Why home, and who to talk to ---- */}
      <section className="bg-forest py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="docket-meta text-terracotta">Why home</div>
              <h2 className="mt-4 text-h2 text-on-dark">
                Most people do better where they already are.
              </h2>
              <div className="mt-6 space-y-4 text-body text-on-dark-muted">
                <p>
                  Familiar rooms, familiar light, their own bed. Recovery is easier at home
                  and most families can tell the difference within a fortnight.
                </p>
                <p>
                  It is also why the last few hours of a placement matter so much. We plan
                  for them.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="accent"
                  onClick={() => openWhatsApp(settings.defaultWhatsAppMessage)}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Talk to us
                </Button>
                <ButtonLink to="/team" variant="onDark">
                  Meet the team
                </ButtonLink>
              </div>
            </div>

            <figure className="lg:col-span-6">
              <div className="aspect-[4/3] w-full overflow-hidden bg-forest-mid">
                <Photo
                  {...PHOTOS.holdingHands}
                  alt="Holding hands at home"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section className="bg-paper py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="docket-meta text-terracotta">Next step</div>
              <h2 className="mt-4 text-h2">Tell us what your home needs.</h2>
              <p className="mt-4 text-lead text-ink-muted">{settings.responseCommitment}</p>
            </div>
            <ButtonAnchor href={telHref} variant="outline" className="shrink-0">
              {settings.phoneNumber}
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </>
  );
};
