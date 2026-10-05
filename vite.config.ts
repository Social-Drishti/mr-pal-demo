import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      // The photographs ship at two widths as WebP, so the bundle stays small
      // even though the source photographs are full resolution.
      assetsInlineLimit: 2048,
    },
    server: {
      // File watching is disabled while an agent is editing files, to stop the
      // dev server thrashing the disk. Opt in with DISABLE_HMR=true.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});