import type { Config } from 'tailwindcss'
import {
  cont_md,
  cont_sm,
  cont_xs,
  cont_xxl,
  ind_md,
  ind_sm,
  ind_xs,
  ind_xxl,
} from './src/constants/theme.constants'
import { tailwindSafelist } from './src/utils/wpToTailwind'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: tailwindSafelist,
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    function ({ addUtilities }: any) {
      const containerUtility = {
        '.ind': {
          margin: [ind_xs],
          '@screen sm': {
            margin: [ind_sm],
          },
          '@screen md': {
            margin: [ind_md],
          },
          '@screen 2xl': {
            margin: [ind_xxl],
          },
        },
        '.cont': {
          'padding-left': [cont_xs],
          'padding-right': [cont_xs],
          '@screen sm': {
            'padding-left': [cont_sm],
            'padding-right': [cont_sm],
          },
          '@screen md': {
            'padding-left': [cont_md],
            'padding-right': [cont_md],
          },
          '@screen 2xl': {
            'padding-left': [cont_xxl],
            'padding-right': [cont_xxl],
          },
        },
        '.cont-left': {
          'padding-left': [cont_xs],
          '@screen sm': {
            'padding-left': [cont_sm],
          },
          '@screen md': {
            'padding-left': [cont_md],
          },
          '@screen 2xl': {
            'padding-left': [cont_xxl],
          },
        },
        '.cont-right': {
          'padding-right': [cont_xs],
          '@screen sm': {
            'padding-right': [cont_sm],
          },
          '@screen md': {
            'padding-right': [cont_md],
          },
          '@screen 2xl': {
            'padding-right': [cont_xxl],
          },
        },
      }
      addUtilities(containerUtility, ['responsive'])
    },
  ],
  daisyui: {
    themes: [
      {
        ustroy: {
          'primary': '#FE520A',
          'secondary': '#f6d860',
          'accent': '#37cdbe',
          'neutral': '#E2E2E2',
          'base-100': '#E2E2E2',

          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
          '--border-btn': '1px', // border width of buttons
          '--tab-border': '1px', // border width of tabs
          '--tab-radius': '0.5rem', // border radius of tabs
        },
      },
    ],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
}
export default config
