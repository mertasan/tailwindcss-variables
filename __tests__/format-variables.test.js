const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('format variables [special characters must be removed from variable names]', async () => {
  expect(
    /* eslint-disable camelcase */
    await utils.diffOnly({
      purge: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              "hello[$&+,:;=?@#|'<>.-^*()%!]world": '100%',
              underscore_to_dash: '100%',
              'underscore_to_dash-with-dash': '100%',
              auto_dash: '100%',
            },
          },

          "[type='button']": {
            "hello[$&+,:;=?@#|'<>.-^*()%!]world": '100%',
            underscore_to_dash: '100%',
            'underscore_to_dash-with-dash': '100%',
            auto_dash: '100%',
            nested_auto_dash: {
              color__primary: '100%',
            },
          },
        },
      },

      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-hello-world: 100%;
      +   --colors-underscore-to-dash: 100%;
      +   --colors-underscore-to-dash-with-dash: 100%;
      +   --colors-auto-dash: 100%
      + }
      +
      + [type='button'] {
      +   --hello-world: 100%;
      +   --underscore-to-dash: 100%;
      +   --underscore-to-dash-with-dash: 100%;
      +   --auto-dash: 100%;
      +   --nested-auto-dash-color--primary: 100%
      + }

    "
  `)
})
