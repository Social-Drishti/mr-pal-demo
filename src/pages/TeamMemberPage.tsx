import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Button, ButtonLink, Rule, SectionHeader } from '../components/ui';
import { Photo } from '../components/Photo';
import { resolvePhoto } from '../data/images';

export const TeamMemberPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { team, settings, openWhatsApp } = useSite();

  const member = team.find(m => m.slug === slug);
  const others = team.filter(m => m.slug !== slug);

  if (!member) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="docket-meta text-terracotta">Not found</div>
        <h1 className="mt-4 text-h1">We could not find that profile.</h1>
        <ButtonLink to="/team" variant="primary" className="mt-8">
          Meet the team
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      <section className="bg-paper pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-small text-ink-muted transition-settle hover:text-terracotta"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All team members
          </Link>

          <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <figure className="lg:col-span-5">
              <div className="aspect-[4/5] w-full overflow-hidden bg-sand">
                <Photo
                  {...resolvePhoto(member.photo)}
                  width={900}
                  height={672}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </figure>

            <div className="lg:col-span-7">
              <div className="docket-meta text-terracotta">{member.designation}</div>
              <h1 className="mt-5 text-display">{member.name}</h1>
              <p className="mt-7 max-w-xl text-lead text-ink-muted">{member.bio}</p>

              <Rule className="mt-9" />
              <p className="mt-5 text-body text-ink">{member.phoneOrContactNote}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="accent"
                  onClick={() =>
                    openWhatsApp(
                      `Hi, I have a question about care staff and would like to speak to ${member.name}.`,
                    )
                  }
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Ask about {member.name.split(' ')[0]}
                </Button>
                <ButtonLink to="/book-a-call" variant="outline">
                  Request a call
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-sunk py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Areas of focus"
                heading={`What ${member.name.split(' ')[0]} handles.`}
              />
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-3">
                {member.expertise.map(item => (
                  <span
                    key={item}
                    className="border border-rule bg-paper px-3.5 py-2 text-small"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Rule className="mt-10" />
              <p className="mt-6 text-body text-ink-muted">{settings.responseCommitment}</p>
            </div>
          </div>
        </div>
      </section>

      {others.length ? (
        <section className="bg-paper py-14 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="docket-meta text-terracotta">Also here</div>
            <div className="mt-10 border-t-2 border-ink">
              {others.map((other, index) => (
                <ButtonLink
                  key={other.id}
                  to={`/team/${other.slug}`}
                  variant="quiet"
                  className="!decoration-0 !text-inherit group grid grid-cols-1 items-baseline gap-2 border-b border-rule py-6 transition-settle hover:bg-paper-sunk sm:grid-cols-12 sm:gap-6 sm:px-2"
                >
                  <span className="docket-meta tabular text-ink-faint sm:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-h3 transition-colors group-hover:text-terracotta sm:col-span-4">
                    {other.name}
                  </span>
                  <span className="text-body text-ink-muted sm:col-span-6">
                    {other.designation}
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
      ) : null}
    </>
  );
};
