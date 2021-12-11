const utils = require('./util/_utils')(__filename)

test('simple example with dark mode set to `media`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: 'indigo',
            },
          },
        },
      },

      plugins: [require('../examples/api-examples/simple/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: indigo;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray
      + }
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --prefix2-colors-primary: yellow;
      +       --prefix2-colors-secondary: white;
      +       --prefix2-colors-warning: pink
      +   }
      +   .admin {
      +       --prefix2-colors-primary: blue;
      +       --prefix2-colors-secondary: green;
      +       --prefix2-colors-warning: gray
      +   }
      + }

    "
  `)
})

test('simple example with dark mode set to `class`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: 'indigo',
            },
          },
        },
      },

      plugins: [require('../examples/api-examples/simple/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: indigo;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray
      + }
      + .dark {
      +   --prefix2-colors-primary: yellow;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink
      + }
      + .dark .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray
      + }

    "
  `)
})

test('with-components example with dark mode set to `class`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {},
      plugins: [require('../examples/api-examples/with-components/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: black;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink;
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray;
      + }
      + .dark {
      +   --prefix2-colors-primary: yellow;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink;
      + }
      + .dark .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray;
      + }
      + .form-select {
      +   background-color: var(--colors-prefix2-primary);
      + }
      + .form-select .default-multi {
      +   background-color: var(--prefix2-colors-secondary);
      + }
      + .form-select .other-multi {
      +   background-color: var(--prefix2-colors-warning);
      + }

    "
  `)
})

test('with-components example with dark mode set to `media`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {},
      plugins: [require('../examples/api-examples/with-components/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: black;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink;
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray;
      + }
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --prefix2-colors-primary: yellow;
      +       --prefix2-colors-secondary: white;
      +       --prefix2-colors-warning: pink;
      +   }
      +   .admin {
      +       --prefix2-colors-primary: blue;
      +       --prefix2-colors-secondary: green;
      +       --prefix2-colors-warning: gray;
      +   }
      + }
      + .form-select {
      +   background-color: var(--colors-prefix2-primary);
      + }
      + .form-select .default-multi {
      +   background-color: var(--prefix2-colors-secondary);
      + }
      + .form-select .other-multi {
      +   background-color: var(--prefix2-colors-warning);
      + }

    "
  `)
})

test('with-components-null-selector example with dark mode set to `class`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {},
      plugins: [require('../examples/api-examples/with-components-null-selector/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: black;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink;
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray;
      + }
      + .dark {
      +   --prefix2-colors-primary: yellow;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink;
      + }
      + .dark .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray;
      + }
      + .select {
      +   background-color: var(--colors-prefix2-primary);
      + }
      + .select .default-multi {
      +   background-color: var(--prefix2-colors-secondary);
      + }
      + .select .other-multi {
      +   background-color: var(--prefix2-colors-warning);
      + }

    "
  `)
})

test('with-components-null-selector example with dark mode set to `media`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {},
      plugins: [require('../examples/api-examples/with-components-null-selector/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: black;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: pink;
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray;
      + }
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --prefix2-colors-primary: yellow;
      +       --prefix2-colors-secondary: white;
      +       --prefix2-colors-warning: pink;
      +   }
      +   .admin {
      +       --prefix2-colors-primary: blue;
      +       --prefix2-colors-secondary: green;
      +       --prefix2-colors-warning: gray;
      +   }
      + }
      + .select {
      +   background-color: var(--colors-prefix2-primary);
      + }
      + .select .default-multi {
      +   background-color: var(--prefix2-colors-secondary);
      + }
      + .select .other-multi {
      +   background-color: var(--prefix2-colors-warning);
      + }

    "
  `)
})

test('with-themes example with dark mode set to `media`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {},
      plugins: [require('../examples/api-examples/with-themes/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: black;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: indigo
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray
      + }
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --prefix2-colors-primary: yellow;
      +       --prefix2-colors-secondary: red;
      +       --prefix2-colors-warning: purple
      +   }
      +   .admin {
      +       --prefix2-colors-primary: green;
      +       --prefix2-colors-secondary: orange;
      +       --prefix2-colors-warning: teal
      +   }
      + }

    "
  `)
})

test('with-themes example with dark mode set to `class`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: 'indigo',
            },
          },
        },
      },

      plugins: [require('../examples/api-examples/with-themes/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: indigo;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: indigo
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray
      + }
      + .dark {
      +   --prefix2-colors-primary: yellow;
      +   --prefix2-colors-secondary: red;
      +   --prefix2-colors-warning: purple
      + }
      + .dark .admin {
      +   --prefix2-colors-primary: green;
      +   --prefix2-colors-secondary: orange;
      +   --prefix2-colors-warning: teal
      + }

    "
  `)
})

test('advanced example with dark mode set to `media`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'media',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: 'indigo',
            },
          },
        },
      },

      plugins: [require('../examples/api-examples/advanced/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: indigo;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: indigo;
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray;
      + }
      + @media (prefers-color-scheme: dark) {
      +   :root {
      +       --prefix2-colors-primary: yellow;
      +       --prefix2-colors-secondary: red;
      +       --prefix2-colors-warning: purple;
      +   }
      +   .admin {
      +       --prefix2-colors-primary: green;
      +       --prefix2-colors-secondary: orange;
      +       --prefix2-colors-warning: teal;
      +   }
      + }
      + .form-select {
      +   background-color: var(--colors-prefix2-primary);
      + }
      + .form-select .default-multi {
      +   background-color: var(--prefix2-colors-secondary);
      + }
      + .form-select .other-multi {
      +   background-color: var(--prefix2-colors-warning);
      + }

    "
  `)
})

test('advanced example with dark mode set to `class`', async () => {
  expect(
    await utils.diffOnly({
      content: [utils.content()],
      darkMode: 'class',
      theme: {
        variables: {
          DEFAULT: {
            colors: {
              primary: 'indigo',
            },
          },
        },
      },

      plugins: [require('../examples/api-examples/advanced/index')],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --prefix2-colors-primary: indigo;
      +   --prefix2-colors-secondary: white;
      +   --prefix2-colors-warning: indigo;
      + }
      + .admin {
      +   --prefix2-colors-primary: blue;
      +   --prefix2-colors-secondary: green;
      +   --prefix2-colors-warning: gray;
      + }
      + .dark {
      +   --prefix2-colors-primary: yellow;
      +   --prefix2-colors-secondary: red;
      +   --prefix2-colors-warning: purple;
      + }
      + .dark .admin {
      +   --prefix2-colors-primary: green;
      +   --prefix2-colors-secondary: orange;
      +   --prefix2-colors-warning: teal;
      + }
      + .form-select {
      +   background-color: var(--colors-prefix2-primary);
      + }
      + .form-select .default-multi {
      +   background-color: var(--prefix2-colors-secondary);
      + }
      + .form-select .other-multi {
      +   background-color: var(--prefix2-colors-warning);
      + }

    "
  `)
})
