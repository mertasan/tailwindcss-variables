module.exports = {
  purge: ['./index.html'],
  corePlugins: process.env.CLEAN ? [] : {},
  darkMode: 'class',
  theme: {
    variables: (theme) => ({
      DEFAULT: {
        sizes: {
          small: '1rem',
          medium: '2rem',
          large: '3rem',
        },
        colors: {
          red: {
            50: '#ff3232',
            500: '#ff0000',
            900: '#d70000',
          },
        },
      },
      '.container': {
        sizes: {
          medium: '1.5rem',
          container: '2rem',
        },
      },
    }),
    darkVariables: (theme) => ({
      DEFAULT: {
        colors: {
          red: {
            50: '#c665ff',
            500: '#9433f1',
            900: '#6c0bc9',
          },
        },
      },
      '.container': {
        colors: {
          red: {
            50: '#ff0000',
          },
        },
      },
    }),
  },
  variants: {},
  plugins: [
    require('../../src/index')({
      darkToRoot: false,
    }),
  ],
}
