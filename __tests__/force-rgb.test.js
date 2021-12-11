const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)
const colorVariable = require('../colorVariable')

test('forceRGB option (enabled)', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],
      darkMode: false,
      theme: {
        screens: false,
        colors: {
          black: '#000000',
          white: 'var(--colors-white)',
          red: {
            400: colorVariable('var(--colors-red-400)', true),
            DEFAULT: colorVariable('var(--colors-red)', true),
            500: colorVariable('var(--colors-red-500)', true),
          },
        },

        variables: {
          DEFAULT: {
            colors: {
              white: '#ffffff',
              red: {
                400: 'rgba(254,0,0,0.5)',
                DEFAULT: 'rgba(254,0,0,1)',
                500: 'rgba(254,0,0,1)',
                600: 'rgba(205,7,7,1)',
              },
            },

            sizes: {
              small: '1rem',
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
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-white: 255,255,255;
      +   --colors-red-400: 254,0,0;
      +   --colors-red-500: 254,0,0;
      +   --colors-red-600: 205,7,7;
      +   --colors-red: 254,0,0;
      +   --sizes-small: 1rem
      + }
      + .bg-red {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red), var(--tw-bg-opacity))
      + }
      + .bg-red-400 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-400), var(--tw-bg-opacity))
      + }
      + .bg-red-500 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-500), var(--tw-bg-opacity))
      + }
      + .bg-white {
      +   background-color: var(--colors-white)
      + }
      + .bg-black {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(0 0 0 / var(--tw-bg-opacity))
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-red {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red), var(--tw-text-opacity))
      + }
      + .text-red-400 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red-400), var(--tw-text-opacity))
      + }
      + .text-red-500 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red-500), var(--tw-text-opacity))
      + }
      + .text-white {
      +   color: var(--colors-white)
      + }
      + .text-black {
      +   --tw-text-opacity: 1;
      +   color: rgb(0 0 0 / var(--tw-text-opacity))
      + }
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }

    "
  `)
})

test('forceRGB option (disabled)', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],

      darkMode: false,
      theme: {
        screens: false,
        colors: {
          black: '#000000',
          white: 'var(--colors-white)',
          red: {
            400: colorVariable('var(--colors-red-400)'),
            500: '#ff0000',
          },
        },

        variables: {
          DEFAULT: {
            colors: {
              white: '#ffffff',
              red: {
                400: 'rgba(254,0,0,0.5)',
                500: 'rgba(254,0,0,1)',
              },
            },

            sizes: {
              small: '1rem',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          colorVariables: true,
          forceRGB: false, // default
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-white: #ffffff;
      +   --colors-red-400: rgba(254,0,0,0.5);
      +   --colors-red-500: rgba(254,0,0,1);
      +   --colors-red-400-rgb: 254,0,0;
      +   --colors-red-500-rgb: 254,0,0;
      +   --colors-white-rgb: 255,255,255;
      +   --sizes-small: 1rem
      + }
      + .bg-red-400 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-400-rgb), var(--tw-bg-opacity))
      + }
      + .bg-red-500 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(255 0 0 / var(--tw-bg-opacity))
      + }
      + .bg-white {
      +   background-color: var(--colors-white)
      + }
      + .bg-black {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(0 0 0 / var(--tw-bg-opacity))
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-red-400 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red-400-rgb), var(--tw-text-opacity))
      + }
      + .text-red-500 {
      +   --tw-text-opacity: 1;
      +   color: rgb(255 0 0 / var(--tw-text-opacity))
      + }
      + .text-white {
      +   color: var(--colors-white)
      + }
      + .text-black {
      +   --tw-text-opacity: 1;
      +   color: rgb(0 0 0 / var(--tw-text-opacity))
      + }
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }

    "
  `)
})

test('forceRGB option with extendColors', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],

      darkMode: false,
      theme: {
        screens: false,
        colors: {
          indigo: '#EC4899',
          extend: {
            red: {
              400: '#000',
            },
          },
        },

        variables: {
          DEFAULT: {
            colors: {
              white: '#ffffff',
              red: {
                400: 'rgba(254,0,0,0.5)',
                DEFAULT: 'rgba(254,0,0,1)',
                600: 'rgba(254,0,0,1)',
              },
            },

            sizes: {
              small: '1rem',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          colorVariables: true,
          forceRGB: true,
          extendColors: {
            black: '#000000',
            white: 'var(--colors-white)',
            red: {
              400: 'var(--colors-red-400)',
              DEFAULT: 'var(--colors-red)',
              500: 'var(--colors-red-500)',
            },
          },
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-white: 255,255,255;
      +   --colors-red-400: 254,0,0;
      +   --colors-red-600: 254,0,0;
      +   --colors-red: 254,0,0;
      +   --sizes-small: 1rem
      + }
      + .bg-red {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red), var(--tw-bg-opacity))
      + }
      + .bg-red-400 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-400), var(--tw-bg-opacity))
      + }
      + .bg-red-500 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-500), var(--tw-bg-opacity))
      + }
      + .bg-white {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-white), var(--tw-bg-opacity))
      + }
      + .bg-black {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(0 0 0 / var(--tw-bg-opacity))
      + }
      + .bg-indigo {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(236 72 153 / var(--tw-bg-opacity))
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-red {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red), var(--tw-text-opacity))
      + }
      + .text-red-400 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red-400), var(--tw-text-opacity))
      + }
      + .text-red-500 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red-500), var(--tw-text-opacity))
      + }
      + .text-white {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-white), var(--tw-text-opacity))
      + }
      + .text-black {
      +   --tw-text-opacity: 1;
      +   color: rgb(0 0 0 / var(--tw-text-opacity))
      + }
      + .text-indigo {
      +   --tw-text-opacity: 1;
      +   color: rgb(236 72 153 / var(--tw-text-opacity))
      + }
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }

    "
  `)
})

test('extendColors (readme)', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],

      darkMode: false,
      theme: {
        screens: false,
        colors: {
          white: '#fff',
          green: 'var(--colors-green)',
        },

        variables: {
          DEFAULT: {
            colors: {
              blue: '#0065ff',
              red: '#ff0000',
              green: '#11ff00',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          colorVariables: true,
          extendColors: {
            blue: 'var(--colors-blue)',
            red: 'var(--colors-red)',
          },
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-blue: #0065ff;
      +   --colors-red: #ff0000;
      +   --colors-green: #11ff00;
      +   --colors-blue-rgb: 0,101,255;
      +   --colors-red-rgb: 255,0,0;
      +   --colors-green-rgb: 17,255,0
      + }
      + .bg-green {
      +   background-color: var(--colors-green)
      + }
      + .bg-red {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-rgb), var(--tw-bg-opacity))
      + }
      + .bg-white {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(255 255 255 / var(--tw-bg-opacity))
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-green {
      +   color: var(--colors-green)
      + }
      + .text-red {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red-rgb), var(--tw-text-opacity))
      + }
      + .text-white {
      +   --tw-text-opacity: 1;
      +   color: rgb(255 255 255 / var(--tw-text-opacity))
      + }
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }

    "
  `)
})

test('forceRGB for docs', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],

      darkMode: false,
      theme: {
        screens: false,
        colors: {
          white: '#fff',
          green: colorVariable('var(--colors-green)', true),
        },

        variables: {
          DEFAULT: {
            colors: {
              green: '#11ff00',
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
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-green: 17,255,0
      + }
      + .bg-green {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-green), var(--tw-bg-opacity))
      + }
      + .bg-white {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(255 255 255 / var(--tw-bg-opacity))
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-green {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-green), var(--tw-text-opacity))
      + }
      + .text-white {
      +   --tw-text-opacity: 1;
      +   color: rgb(255 255 255 / var(--tw-text-opacity))
      + }
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }

    "
  `)
})

test('forceRGB (disabled) for docs', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],

      darkMode: false,
      theme: {
        screens: false,
        colors: {
          white: '#fff',
          green: colorVariable('var(--colors-green)'),
        },

        variables: {
          DEFAULT: {
            colors: {
              green: '#11ff00',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          colorVariables: true,
          forceRGB: false,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-green: #11ff00;
      +   --colors-green-rgb: 17,255,0
      + }
      + .bg-green {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-green-rgb), var(--tw-bg-opacity))
      + }
      + .bg-white {
      +   --tw-bg-opacity: 1;
      +   background-color: rgb(255 255 255 / var(--tw-bg-opacity))
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-green {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-green-rgb), var(--tw-text-opacity))
      + }
      + .text-white {
      +   --tw-text-opacity: 1;
      +   color: rgb(255 255 255 / var(--tw-text-opacity))
      + }
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }

    "
  `)
})
