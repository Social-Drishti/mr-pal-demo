import React, { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Button, ButtonAnchor, Field, Rule, SectionHeader, inputClass } from '../components/ui';
import { DEFAULT_DOCKET_FIELDS } from '../data/defaultData';

const NEED_OPTIONS = DEFAULT_DOCKET_FIELDS.find(f => f.id === 'need')!.options;
const AREA_OPTIONS = DEFAULT_DOCKET_FIELDS.find(f => f.id === 'locality')!.options;
const ROLE_OPTIONS = DEFAULT_DOCKET_FIELDS.find(f => f.id === 'role')!.options;

export const BookCallPage: React.FC = () => {
  const { openWhatsApp, settings } = useSite();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    need: '',
    role: '',
    area: '',
    message: '',
  });
  const [prepared, setPrepared] = useState(false);

  const canSubmit = Boolean(formData.name.trim() && formData.phone.trim());

  const labelOf = (options: { id: string; label: string }[], id: string) =>
    options.find(o => o.id === id)?.label ?? '';

  // There is no backend behind this form. Rather than claim the request was
  // received, it is composed and handed to WhatsApp — where it genuinely lands.
  const composedMessage = [
    `Hi MR. PAL, I would like to request care staff.`,
    '',
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    formData.need ? `Who needs support: ${labelOf(NEED_OPTIONS, formData.need)}` : '',
    formData.role ? `Looking for: ${labelOf(ROLE_OPTIONS, formData.role)}` : '',
    formData.area ? `Area: ${labelOf(AREA_OPTIONS, formData.area)}` : '',
    formData.message ? `\nNotes: ${formData.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setPrepared(true);
  };

  const telHref = `tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`;

  return (
    <div className="bg-paper py-12 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- The form ---- */}
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Request a call"
              heading="Two details, then we call you."
              lead="We will ask the rest on the phone. Nothing here is sent anywhere until you choose to send it."
            />

            <div className="sheet mt-10 p-6 sm:p-8">
              {prepared ? (
                <div className="py-4">
                  <div className="docket-meta text-terracotta">Ready to send</div>
                  <h2 className="mt-4 text-h3">
                    Your request is written and ready.
                  </h2>
                  <p className="mt-3 text-body text-ink-muted">
                    Sending it on WhatsApp puts it in front of the coordinator immediately —
                    usually faster than waiting for a callback.
                  </p>

                  <div className="mt-7 border border-rule bg-paper p-4">
                    <p className="whitespace-pre-line text-small text-ink">
                      {composedMessage}
                    </p>
                  </div>

                  <div className="mt-7 space-y-3">
                    <Button
                      variant="accent"
                      className="w-full"
                      onClick={() => openWhatsApp(composedMessage)}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      Send on WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setPrepared(false)}>
                      Edit the request
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <Field label="Your name" htmlFor="name">
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. Vikram Joshi"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Phone number" htmlFor="phone">
                      <input
                        id="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="e.g. 98200 12345"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Who needs support"
                    htmlFor="need"
                    hint="Not sure? Leave this blank and we will work it out on the call."
                  >
                    <select
                      id="need"
                      value={formData.need}
                      onChange={e => setFormData({ ...formData, need: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Please choose…</option>
                      {NEED_OPTIONS.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <Field label="Whom would you like?" htmlFor="role">
                      <select
                        id="role"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">No preference</option>
                        {ROLE_OPTIONS.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Area in Mumbai" htmlFor="area">
                      <select
                        id="area"
                        value={formData.area}
                        onChange={e => setFormData({ ...formData, area: e.target.value })}
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">Please choose…</option>
                        {AREA_OPTIONS.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field
                    label="Anything we should know"
                    htmlFor="message"
                    hint="Optional. Timings, duties, anything that is non-negotiable."
                  >
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="e.g. My mother is 78 and needs someone 6am–10am for bathing and meals. She is diabetic."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass} resize-y`}
                    />
                  </Field>

                  <Rule />
                  <Button type="submit" variant="primary" disabled={!canSubmit}>
                    Prepare my request
                  </Button>

                  <p className="text-small text-ink-muted">
                    Nothing is sent from this page on its own. The next step is always you
                    choosing to send it.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* ---- What to expect ---- */}
          <aside className="lg:col-span-5">
            <div className="border border-ink bg-paper-raised p-7">
              <div className="docket-meta text-terracotta">What to expect</div>
              <h2 className="mt-4 text-h3">Straight answers, up front.</h2>

              <dl className="mt-7 space-y-6">
                <div className="border-t border-rule pt-5">
                  <dt className="text-small font-semibold">Who calls you</dt>
                  <dd className="mt-1 text-small text-ink-muted">
                    A coordinator, not a call centre. Usually the same person again if you
                    need us twice.
                  </dd>
                </div>
                <div className="border-t border-rule pt-5">
                  <dt className="text-small font-semibold">When</dt>
                  <dd className="mt-1 text-small text-ink-muted">
                    {settings.officeHours}. Outside those hours we reply first thing next
                    morning.
                  </dd>
                </div>
                <div className="border-t border-rule pt-5">
                  <dt className="text-small font-semibold">What it costs</dt>
                  <dd className="mt-1 text-small text-ink-muted">
                    Nothing for the first conversation, and no obligation afterwards. Charges
                    depend on hours, duties and locality — we quote after we understand the
                    routine.
                  </dd>
                </div>
                <div className="border-t border-rule pt-5">
                  <dt className="text-small font-semibold">Your details</dt>
                  <dd className="mt-1 text-small text-ink-muted">
                    Used to arrange the placement and nothing else. No marketing list, no
                    third parties.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 space-y-3">
              <ButtonAnchor href={telHref} variant="primary" className="w-full">
                <Phone className="h-4 w-4" aria-hidden />
                {settings.phoneNumber}
              </ButtonAnchor>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => openWhatsApp(settings.defaultWhatsAppMessage)}
              >
                <MessageCircle className="h-4 w-4 text-terracotta" aria-hidden />
                Message us instead
              </Button>
              <p className="text-center text-small text-ink-faint">
                Or email{' '}
                <a
                  href={`mailto:${settings.email}`}
                  className="underline decoration-terracotta underline-offset-4 transition-settle hover:decoration-2"
                >
                  {settings.email}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};