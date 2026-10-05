// Executes the real resolvePhoto() against the cases that crashed /admin.
// Built and run via scripts/check-resolve-photo.mjs (esbuild), so this is the
// shipped implementation rather than a mirror of it.
import { resolvePhoto, PHOTOS, PHOTO_KEYS } from '../src/data/images';

const results: string[] = [];
const ok = (label: string, cond: boolean) => {
  results.push(`${cond ? 'PASS' : 'FAIL'}  ${label}`);
  return cond;
};

// The exact crash from the console: an unrecognised persisted photo reference.
const stale = '/assets/people_home_attendant_1791178332959-D_xyz123.jpg';
let staleResult: unknown;
try {
  staleResult = resolvePhoto(stale as never);
  ok('unknown ref returns an object, not undefined', typeof staleResult === 'object' && staleResult !== null);
  ok('unknown ref has a src', typeof (staleResult as { src?: unknown })?.src !== 'undefined');
} catch (e) {
  ok(`unknown ref does not throw (threw: ${(e as Error).message})`, false);
}

// Every other shape of bad persisted data.
for (const bad of [undefined, null, '', 'nope', 0, {} as never]) {
  try {
    const r = resolvePhoto(bad as never);
    ok(`${JSON.stringify(bad) ?? String(bad)} resolves`, typeof r === 'object' && r !== null);
  } catch (e) {
    ok(`${JSON.stringify(bad) ?? String(bad)} resolves (threw: ${(e as Error).message})`, false);
  }
}

// A valid key must resolve to its OWN photo. Without this assertion a build
// where the lookup always fell through to the fallback would still pass, which
// is the opposite of what the guard is for.
let allKeysOk = true;
for (const k of PHOTO_KEYS) {
  if (resolvePhoto(k) !== PHOTOS[k]) {
    allKeysOk = false;
    results.push(`      ${k} resolved to the wrong photo`);
  }
}
ok(`all ${PHOTO_KEYS.length} valid keys resolve to themselves`, allKeysOk);

// A recognisable legacy filename must map back to its true photo, not fallback.
ok(
  'legacy filename maps to its own photo',
  resolvePhoto('/assets/people_home_attendant_1791178332959-D_xyz123.jpg' as never) ===
    PHOTOS.attendant,
);
ok('legacy webp maps to its own photo', resolvePhoto('/assets/hero-care-400-DpoS_71X.webp' as never) === PHOTOS.heroCare);

// Unrecognised data must land on exactly the one fallback, consistently.
const garbage = ['nope', undefined, null, '', 0] as const;
const fallback = resolvePhoto(garbage[0] as never);
ok(
  'unrecognised ref uses the documented fallback',
  fallback === PHOTOS.familyCare,
);
ok(
  'every unrecognised shape lands on that same fallback',
  garbage.every(g => resolvePhoto(g as never) === fallback),
);

console.log(results.join('\n'));
process.exit(results.some(r => r.startsWith('FAIL')) ? 1 : 0);