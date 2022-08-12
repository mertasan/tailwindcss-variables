const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('only dark variables with default options and `class` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],

      darkMode: 'class',
      theme: {
        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root.dark {
      +   --colors-primary: #ffffff
      + }
      + :root.dark .container {
      +   --colors-secondary: #000000
      + }

    "
  `)
})

test('only dark variables with default options and `media` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {
        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --colors-primary: #ffffff
      +   }
      +   .container {
      +       --colors-secondary: #000000
      +   }
      + }

    "
  `)
})

test('if the `darkMode` is set to `media`, the `darkSelector` and `darkToRoot` options should not work', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {
        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          darkSelector: '.custom-dark-selector',
          darkToRoot: true,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --colors-primary: #ffffff
      +   }
      +   .container {
      +       --colors-secondary: #000000
      +   }
      + }

    "
  `)
})

test('only dark variables with darkToRoot option and `class` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content('dark-mode-to-root')],
      darkMode: 'class',
      theme: {
        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          darkToRoot: true,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root.dark {
      +   --colors-primary: #ffffff
      + }
      + :root.dark .container {
      +   --colors-secondary: #000000
      + }

    "
  `)
})

test('only dark variables with custom options and `class` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content('dark-mode-to-root')],
      darkMode: 'class',
      theme: {
        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          variablePrefix: 'my-prefix',
          darkSelector: '.custom-dark-selector',
          darkToRoot: true,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root.custom-dark-selector {
      +   --my-prefix-colors-primary: #ffffff
      + }
      + :root.custom-dark-selector .container {
      +   --my-prefix-colors-secondary: #000000
      + }

    "
  `)
})

test('only dark variables with variablePrefix and `media` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content('dark-mode-to-root')],
      darkMode: 'media',
      theme: {
        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          variablePrefix: 'my-prefix',
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --my-prefix-colors-primary: #ffffff
      +   }
      +   .container {
      +       --my-prefix-colors-secondary: #000000
      +   }
      + }

    "
  `)
})

test('variables and dark variables with default options and `class` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-primary: #ffffff
      + }
      + .container {
      +   --colors-secondary: #000000
      + }
      + :root.dark {
      +   --colors-primary: #ffffff
      + }
      + :root.dark .container {
      +   --colors-secondary: #000000
      + }

    "
  `)
})

test('variables and dark variables with default options and `media` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-primary: #ffffff
      + }
      + .container {
      +   --colors-secondary: #000000
      + }
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --colors-primary: #ffffff
      +   }
      +   .container {
      +       --colors-secondary: #000000
      +   }
      + }

    "
  `)
})

test('variables and dark variables with custom darkSelector and `class` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          darkSelector: '.custom-dark-selector',
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-primary: #ffffff
      + }
      + .container {
      +   --colors-secondary: #000000
      + }
      + :root.custom-dark-selector {
      +   --colors-primary: #ffffff
      + }
      + :root.custom-dark-selector .container {
      +   --colors-secondary: #000000
      + }

    "
  `)
})

test('variables and dark variables with darkToRoot option and `class` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content('dark-mode-to-root')],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          darkToRoot: true,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-primary: #ffffff
      + }
      + .container {
      +   --colors-secondary: #000000
      + }
      + :root.dark {
      +   --colors-primary: #ffffff
      + }
      + :root.dark .container {
      +   --colors-secondary: #000000
      + }

    "
  `)
})

test('variables and dark variables with custom options and `class` mode', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content('dark-mode-to-root')],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
            },
          },

          '.container': {
            colors: {
              secondary: '#000000',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          variablePrefix: 'my-prefix',
          darkSelector: '.custom-dark-selector',
          darkToRoot: true,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --my-prefix-colors-primary: #ffffff
      + }
      + .container {
      +   --my-prefix-colors-secondary: #000000
      + }
      + :root.custom-dark-selector {
      +   --my-prefix-colors-primary: #ffffff
      + }
      + :root.custom-dark-selector .container {
      +   --my-prefix-colors-secondary: #000000
      + }

    "
  `)
})
