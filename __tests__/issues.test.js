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

test('issue 25', async () => {
  const shadow = {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(var(--primary), 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    none: 'none',
  }
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            shadow,
          },
        },

        darkVariables: {
          DEFAULT: {
            shadow,
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          darkToRoot: true,
          darkSelector: '[data-mode="dark"]',
          colorVariables: true,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --shadow-xs: 0 0 0 1px rgba(0, 0, 0, 0.05);
      +   --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      +   --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06);
      +   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
      +   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);
      +   --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04);
      +   --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      +   --shadow-outline: 0 0 0 3px rgba(var(--primary), 0.6);
      +   --shadow-inner: inset 0 2px 4px 0 rgba(0,0,0,0.06);
      +   --shadow-none: none
      + }
      + :root[data-mode='dark'] {
      +   --shadow-xs: 0 0 0 1px rgba(0, 0, 0, 0.05);
      +   --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      +   --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06);
      +   --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
      +   --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);
      +   --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04);
      +   --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      +   --shadow-outline: 0 0 0 3px rgba(var(--primary), 0.6);
      +   --shadow-inner: inset 0 2px 4px 0 rgba(0,0,0,0.06);
      +   --shadow-none: none
      + }

    "
  `)
})

test('issue 37', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            ONE: 'red',
            TWO: {
              DEFAULT: 'black',
              FOObar: 'green',
              THREE: {
                FOUR: 'white',
                five: 'blue',
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
      +   --ONE: red;
      +   --TWO: black;
      +   --TWO-FOObar: green;
      +   --TWO-THREE-FOUR: white;
      +   --TWO-THREE-five: blue
      + }

    "
  `)
})

test('issue 39', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            sizes: {
              0.5: '2px',
              3.5: '14px',
              6.5: '18px',
              '1.0': {
                foo: '1rem',
                2.4: '2rem',
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
      +   --sizes-0\\\\.5: 2px;
      +   --sizes-3\\\\.5: 14px;
      +   --sizes-6\\\\.5: 18px;
      +   --sizes-1\\\\.0-foo: 1rem;
      +   --sizes-1\\\\.0-2\\\\.4: 2rem
      + }

    "
  `)
})
