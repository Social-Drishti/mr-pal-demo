/**
 * Every photograph is imported through the bundler rather than referenced with
 * a hardcoded `/src/assets/...` string. That raw path form works in `npm run
 * dev` but 404s in a production build, because Vite only rewrites URLs it can
 * see being imported.
 *
 * Content stores a *key* like 'heroCare', never a URL. Vite content-hashes
 * asset filenames, so a URL is build-specific: persisting one in localStorage
 * means it breaks the next time the site is rebuilt. Keys never go stale.
 *
 * The files themselves are the original JPEGs, unmodified. They are large, so
 * each is rendered inside a fixed-aspect box with `object-cover` and everything
 * below the fold is lazy-loaded.
 */

import attendant from '../assets/images/people_home_attendant_1791178332959.jpg';
import dementiaCare from '../assets/images/care_dementia_compassion_1791178313622.jpg';
import elderCare from '../assets/images/care_elder_parent_1791178267696.jpg';
import familyCare from '../assets/images/care_family_multigen_1791178289971.jpg';
import heroCare from '../assets/images/hero_care_mumbai_1791178255414.jpg';
import holdingHands from '../assets/images/holding_hands_care_1791178299720.jpg';
import homeHelper from '../assets/images/people_home_help_maid_1791178343862.jpg';
import mumbaiSeaLink from '../assets/images/mumbai_sea_link_sunset_1791178850762.jpg';
import paralysisCare from '../assets/images/care_paralysis_support_1791178323085.jpg';
import patientCare from '../assets/images/care_patient_nurse_1791178278602.jpg';

export interface PhotoSource {
  src: string;
  width: number;
  height: number;
}

/** Intrinsic dimensions of each source file, used to reserve layout space. */
const photo = (src: string, width: number, height: number): PhotoSource => ({
  src,
  width,
  height,
});

export const PHOTOS = {
  attendant: photo(attendant, 1200, 896),
  dementiaCare: photo(dementiaCare, 1200, 896),
  elderCare: photo(elderCare, 1200, 896),
  familyCare: photo(familyCare, 1200, 896),
  heroCare: photo(heroCare, 1200, 896),
  holdingHands: photo(holdingHands, 1200, 896),
  homeHelper: photo(homeHelper, 1200, 896),
  mumbaiSeaLink: photo(mumbaiSeaLink, 1376, 768),
  paralysisCare: photo(paralysisCare, 1200, 896),
  patientCare: photo(patientCare, 1200, 896),
} as const;

/** The stable identifier stored in content. Safe to persist forever. */
export type PhotoKey = keyof typeof PHOTOS;

export const PHOTO_KEYS = Object.keys(PHOTOS) as PhotoKey[];

/** Used when stored content names a photograph this build no longer has. */
const FALLBACK_KEY: PhotoKey = 'familyCare';

/**
 * Always returns a usable photo.
 *
 * `PhotoKey` is enforced by the compiler, but content read back from
 * localStorage is plain JSON that nothing has checked. A single unrecognised
 * value used to return undefined here and take down whichever page rendered it,
 * with a bare "cannot read properties of undefined". Resolving to a fallback
 * keeps a stale save degrading to a wrong-but-visible image instead of a blank
 * page.
 *
 * Resolution is tried in three passes, so this is safe on its own and does not
 * depend on migrateImageRefs having already run on the way in:
 *   1. the value is already a key
 *   2. the value is a filename or URL this project used to emit
 *   3. nothing matched â€” use the fallback
 */
export function resolvePhoto(key: PhotoKey): PhotoSource;
export function resolvePhoto(key: PhotoKey | string | null | undefined): PhotoSource;
export function resolvePhoto(key: PhotoKey | string | null | undefined): PhotoSource {
  if (typeof key === 'string' && key) {
    if (Object.prototype.hasOwnProperty.call(PHOTOS, key)) {
      return PHOTOS[key as PhotoKey];
    }

    const recovered = photoKeyFromRef(key);
    if (recovered) return PHOTOS[recovered];
  }

  if (import.meta.env.DEV) {
    console.warn(
      `[images] no photograph matched ${JSON.stringify(key)}; using "${FALLBACK_KEY}". ` +
        'Stored content predates the photo-key migration â€” clear the site data or re-pick the image in /admin.',
    );
  }

  return PHOTOS[FALLBACK_KEY];
}

/**
 * Every filename this project has ever used for a photograph, including the
 * content-hashed variants Vite generated for intermediate builds. Content saved
 * before the switch to keys stores one of these as a string, so it gets mapped
 * back to a key here.
 */
const LEGACY_FILENAMES: Record<string, PhotoKey> = {
  // original source filenames
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
  // short names used during the WebP pass
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

export function isPhotoKey(value: unknown): value is PhotoKey {
  return typeof value === 'string' && value in PHOTOS;
}

/**
 * Turn any photograph reference we have ever emitted â€” a raw dev path, a
 * content-hashed build URL, or a bare filename â€” into its stable key.
 */
export function photoKeyFromRef(ref: string): PhotoKey | undefined {
  if (isPhotoKey(ref)) return ref;

  const filename = (ref.split('/').pop() ?? '').replace(/\.(?:jpe?g|png|webp|avif)$/i, '');
  if (!filename) return undefined;

  // Match against the known stems by prefix, longest first, rather than trying
  // to strip Vite's hash off the end. Stripping is unreliable: in
  // "mumbai-sea-link-900-Dqha_eFH" the trailing "sea-link" is itself eight
  // characters, so a hash-shaped strip chews through the real name.
  for (const [stem, key] of Object.entries(LEGACY_FILENAMES).sort(
    (a, b) => b[0].length - a[0].length,
  )) {
    if (filename === stem || filename.startsWith(`${stem}-`)) return key;
  }
  return undefined;
}

/** The only content fields that hold a photograph reference. */
const PHOTO_FIELDS = new Set(['heroImage', 'image', 'photo']);

/**
 * Walk stored content and replace photograph URLs with their stable key, so
 * nothing build-specific survives in localStorage. Applied on read, so existing
 * sessions self-heal without the visitor noticing.
 *
 * Deliberately field-aware rather than a blanket string sweep. Some slugs
 * ("patient-care", "elder-care") are spelled exactly like this project's old
 * WebP filenames, so rewriting every string would quietly corrupt service slugs
 * and break /services/:slug.
 */
export function migrateImageRefs<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(item => migrateImageRefs(item)) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (typeof val === 'string' && PHOTO_FIELDS.has(key)) {
        out[key] = photoKeyFromRef(val) ?? val;
      } else {
        out[key] = migrateImageRefs(val);
      }
    }
    return out as T;
  }
  return value;
}