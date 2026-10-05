import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { ButtonLink, SectionHeader } from '../components/ui';
import { Photo } from '../components/Photo';
import { resolvePhoto } from '../data/images';

export const TeamPage: React.FC = () => {
  const { team, settings } = useSite();

  return (
    <>
      <section className="bg-paper pt-12 pb-12 sm:pt-16 sm:pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The people here"
            heading="Four people you will actually speak to."
            lead="There is no call centre between you and us. These are the names that come up when you ask who is handling it."
          />
        </div>
      </section>

      <section className="bg-paper pb-16 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
            {team.map((member, index) => (
              <article key={member.id} className="bg-paper p-6 sm:p-8">
                <div className="flex gap-5">
                  <div className="h-20 w-20 shrink-0 overflow-hidden bg-sand sm:h-24 sm:w-24">
                    <Photo
                      {...resolvePhoto(member.photo)}
                      width={400}
                      height={299}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="docket-meta text-ink-faint">
                      {String(index + 1).padStart(2, '0')} — {member.designation}
                    </div>
                    <h2 className="mt-2 text-h3">{member.name}</h2>
                  </div>
                </div>

                <p className="mt-6 text-body text-ink-muted">{member.bio}</p>

                <Link
                  to={`/team/${member.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-small font-semibold text-ink underline decoration-terracotta decoration-1 underline-offset-[6px] transition-settle hover:decoration-2"
                >
                  Full profile
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-settle group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-sunk py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="docket-meta text-terracotta">Not sure who to ask</div>
              <h2 className="mt-4 text-h2">
                Start with whoever picks up.
              </h2>
              <p className="mt-4 text-lead text-ink-muted">{settings.responseCommitment}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonLink to="/#request" variant="primary">
                Build a request
              </ButtonLink>
              <ButtonLink to="/book-a-call" variant="outline">
                Request a call
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
