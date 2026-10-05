import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Photo } from '../components/Photo';
import { resolvePhoto } from '../data/images';
import { Button, ButtonLink, ButtonAnchor, Rule, SectionHeader } from '../components/ui';

/**
 * The full catalogue. Every service gets its own page at /services/:slug, and
 * this is the index they are all reachable from — the homepage section is a
 * summary, not the only way in.
 *
 * Laid out as an editorial contents list rather than a card grid: a numbered
 * column, the name, and the photograph beside it. Rows alternate so the eye has
 * a rhythm to travel down on a long page.
 */
export function ServicesPage() {
  const { services, settings, openWhatsApp } = useSite();
  const telHref = `tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`;

  return (
    <>
      {/* ---- Header ---- */}
      <section className="bg-paper pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-small text-ink-muted transition-settle hover:text-terracotta"
          >
            <span aria-hidden>&larr;</span>
            Home
          </Link>

          <div className="mt-9 max-w-3xl">
            <div className="docket-meta text-terracotta">The catalogue</div>
            <h1 className="mt-5 text-display">Everything we place.</h1>
            <p className="mt-6 text-lead text-ink-muted">
              Four roles, four different sets of skills. Tell us which one you
              need and we send that — not whoever happens to be free.
            </p>
          </div>
        </div>
      </section>

      {/* ---- The list ---- */}
      <section className="bg-paper-sunk py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="space-y-px">
            {services.map((service, index) => (
              <li
                key={service.id}
                className="group border-t border-rule last:border-b"
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="grid grid-cols-1 items-start gap-5 py-7 transition-settle sm:grid-cols-12 sm:gap-8 sm:py-9"
                >
                  <span className="docket-meta tabular text-ink-faint sm:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="sm:col-span-4">
                    <span className="block font-display text-h2 leading-tight transition-colors group-hover:text-terracotta">
                      {service.name}
                    </span>
                    <span className="mt-3 block text-body text-ink-muted">
                      {service.shortDescription}
                    </span>
                  </span>

                  <span className="sm:col-span-2">
                    <span className="block aspect-[4/3] w-full overflow-hidden bg-sand">
                      <Photo
                        {...resolvePhoto(service.image)}
                        alt={service.name}
                        className="h-full w-full object-cover"
                      />
                    </span>
                  </span>

                  <span className="sm:col-span-4">
                    <span className="block text-small text-ink-muted">
                      {service.description}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-small font-semibold text-ink underline decoration-terracotta underline-offset-[6px] transition-settle group-hover:decoration-2">
                      What this involves
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-settle group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Which one? ---- */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="Not sure"
                heading="Describe it and we will decide."
              />
              <p className="mt-5 max-w-lg text-lead text-ink-muted">
                Most families are not sure which of these they need, and that is
                a normal place to start. Four short questions and we will tell
                you what actually fits the situation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/#request" variant="accent">
                  Answer four questions
                </ButtonLink>
                <ButtonAnchor href={telHref} variant="outline">
                  <Phone className="h-4 w-4" aria-hidden />
                  {settings.phoneNumber}
                </ButtonAnchor>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-ink bg-paper-raised p-6 sm:p-7">
                <div className="docket-meta text-terracotta">Straight answer</div>
                <h2 className="mt-3 text-h2">When to skip us.</h2>
                <ul className="mt-6 space-y-3.5">
                  <li className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-4 shrink-0 bg-terracotta"
                    />
                    <span className="text-body text-ink">
                      Anyone needing continuous nursing, injections or clinical
                      procedures.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-4 shrink-0 bg-terracotta"
                    />
                    <span className="text-body text-ink">
                      Live-in staff for an unwell patient who cannot be left.
                    </span>
                  </li>
                </ul>
                <Rule className="mt-7" />
                <p className="mt-5 text-small text-ink-muted">
                  A hospital or a specialist agency will serve those cases
                  better than we can.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="bg-forest py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="docket-meta text-terracotta">Next step</div>
            <h2 className="mt-5 text-h1 text-on-dark">
              Seen the one you need?
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/#request" variant="accent">
                Build your request
              </ButtonLink>
              <Button
                variant="onDark"
                onClick={() => openWhatsApp(settings.defaultWhatsAppMessage)}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}