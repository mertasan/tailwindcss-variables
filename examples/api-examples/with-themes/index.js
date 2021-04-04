const plugin = require('tailwindcss/plugin')
const merge = require('lodash/merge')
const pluginThemes = require('./themes')
const variablesApi = require('../../../api')
// const variablesApi = require('tailwindcss-variables/api')

/**
 * @typedef  {Object} plugin
 * @property {function} withOptions
 */
module.exports = plugin.withOptions(
  function (options) {
    return function ({ addComponents, theme, options, config }) {
      let pluginOptions = merge(
        {
          variablePrefix: '--prefix1',
          darkSelector: null, // default: .dark
          darkToRoot: false, // DEFAULT => :root.dark or .dark
        },
        theme('myPlugin.variableOptions', {})
      )

      let allThemes = pluginThemes(theme)

      addComponents(variablesApi.variables(allThemes.themes, pluginOptions))

      addComponents(variablesApi.darkVariables(allThemes.darkThemes, pluginOptions, config('darkMode')))
    }
  },
  function (options) {
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
  }
)
