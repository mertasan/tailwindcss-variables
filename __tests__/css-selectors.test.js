const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('css selectors', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          '#app': {
            colors: {
              black: 'rgb(0, 0, 0)',
              white: '#ffffff',
            },
          },

          'input[type="text"]': {
            colors: {
              primary: 'red',
              secondary: 'yellow',
            },
          },

          '.container': {
            sizes: {
              medium: '3rem',
            },
          },

          '.container.card': {
            sizes: {
              medium: '4rem',
            },
          },

          '*,\n*::before,\n*::after': {
            hello: {
              world: '100%',
            },
          },

          "[type='button'],\n[type='reset']": {
            colors: {
              primary: 'blue',
              secondary: 'green',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + #app {
      +   --colors-black: rgb(0, 0, 0);
      +   --colors-white: #ffffff
      + }
      + input[type='text'] {
      +   --colors-primary: red;
      +   --colors-secondary: yellow
      + }
      + .container {
      +   --sizes-medium: 3rem
      + }
      + .container.card {
      +   --sizes-medium: 4rem
      + }
      + *,
      + *::before,
      + *::after {
      +   --hello-world: 100%
      + }
      + [type='button'],
      + [type='reset'] {
      +   --colors-primary: blue;
      +   --colors-secondary: green
      + }

    "
  `)
})
