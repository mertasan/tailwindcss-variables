const plugin = require('tailwindcss/plugin')
const merge = require('lodash/merge')
const has = require('lodash/has')
const isEmpty = require('lodash/isEmpty')
const api = require('./pluginApi')

/**
 * @typedef  {Object} plugin
 * @property {function} withOptions
 */
module.exports = plugin.withOptions(
  function (options) {
    return function ({ addComponents, theme, config }) {
      let darkMode = config('darkMode')
      let variables = merge(
        theme('variables', {}),
        has(options, 'theme.variables') ? (options.theme.variables(theme) ? options.theme.variables(theme) : {}) : {}
      )
      let darkVariables = merge(
        theme('darkVariables', {}),
        has(options, 'theme.darkVariables')
          ? options.theme.darkVariables(theme)
            ? options.theme.darkVariables(theme)
            : {}
          : {}
      )

      if (!isEmpty(variables)) {
        addComponents(api.variables(variables, options))
      }

      if (!isEmpty(darkVariables) && (darkMode === 'class' || darkMode === 'media')) {
        addComponents(api.darkVariables(darkVariables, options, darkMode))
      }
    }
  },
  function (options) {
    // return {
    //   theme: {
    //     variables: (theme) => ({}),
    //     darkVariables: (theme) => ({}),
    //   },
    // }
  }
)
