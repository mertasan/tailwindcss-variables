const plugin = require('tailwindcss/plugin')
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
      let variables = theme('variables', {})
      let darkVariables = theme('darkVariables', {})
      // console.log(theme('variables', {}))
      // let darkVariables = merge(
      //   theme('darkVariables', {}),
      //   has(options, 'theme.darkVariables')
      //     ? options.theme.darkVariables(theme)
      //       ? options.theme.darkVariables(theme)
      //       : {}
      //     : {}
      // )

      if (!isEmpty(variables)) {
        addComponents(api.variables(variables, options))
      }

      if (!isEmpty(darkVariables) && (darkMode === 'class' || darkMode === 'media')) {
        addComponents(api.darkVariables(darkVariables, options, darkMode))
      }
    }
  },
  () => {}
)
