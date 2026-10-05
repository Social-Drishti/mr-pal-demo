import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  DEFAULT_FIGURES,
  DEFAULT_VERIFY_STEPS,
  DEFAULT_LIMITS,
  DEFAULT_PROCESS_STEPS,
} from '../data/defaultData';
import { PHOTOS, resolvePhoto } from '../data/images';
import { ServiceRequestDocket } from '../components/ServiceRequestDocket';
import { Photo } from '../components/Photo';
import { Button, ButtonAnchor, ButtonLink, Rule, SectionHeader } from '../components/ui';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';

const MumbaiAreas = [
  'Bandra West',
  'Andheri East',
  'Powai',
  'Chembur',
  'Dadar',
  'Wadhale',
  'Kurla',
  'Borivali',
  'Malad',
  'Thane',
  'Fort',
  'Chembur North',
];

export function HomePage() {
  const { settings, services, people, openWhatsApp } = useSite();
  // Which service line the index is currently pointing at; drives the
  // desktop preview plate.
  const [activeService, setActiveService] = useState<string>(services[0]?.id ?? '');
  const telHref = `tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`;

  return (
    <>
      {/* ================================================================
          HERO — placement positioning, plainly stated
          ================================================================ */}
      <section className="bg-paper pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="docket-meta text-terracotta">{settings.heroEyebrow}</div>

              <h1 className="mt-6 text-display">
                {settings.heroHeadingLine1}
                <br />
                <span className="italic text-terracotta">{settings.heroHeadingLine2}</span>
              </h1>

              <p className="mt-7 max-w-md text-lead text-ink-muted">
                {settings.heroDescription}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/#request" variant="primary" className="w-full sm:w-auto">
                  {settings.heroPrimaryCtaText}
                </ButtonLink>
                <Button
                  variant="outline"
                  onClick={() => openWhatsApp(settings.defaultWhatsAppMessage)}
                >
                  <MessageCircle className="h-4 w-4 text-terracotta" aria-hidden />
                  {settings.heroSecondaryCtaText}
                </Button>
              </div>

              <Rule className="mt-8" />
              <div className="mt-6 flex items-center gap-3.5">
                <div className="flex -space-x-2.5">
                  {[
                    PHOTOS.attendant,
                    PHOTOS.patientCare,
                    PHOTOS.heroCare,
                    PHOTOS.homeHelper,
                  ].map((photo, i) => (
                    <Photo
                      key={i}
                      {...photo}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-paper"
                    />
                  ))}
                </div>
                <p className="text-small text-ink-muted">
                  Supporting families across Mumbai
                </p>
              </div>

              <p className="mt-6 text-small text-ink-muted">
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-terracotta underline-offset-4 transition-settle hover:decoration-2"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  {settings.phoneNumber}
                </a>
                <span className="mx-2 text-ink-faint" aria-hidden>
                  ·
                </span>
                {settings.officeHours}
              </p>
            </div>

            {/* Deliberately withheld on phones. At 4:5 it pushed the whole
                first screen into scrolling before the headline settled, and on
                a small viewport the request button matters more than the
                photograph. Desktop keeps it, smaller than it was. */}
            <div className="hidden lg:col-span-5 lg:block">
              <figure>
                <div className="aspect-square w-full overflow-hidden bg-sand">
                  <Photo
                    {...resolvePhoto(settings.heroImage)}
                    alt="A caregiver sitting with an older woman in her home in Mumbai"
                    className="h-full w-full object-cover object-center"
                    priority
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-3 border-t border-rule pt-3">
                  <span className="docket-meta text-ink-faint">Fig. 01</span>
                  {/* Place, not a product name. */}
                  <span className="text-small text-ink-muted">Mumbai</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FIGURES — trust shown as numbers, not adjectives
          ================================================================ */}
      <section className="bg-forest py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                dark
                eyebrow={settings.figuresEyebrow}
                heading={settings.figuresHeading}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 lg:col-span-8">
              {DEFAULT_FIGURES.map(figure => (
                <div key={figure.id} className="border-t border-on-dark/20 pt-4">
                  <div className="tabular text-h1 text-on-dark">{figure.value}</div>
                  <div className="mt-2 text-small font-semibold text-on-dark">
                    {figure.label}
                  </div>
                  <p className="mt-1 hidden text-small text-on-dark-muted sm:block">
                    {figure.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          THE DOCKET — the primary conversion
          ================================================================ */}
      <ServiceRequestDocket />

      {/* ================================================================
          SERVICES — a ledger, not a card grid
          ================================================================ */}
      <section id="services" className="scroll-mt-24 bg-paper-sunk py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
<SectionHeader
            eyebrow="What we place"
            heading="Four kinds of support, matched to the routine."
          />

          {/* An index, not a card grid. The name is the interface; the
              photograph follows whichever line you are pointing at. On a phone
              there is no hover, so each line carries its own small plate. */}
          <div className="mt-11 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ul className="border-t-2 border-ink">
                {services.map((service, index) => {
                  const isActive = activeService === service.id;
                  return (
                    <li key={service.id} className="border-b border-rule">
                      <ButtonLink
                        to={`/services/${service.slug}`}
                        variant="quiet"
                        aria-current={isActive ? 'true' : undefined}
                        onMouseEnter={() => setActiveService(service.id)}
                        onFocus={() => setActiveService(service.id)}
                        className={`!decoration-0 group flex items-center gap-4 py-5 text-left transition-settle sm:gap-6 ${
                          isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        <span className="docket-meta tabular shrink-0 text-ink-faint">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Plate: always present on phones, revealed on
                            desktop only when this line is active. */}
                        <span className="h-16 w-16 shrink-0 overflow-hidden bg-sand sm:h-20 sm:w-20 lg:hidden">
                          <Photo
                            {...resolvePhoto(service.image)}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </span>

                        <span className="min-w-0 flex-1">
                          {/* Service names stay in Manrope here on purpose.
                              Georgia is reserved for page h1/h2, and this index
                              is a list of items rather than a heading. */}
                          <span className="block text-h3 font-semibold leading-tight transition-colors group-hover:text-terracotta">
                            {service.name}
                          </span>
                          <span className="mt-1 block text-small text-ink-muted sm:hidden">
                            {service.shortDescription}
                          </span>
                        </span>

                        <ArrowRight
                          className={`h-4 w-4 shrink-0 transition-settle group-hover:translate-x-1 ${
                            isActive ? 'text-terracotta' : 'text-ink-faint'
                          }`}
                          aria-hidden
                        />
                      </ButtonLink>

                      <p className="hidden pb-6 pl-[3.25rem] text-body text-ink-muted lg:block">
                        {service.shortDescription}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Live preview, desktop only. */}
            <div className="hidden lg:col-span-5 lg:block">
              <div className="lg:sticky lg:top-24">
                {(() => {
                  const shown =
                    services.find(s => s.id === activeService) ?? services[0];
                  if (!shown) return null;
                  return (
                    <>
                      <div className="aspect-square w-full overflow-hidden bg-sand">
                        <Photo
                          key={shown.id}
                          {...resolvePhoto(shown.image)}
                          alt={shown.name}
                          className="animate-fade-rise h-full w-full object-cover"
                        />
                      </div>
                      <div className="mt-3 flex items-baseline gap-3 border-t border-rule pt-3">
                        <span className="docket-meta text-ink-faint">Fig. 02</span>
                        <span className="text-small text-ink-muted">
                          {shown.name}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS — timings, because "quickly" should be checkable
          ================================================================ */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={settings.processEyebrow}
            heading={settings.processHeading}
            lead={settings.processIntro}
          />

          <div className="mt-12 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {DEFAULT_PROCESS_STEPS.map((step, index) => (
              <div key={step.title} className="bg-paper p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="docket-meta tabular text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="docket-meta text-terracotta">{step.timing}</span>
                </div>
                <h3 className="mt-7 text-h3">{step.title}</h3>
                <p className="mt-3 text-small text-ink-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          VERIFY + LIMITS — the honest band
          ================================================================ */}
      <section className="bg-paper-sunk py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow={settings.verifyEyebrow}
                heading={settings.verifyHeading}
              />

              <div className="mt-9 border-t border-rule">
                {DEFAULT_VERIFY_STEPS.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-5 border-b border-rule py-5"
                  >
                    <span
                      aria-hidden
                      className="docket-meta tabular w-6 shrink-0 pt-1 text-ink-faint"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-h3">{step.title}</h3>
                      <p className="mt-1.5 text-small text-ink-muted">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-ink bg-paper-raised p-6 sm:p-7">
                <div className="docket-meta text-terracotta">{settings.limitsEyebrow}</div>
                <h2 className="mt-3 text-h2">{settings.limitsHeading}</h2>

                <ul className="mt-6 space-y-3.5">
                  {DEFAULT_LIMITS.map(limit => (
                    <li key={limit} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-2.5 h-px w-4 shrink-0 bg-terracotta"
                      />
                      <span className="text-body text-ink">{limit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PEOPLE — the roster. Who actually turns up.
          ================================================================ */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The roster"
            heading="Who would be coming to your home."
          />

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {people.map((person, index) => (
              <article key={person.id}>
                <div className="aspect-[4/5] w-full overflow-hidden bg-sand">
                  <Photo
                    {...resolvePhoto(person.photo)}
                    alt={person.role}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 border-t border-ink pt-3">
                  <div className="docket-meta tabular text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-1.5 text-h3">{person.title}</h3>
                  <p className="mt-2 text-small text-ink-muted">
                    {person.shortDescription}
                  </p>
                  <Button
                    variant="quiet"
                    size="sm"
                    className="mt-3 !px-0"
                    onClick={() =>
                      openWhatsApp(`Hi, I would like to know more about ${person.role}.`)
                    }
                  >
                    Enquire
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SERVICE AREA
          ================================================================ */}
      <section className="bg-paper-sunk py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
<SectionHeader eyebrow="Where we work" heading="Twelve areas of Mumbai, same-day." />

          <ul className="mt-9 grid grid-cols-2 gap-x-8 border-t border-rule sm:grid-cols-3">
            {MumbaiAreas.map(area => (
              <li
                key={area}
                className="border-b border-rule-soft py-2.5 text-small"
              >
                {area}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-small text-ink-muted">
            Just outside these?{' '}
            <ButtonAnchor href={telHref} variant="quiet" size="sm" className="!px-0">
              Ask anyway
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </ButtonAnchor>
          </p>
        </div>

            <figure className="lg:col-span-7">
<div className="aspect-[16/9] w-full overflow-hidden bg-sand">
                  <Photo
                    {...PHOTOS.mumbaiSeaLink}
                    alt="The sea link at sunset, Mumbai"
                    className="h-full w-full object-cover"
                  />
                </div>
              <figcaption className="mt-3 flex items-baseline gap-3 border-t border-rule pt-3">
                <span className="docket-meta text-ink-faint">Fig. 03</span>
                <span className="text-small text-ink-muted">
                  Sea Link, Mumbai — our patch
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="bg-forest py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="docket-meta text-terracotta">Next step</div>
            <h2 className="mt-5 text-h1 text-on-dark">{settings.ctaHeading}</h2>
            <p className="mt-5 text-lead text-on-dark-muted">{settings.ctaDescription}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/book-a-call" variant="accent">
                {settings.ctaButtonText}
              </ButtonLink>
              <Button
                variant="onDark"
                onClick={() => openWhatsApp(settings.defaultWhatsAppMessage)}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp us
              </Button>
            </div>

            <Rule className="mt-12 !bg-on-dark/20" />
            <p className="mt-6 max-w-lg text-small text-on-dark-muted">
              {settings.responseCommitment}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
