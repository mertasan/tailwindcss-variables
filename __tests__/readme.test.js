const plugin = require('tailwindcss/plugin')
const tailwindcssVariables = require('../src/index')
const variablesApi = require('../api')
const utils = require('./util/_utils')(__filename)

test('basic usage', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            sizes: {
              small: '1rem',
              button: {
                size: '2rem',
              },
            },

            colors: {
              red: {
                50: '#ff3232',
              },
            },
          },

          '.container': {
            sizes: {
              medium: '1.5rem',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --sizes-small: 1rem;
      +   --sizes-button-size: 2rem;
      +   --colors-red-50: #ff3232
      + }
      + .container {
      +   --sizes-medium: 1.5rem
      + }

    "
  `)
})

test('dark mode with `class`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            sizes: {
              small: '1rem',
            },

            colors: {
              red: {
                50: 'red',
              },
            },
          },

          '.container': {
            colors: {
              red: {
                50: 'indigo',
              },
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              red: {
                50: 'blue',
              },
            },
          },

          '.container': {
            colors: {
              red: {
                50: 'green',
              },
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --sizes-small: 1rem;
      +   --colors-red-50: red
      + }
      + .container {
      +   --colors-red-50: indigo
      + }
      + :root.dark {
      +   --colors-red-50: blue
      + }
      + :root.dark .container {
      +   --colors-red-50: green
      + }

    "
  `)
})

test('dark mode with `class` and custom options', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            sizes: {
              small: '1rem',
            },

            colors: {
              red: {
                50: 'red',
              },
            },
          },

          '.container': {
            colors: {
              red: {
                50: 'indigo',
              },
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              red: {
                50: 'blue',
              },
            },
          },

          '.container': {
            colors: {
              red: {
                50: 'green',
              },
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          darkToRoot: false,
          darkSelector: '.custom-dark-selector',
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --sizes-small: 1rem;
      +   --colors-red-50: red
      + }
      + .container {
      +   --colors-red-50: indigo
      + }
      + .custom-dark-selector {
      +   --colors-red-50: blue
      + }
      + .custom-dark-selector .container {
      +   --colors-red-50: green
      + }

    "
  `)
})

test('dark mode with `media`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {
        variables: {
          DEFAULT: {
            sizes: {
              small: '1rem',
            },

            colors: {
              red: {
                50: 'red',
              },
            },
          },

          '.container': {
            colors: {
              red: {
                50: 'indigo',
              },
            },
          },
        },

        darkVariables: {
          DEFAULT: {
            colors: {
              red: {
                50: 'blue',
              },
            },
          },

          '.container': {
            colors: {
              red: {
                50: 'green',
              },
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --sizes-small: 1rem;
      +   --colors-red-50: red
      + }
      + .container {
      +   --colors-red-50: indigo
      + }
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --colors-red-50: blue
      +   }
      +   .container {
      +       --colors-red-50: green
      +   }
      + }

    "
  `)
})

test('variable prefix', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            sizes: {
              small: '1rem',
              button: {
                size: '2rem',
              },
            },

            colors: {
              red: {
                50: '#ff3232',
              },
            },
          },

          '.container': {
            sizes: {
              medium: '1.5rem',
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          variablePrefix: '--admin',
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --admin-sizes-small: 1rem;
      +   --admin-sizes-button-size: 2rem;
      +   --admin-colors-red-50: #ff3232
      + }
      + .container {
      +   --admin-sizes-medium: 1.5rem
      + }

    "
  `)
})

test('variables with nested objects', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            sizes: {
              small: '1rem',
              admin: {
                buttons: {
                  colors: {
                    red: {
                      500: '#ff0000',
                      600: '#e60000',
                    },
                  },
                },
              },
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --sizes-small: 1rem;
      +   --sizes-admin-buttons-colors-red-500: #ff0000;
      +   --sizes-admin-buttons-colors-red-600: #e60000
      + }

    "
  `)
})

test('naming conventions for variable keys', async () => {
  expect(
    /* eslint-disable camelcase */
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              "hello[$&+,:;=?@#|'<>-^*()%!]WORLD": '100%',
              underscore_to_dash: '100%',
              'underscore_to_dash-with-dash': '100%',
              auto_dash: '100%',
            },

            sizes: {
              1.5: '1rem',
              xl: {
                '3.0': '2rem',
              },
            },
          },

          "[type='button']": {
            "hello[$&+,:;=?@#|'<>-^*()%!]world": '100%',
            underscore_to_dash: '100%',
            'underscore_to_dash-with-dash': '100%',
            auto_dash: '100%',
            nested_auto_dash: {
              color_primary: '100%',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-hello-WORLD: 100%;
      +   --colors-underscore-to-dash: 100%;
      +   --colors-underscore-to-dash-with-dash: 100%;
      +   --colors-auto-dash: 100%;
      +   --sizes-1\\\\.5: 1rem;
      +   --sizes-xl-3\\\\.0: 2rem
      + }
      + [type='button'] {
      +   --hello-world: 100%;
      +   --underscore-to-dash: 100%;
      +   --underscore-to-dash-with-dash: 100%;
      +   --auto-dash: 100%;
      +   --nested-auto-dash-color-primary: 100%
      + }

    "
  `)
})

test('example api', async () => {
  let variableOptions = {
    variablePrefix: '--myplugin',
  }

  const pluginVariables = {
    DEFAULT: {
      colors: {
        primary: 'black',
        secondary: 'white',
        warning: 'orange',
      },
    },
  }
  const pluginDarkVariables = {
    DEFAULT: {
      colors: {
        primary: 'red',
        secondary: 'yellow',
        warning: 'green',
      },
    },
  }
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {},
      plugins: [
        plugin(function ({ addComponents, config }) {
          addComponents(variablesApi.variables(pluginVariables, variableOptions))

          addComponents(variablesApi.darkVariables(pluginDarkVariables, variableOptions, config('darkMode'))) // darkMode: class
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --myplugin-colors-primary: black;
      +   --myplugin-colors-secondary: white;
      +   --myplugin-colors-warning: orange
      + }
      + :root.dark {
      +   --myplugin-colors-primary: red;
      +   --myplugin-colors-secondary: yellow;
      +   --myplugin-colors-warning: green
      + }

    "
  `)
})

test('example api with components helper', async () => {
  let variableOptions = {
    variablePrefix: '--myplugin',
  }

  const pluginVariables = {
    DEFAULT: {
      colors: {
        primary: 'black',
        secondary: 'white',
        warning: 'orange',
      },
    },
  }
  const pluginDarkVariables = {
    DEFAULT: {
      colors: {
        primary: 'red',
        secondary: 'yellow',
        warning: 'green',
      },
    },
  }
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {},
      plugins: [
        plugin(function ({ addComponents, config }) {
          const formComponents = {
            select: {
              DEFAULT: {
                backgroundColor: 'var(--myplugin-colors-primary)',
              },

              multi: {
                '&.default-multi': {
                  backgroundColor: 'var(--myplugin-colors-secondary)',
                },

                '&.other-multi': {
                  backgroundColor: 'var(--myplugin-colors-warning)',
                },
              },
            },
          }

          addComponents(variablesApi.variables(pluginVariables, variableOptions))

          addComponents(variablesApi.darkVariables(pluginDarkVariables, variableOptions, config('darkMode'))) // darkMode: class

          // Automatically register components via API.
          addComponents(variablesApi.getComponents('.form', formComponents))
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --myplugin-colors-primary: black;
      +   --myplugin-colors-secondary: white;
      +   --myplugin-colors-warning: orange;
      + }
      + :root.dark {
      +   --myplugin-colors-primary: red;
      +   --myplugin-colors-secondary: yellow;
      +   --myplugin-colors-warning: green;
      + }
      + .form-select {
      +   background-color: var(--myplugin-colors-primary);
      + }
      + .form-select.default-multi {
      +   background-color: var(--myplugin-colors-secondary);
      + }
      + .form-select.other-multi {
      +   background-color: var(--myplugin-colors-warning);
      + }

    "
  `)
})

test('detailed example api', async () => {
  expect(
    await utils.diffOnly(
      ...[
        {
          content: [utils.content()],
          darkMode: 'class',
          ...require('../examples/api-examples/readme-source/tailwind.config'),
        },
      ]
    )
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --forms-colors-primary: indigo;
      +   --forms-colors-secondary: white;
      +   --forms-colors-warning: orange;
      + }
      + .form-select {
      +   background-color: var(--forms-colors-primary);
      + }
      + .form-select .default-multi {
      +   background-color: var(--forms-colors-secondary);
      + }
      + .form-select .other-multi {
      +   background-color: var(--forms-colors-warning);
      + }

    "
  `)
})
