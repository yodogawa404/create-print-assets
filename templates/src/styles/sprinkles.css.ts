import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { vars, space, fontSize, fontFamily } from './theme.css.ts';

const layoutProperties = defineProperties({
  conditions: {
    base: {},
    md: { '@media': 'screen and (min-width: 768px)' },
    lg: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'base',
  responsiveArray: ['base', 'md', 'lg'],
  properties: {
    display: ['none', 'block', 'inline', 'flex', 'inline-flex', 'grid'],
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-between',
      'space-around',
      'space-evenly',
    ],
    gap: space,
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

const colorProperties = defineProperties({
  properties: {
    color: vars.colors,
    background: vars.colors,
    borderColor: vars.colors,
  },
});

const textProperties = defineProperties({
  properties: {
    fontFamily,
    fontSize,
    fontWeight: [400, 500, 600, 700],
    textAlign: ['left', 'center', 'right', 'justify'],
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.08em',
    },
  },
});

export const sprinkles = createSprinkles(
  layoutProperties,
  colorProperties,
  textProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
