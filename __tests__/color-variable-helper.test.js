const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)
const colorVariable = require('../colorVariable')

test('colorVariable helper', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      purge: {
        enabled: true,
        content: [utils.content()],
      },
      darkMode: false,
      theme: {
        screens: false,
        colors: {
          primary: colorVariable('--colors-primary'),
          secondary: colorVariable('var(--colors-secondary)'),
          gray: 'var(--colors-gray)',
        },
        variables: {
          DEFAULT: {
            colors: {
              primary: '#ffffff',
              secondary: '#000000',
              gray: '#6B7280',
            },
          },
        },
      },
      plugins: [tailwindcssVariables],
    })
  ).toMatchInlineSnapshot(`
    "

      
      + :root {
      +   --colors-primary: #ffffff;
      +   --colors-secondary: #000000;
      +   --colors-gray: #6B7280
      + }
      +
      + .text-primary {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-primary), var(--tw-text-opacity))
      + }
      +
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }
      +
      + .bg-secondary {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-secondary), var(--tw-bg-opacity))
      + }
      +
      + .bg-gray {
      +   background-color: var(--colors-gray)
      + }
      +
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }

    "
  `)
})
