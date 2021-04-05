const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('nested variables', async () => {
  expect(
    await utils.diffOnly({
      purge: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              black: 'rgb(0, 0, 0)',
              buttons: {
                light: {
                  white: '#ffffff',
                },
                moon: {
                  white: 'white',
                  inverse: {
                    white: 'black',
                  },
                },
              },
            },
          },
          '.container>.card, .card-body': {
            colors: {
              black: 'rgb(0, 0, 0)',
              buttons: {
                light: {
                  white: '#ffffff',
                },
                moon: {
                  white: 'white',
                  inverse: {
                    white: 'black',
                  },
                },
              },
            },
          },
        },
      },
      plugins: [tailwindcssVariables],
    }),
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-black: rgb(0, 0, 0);
      +   --colors-buttons-light-white: #ffffff;
      +   --colors-buttons-moon-white: white;
      +   --colors-buttons-moon-inverse-white: black
      + }
      +
      + .container>.card {
      +   --colors-black: rgb(0, 0, 0);
      +   --colors-buttons-light-white: #ffffff;
      +   --colors-buttons-moon-white: white;
      +   --colors-buttons-moon-inverse-white: black
      + }
      +
      + .card-body {
      +   --colors-black: rgb(0, 0, 0);
      +   --colors-buttons-light-white: #ffffff;
      +   --colors-buttons-moon-white: white;
      +   --colors-buttons-moon-inverse-white: black
      + }

    "
  `)
})
