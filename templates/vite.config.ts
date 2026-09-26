import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { printAssets } from '@yodogawa404/print-assets/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    printAssets({
      pagesDir: 'src/pages',
      styles: ['src/styles/global.css'],
    }),
  ],
});
