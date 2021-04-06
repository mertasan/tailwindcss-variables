module.exports = {
  theme: {
    myPlugin: {
      options: {
        colors: {
          primary: 'indigo',
        }
      }
    },
  },
  variants: {},
  // plugins: [require('my-plugin')],
  plugins: [require('./index')],
}
