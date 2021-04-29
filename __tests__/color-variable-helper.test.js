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
          white: '#ffffff',
        },
        variables: {
          DEFAULT: {
            colors: {
              primary: '#ff0',
              secondary: '#000000',
              gray: '#6B7280',
            },
            sizes: {
              small: '10px',
              medium: '2rem',
              large: '100%',
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

      
      + :root {
      +   --colors-primary: #ff0;
      +   --colors-secondary: #000000;
      +   --colors-gray: #6B7280;
      +   --colors-primary-rgb: 255,255,0;
      +   --colors-secondary-rgb: 0,0,0;
      +   --colors-gray-rgb: 107,114,128;
      +   --sizes-small: 10px;
      +   --sizes-medium: 2rem;
      +   --sizes-large: 100%
      + }
      +
      + .text-primary {
      +   --tw-text-opacity: 1;
      +   color: rgba(var(--colors-primary-rgb), var(--tw-text-opacity))
      + }
      +
      + .text-opacity-50 {
      +   --tw-text-opacity: 0.5
      + }
      +
      + .bg-secondary {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(var(--colors-secondary-rgb), var(--tw-bg-opacity))
      + }
      +
      + .bg-gray {
      +   background-color: var(--colors-gray)
      + }
      +
      + .bg-white {
      +   --tw-bg-opacity: 1;
      +   background-color: rgba(255, 255, 255, var(--tw-bg-opacity))
      + }
      +
      + .bg-opacity-50 {
      +   --tw-bg-opacity: 0.5
      + }

    "
  `)
})
