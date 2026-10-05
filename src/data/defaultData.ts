import { ServiceItem, PeopleItem, TeamMember, SiteSettings } from '../types';

export const DEFAULT_SETTINGS: SiteSettings = {
  heroEyebrow: 'HOME CARE YOU CAN TRUST',
  heroHeadingLine1: 'Care that',
  heroHeadingLine2: 'feels personal.',
  heroDescription: 'Home-care support for patients, senior citizens and families across Mumbai.',
  heroImage: '/src/assets/images/hero_care_mumbai_1791178255414.jpg',
  heroPrimaryCtaText: 'Book a Call',
  heroSecondaryCtaText: 'WhatsApp Us',
  
  careFinderHeading: 'How can we help?',
  careFinderSubheading: 'Tell us who needs care and explore immediate support options.',
  
  helperHeading: "Finding care shouldn't feel complicated.",
  helperSubheading: 'We make it simple to tell us what you need and start the conversation.',
  
  ctaHeading: 'Need care for your loved one?',
  ctaDescription: "Tell us what you need. Let's discuss the right support for your family.",
  ctaButtonText: 'Book a Call',
  
  whatsappNumber: '+91 98200 12345',
  phoneNumber: '+91 98200 12345',
  email: 'care@mrpal.in',
  address: 'Mumbai, Maharashtra, India',
  defaultWhatsAppMessage: 'Hi, I would like to know more about home-care services.',
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'patient-care',
    slug: 'patient-care',
    name: 'Patient Care',
    shortDescription: 'Support for patients recovering at home.',
    description: 'Dedicated post-hospitalization recovery, daily vital tracking, and gentle bedside assistance for recovering individuals.',
    image: '/src/assets/images/care_patient_nurse_1791178278602.jpg',
    supportPoints: [
      'Post-surgery and discharge recovery monitoring',
      'Assistance with daily hygiene, feeding and medication reminders',
      'Bedside care, repositioning and comfort support',
      'Coordination with family and treating physician notes'
    ],
    ctaText: 'Enquire for Patient Care',
    whoIsThisFor: [
      'Individuals recovering from hospital discharge or surgery',
      'Patients needing continuous physical recovery support',
      'Bedridden or semi-ambulatory patients requiring daily dignity and hygiene',
      'Families needing a reliable bedside companion in Mumbai'
    ],
    howWeHelpCards: [
      {
        title: 'Medication & Routine Reminders',
        description: 'Timely reminders for prescribed doses, doctor instructions, and dietary schedules.'
      },
      {
        title: 'Mobility & Bedside Comfort',
        description: 'Assisting with safe transfers, repositioning to prevent bed sores, and gentle movements.'
      },
      {
        title: 'Personal Hygiene & Bathing',
        description: 'Respectful assistance with sponge baths, grooming, dressing, and linen changes.'
      },
      {
        title: 'Family Updates & Regular Check-ins',
        description: 'Clear communication with family members so you always know how your loved one is resting.'
      }
    ]
  },
  {
    id: 'elder-care',
    slug: 'elder-care',
    name: 'Elder Care',
    shortDescription: 'Compassionate support for senior citizens.',
    description: 'Empathetic companionship, daily routine assistance, and peaceful presence for aging parents at home.',
    image: '/src/assets/images/care_elder_parent_1791178267696.jpg',
    supportPoints: [
      'Companionship, reading, and gentle conversational presence',
      'Assistance with walking, daily walks and fall prevention',
      'Nutritious meal assistance and hydration tracking',
      'Daily personal care with utmost respect and patience'
    ],
    ctaText: 'Enquire for Elder Care',
    whoIsThisFor: [
      'Aging parents living independently in Mumbai apartments',
      'Seniors who need a trusted companion during daytime or night hours',
      'Elders with reduced mobility or fear of falling',
      'Working children who want peace of mind while at office or abroad'
    ],
    howWeHelpCards: [
      {
        title: 'Warm Companionship',
        description: 'A friendly, respectful companion who listens, walks together, and shares comfortable conversations.'
      },
      {
        title: 'Fall Prevention & Safe Walking',
        description: 'Attentive support while getting out of bed, walking inside the home, or going for fresh air.'
      },
      {
        title: 'Daily Routine Management',
        description: 'Assistance with waking up, freshening up, taking warm meals on time, and peaceful bedtime habits.'
      },
      {
        title: 'Peace of Mind for Families',
        description: 'Knowing your mother or father is never alone, feeling respected and well-attended to every day.'
      }
    ]
  },
  {
    id: 'dementia-care',
    slug: 'dementia-care',
    name: 'Dementia Care',
    shortDescription: 'Patient and attentive care for individuals with dementia.',
    description: 'Specialized patience, calming routines, and watchful supervision for loved ones experiencing memory loss or cognitive changes.',
    image: '/src/assets/images/care_dementia_compassion_1791178313622.jpg',
    supportPoints: [
      'Gentle de-escalation and soothing reassurance during confusion',
      'Continuous watchful supervision to prevent wandering',
      'Structured familiar daily routines to reduce agitation',
      'Kind assistance with hygiene, nutrition, and comfort'
    ],
    ctaText: 'Enquire for Dementia Care',
    whoIsThisFor: [
      'Individuals with Alzheimer’s or progressive memory loss',
      'Seniors experiencing sundowning, confusion, or disorientation',
      'Families exhausted by 24/7 caregiving duties needing dependable support',
      'Loved ones who thrive best in the comfort of their familiar home environment'
    ],
    howWeHelpCards: [
      {
        title: 'Patience & Calm Communication',
        description: 'Trained in gentle responses that reduce anxiety, avoiding confrontation or distress.'
      },
      {
        title: 'Safe Environment & Supervision',
        description: 'Constant awareness of room exits, kitchen hazards, and personal safety without feeling restrictive.'
      },
      {
        title: 'Cognitive Engagement & Memory Prompts',
        description: 'Gentle activities like viewing family photo albums, listening to familiar music, and mild hobbies.'
      },
      {
        title: 'Emotional Support for Family Members',
        description: 'Allowing sons, daughters, and spouses to step back from exhaustion and be family again.'
      }
    ]
  },
  {
    id: 'paralysis-care',
    slug: 'paralysis-care',
    name: 'Paralysis Care',
    shortDescription: 'Daily assistance and home support.',
    description: 'Skilled physical transfer assistance, bed sore prevention, and dignified daily care for individuals with restricted mobility.',
    image: '/src/assets/images/care_paralysis_support_1791178323085.jpg',
    supportPoints: [
      'Safe transfer between bed, wheelchair, and chair',
      'Regular turning schedules to protect skin integrity',
      'Passive limb exercises as recommended by physiotherapists',
      'Comprehensive hygiene, diaper change, and feeding support'
    ],
    ctaText: 'Enquire for Paralysis Care',
    whoIsThisFor: [
      'Stroke survivors recovering motor functions at home',
      'Individuals with hemiplegia, paraplegia, or quadriplegia',
      'Patients needing specialized physical assistance and wheelchair mobility',
      'Families needing physically capable and emotionally sensitive attendants'
    ],
    howWeHelpCards: [
      {
        title: 'Safe Body Transfers',
        description: 'Trained ergonomics for lifting and moving patients smoothly between bed, wheelchair, and commode.'
      },
      {
        title: 'Skin Care & Positioning',
        description: 'Frequent scheduled positional turns, back rubs, and skin checks to prevent pressure sores.'
      },
      {
        title: 'Prescribed Exercise Support',
        description: 'Assisting with range-of-motion movements directed by the patient’s physiotherapist.'
      },
      {
        title: 'Dignified Personal Care',
        description: 'Maintaining hygiene, sponging, and grooming with maximum sensitivity and personal respect.'
      }
    ]
  }
];

export const DEFAULT_PEOPLE: PeopleItem[] = [
  {
    id: 'home-nurses',
    role: 'Home Nurses',
    title: 'Home Nurses',
    photo: '/src/assets/images/care_patient_nurse_1791178278602.jpg',
    shortDescription: 'Nursing support at home for vital tracking, injections, dressings, and medical routines.',
    learnMoreText: 'Learn More',
    responsibilities: [
      'Regular monitoring of vitals (BP, sugar, pulse, oxygen)',
      'Administration of prescribed medications and injections',
      'Wound dressing, catheter maintenance, and clinical support',
      'Direct updates for family members and attending doctors'
    ]
  },
  {
    id: 'caregivers',
    role: 'Caregivers',
    title: 'Caregivers',
    photo: '/src/assets/images/hero_care_mumbai_1791178255414.jpg',
    shortDescription: 'Personal and daily assistance for elders and recovering patients.',
    learnMoreText: 'Learn More',
    responsibilities: [
      'Daily personal hygiene, bathing, and grooming assistance',
      'Mealtime assistance and adherence to nutritional routines',
      'Mobility encouragement, gentle walking, and companionship',
      'Creating a peaceful, structured atmosphere at home'
    ]
  },
  {
    id: 'patient-attendants',
    role: 'Patient Attendants',
    title: 'Patient Attendants',
    photo: '/src/assets/images/people_home_attendant_1791178332959.jpg',
    shortDescription: 'Support for patients who need assistance with physical transfers and bedside routines.',
    learnMoreText: 'Learn More',
    responsibilities: [
      'Patient repositioning and wheelchair assistance',
      'Bedside monitoring during day and night hours',
      'Assistance with commode and diaper changes',
      'Coordinating physical comfort and family peace of mind'
    ]
  },
  {
    id: 'maids-home-help',
    role: 'Maids & Home Help',
    title: 'Maids & Home Help',
    photo: '/src/assets/images/people_home_help_maid_1791178343862.jpg',
    shortDescription: 'Reliable assistance for household needs, cooking simple meals, and keeping surroundings clean.',
    learnMoreText: 'Learn More',
    responsibilities: [
      'Tidying up patient rooms and sanitizing living areas',
      'Preparation of light, hygienic home-cooked meals',
      'Washing patient linens, clothes, and everyday utensils',
      'Dependable domestic support for busy Mumbai households'
    ]
  }
];

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'rahul-sharma',
    slug: 'rahul-sharma',
    name: 'Rahul Sharma',
    designation: 'Founder',
    photo: '/src/assets/images/people_home_attendant_1791178332959.jpg',
    bio: 'Rahul founded Mr. Pal with a singular mission: to provide Mumbai families with trustworthy, respectful, and compassionate care staff right in their own homes.',
    expertise: ['Care Operations', 'Family Needs Assessment', 'Staff Vetting & Placement'],
    phoneOrContactNote: 'Available to discuss custom family care requirements across Mumbai.'
  },
  {
    id: 'priya-mehta',
    slug: 'priya-mehta',
    name: 'Priya Mehta',
    designation: 'Care Coordinator',
    photo: '/src/assets/images/care_patient_nurse_1791178278602.jpg',
    bio: 'Priya works closely with families to evaluate their loved one’s specific medical and personal routine, matching them with the most fitting caregiver or nurse.',
    expertise: ['Elder Care Planning', 'Patient Bedside Routine', 'Caregiver Orientation'],
    phoneOrContactNote: 'Coordinates daily care schedules and client feedback.'
  },
  {
    id: 'amit-verma',
    slug: 'amit-verma',
    name: 'Amit Verma',
    designation: 'Operations',
    photo: '/src/assets/images/people_home_attendant_1791178332959.jpg',
    bio: 'Amit oversees day-to-day deployment and background verification of care assistants and attendants across Mumbai neighbourhoods.',
    expertise: ['Logistics & Neighborhood Deployment', 'Staff Attendance & Backup', 'Quality Follow-ups'],
    phoneOrContactNote: 'Ensures prompt replacement support and smooth continuity of care.'
  },
  {
    id: 'neha-kapoor',
    slug: 'neha-kapoor',
    name: 'Neha Kapoor',
    designation: 'Client Support',
    photo: '/src/assets/images/hero_care_mumbai_1791178255414.jpg',
    bio: 'Neha is the friendly, dependable voice that families speak with for urgent queries, emergency support adjustments, and weekly check-ins.',
    expertise: ['Client Relationship', 'Family Communication', 'Emergency Support Facilitation'],
    phoneOrContactNote: 'Dedicated helpline for ongoing family care support.'
  }
];

export const INTERACTIVE_HELPER_OPTIONS = [
  {
    id: 'parent',
    title: 'Care for my parent',
    badge: 'Elder Care',
    headline: 'Care for my parent',
    explanation: 'Compassionate everyday support for senior citizens, including personal care, routine assistance, gentle companionship, and fall prevention.',
    recommendedService: 'elder-care',
    image: '/src/assets/images/care_elder_parent_1791178267696.jpg',
    highlights: ['Companionship & Chai Time', 'Medication Reminders', 'Assisted Walking & Mobility', 'Day or 24/7 Presence']
  },
  {
    id: 'patient',
    title: 'Care for a patient',
    badge: 'Patient Care',
    headline: 'Care for a recovering patient',
    explanation: 'Focused bedside support for patients recovering from surgery, illness, or hospital discharge in the comfort and privacy of their home.',
    recommendedService: 'patient-care',
    image: '/src/assets/images/care_patient_nurse_1791178278602.jpg',
    highlights: ['Bedside Hygiene & Sponging', 'Vital Signs Tracking', 'Dietary Feeding Support', 'Post-Op Recovery Comfort']
  },
  {
    id: 'dementia',
    title: 'Dementia care',
    badge: 'Dementia Care',
    headline: 'Compassionate dementia & memory care',
    explanation: 'Patient, attentive care and watchful supervision tailored to individuals experiencing Alzheimer’s, memory loss, or confusion.',
    recommendedService: 'dementia-care',
    image: '/src/assets/images/care_dementia_compassion_1791178313622.jpg',
    highlights: ['Calm Reassurance', 'Wandering Prevention', 'Familiar Daily Routines', 'Relief for Family Caregivers']
  },
  {
    id: 'paralysis',
    title: 'Paralysis care',
    badge: 'Paralysis Care',
    headline: 'Dedicated paralysis & stroke assistance',
    explanation: 'Physical transfer assistance, regular body turning to avoid bedsores, and dignified daily routine management for restricted mobility.',
    recommendedService: 'paralysis-care',
    image: '/src/assets/images/care_paralysis_support_1791178323085.jpg',
    highlights: ['Bed-to-Wheelchair Transfer', 'Skin & Pressure Sore Care', 'Passive Exercises', 'Dignified Sponge & Grooming']
  },
  {
    id: 'attendant',
    title: 'Caregiver / Attendant',
    badge: 'Human Resources',
    headline: 'Trained Caregivers & Bedside Attendants',
    explanation: 'Vetted, respectful care personnel ready to assist with daily living activities, personal hygiene, and round-the-clock peace of mind.',
    recommendedService: 'patient-care',
    image: '/src/assets/images/people_home_attendant_1791178332959.jpg',
    highlights: ['12-Hour Day / Night Shifts', '24-Hour Live-in Options', 'Vetted & Verified Staff', 'Empathetic Family Support']
  },
  {
    id: 'homehelp',
    title: 'Home help / Maid',
    badge: 'Domestic Support',
    headline: 'Reliable Maids & Domestic Helpers',
    explanation: 'Dependable domestic assistance to manage household chores, kitchen cleanliness, and light healthy cooking so families can focus on care.',
    recommendedService: 'elder-care',
    image: '/src/assets/images/people_home_help_maid_1791178343862.jpg',
    highlights: ['Patient Room Tidying', 'Simple Nutritious Cooking', 'Laundry & Linens Care', 'Reliable Mumbai Household Help']
  }
];
