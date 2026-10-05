import type { PhotoKey } from './data/images';

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  /** One line, used in docket rows and ledger tables. */
  shortDescription: string;
  /** What placing this person covers. Written from the family's side. */
  description: string;
  image: PhotoKey;
  /** Duties the placed person handles day to day. */
  supportPoints: string[];
  ctaText: string;
  whoIsThisFor: string[];
  howWeHelpCards: {
    title: string;
    description: string;
  }[];
}

export interface PeopleItem {
  id: string;
  role: string;
  title: string;
  photo: PhotoKey;
  shortDescription: string;
  learnMoreText: string;
  responsibilities: string[];
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  photo: PhotoKey;
  bio: string;
  expertise: string[];
  phoneOrContactNote: string;
}

/** A single verifiable number. Rendered with tabular figures. */
export interface TrustFigure {
  id: string;
  value: string;
  label: string;
  note: string;
}

export interface DocketOption {
  id: string;
  label: string;
  /** Optional second line, kept short. */
  hint?: string;
}

/**
 * The Service Request Docket. Each field is one numbered line of a printed
 * form; the summary assembles from whatever the visitor has filled in.
 */
export interface DocketField {
  id: string;
  label: string;
  hint: string;
  options: DocketOption[];
}

export interface SiteSettings {
  // ---- Hero ----
  heroEyebrow: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroDescription: string;
  heroImage: PhotoKey;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;

  // ---- Service Request Docket ----
  docketEyebrow: string;
  docketHeading: string;
  docketIntro: string;
  docketSummaryLabel: string;
  docketEmptyText: string;
  docketSubmitLabel: string;
  docketSecondaryLabel: string;

  // ---- Trust: figures shown, not claimed ----
  figuresEyebrow: string;
  figuresHeading: string;

  // ---- Trust: how staff are checked ----
  verifyEyebrow: string;
  verifyHeading: string;
  verifyIntro: string;

  // ---- Trust: stated limits ----
  limitsEyebrow: string;
  limitsHeading: string;

  // ---- Process ----
  processEyebrow: string;
  processHeading: string;
  processIntro: string;

  // ---- Final CTA ----
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;

  // ---- Contact ----
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  defaultWhatsAppMessage: string;
  /** A commitment the business can actually be held to. */
  responseCommitment: string;
  officeHours: string;
}
