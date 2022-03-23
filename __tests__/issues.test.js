const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('issue 23', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            // body
            'body-color': '#000',
            'body-bg': '#fff',
            'body-font-family': 'var(--font-primary)',
            'body-font-size': '1rem',
            'body-font-weight': 400,
            'body-line-height': 1.5,
            'body-font-weight2': '400',
            'body-line-height2': '1.5',
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "


      + :root {
      +   --body-color: #000;
      +   --body-bg: #fff;
      +   --body-font-family: var(--font-primary);
      +   --body-font-size: 1rem;
      +   --body-font-weight: 400;
      +   --body-line-height: 1.5;
      +   --body-font-weight2: 400;
      +   --body-line-height2: 1.5
      + }

    "
  `)
})
