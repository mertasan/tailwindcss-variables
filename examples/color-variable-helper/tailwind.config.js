// const colorVariable = require('@mertasan/tailwindcss-variables/colorVariable')
const colorVariable = require('../../colorVariable')

/**
 * Usage:
 * colorVariable('--colors-primary')
 * or
 * colorVariable('var(--colors-primary)')
 */
module.exports = {
  corePlugins: process.env.CLEAN ? ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'] : {},
  purge: {
    enabled: true,
    content: ['./index.html'],
  },
  darkMode: 'class',
  theme: {screens: false,
    colors: {
      primary: colorVariable('--colors-primary'), // HEX (3 digits)
      secondary: colorVariable('var(--colors-secondary)'), // HEX (6 digits)
      white: '#ffffff', // no variable
      blue: colorVariable('var(--colors-blue)'), // RGB
      red: {
        400: colorVariable('var(--colors-red-400)'), // RGBA
        500: colorVariable('var(--colors-red-500)'), // RGBA
        600: 'var(--colors-red-500)', // RGBA (without using colorVariable() helper)
      },
      gray: 'var(--colors-gray)', // HEX (6 digits) (without using colorVariable() helper)
      green: 'var(--colors-green)', // RGB (without using colorVariable() helper)
    },
    variables: {
      DEFAULT: {
        colors: {
          primary: '#ff0',
          secondary: '#000000',
          gray: '#6B7280',
          blue: 'rgb(0,0,254)',
          red: {
            400: 'rgba(254,0,0,0.5)',
            500: 'rgba(254,0,0,1)',
          },
          green: 'rgb(0,255,0)',
        },
        sizes: {
          small: '10px',
          medium: '2rem',
          large: '100%',
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('../../src/index')({
      colorVariables: true
    })
  ],
}
