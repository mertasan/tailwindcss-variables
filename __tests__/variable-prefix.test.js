const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('variable prefix', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
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
      },

      plugins: [
        tailwindcssVariables({
          variablePrefix: '--prefix',
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix-colors-primary: #ffffff
      + }
      + .container {
      +   --prefix-colors-secondary: #000000
      + }

    "
  `)
})

test('formatted variable prefix', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
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
      },

      plugins: [
        tailwindcssVariables({
          variablePrefix: '--[hello](_world)1=tail_wind',
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --hello-world1tail-wind-colors-primary: #ffffff
      + }
      + .container {
      +   --hello-world1tail-wind-colors-secondary: #000000
      + }

    "
  `)
})
