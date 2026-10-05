import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { DEFAULT_DOCKET_FIELDS } from '../data/defaultData';
import type { DocketField } from '../types';
import { Button, ButtonLink, ButtonAnchor, SectionHeader } from './ui';

const labelFor = (field: DocketField, optionId?: string) =>
  field.options.find(o => o.id === optionId)?.label;

const stripQuestion = (label: string) => label.replace(/\?$/, '').toLowerCase();

/**
 * The Service Request Docket â€” a stepped form.
 *
 * One question per step rather than four stacked down the page. On a phone the
 * old version was several screens of scrolling before the visitor reached a
 * send button; now each step is a single screen and the step itself slides in
 * from the right while the one before it leaves to the left, so movement
 * carries the sense of progress.
 *
 * The track is a real horizontal flex rail translated with transform, which
 * keeps the animation on the compositor. Off-screen steps are marked `inert`
 * so they cannot be tabbed into or announced out of order.
 *
 * Calling is offered permanently at the foot of the form. Someone who would
 * rather not fill anything in should never be trapped by the form to reach a
 * phone number.
 */
export function ServiceRequestDocket() {
  const { settings, services, openWhatsApp } = useSite();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);
  const hasStepped = useRef(false);
  const [trackHeight, setTrackHeight] = useState<number | null>(null);

  const total = DEFAULT_DOCKET_FIELDS.length;
  const answeredCount = DEFAULT_DOCKET_FIELDS.filter(f => answers[f.id]).length;
  const matchedService = services.find(s => s.id === answers.need);
  const telHref = `tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`;

  const currentField = DEFAULT_DOCKET_FIELDS[step];
  const currentAnswered = Boolean(currentField && answers[currentField.id]);
  const isLast = step === total - 1;

  const setAnswer = (fieldId: string, optionId: string) =>
    setAnswers(prev => ({ ...prev, [fieldId]: optionId }));

  const goNext = () => setStep(s => Math.min(s + 1, total - 1));
  const goBack = () => setStep(s => Math.max(s - 1, 0));

  /**
   * The rail is a flex row, so it is naturally as tall as its *tallest* step.
   * Questions differ a lot in length, which left a dead gap under the short
   * ones â€” very visible on a phone, where the Next button sat below it.
   *
   * So the rail's height is pinned to whichever step is showing. Measured with
   * a ResizeObserver rather than assumed, because option counts and label
   * wrapping differ per step and per viewport.
   */
  useLayoutEffect(() => {
    const rail = trackRef.current;
    const active = rail?.children[step] as HTMLElement | undefined;
    if (!active) return;

    const measure = () => setTrackHeight(active.getBoundingClientRect().height);
    measure();

    /**
     * Focus follows the step. Without this, advancing leaves focus sitting on
     * the radio that is about to be blurred by inert, so a keyboard user is
     * dropped at the top of the document and a screen reader is never told the
     * question changed. Skipped on mount so the page does not steal focus.
     */
    if (hasStepped.current) {
      active
        .querySelector<HTMLElement>('fieldset')
        ?.focus({ preventScroll: true });
    }
    hasStepped.current = true;

    // Without ResizeObserver the rail simply keeps its natural height, which
    // is the older behaviour rather than a broken form.
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(measure);
    observer.observe(active);
    return () => observer.disconnect();
  }, [step]);

  const buildMessage = () => {
    const lines = DEFAULT_DOCKET_FIELDS.filter(f => answers[f.id]).map(f => {
      const label = stripQuestion(f.label);
      return `${label}: ${labelFor(f, answers[f.id])}`;
    });
    return [`Hi MR. PAL, I would like to request care staff.`, '', ...lines].join('\n');
  };

  return (
    <section id="request" className="scroll-mt-24 bg-paper py-14 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={settings.docketEyebrow}
          heading={settings.docketHeading}
          lead={settings.docketIntro}
        />

        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          {/* ---------- Left: the questions ---------- */}
          <div className="lg:col-span-7">
            {/* ---- Progress: step count plus a rule per step ---- */}
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
              <span className="docket-meta text-terracotta">
                Step {String(step + 1).padStart(2, '0')} of{' '}
                {String(total).padStart(2, '0')}
              </span>
              <span className="docket-meta tabular text-ink-faint">
                {answeredCount}/{String(total).padStart(2, '0')} answered
              </span>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden>
              {DEFAULT_DOCKET_FIELDS.map((field, i) => (
                <span
                  key={field.id}
                  className={`h-0.5 transition-colors duration-300 ${
                    i <= step ? 'bg-terracotta' : 'bg-rule'
                  }`}
                />
              ))}
            </div>

            {/* ---- The sliding track ---- */}
            <div
              className="mt-8 overflow-hidden transition-[height] duration-300 ease-settle motion-reduce:transition-none sm:mt-10"
              style={trackHeight === null ? undefined : { height: trackHeight }}
            >
              <ul
                ref={trackRef}
                className="flex transition-transform duration-300 ease-settle motion-reduce:transition-none"
                style={{ transform: `translateX(-${step * 100}%)` }}
              >
                {DEFAULT_DOCKET_FIELDS.map((field, index) => {
                  const labelId = `docket-label-${field.id}`;
                  const isCurrent = index === step;
                  return (
                    <li
                      key={field.id}
                      className="w-full shrink-0"
                      /* `inert` alone, never alongside `aria-hidden`.
                         Selecting an option leaves that radio focused, so
                         180ms later this step is hidden. Adding aria-hidden at
                         that moment hides a focused element, which browsers
                         block and warn about. inert already removes the subtree
                         from the accessibility tree and blurs it. */
                      inert={!isCurrent}
                    >
                      {/* Focused on step change so the new question is what a
                          screen reader lands on. -1 keeps it out of the tab
                          order; focus is moved to it deliberately, not tabbed. */}
                      <fieldset aria-labelledby={labelId} tabIndex={-1}>
                        <div className="text-h2">{field.label}</div>
                        <p className="mt-2 text-body text-ink-muted">{field.hint}</p>

                        <div className="mt-6 border-t border-rule">
                          {field.options.map(option => (
                            <label
                              key={option.id}
                              className="flex cursor-pointer items-start gap-3.5 border-b border-l-2 border-rule-soft border-l-transparent py-3.5 pl-3 pr-2 transition-settle hover:bg-paper-sunk has-[:checked]:border-l-terracotta has-[:checked]:bg-paper-sunk sm:gap-4 sm:py-4 sm:pl-5 sm:pr-3"
                            >
                              <input
                                type="radio"
                                name={`docket-${field.id}`}
                                value={option.id}
                                checked={answers[field.id] === option.id}
                                onChange={() => {
                                  setAnswer(field.id, option.id);
                                  // Choosing is itself consent to move on, so the
                                  // form never needs a second tap to advance.
                                  if (!isLast) {
                                    setTimeout(goNext, 180);
                                  }
                                }}
                                className="peer sr-only"
                              />
                              <span
                                aria-hidden
                                className="mt-1.5 h-3.5 w-3.5 shrink-0 border border-ink-faint transition-settle peer-checked:border-terracotta peer-checked:bg-terracotta peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terracotta-deep"
                              />
                              <span className="flex-1">
                                <span className="block text-body">{option.label}</span>
                                {option.hint ? (
                                  <span className="mt-0.5 block text-small text-ink-muted">
                                    {option.hint}
                                  </span>
                                ) : null}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      {matchedService && field.id === 'need' ? (
                        <div className="mt-6">
                          <ButtonLink
                            to={`/services/${matchedService.slug}`}
                            variant="quiet"
                            size="sm"
                          >
                            <span>
                              What {matchedService.name.toLowerCase()} involves
                            </span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                          </ButtonLink>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
              </div>
          </div>

          {/* ---------- Right: the receipt ----------
              On a phone this simply stacks under the questions, which is how it
              has always read. From lg up it becomes a separate column, so the
              form no longer floats alone in the left half of a 1280px sheet. */}
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            {/* Centred in the row, so the rule sits alongside the receipt block
                rather than running the full height of the section.
                Deliberately not sticky: a pinned element cannot also be
                vertically centred, and it would jump the moment the row passed
                the scroll threshold. */}
            <div className="lg:border-l lg:border-rule lg:pl-8 xl:pl-10">
              {/* ---- Running summary, so nothing chosen is ever hidden ---- */}
              <div className="mt-8 border-t border-rule pt-5 lg:mt-0 lg:border-t-0 lg:pt-0">
                <div className="docket-meta text-ink-faint">Your request so far</div>
                {answeredCount === 0 ? (
                  <p className="mt-2 text-small text-ink-muted">
                    {settings.docketEmptyText}
                  </p>
                ) : (
                  <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 lg:flex-col lg:gap-2">
                    {DEFAULT_DOCKET_FIELDS.filter(f => answers[f.id]).map(f => (
                      <li key={f.id} className="text-small font-semibold text-ink">
                        {labelFor(f, answers[f.id])}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ---- Controls ---- */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
                <Button
                  variant="accent"
                  className="w-full sm:w-auto lg:w-full"
                  onClick={() =>
                    isLast ? openWhatsApp(buildMessage()) : goNext()
                  }
                  disabled={!isLast && !currentAnswered}
                >
                  {isLast ? settings.docketSubmitLabel : 'Next question'}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>

                {step > 0 ? (
                  <Button variant="outline" onClick={goBack}>
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Back
                  </Button>
                ) : null}

                {isLast && answeredCount < total ? (
                  <ButtonLink to="/book-a-call" variant="outline">
                    Send with my details
                  </ButtonLink>
                ) : null}
              </div>

              {/* ---- The way out, always present ---- */}
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-5">
                <span className="text-small text-ink-muted">
                  Would rather not fill this in?
                </span>
                <ButtonAnchor href={telHref} variant="quiet" size="sm" className="!px-0">
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  Call {settings.phoneNumber}
                </ButtonAnchor>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
