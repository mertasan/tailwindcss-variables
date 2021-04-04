module.exports = (theme) => ({
  themes: {
    DEFAULT: {
      colors: {
        primary: 'black',
        secondary: 'white',
        warning: 'indigo',
      },
    },
    '.admin': {
      colors: {
        primary: 'blue',
        secondary: 'green',
        warning: 'gray',
      },
    },
  },
  darkThemes: {
    DEFAULT: {
      colors: {
        primary: 'yellow',
        secondary: 'red',
        warning: 'purple',
      },
    },
    '.admin': {
      colors: {
        primary: 'green',
        secondary: 'orange',
        warning: 'teal',
      },
    },
  },
})
