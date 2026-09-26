import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css.ts';
import { sprinkles } from '../../styles/sprinkles.css.ts';

export const canvas = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '18mm',
  background: vars.colors.paper,
});

export const header = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
]);

export const brand = style({
  fontSize: '5.5mm',
  fontWeight: 700,
  color: vars.colors.ink,
  letterSpacing: '0.08em',
});

export const title = style({
  fontSize: '18mm',
  fontWeight: 700,
  lineHeight: 1.15,
  color: vars.colors.ink,
  marginTop: '20mm',
});

export const body = style({
  fontSize: '4.8mm',
  lineHeight: 1.7,
  color: vars.colors.muted,
  marginTop: '8mm',
  maxWidth: '140mm',
});

export const footer = style([
  sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  {
    borderTop: `1px solid ${vars.colors.line}`,
    paddingTop: '6mm',
    fontSize: '3.8mm',
    color: vars.colors.muted,
  },
]);