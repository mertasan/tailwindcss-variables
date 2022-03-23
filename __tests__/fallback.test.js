const tailwindcssVariables = require('../src/index')
const utils = require('./util/_utils')(__filename)
const colorVariable = require('../colorVariable')

test('fallback', async () => {
  expect(
    await utils.diffOnly({
      corePlugins: ['textColor', 'textOpacity', 'backgroundColor', 'backgroundOpacity'],
      content: [utils.content()],
      darkMode: false,
      theme: {
        screens: false,
        colors: {
          red: {
            400: 'var(--colors-red-400 red)',
            500: 'var(--colors-red red)',
            600: colorVariable('var(--header-color, black)'),
            700: colorVariable('var(--header-color, black)', true),
            800: colorVariable('var(--header-color, black)', false),
          },

          gray: 'var(--header-color, blue)',
        },

        variables: {
          DEFAULT: {
            header: {
              color: '#ffffff',
            },

            colors: {
              red: {
                DEFAULT: '#ff0000',
                400: '#ff3f3f',
              },
            },
          },
        },
      },

      plugins: [
        tailwindcssVariables({
          colorVariables: true,
        }),
      ],
    })
  ).toMatchInlineSnapshot(`
    "

      -
      + :root {
      +   --header-color: #ffffff;
      +   --header-color-rgb: 255,255,255;
      +   --colors-red-400: #ff3f3f;
      +   --colors-red: #ff0000;
      +   --colors-red-400-rgb: 255,63,63;
      +   --colors-red-rgb: 255,0,0
      + }
      + .component .header {
      +   color: var(--colors-red-400 red)
      + }
      + .bg-red-400 {
      +   background-color: var(--colors-red-400 red)
      + }
      + .bg-red-500 {
      +   background-color: var(--colors-red red)
      + }
      + .bg-red-600 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--header-color-rgb, black), var(--tw-bg-opacity))
      + }
      + .bg-red-700 {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--header-color, black), var(--tw-bg-opacity))
      + }
      + .bg-gray {
      +   background-color: var(--header-color, blue)
      + }
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }
      + .text-red-800 {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--header-color-rgb, black), var(--tw-text-opacity))
      + }

    "
  `)
})
