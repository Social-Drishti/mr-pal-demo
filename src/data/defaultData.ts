import { ServiceItem, PeopleItem, TeamMember, SiteSettings, TrustFigure, DocketField } from '../types';

/* ============================================================================
   MR. PAL — content
   Positioning: MR. PAL finds, checks and places care staff and home helpers
   into Mumbai homes. It is a placement service, not a provider of medical care.
   All figures below are placeholders for the client to replace with real ones.
   ========================================================================== */

export const DEFAULT_SETTINGS: SiteSettings = {
  heroEyebrow: 'Care staff & home help — Mumbai',
  heroHeadingLine1: 'The right person',
  heroHeadingLine2: 'in your home.',
  heroDescription:
    'MR. PAL finds, checks and places trained caregivers, patient attendants and home helpers into Mumbai homes. Tell us the routine you need — we send the person who fits it.',
  heroImage: 'heroCare',
  heroPrimaryCtaText: 'Build your request',
  heroSecondaryCtaText: 'WhatsApp us',

  docketEyebrow: 'Service request',
  docketHeading: 'Build your request.',
  docketIntro:
    'Four short questions. No account and no waiting — the summary fills in as you go, and you can send it to us straight away.',
  docketSummaryLabel: 'Your request',
  docketEmptyText: 'Nothing selected yet',
  docketSubmitLabel: 'Send this request',
  docketSecondaryLabel: 'Talk to someone first',

  figuresEyebrow: 'In numbers',
  figuresHeading: 'What we can tell you up front.',

  verifyEyebrow: 'Before anyone is sent',
  verifyHeading: 'How we check the people we place.',
  verifyIntro:
    'Families hand us the keys to their home. These are the checks that happen before any candidate reaches yours.',

  limitsEyebrow: 'Plainly stated',
  limitsHeading: 'What we do not do.',

  processEyebrow: 'How it runs',
  processHeading: 'From request to first day.',
  processIntro:
    'Four steps, and you can see roughly how long each one takes before you commit to anything.',

  ctaHeading: 'Ready to start?',
  ctaDescription:
    'Send the request above, or call and speak to the person who actually places the staff. No forms to keep filling in.',
  ctaButtonText: 'Request a call',

  whatsappNumber: '+91 98200 12345',
  phoneNumber: '+91 98200 12345',
  email: 'care@mrpal.in',
  address: 'Mumbai, Maharashtra, India',
  defaultWhatsAppMessage: 'Hi, I would like to request care staff for my home.',
  responseCommitment:
    'Every request is read by a person, not a bot. Enquiries sent outside office hours are answered first thing the next morning. Emergencies are answered at any hour.',
  officeHours: 'Mon–Sun, 8:00 AM – 9:00 PM',
};

/** Placeholder figures. Replace with real, defensible numbers before launch. */
export const DEFAULT_FIGURES: TrustFigure[] = [
  {
    id: 'placement-time',
    value: '48 hrs',
    label: 'Typical placement time',
    note: 'From confirmed requirements to someone in the home, for a standard routine.',
  },
  {
    id: 'checks',
    value: '4',
    label: 'Checks before placement',
    note: 'Identity, address, two spoken references, and a skills conversation.',
  },
  {
    id: 'areas',
    value: '12',
    label: 'Mumbai areas served',
    note: 'Same-day reach across the areas listed in the request form above.',
  },
  {
    id: 'trial',
    value: '0',
    label: 'Long contracts to sign',
    note: 'If the match is wrong in the first few days, we replace at no cost.',
  },
];

export const DEFAULT_VERIFY_STEPS: { title: string; description: string }[] = [
  {
    title: 'Identity and address',
    description:
      'Government photo ID and a current address proof are checked against the candidate before any placement is offered.',
  },
  {
    title: 'Two references, actually spoken to',
    description:
      'We call previous employers or families and write down what they said — not simply that someone answered the phone.',
  },
  {
    title: 'Skills matched to your routine',
    description:
      'A structured conversation about daily duties, mobility assistance and any medical routine that is part of the job.',
  },
  {
    title: 'A trial before you commit',
    description:
      'The first few days are a trial period. If the fit is wrong we replace the person, and you are not asked to argue for it.',
  },
];

export const DEFAULT_LIMITS: string[] = [
  'We are not a hospital, and we do not provide medical treatment or nursing care outside a placed person’s duties.',
  'We do not send untrained staff to clinical duties, however urgent the request is.',
  'We do not quote a price before we understand the routine — charges depend on hours, duties and locality.',
  'We do not lock families into long contracts or demand notice periods to change a person.',
];

export const DEFAULT_PROCESS_STEPS: {
  title: string;
  description: string;
  timing: string;
}[] = [
  {
    title: 'You send the request',
    timing: 'Same day',
    description:
      'WhatsApp or the form on this page. A person reads it — there is no call centre in between.',
  },
  {
    title: 'We call to understand the routine',
    timing: 'Within 2 hours',
    description:
      'A short call about daily duties, timings, who needs support, and anything that is non-negotiable.',
  },
  {
    title: 'You get verified profiles',
    timing: 'Within 24 hours',
    description:
      'Usually two or three profiles, with the checks behind each one written down next to it.',
  },
  {
    title: 'They come to your home',
    timing: 'As you choose',
    description:
      'You meet the person before anything is finalised. Trial first, then continue if it works.',
  },
];

/* ---------------------------------------------------------------------------
   The four numbered fields of the docket.
   Field ids match service ids so a selection can deep-link to /services/:slug.
   ------------------------------------------------------------------------- */

export const DEFAULT_DOCKET_FIELDS: DocketField[] = [
  {
    id: 'need',
    label: 'Who needs support at home?',
    hint: 'Pick the closest fit. We confirm the detail on the call.',
    options: [
      { id: 'elder-care', label: 'A parent or senior relative', hint: 'Staying independent, needs daily help' },
      { id: 'patient-care', label: 'Someone recovering or unwell', hint: 'After discharge, surgery or illness' },
      { id: 'dementia-care', label: 'Someone with memory loss', hint: 'Dementia, Alzheimer’s or confusion' },
      { id: 'paralysis-care', label: 'Someone with limited mobility', hint: 'Bed, wheelchair or transfer support' },
      { id: 'not-sure', label: 'Not sure yet', hint: 'We will help you work it out' },
    ],
  },
  {
    id: 'role',
    label: 'Whom would you like?',
    hint: 'The kind of person you would prefer in the home.',
    options: [
      { id: 'caregiver', label: 'Caregiver', hint: 'Daily routine, hygiene, companionship' },
      { id: 'home-nurse', label: 'Home nurse', hint: 'Vitals, medication, clinical routine' },
      { id: 'attendant', label: 'Patient attendant', hint: 'Transfers, bedside, physical support' },
      { id: 'home-helper', label: 'Home helper or maid', hint: 'Cooking, cleaning, household support' },
    ],
  },
  {
    id: 'locality',
    label: 'Which part of Mumbai?',
    hint: 'Helps us send someone who can reach you reliably.',
    options: [
      { id: 'bandra-west', label: 'Bandra West' },
      { id: 'andheri-east', label: 'Andheri East' },
      { id: 'powai', label: 'Powai' },
      { id: 'chembur', label: 'Chembur' },
      { id: 'dadar', label: 'Dadar' },
      { id: 'wadhale', label: 'Wadhale' },
      { id: 'kurla', label: 'Kurla' },
      { id: 'borivali', label: 'Borivali' },
      { id: 'malad', label: 'Malad' },
      { id: 'thane', label: 'Thane' },
      { id: 'fort', label: 'Fort' },
      { id: 'chembur-north', label: 'Chembur North' },
    ],
  },
  {
    id: 'timing',
    label: 'When would you like to start?',
    hint: 'An honest answer makes the matching faster.',
    options: [
      { id: 'asap', label: 'As soon as possible' },
      { id: 'week', label: 'Within a week' },
      { id: 'month', label: 'Within a month' },
      { id: 'exploring', label: 'Just exploring' },
    ],
  },
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'patient-care',
    slug: 'patient-care',
    name: 'Patient Care',
    shortDescription: 'Support for someone recovering at home after discharge or surgery.',
    description:
      'For someone coming home after hospital discharge or surgery, we place a trained attendant or nurse who can manage the bedside routine, hygiene and medication reminders at home.',
    image: 'patientCare',
    supportPoints: [
      'Post-surgery and discharge recovery monitoring',
      'Assistance with daily hygiene, feeding and medication reminders',
      'Bedside positioning, comfort and turning support',
      'Notes relayed to your family and your treating doctor',
    ],
    ctaText: 'Enquire about Patient Care',
    whoIsThisFor: [
      'Someone recovering from hospital discharge or surgery',
      'A patient who needs steady physical support during recovery',
      'A bedridden or semi-ambulatory patient needing dignity preserved daily',
      'Families in Mumbai who want one reliable person, not a rotating roster',
    ],
    howWeHelpCards: [
      {
        title: 'Medication and routine reminders',
        description:
          'Timely reminders for prescribed doses, doctor instructions and dietary timings — recorded in writing for the family.',
      },
      {
        title: 'Mobility and bedside comfort',
        description:
          'Assisting with safe transfers, repositioning to protect skin, and the small movements that keep someone comfortable.',
      },
      {
        title: 'Personal hygiene and bathing',
        description:
          'Respectful assistance with sponge baths, grooming, dressing and linen changes, from someone used to doing it well.',
      },
      {
        title: 'Family updates',
        description:
          'Written updates so the family knows how the day actually went, not just that the person was present.',
      },
    ],
  },
  {
    id: 'elder-care',
    slug: 'elder-care',
    name: 'Elder Care',
    shortDescription: 'Everyday support so a parent can stay in their own home.',
    description:
      'For a parent who wants to stay in their own home, we place a caregiver who can share the daily routine, help with mobility, and keep company — without taking over.',
    image: 'elderCare',
    supportPoints: [
      'Companionship, reading and unhurried conversation',
      'Assistance with walking, daily walks and fall prevention',
      'Helpful meal preparation and hydration',
      'Everyday personal care, with patience and respect',
    ],
    ctaText: 'Enquire about Elder Care',
    whoIsThisFor: [
      'Aging parents living independently in Mumbai apartments',
      'Seniors who want company during the day or through the night',
      'Elders with reduced mobility or a fear of falling',
      'Working children who want to know their parent is fine while they are at work or abroad',
    ],
    howWeHelpCards: [
      {
        title: 'Company that is not a task',
        description:
          'A caregiver who listens, walks with them and is comfortable in ordinary conversation.',
      },
      {
        title: 'Fall prevention and safe walking',
        description:
          'Attentive support getting in and out of bed, walking inside the home, or going out for fresh air.',
      },
      {
        title: 'Running the daily routine',
        description:
          'Waking, freshening up, warm meals on time and a settled bedtime — the small things that hold a day together.',
      },
      {
        title: 'Peace of mind for the family',
        description:
          'Knowing your mother or father is never alone, and is never handled carelessly.',
      },
    ],
  },
  {
    id: 'dementia-care',
    slug: 'dementia-care',
    name: 'Dementia Care',
    shortDescription: 'Patient, watchful support for memory loss and confusion.',
    description:
      'For someone living with memory loss or dementia, we place a person experienced in calm routines and quiet supervision. This is the hardest match to get right, so we spend longer on it.',
    image: 'dementiaCare',
    supportPoints: [
      'Gentle reassurance during confusion, without confrontation',
      'Watchful supervision to prevent wandering',
      'Familiar, predictable daily routines to reduce agitation',
      'Kind assistance with hygiene, meals and comfort',
    ],
    ctaText: 'Enquire about Dementia Care',
    whoIsThisFor: [
      'People living with Alzheimer’s or progressive memory loss',
      'Seniors experiencing sundowning, confusion or disorientation',
      'Families who are exhausted by round-the-clock caregiving',
      'Loved ones who do best in a familiar home rather than an institution',
    ],
    howWeHelpCards: [
      {
        title: 'Calm, unhurried responses',
        description:
          'Trained to answer confusion gently, because arguing is what usually makes it worse.',
      },
      {
        title: 'A safe, familiar environment',
        description:
          'Awareness of exits, kitchen hazards and stairs — supervised without feeling locked in.',
      },
      {
        title: 'Familiar things to hold onto',
        description:
          'Family photo albums, familiar music and simple familiar routines as anchors through the day.',
      },
      {
        title: 'Rest for the family',
        description:
          'Letting sons, daughters and spouses step back from exhaustion and be family again.',
      },
    ],
  },
  {
    id: 'paralysis-care',
    slug: 'paralysis-care',
    name: 'Paralysis Care',
    shortDescription: 'Trained help with transfers, positioning and daily dignity.',
    description:
      'For someone with restricted mobility, we place an attendant trained in safe transfers, regular positioning and personal care carried out with real dignity.',
    image: 'paralysisCare',
    supportPoints: [
      'Safe transfer between bed, wheelchair and chair',
      'Regular turning schedules to protect the skin',
      'Passive limb exercises as advised by a physiotherapist',
      'Hygiene, continence and feeding support done carefully',
    ],
    ctaText: 'Enquire about Paralysis Care',
    whoIsThisFor: [
      'Stroke survivors regaining movement at home',
      'People living with hemiplegia, paraplegia or quadriplegia',
      'Patients needing skilled transfers and wheelchair mobility',
      'Families who need someone physically capable and emotionally steady',
    ],
    howWeHelpCards: [
      {
        title: 'Transfers done safely',
        description:
          'Trained technique for moving someone between bed, wheelchair and commode without injury to either of you.',
      },
      {
        title: 'Skin care and positioning',
        description:
          'Scheduled turns, checks and pressure care — the unglamorous work that prevents serious complications.',
      },
      {
        title: 'Prescribed movement support',
        description:
          'Assisting with the range-of-motion exercises a physiotherapist has already set.',
      },
      {
        title: 'Dignity as the standard',
        description:
          'Hygiene, sponging and grooming handled with the seriousness they deserve.',
      },
    ],
  },
];

export const DEFAULT_PEOPLE: PeopleItem[] = [
  {
    id: 'home-nurses',
    role: 'Home Nurses',
    title: 'Home Nurses',
    photo: 'patientCare',
    shortDescription:
      'Placed with families needing nursing support at home — vitals, dressing and medical routine.',
    learnMoreText: 'Typical duties',
    responsibilities: [
      'Regular monitoring of vitals (BP, sugar, pulse, oxygen)',
      'Administration of prescribed medications and injections',
      'Wound dressing, catheter maintenance and clinical support',
      'Written updates for the family and the attending doctor',
    ],
  },
  {
    id: 'caregivers',
    role: 'Caregivers',
    title: 'Caregivers',
    photo: 'heroCare',
    shortDescription:
      'Placed with families for daily assistance, hygiene and companionship at home.',
    learnMoreText: 'Typical duties',
    responsibilities: [
      'Daily personal hygiene, bathing and grooming assistance',
      'Mealtime assistance and help following dietary routines',
      'Mobility encouragement, gentle walking and companionship',
      'Keeping the household calm and predictable',
    ],
  },
  {
    id: 'patient-attendants',
    role: 'Patient Attendants',
    title: 'Patient Attendants',
    photo: 'attendant',
    shortDescription:
      'Placed with patients who need physical transfers and bedside support, day or night.',
    learnMoreText: 'Typical duties',
    responsibilities: [
      'Repositioning and wheelchair assistance',
      'Bedside presence through the night',
      'Assistance with commode and continence care',
      'Reporting comfort and any concerns to the family',
    ],
  },
  {
    id: 'maids-home-help',
    role: 'Maids & Home Help',
    title: 'Maids & Home Help',
    photo: 'homeHelper',
    shortDescription:
      'Placed with Mumbai households for cooking, cleaning and everyday domestic support.',
    learnMoreText: 'Typical duties',
    responsibilities: [
      'Tidying and sanitising living areas and the patient’s room',
      'Preparing simple, hygienic home-cooked meals',
      'Washing linens, clothes and everyday utensils',
      'Dependable support for households running on a schedule',
    ],
  },
];

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'rahul-sharma',
    slug: 'rahul-sharma',
    name: 'Rahul Sharma',
    designation: 'Founder',
    photo: 'elderCare',
    bio: 'Rahul founded MR. PAL after hiring help for his own father and seeing how little families were told before someone arrived at the door. He now vets every placement himself.',
    expertise: ['Placement standards', 'Family needs assessment', 'Candidate interviews'],
    phoneOrContactNote: 'Reviews every first-time placement personally.',
  },
  {
    id: 'priya-mehta',
    slug: 'priya-mehta',
    name: 'Priya Mehta',
    designation: 'Care Coordinator',
    photo: 'familyCare',
    bio: 'Priya takes the first call. She works out the routine in detail — timings, duties, what the family is worried about — before any candidate is shortlisted.',
    expertise: ['Routine mapping', 'Elder care planning', 'Family communication'],
    phoneOrContactNote: 'The person who answers your first call.',
  },
  {
    id: 'amit-verma',
    slug: 'amit-verma',
    name: 'Amit Verma',
    designation: 'Operations',
    photo: 'attendant',
    bio: 'Amit handles verification and deployment. He is the reason a profile arrives with the checks already written down, and the one who arranges a replacement when a match does not work.',
    expertise: ['Verification', 'Deployment and attendance', 'Replacement cover'],
    phoneOrContactNote: 'Arranges cover and replacements across Mumbai.',
  },
  {
    id: 'neha-kapoor',
    slug: 'neha-kapoor',
    name: 'Neha Kapoor',
    designation: 'Client Support',
    photo: 'homeHelper',
    bio: 'Neha stays with a family after placement. If something is not right in week two, she is the one who hears it and moves on it.',
    expertise: ['After-placement follow-up', 'Feedback and escalation', 'Hours and scheduling'],
    phoneOrContactNote: 'On call for anything that changes after the first day.',
  },
];
