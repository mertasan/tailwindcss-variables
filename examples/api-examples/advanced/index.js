const plugin = require('tailwindcss/plugin')
const merge = require('lodash/merge')
const pluginThemes = require('./themes')
const pluginComponents = require('./components')
const variablesApi = require('../../../api')
// const variablesApi = require('@mertasan/tailwindcss-variables/api')

/**
 * @typedef  {Object} plugin
 * @property {function} withOptions
 */
module.exports = plugin.withOptions(
  function(options) {
    return function({ addComponents, theme, options, config }) {
      let pluginOptions = merge(
        {
          variablePrefix: '--prefix1',
          darkSelector: null, // default: .dark
          darkToRoot: false, // default: true ( :root.dark or .dark )
        },
        theme('myPlugin.variableOptions', {}),
      )

      let allThemes = pluginThemes(theme)

      addComponents(variablesApi.variables(merge(allThemes.themes, theme('variables', {})), pluginOptions))

      addComponents(variablesApi.darkVariables(merge(allThemes.darkThemes, theme('darkVariables', {})), pluginOptions, config('darkMode')))

      let allComponents = pluginComponents(theme)

      // Automatically register components via API.
      addComponents(variablesApi.getComponents('.form', allComponents))
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
