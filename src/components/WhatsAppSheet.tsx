import { useEffect, useRef } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

/**
 * A confirmation sheet, not a fake chat window.
 *
 * There is no simulated conversation here: no invented "online" dot, no fake
 * read receipts. It shows exactly the message that will be sent and hands off
 * to the real WhatsApp link with the real number. Faking the channel would
 * undercut the one thing this site is trying to earn.
 */
export function WhatsAppSheet() {
  const { activeWhatsAppMsg, closeWhatsAppModal, settings } = useSite();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeWhatsAppMsg) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeWhatsAppModal();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeWhatsAppMsg, closeWhatsAppModal]);

  if (!activeWhatsAppMsg) return null;

  const cleanPhone = settings.whatsappNumber.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(activeWhatsAppMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-forest/50 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-sheet-title"
        className="animate-fade-rise w-full max-w-md border border-rule bg-paper-raised"
      >
        <div className="flex items-start justify-between border-b border-rule p-6">
          <div>
            <div className="docket-meta text-terracotta">Send via WhatsApp</div>
            <h2 id="wa-sheet-title" className="mt-3 text-h3">
              Check this before sending
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={closeWhatsAppModal}
            aria-label="Close"
            className="-mr-2 -mt-1 flex h-9 w-9 cursor-pointer items-center justify-center text-ink-muted transition-settle hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="border border-rule bg-paper p-4">
            <p className="whitespace-pre-line text-body text-ink">{activeWhatsAppMsg}</p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-sm bg-whatsapp px-4 py-3.5 text-small font-semibold text-whatsapp-ink transition-settle hover:bg-whatsapp-deep"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Open WhatsApp — {settings.whatsappNumber}
          </a>

          <p className="mt-5 text-small text-ink-muted">
            WhatsApp opens with this message already written. {settings.officeHours}. Outside
            those hours we reply first thing the next morning.
          </p>
        </div>
      </div>
    </div>
  );
}