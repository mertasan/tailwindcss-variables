const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)

test('format variables [special characters must be removed from variable names]', async () => {
  expect(
    /* eslint-disable camelcase */
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: false,
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              "hello[$&+,:;=?@#|'<>.-^*()%!]WORLD": '100%',
              underscore_to_dash: '100%',
              'underscore_to_dash-with-dash': '100%',
              auto_dash: '100%',
            },

            sizes: {
              1.5: '1rem',
              'foo2.0bar3.0': '2rem',
              baz: {
                'foo3.0bar4.0': '3rem',
              },
            },
          },

          "[type='button']": {
            "hello[$&+,:;=?@#|'<>-^*()%!]world": '100%',
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
      +   --colors-hello\\\\.-WORLD: 100%;
      +   --colors-underscore-to-dash: 100%;
      +   --colors-underscore-to-dash-with-dash: 100%;
      +   --colors-auto-dash: 100%;
      +   --sizes-1\\\\.5: 1rem;
      +   --sizes-foo2\\\\.0bar3\\\\.0: 2rem;
      +   --sizes-baz-foo3\\\\.0bar4\\\\.0: 3rem
      + }
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
