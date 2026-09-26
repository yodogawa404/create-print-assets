import { createTheme } from '@vanilla-extract/css';

export const colors = {
  ink: '#1a1a1a',
  paper: '#ffffff',
  muted: '#6b7280',
  brand: '#2563eb',
  accent: '#f59e0b',
  line: '#e5e7eb',
} as const;

export const space = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const fontSize = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '28px',
  '2xl': '40px',
  '3xl': '56px',
  '4xl': '72px',
  '5xl': '96px',
} as const;

export const fontFamily = {
  body: "'Inter', 'LINE Seed JP', 'Noto Sans JP', sans-serif",
} as const;

export const [themeClass, vars] = createTheme({
  colors,
});
