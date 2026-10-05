// Guards the photograph-reference resolver and the stored-content migration.
// Run: node scripts/check-image-refs.mjs
const LEGACY = {
  hero_care_mumbai_1791178255414: 'heroCare',
  care_patient_nurse_1791178278602: 'patientCare',
  care_elder_parent_1791178267696: 'elderCare',
  care_dementia_compassion_1791178313622: 'dementiaCare',
  care_paralysis_support_1791178323085: 'paralysisCare',
  care_family_multigen_1791178289971: 'familyCare',
  holding_hands_care_1791178299720: 'holdingHands',
  people_home_attendant_1791178332959: 'attendant',
  people_home_help_maid_1791178343862: 'homeHelper',
  mumbai_sea_link_sunset_1791178850762: 'mumbaiSeaLink',
  'hero-care': 'heroCare',
  'patient-care': 'patientCare',
  'elder-care': 'elderCare',
  'dementia-care': 'dementiaCare',
  'paralysis-care': 'paralysisCare',
  'family-care': 'familyCare',
  'holding-hands': 'holdingHands',
  'mumbai-sea-link': 'mumbaiSeaLink',
  'home-helper': 'homeHelper',
};

const KEYS = [
  'attendant',
  'dementiaCare',
  'elderCare',
  'familyCare',
  'heroCare',
  'holdingHands',
  'homeHelper',
  'mumbaiSeaLink',
  'paralysisCare',
  'patientCare',
];

const PHOTO_FIELDS = new Set(['heroImage', 'image', 'photo']);

function photoKeyFromRef(ref) {
  if (KEYS.includes(ref)) return ref;
  const filename = (ref.split('/').pop() ?? '').replace(/\.(?:jpe?g|png|webp|avif)$/i, '');
  if (!filename) return undefined;
  const stems = Object.entries(LEGACY).sort((a, b) => b[0].length - a[0].length);
  for (const [stem, key] of stems) {
    if (filename === stem || filename.startsWith(`${stem}-`)) return key;
  }
  return undefined;
}

function migrateImageRefs(value) {
  if (Array.isArray(value)) return value.map(migrateImageRefs);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      if (typeof val === 'string' && PHOTO_FIELDS.has(key)) {
        out[key] = photoKeyFromRef(val) ?? val;
      } else {
        out[key] = migrateImageRefs(val);
      }
    }
    return out;
  }
  return value;
}

let failed = 0;
const check = (label, got, expected) => {
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) console.log(`      got      ${JSON.stringify(got)}\n      expected ${JSON.stringify(expected)}`);
};

console.log('--- reference resolution ---');
check('already a key', photoKeyFromRef('heroCare'), 'heroCare');
check('raw dev path', photoKeyFromRef('/src/assets/images/hero_care_mumbai_1791178255414.jpg'), 'heroCare');
check('hashed webp 900', photoKeyFromRef('/assets/hero-care-900-D-zLQpqC.webp'), 'heroCare');
check('hashed webp 400', photoKeyFromRef('/assets/hero-care-400-DpoS_71X.webp'), 'heroCare');
check('hashed jpg', photoKeyFromRef('/assets/hero_care_mumbai_1791178255414-DuTjhMoO.jpg'), 'heroCare');
check('hyphen stem + hash', photoKeyFromRef('/assets/mumbai-sea-link-900-Dqha_eFH.webp'), 'mumbaiSeaLink');
check('snake stem + hash', photoKeyFromRef('/assets/people_home_help_maid_1791178343862-BfUr77v6.jpg'), 'homeHelper');
check('bare filename', photoKeyFromRef('care_elder_parent_1791178267696.jpg'), 'elderCare');

console.log('\n--- stored content migration ---');
check(
  'service slug must survive untouched',
  migrateImageRefs({ slug: 'patient-care', name: 'Patient Attendant' }),
  { slug: 'patient-care', name: 'Patient Attendant' },
);
check(
  'service slug + image together',
  migrateImageRefs({
    slug: 'elder-care',
    image: '/assets/elder-care-900-D-zLQpqC.webp',
  }),
  { slug: 'elder-care', image: 'elderCare' },
);
check(
  'team photo, slug kept',
  migrateImageRefs({
    slug: 'rahul-sharma',
    photo: '/src/assets/images/people_home_attendant_1791178332959.jpg',
  }),
  { slug: 'rahul-sharma', photo: 'attendant' },
);
check(
  'nested list of services',
  migrateImageRefs([
    { slug: 'dementia-care', image: 'care_dementia_compassion_1791178313622.jpg' },
    { slug: 'paralysis-care', image: 'paralysis-care-400-D0dmmpCJ.webp' },
  ]),
  [
    { slug: 'dementia-care', image: 'dementiaCare' },
    { slug: 'paralysis-care', image: 'paralysisCare' },
  ],
);
check(
  'settings heroImage',
  migrateImageRefs({ heroImage: '/assets/hero-care-400-DpoS_71X.webp' }),
  { heroImage: 'heroCare' },
);
check('unknown image left alone', migrateImageRefs({ image: 'not-a-real-photo.jpg' }), {
  image: 'not-a-real-photo.jpg',
});

console.log(failed === 0 ? '\nAll checks passed.' : `\n${failed} FAILED`);
process.exit(failed === 0 ? 0 : 1);