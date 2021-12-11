const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('extendColors', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],
      darkMode: false,
      theme: {
        screens: false,
        colors: {
          red: {
            600: 'var(--colors-red-600)',
            700: 'var(--colors-red-700)',
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
                700: 'rgb(186,5,5,1)',
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
      +   --colors-white: #ffffff;
      +   --colors-red-400: rgba(254,0,0,0.5);
      +   --colors-red-500: rgba(254,0,0,1);
      +   --colors-red-600: rgba(205,7,7,1);
      +   --colors-red-700: rgb(186,5,5,1);
      +   --colors-red: rgba(254,0,0,1);
      +   --colors-red-400-rgb: 254,0,0;
      +   --colors-red-500-rgb: 254,0,0;
      +   --colors-red-600-rgb: 205,7,7;
      +   --colors-red-700-rgb: 186,5,5,1;
      +   --colors-red-rgb: 254,0,0;
      +   --colors-white-rgb: 255,255,255;
      +   --sizes-small: 1rem
      + }
      + .bg-red {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red-rgb), var(--tw-bg-opacity))
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
      +   background-color: var(--colors-red-600)
      + }
      + .bg-red-700 {
      +   background-color: var(--colors-red-700)
      + }
      + .bg-white {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-white-rgb), var(--tw-bg-opacity))
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
      +   color: rgba(var(--colors-red-rgb), var(--tw-text-opacity))
      + }
      + .text-red-400 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red-400-rgb), var(--tw-text-opacity))
      + }
      + .text-red-500 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red-500-rgb), var(--tw-text-opacity))
      + }
      + .text-red-600 {
      +   color: var(--colors-red-600)
      + }
      + .text-red-700 {
      +   color: var(--colors-red-700)
      + }
      + .text-white {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-white-rgb), var(--tw-text-opacity))
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

test('extendColors with forceRGB', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],

      darkMode: false,
      theme: {
        screens: false,
        colors: {
          red: {
            600: 'var(--colors-red-600)',
            700: 'var(--colors-red-700)',
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
                700: 'rgb(186,5,5,1)',
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
      +   --colors-red-500: 254,0,0;
      +   --colors-red-600: 205,7,7;
      +   --colors-red-700: 186,5,5,1;
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
      + .bg-red-600 {
      +   background-color: var(--colors-red-600)
      + }
      + .bg-red-700 {
      +   background-color: var(--colors-red-700)
      + }
      + .bg-white {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-white), var(--tw-bg-opacity))
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
      + .text-red-600 {
      +   color: var(--colors-red-600)
      + }
      + .text-red-700 {
      +   color: var(--colors-red-700)
      + }
      + .text-white {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-white), var(--tw-text-opacity))
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
      + .bg-blue {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-blue-rgb), var(--tw-bg-opacity))
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
      + .text-blue {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-blue-rgb), var(--tw-text-opacity))
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

test('extendColors with forceRGB (readme)', async () => {
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
          forceRGB: true,
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
      +   --colors-blue: 0,101,255;
      +   --colors-red: 255,0,0;
      +   --colors-green: 17,255,0
      + }
      + .bg-green {
      +   background-color: var(--colors-green)
      + }
      + .bg-blue {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-blue), var(--tw-bg-opacity))
      + }
      + .bg-red {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-red), var(--tw-bg-opacity))
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
      + .text-blue {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-blue), var(--tw-text-opacity))
      + }
      + .text-red {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-red), var(--tw-text-opacity))
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
