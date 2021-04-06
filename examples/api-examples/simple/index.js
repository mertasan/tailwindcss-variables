const plugin = require('tailwindcss/plugin')
const merge = require('lodash/merge')
const variablesApi = require('../../../api')
// const variablesApi = require('@mertasan/tailwindcss-variables/api')

/**
 * @typedef  {Object} plugin
 * @property {function} withOptions
 */
module.exports = plugin.withOptions(
  function(options) {
    return function({ addComponents, theme, options, config }) {

      const myVariables = {
        DEFAULT: {
          colors: {
            primary: 'black',
            secondary: 'white',
            warning: 'pink',
          },
        },
        '.admin': {
          colors: {
            primary: 'blue',
            secondary: 'green',
            warning: 'gray',
          },
        },
      }
      let pluginOptions = merge(
        {
          variablePrefix: '--prefix1',
          darkSelector: null, // default: .dark
          darkToRoot: false, // default: true ( :root.dark or .dark )
        },
        theme('myPlugin.variableOptions', {}),
      )

      addComponents(variablesApi.variables(merge(myVariables, theme('variables', {})), pluginOptions))

      myVariables.DEFAULT.colors.primary = 'yellow'
      addComponents(variablesApi.darkVariables(merge(myVariables, theme('darkVariables', {})), pluginOptions, config('darkMode')))

    }
  },
  function(options) {
    return {
      // darkMode: 'class', // or media
      theme: {
        myPlugin: (theme) => ({
          variableOptions: {
            variablePrefix: '--prefix2',
          },
        }),
      },
    }
  },
)
