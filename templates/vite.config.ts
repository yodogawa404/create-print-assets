import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { printAssets } from '@yodogawa404/print-assets/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    printAssets({
      pagesDir: 'src/pages',
      theme: 'src/styles/theme.css.ts',
      styles: ['modern-normalize/modern-normalize.css', 'src/styles/global.css.ts'],
    }),
  ],
});
