export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
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
  photo: string;
  shortDescription: string;
  learnMoreText: string;
  responsibilities: string[];
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  photo: string;
  bio: string;
  expertise: string[];
  phoneOrContactNote: string;
}

export interface SiteSettings {
  // Hero settings
  heroEyebrow: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroDescription: string;
  heroImage: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  
  // Care Finder
  careFinderHeading: string;
  careFinderSubheading: string;
  
  // Interactive Helper
  helperHeading: string;
  helperSubheading: string;

  // Final CTA
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  
  // Contact & Social
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  defaultWhatsAppMessage: string;
}
