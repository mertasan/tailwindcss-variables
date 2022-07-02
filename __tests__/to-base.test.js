const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('toBase - default', async () => {
  expect(
    await utils.diffOnly(
      {
        content: [utils.content()],
        darkMode: 'class',
        corePlugins: ['textColor'],
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
      },

      true
    )
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-red-400: #000000;
      +   --colors-red-500: #111111
      + }
      + :root.dark {
      +   --colors-red-400: #222222;
      +   --colors-red-500: #333333
      + }
      + .text-red-400 {
      +   color: var(--colors-red-400)
      + }
      + .text-red-500 {
      +   color: var(--colors-red-500)
      + }

    "
  `)
})

test('toBase', async () => {
  expect(
    await utils.diffOnly(
      {
        content: [utils.content()],
        darkMode: 'class',
        corePlugins: ['textColor'],
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
      },

      true
    )
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-red-400: #000000;
      +   --colors-red-500: #111111
      + }
      + :root.dark {
      +   --colors-red-400: #222222;
      +   --colors-red-500: #333333
      + }
      + .text-red-400 {
      +   color: var(--colors-red-400)
      + }
      + .text-red-500 {
      +   color: var(--colors-red-500)
      + }

    "
  `)
})

test('if "base" styles are not added then variables should not be added', async () => {
  expect(
    await utils.diffOnly(
      {
        content: [utils.content()],
        darkMode: 'class',
        corePlugins: ['textColor'],
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
      },

      false
    )
  ).toMatchInlineSnapshot(`
    "

      
      + .text-red-400 {
      +   color: var(--colors-red-400)
      + }
      + .text-red-500 {
      +   color: var(--colors-red-500)
      + }

    "
  `)
})

test('if "base" styles are not added then variables should be added.', async () => {
  expect(
    await utils.diffOnly(
      {
        content: [utils.content()],
        darkMode: 'class',
        corePlugins: ['textColor'],
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
      },

      false
    )
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-red-400: #000000;
      +   --colors-red-500: #111111
      + }
      + :root.dark {
      +   --colors-red-400: #222222;
      +   --colors-red-500: #333333
      + }
      + .text-red-400 {
      +   color: var(--colors-red-400)
      + }
      + .text-red-500 {
      +   color: var(--colors-red-500)
      + }

    "
  `)
})

test('toComponents', async () => {
  expect(
    await utils.diffOnly(
      {
        content: [utils.content()],
        corePlugins: ['textColor'],
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
      },

      false
    )
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-red-400: #000000;
      +   --colors-red-500: #111111
      + }
      + :root.dark {
      +   --colors-red-400: #222222;
      +   --colors-red-500: #333333
      + }
      + .text-red-400 {
      +   color: var(--colors-red-400)
      + }
      + .text-red-500 {
      +   color: var(--colors-red-500)
      + }

    "
  `)
})
