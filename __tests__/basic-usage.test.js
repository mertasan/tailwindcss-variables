const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('basic usage', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              black: 'rgb(0, 0, 0)',
              white: '#ffffff',
            },

            sizes: {
              small: '10px',
              medium: '2rem',
              large: '100%',
            },
          },

          '.container': {
            colors: {
              primary: 'red',
              secondary: 'var(--colors-primary)',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-black: rgb(0, 0, 0);
      +   --colors-white: #ffffff;
      +   --sizes-small: 10px;
      +   --sizes-medium: 2rem;
      +   --sizes-large: 100%
      + }
      + .container {
      +   --colors-primary: red;
      +   --colors-secondary: var(--colors-primary)
      + }

    "
  `)
})
