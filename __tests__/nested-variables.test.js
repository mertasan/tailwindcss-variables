const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('nested variables', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              DEFAULT: '#111111',
              black: '#000000',
              buttons: {
                DEFAULT: '#222222',
                light: {
                  DEFAULT: '#333333',
                  white: '#ffffff',
                },

                moon: {
                  white: 'white',
                  inverse: {
                    DEFAULT: '#444444',
                    white: 'black',
                  },
                },
              },
            },
          },

          '.container>.card, .card-body': {
            colors: {
              DEFAULT: '#555555',
              black: 'rgb(0, 0, 0)',
              buttons: {
                DEFAULT: '#666666',
                light: {
                  DEFAULT: '#777777',
                  white: '#ffffff',
                },

                moon: {
                  white: 'white',
                  inverse: {
                    DEFAULT: '#888888',
                    white: 'black',
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
      +   --colors: #111111;
      +   --colors-black: #000000;
      +   --colors-buttons: #222222;
      +   --colors-buttons-light: #333333;
      +   --colors-buttons-light-white: #ffffff;
      +   --colors-buttons-moon-white: white;
      +   --colors-buttons-moon-inverse: #444444;
      +   --colors-buttons-moon-inverse-white: black
      + }
      + .container>.card {
      +   --colors: #555555;
      +   --colors-black: rgb(0, 0, 0);
      +   --colors-buttons: #666666;
      +   --colors-buttons-light: #777777;
      +   --colors-buttons-light-white: #ffffff;
      +   --colors-buttons-moon-white: white;
      +   --colors-buttons-moon-inverse: #888888;
      +   --colors-buttons-moon-inverse-white: black
      + }
      + .card-body {
      +   --colors: #555555;
      +   --colors-black: rgb(0, 0, 0);
      +   --colors-buttons: #666666;
      +   --colors-buttons-light: #777777;
      +   --colors-buttons-light-white: #ffffff;
      +   --colors-buttons-moon-white: white;
      +   --colors-buttons-moon-inverse: #888888;
      +   --colors-buttons-moon-inverse-white: black
      + }

    "
  `)
})
