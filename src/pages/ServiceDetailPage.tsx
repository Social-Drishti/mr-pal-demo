import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Button, ButtonLink, ButtonAnchor, Rule, SectionHeader } from '../components/ui';
import { resolvePhoto } from '../data/images';
import { Photo } from '../components/Photo';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, settings, openWhatsApp } = useSite();

  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="docket-meta text-terracotta">Not found</div>
        <h1 className="mt-4 text-h1">We do not have that page.</h1>
        <p className="mt-4 text-lead text-ink-muted">
          The link may be out of date. Here is everything we place.
        </p>
        <ButtonLink to="/services" variant="primary" className="mt-8">
          See what we place
        </ButtonLink>
      </div>
    );
  }

  const others = services.filter(s => s.id !== service.id);
  const telHref = `tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`;

  return (
    <>
      {/* ---- Header ---- */}
      <section className="bg-paper pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-small text-ink-muted transition-settle hover:text-terracotta"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All services
          </Link>

          <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="docket-meta text-terracotta">What we place</div>
              <h1 className="mt-5 text-display">{service.name}</h1>
              <p className="mt-6 max-w-xl text-lead text-ink-muted">
                {service.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="accent"
                  onClick={() =>
                    openWhatsApp(`Hi, I would like to enquire about ${service.name}.`)
                  }
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {service.ctaText}
                </Button>
                <ButtonLink to="/book-a-call" variant="outline">
                  Request a call
                </ButtonLink>
              </div>
            </div>

            <figure className="lg:col-span-5">
              <div className="aspect-[4/5] w-full overflow-hidden bg-sand">
                <Photo
                  {...resolvePhoto(service.image)}
                  width={900}
                  height={672}
                  alt={service.name}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ---- Who it is for + what the person does ---- */}
      <section className="bg-paper-sunk py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Who this suits"
                heading="Who is this for?"
              />
              <ul className="mt-9 border-t border-rule">
                {service.whoIsThisFor.map(item => (
                  <li key={item} className="flex gap-4 border-b border-rule py-4">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-terracotta" />
                    <span className="text-body text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Day to day"
                heading="What this person actually does."
              />
              <div className="mt-9 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
                {service.howWeHelpCards.map((card, index) => (
                  <div key={card.title} className="bg-paper-sunk p-6">
                    <span className="docket-meta tabular text-ink-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-5 text-h3">{card.title}</h3>
                    <p className="mt-3 text-small text-ink-muted">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Support points ---- */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="docket-meta text-terracotta">Covered</div>
            <h2 className="mt-4 text-h2">What the placement covers.</h2>
          </div>

          <div className="mt-10 border-t-2 border-ink">
            {service.supportPoints.map((point, index) => (
              <div
                key={point}
                className="flex items-baseline gap-5 border-b border-rule py-5"
              >
                <span className="docket-meta tabular w-6 shrink-0 text-ink-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-lead">{point}</span>
              </div>
            ))}
          </div>

          <Rule className="mt-12" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="accent"
              onClick={() =>
                openWhatsApp(`Hi, I would like to enquire about ${service.name}.`)
              }
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {service.ctaText}
            </Button>
            <ButtonAnchor href={telHref} variant="outline">
              Or call {settings.phoneNumber}
            </ButtonAnchor>
          </div>
        </div>
      </section>

      {/* ---- Other services ---- */}
      <section className="bg-paper-sunk py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="docket-meta text-terracotta">Also placed</div>
          <div className="mt-12 border-t-2 border-ink">
            {others.map((other, index) => (
              <ButtonLink
                key={other.id}
                to={`/services/${other.slug}`}
                variant="quiet"
                className="!decoration-0 !text-inherit group grid grid-cols-1 items-baseline gap-2 border-b border-rule py-6 transition-settle hover:bg-paper sm:grid-cols-12 sm:gap-6 sm:px-2"
              >
                <span className="docket-meta tabular text-ink-faint sm:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-h3 transition-colors group-hover:text-terracotta sm:col-span-4">
                  {other.name}
                </span>
                <span className="text-body text-ink-muted sm:col-span-6">
                  {other.shortDescription}
                </span>
                <span className="flex justify-start sm:col-span-1 sm:justify-end">
                  <ArrowRight
                    className="h-4 w-4 text-ink-faint transition-settle group-hover:translate-x-1 group-hover:text-terracotta"
                    aria-hidden
                  />
                </span>
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
