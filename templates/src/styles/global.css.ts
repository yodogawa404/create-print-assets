import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', {
  fontFamily: "'Inter', 'LINE Seed JP', 'Noto Sans JP', sans-serif",
  fontFeatureSettings: '"palt"',
  fontKerning: 'normal',
});

globalStyle('html', {
  background: '#e5e5e5',
});
