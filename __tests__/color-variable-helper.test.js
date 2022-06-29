const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)
const colorVariable = require('../colorVariable')

test('colorVariable helper', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],
      darkMode: false,
      theme: {
        screens: false,
        colors: {
          primary: colorVariable('--colors-primary'), // HEX (3 digits)
          secondary: colorVariable('var(--colors-secondary)'), // HEX (6 digits)
          white: '#ffffff', // no variable
          blue: colorVariable('var(--colors-blue)'), // RGB
          yellow: {
            400: colorVariable('var(--colors-yellow-400)'), // RGB
            DEFAULT: colorVariable('var(--colors-yellow)'), // RGB
          },
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
              yellow: {
                400: 'rgb(255,255,0)',
                DEFAULT: 'rgb(255,255,0)',
              },
            },

            sizes: {
              small: '10px',
              medium: '2rem',
              large: '100%',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          colorVariables: true,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-primary: #ff0;
      +   --colors-secondary: #000000;
      +   --colors-gray: #6B7280;
      +   --colors-blue: rgb(0,0,254);
      +   --colors-red-400: rgba(254,0,0,0.5);
      +   --colors-red-500: rgba(254,0,0,1);
      +   --colors-red-400-rgb: 254,0,0;
      +   --colors-red-500-rgb: 254,0,0;
      +   --colors-green: rgb(0,255,0);
      +   --colors-yellow-400: rgb(255,255,0);
      +   --colors-yellow: rgb(255,255,0);
      +   --colors-yellow-400-rgb: 255,255,0;
      +   --colors-yellow-rgb: 255,255,0;
      +   --colors-primary-rgb: 255,255,0;
      +   --colors-secondary-rgb: 0,0,0;
      +   --colors-gray-rgb: 107,114,128;
      +   --colors-blue-rgb: 0,0,254;
      +   --colors-green-rgb: 0,255,0;
      +   --sizes-small: 10px;
      +   --sizes-medium: 2rem;
      +   --sizes-large: 100%
      + }
      + .bg-secondary {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-secondary-rgb), var(--tw-bg-opacity))
      + }
      + .bg-gray {
      +   background-color: var(--colors-gray)
      + }
      + .bg-red-400 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-400-rgb), var(--tw-bg-opacity))
      + }
      + .bg-red-500 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-500-rgb), var(--tw-bg-opacity))
      + }
      + .bg-red-600 {
      +   background-color: var(--colors-red-500)
      + }
      + .bg-green {
      +   background-color: var(--colors-green)
      + }
      + .bg-white {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(255 255 255 / var(--tw-bg-opacity))
      + }
      + .bg-yellow {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-yellow-rgb), var(--tw-bg-opacity))
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-primary {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-primary-rgb), var(--tw-text-opacity))
      + }
      + .text-blue {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-blue-rgb), var(--tw-text-opacity))
      + }
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }

    "
  `)
})

test('colorVariable - background and text color', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],
      darkMode: false,
      theme: {
        screens: false,
        colors: {
          indigo: {
            400: colorVariable('var(--colors-indigo-400)', true), // RGBA
            500: colorVariable('var(--colors-indigo-500)', true), // RGBA
            600: colorVariable('var(--colors-indigo-600)', true), // HEX
          },
        },

        variables: {
          DEFAULT: {
            colors: {
              indigo: {
                400: 'rgba(254,0,0,1)',
                500: 'rgba(254,0,0,0.5)',
                600: '#a20606',
              },
            },
          },
        },

        plugins: [
          tailwindcssVariables({
            colorVariables: true,
            forceRGB: true,
          }),
        ],
      },
    })
  ).toMatchInlineSnapshot(`
    "

      
      + .bg-indigo-400 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-indigo-400), var(--tw-bg-opacity))
      + }
      + .bg-indigo-500 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-indigo-500), var(--tw-bg-opacity))
      + }
      + .bg-indigo-600 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-indigo-600), var(--tw-bg-opacity))
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-indigo-400 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-indigo-400), var(--tw-text-opacity))
      + }
      + .text-indigo-500 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-indigo-500), var(--tw-text-opacity))
      + }
      + .text-indigo-600 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-indigo-600), var(--tw-text-opacity))
      + }
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }

    "
  `)
})

/**
 * a --tw-bg-opacity must be added to the colors even if the bg-opacity-100 class is not present.
 */
test('colorVariable - background and text color 2', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content('color-variable-helper2')],

      darkMode: false,
      theme: {
        screens: false,
        colors: {
          indigo: {
            400: colorVariable('var(--colors-indigo-400)', true), // RGBA
            500: colorVariable('var(--colors-indigo-500)', true), // RGBA
            600: colorVariable('var(--colors-indigo-600)', true), // HEX
          },
        },

        variables: {
          DEFAULT: {
            colors: {
              indigo: {
                400: 'rgba(254,0,0,1)',
                500: 'rgba(254,0,0,0.5)',
                600: '#a20606',
              },
            },
          },
        },

        plugins: [
          tailwindcssVariables({
            colorVariables: true,
            forceRGB: true,
          }),
        ],
      },
    })
  ).toMatchInlineSnapshot(`
    "

      
      + .bg-indigo-400 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-indigo-400), var(--tw-bg-opacity))
      + }
      + .bg-indigo-500 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-indigo-500), var(--tw-bg-opacity))
      + }
      + .bg-indigo-600 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-indigo-600), var(--tw-bg-opacity))
      + }
      + .text-indigo-400 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-indigo-400), var(--tw-text-opacity))
      + }
      + .text-indigo-500 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-indigo-500), var(--tw-text-opacity))
      + }
      + .text-indigo-600 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-indigo-600), var(--tw-text-opacity))
      + }

    "
  `)
})
