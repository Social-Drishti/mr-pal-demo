import { Link } from 'react-router-dom';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';

/* ============================================================================
   Buttons — one component, four weights. Radius is 2px, never a pill.
   Buttons carry a small amount of letterspacing, the way a form's submit
   block does. That is the register; it is not decorative.
   ========================================================================== */

type Variant = 'primary' | 'accent' | 'outline' | 'onDark' | 'quiet';
type Size = 'sm' | 'md';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-forest text-on-dark hover:bg-forest-deep',
  accent: 'bg-terracotta text-white hover:bg-terracotta-deep',
  outline: 'border border-rule text-ink hover:border-ink/40 hover:bg-paper-sunk',
  onDark: 'border border-on-dark/25 text-on-dark hover:bg-on-dark hover:text-forest',
  quiet:
    'text-ink underline decoration-terracotta decoration-1 underline-offset-[6px] hover:decoration-2',
};

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-small',
  md: 'px-6 py-3.5 text-small',
};

const BASE =
  'inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold tracking-[0.04em] transition-settle select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: { variant?: Variant; size?: Size } & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest} />
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: { variant?: Variant; size?: Size } & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest} />
  );
}

/** For tel:, mailto: and other off-router destinations. */
export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: { variant?: Variant; size?: Size } & ComponentPropsWithoutRef<'a'>) {
  return <a className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest} />;
}

/* ============================================================================
   Structure
   ========================================================================== */

/** A hairline. The most repeated element on the site. */
export function Rule({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-rule ${className}`} />;
}

export function DarkRule({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-on-dark/15 ${className}`} />;
}

/**
 * Section header: margin metadata, then the heading, then an optional lead.
 * A short rule sits above it, like the header line of a printed form.
 */
export function SectionHeader({
  eyebrow,
  heading,
  lead,
  dark = false,
  className = '',
}: {
  eyebrow: string;
  heading: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Rule className={dark ? 'bg-on-dark/20' : ''} />
      <div className="docket-meta mt-5 text-terracotta">{eyebrow}</div>
      <h2
        className={`mt-4 max-w-3xl text-h2 ${
          dark ? 'text-on-dark' : 'text-ink'
        }`}
      >
        {heading}
      </h2>
      {lead ? (
        <p
          className={`mt-5 max-w-xl text-lead ${dark ? 'text-on-dark-muted' : 'text-ink-muted'}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** The numbered marker that sits in a form's left margin. */
export function FieldNumber({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`docket-meta tabular ${dark ? 'text-on-dark/45' : 'text-ink-faint'}`}
    >
      {children}
    </span>
  );
}

/** A genuine pill, reserved for the things that really are round. */
export function Dot({ className = '' }: { className?: string }) {
  return <span aria-hidden className={`block h-2 w-2 rounded-full ${className}`} />;
}

/* ============================================================================
   Form fields — ruled lines, not rounded boxes. The label sits in the margin
   of the field the way it would on a printed form.
   ========================================================================== */

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block docket-meta text-ink-muted">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? <p className="mt-2 text-small text-ink-faint">{hint}</p> : null}
    </div>
  );
}

export const inputClass =
  'w-full rounded-sm border-0 border-b border-rule bg-transparent px-1 py-2.5 text-body text-ink transition-settle placeholder:text-ink-faint focus:border-terracotta';

/**
 * The one place the accent fills a whole shape: the selection stamp.
 * Replaces scale-up and drop-shadow as the language for "you picked this".
 */
export function Stamp({ children }: { children: ReactNode }) {
  return (
    <span className="stamp docket-meta !text-[10px] px-2 py-1 text-white">{children}</span>
  );
}