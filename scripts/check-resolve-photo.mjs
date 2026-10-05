// Bundles scripts/resolve-photo.test.ts with the project's own esbuild and runs
// it under Node. Image imports are stubbed empty, because the assertions are
// about resolution returning a usable object, never about the bytes.
import { build } from 'esbuild';
import { writeFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = await mkdtemp(join(tmpdir(), 'mrpal-resolve-'));
const out = join(dir, 'test.mjs');

await build({
  entryPoints: ['scripts/resolve-photo.test.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  // A photograph is irrelevant here; stub it so Node never tries to load a JPEG.
  loader: { '.jpg': 'empty' },
  // Vite supplies this at build time; esbuild needs it told.
  define: { 'import.meta.env.DEV': 'false' },
  logLevel: 'error',
});

try {
  await import(pathToFileURL(out).href);
} catch (e) {
  console.error('FAIL  harness crashed:', e.message);
  process.exit(1);
}

await writeFile(join(dir, '.keep'), '');