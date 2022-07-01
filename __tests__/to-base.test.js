const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('toBase - default', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      corePlugins: true,
      darkMode: 'class',
      theme: {
        colors: {
          red: {
            400: 'var(--colors-red-400)',
            500: 'var(--colors-red-500)',
          },
        },

        variables: {
          DEFAULT: {
            colors: {
              red: {
                400: '#000000',
                500: '#111111',
              },
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              red: {
                400: '#222222',
                500: '#333333',
              },
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatch(`
  + :root {
  +   --colors-red-400: #000000;
  +   --colors-red-500: #111111;
  + }
  +
  + :root.dark {
  +   --colors-red-400: #222222;
  +   --colors-red-500: #333333;
  + }
  +
  + *, ::before, ::after {
  +   --tw-translate-x: 0;
  +   --tw-translate-y: 0;
  +   --tw-rotate: 0;
  +   --tw-skew-x: 0;
  +   --tw-skew-y: 0;
  +   --tw-scale-x: 1;
  +   --tw-scale-y: 1;
  +   --tw-pan-x:  ;
  +   --tw-pan-y:  ;
  +   --tw-pinch-zoom:  ;
  +   --tw-scroll-snap-strictness: proximity;
  +   --tw-ordinal:  ;
  +   --tw-slashed-zero:  ;
  +   --tw-numeric-figure:  ;
  +   --tw-numeric-spacing:  ;
  +   --tw-numeric-fraction:  ;
  +   --tw-ring-inset:  ;
  +   --tw-ring-offset-width: 0px;
  +   --tw-ring-offset-color: #fff;
  +   --tw-ring-color: rgb(59 130 246 / 0.5);
  +   --tw-ring-offset-shadow: 0 0 #0000;
  +   --tw-ring-shadow: 0 0 #0000;
  +   --tw-shadow: 0 0 #0000;
  +   --tw-shadow-colored: 0 0 #0000;
  +   --tw-blur:  ;
  +   --tw-brightness:  ;
  +   --tw-contrast:  ;
  +   --tw-grayscale:  ;
  +   --tw-hue-rotate:  ;
  +   --tw-invert:  ;
  +   --tw-saturate:  ;
  +   --tw-sepia:  ;
  +   --tw-drop-shadow:  ;
  +   --tw-backdrop-blur:  ;
  +   --tw-backdrop-brightness:  ;
  +   --tw-backdrop-contrast:  ;
  +   --tw-backdrop-grayscale:  ;
  +   --tw-backdrop-hue-rotate:  ;
  +   --tw-backdrop-invert:  ;
  +   --tw-backdrop-opacity:  ;
  +   --tw-backdrop-saturate:  ;
  +   --tw-backdrop-sepia:  ;
  + }
  + .text-red-400 {
  +   color: var(--colors-red-400);
  + }
  + .text-red-500 {
  +   color: var(--colors-red-500);
  + }`)
})
test('toBase', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      corePlugins: true,
      darkMode: 'class',
      theme: {
        colors: {
          red: {
            400: 'var(--colors-red-400)',
            500: 'var(--colors-red-500)',
          },
        },

        variables: {
          DEFAULT: {
            colors: {
              red: {
                400: '#000000',
                500: '#111111',
              },
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              red: {
                400: '#222222',
                500: '#333333',
              },
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          toBase: true,
        }),
      ],
    })
  ).toMatch(`
  + :root {
  +   --colors-red-400: #000000;
  +   --colors-red-500: #111111;
  + }
  +
  + :root.dark {
  +   --colors-red-400: #222222;
  +   --colors-red-500: #333333;
  + }
  +
  + *, ::before, ::after {
  +   --tw-translate-x: 0;
  +   --tw-translate-y: 0;
  +   --tw-rotate: 0;
  +   --tw-skew-x: 0;
  +   --tw-skew-y: 0;
  +   --tw-scale-x: 1;
  +   --tw-scale-y: 1;
  +   --tw-pan-x:  ;
  +   --tw-pan-y:  ;
  +   --tw-pinch-zoom:  ;
  +   --tw-scroll-snap-strictness: proximity;
  +   --tw-ordinal:  ;
  +   --tw-slashed-zero:  ;
  +   --tw-numeric-figure:  ;
  +   --tw-numeric-spacing:  ;
  +   --tw-numeric-fraction:  ;
  +   --tw-ring-inset:  ;
  +   --tw-ring-offset-width: 0px;
  +   --tw-ring-offset-color: #fff;
  +   --tw-ring-color: rgb(59 130 246 / 0.5);
  +   --tw-ring-offset-shadow: 0 0 #0000;
  +   --tw-ring-shadow: 0 0 #0000;
  +   --tw-shadow: 0 0 #0000;
  +   --tw-shadow-colored: 0 0 #0000;
  +   --tw-blur:  ;
  +   --tw-brightness:  ;
  +   --tw-contrast:  ;
  +   --tw-grayscale:  ;
  +   --tw-hue-rotate:  ;
  +   --tw-invert:  ;
  +   --tw-saturate:  ;
  +   --tw-sepia:  ;
  +   --tw-drop-shadow:  ;
  +   --tw-backdrop-blur:  ;
  +   --tw-backdrop-brightness:  ;
  +   --tw-backdrop-contrast:  ;
  +   --tw-backdrop-grayscale:  ;
  +   --tw-backdrop-hue-rotate:  ;
  +   --tw-backdrop-invert:  ;
  +   --tw-backdrop-opacity:  ;
  +   --tw-backdrop-saturate:  ;
  +   --tw-backdrop-sepia:  ;
  + }
  + .text-red-400 {
  +   color: var(--colors-red-400);
  + }
  + .text-red-500 {
  +   color: var(--colors-red-500);
  + }`)
})

test('toComponents', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      corePlugins: true,
      darkMode: 'class',
      theme: {
        colors: {
          red: {
            400: 'var(--colors-red-400)',
            500: 'var(--colors-red-500)',
          },
        },

        variables: {
          DEFAULT: {
            colors: {
              red: {
                400: '#000000',
                500: '#111111',
              },
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              red: {
                400: '#222222',
                500: '#333333',
              },
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          toBase: false,
        }),
      ],
    })
  ).toMatch(`
  + *, ::before, ::after {
  +   --tw-translate-x: 0;
  +   --tw-translate-y: 0;
  +   --tw-rotate: 0;
  +   --tw-skew-x: 0;
  +   --tw-skew-y: 0;
  +   --tw-scale-x: 1;
  +   --tw-scale-y: 1;
  +   --tw-pan-x:  ;
  +   --tw-pan-y:  ;
  +   --tw-pinch-zoom:  ;
  +   --tw-scroll-snap-strictness: proximity;
  +   --tw-ordinal:  ;
  +   --tw-slashed-zero:  ;
  +   --tw-numeric-figure:  ;
  +   --tw-numeric-spacing:  ;
  +   --tw-numeric-fraction:  ;
  +   --tw-ring-inset:  ;
  +   --tw-ring-offset-width: 0px;
  +   --tw-ring-offset-color: #fff;
  +   --tw-ring-color: rgb(59 130 246 / 0.5);
  +   --tw-ring-offset-shadow: 0 0 #0000;
  +   --tw-ring-shadow: 0 0 #0000;
  +   --tw-shadow: 0 0 #0000;
  +   --tw-shadow-colored: 0 0 #0000;
  +   --tw-blur:  ;
  +   --tw-brightness:  ;
  +   --tw-contrast:  ;
  +   --tw-grayscale:  ;
  +   --tw-hue-rotate:  ;
  +   --tw-invert:  ;
  +   --tw-saturate:  ;
  +   --tw-sepia:  ;
  +   --tw-drop-shadow:  ;
  +   --tw-backdrop-blur:  ;
  +   --tw-backdrop-brightness:  ;
  +   --tw-backdrop-contrast:  ;
  +   --tw-backdrop-grayscale:  ;
  +   --tw-backdrop-hue-rotate:  ;
  +   --tw-backdrop-invert:  ;
  +   --tw-backdrop-opacity:  ;
  +   --tw-backdrop-saturate:  ;
  +   --tw-backdrop-sepia:  ;
  + }
  + :root {
  +   --colors-red-400: #000000;
  +   --colors-red-500: #111111;
  + }
  + :root.dark {
  +   --colors-red-400: #222222;
  +   --colors-red-500: #333333;
  + }
  + .text-red-400 {
  +   color: var(--colors-red-400);
  + }
  + .text-red-500 {
  +   color: var(--colors-red-500);
  + }`)
})
