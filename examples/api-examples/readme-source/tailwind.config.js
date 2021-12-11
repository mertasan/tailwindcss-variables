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
  // plugins: [require('my-plugin')],
  plugins: [require('./index')],
}
