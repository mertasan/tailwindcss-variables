module.exports = {
  content: ['./index.html'],
  corePlugins: process.env.CLEAN ? [] : {},
  darkMode: 'class',
  theme: {
    variables: (theme) => ({
      DEFAULT: {
        sizes: {
          small: '1rem',
          medium: '2rem',
          large: '3rem',
          '0.5': '2px',
          '1.0': {
            foo: '1rem',
            2.4: '2rem',
          },
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
  },
  plugins: [require('../../src/index')],
}
