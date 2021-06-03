const plugin = require('tailwindcss/plugin')
const isEmpty = require('lodash/isEmpty')
const api = require('./pluginApi')
const has = require('lodash/has')
const { convertColorVariables } = require('./helpers')

/**
 * @typedef  {Object} plugin
 * @property {function} withOptions
 */

module.exports = plugin.withOptions(
  function (options) {
    return function ({ addBase, theme, config }) {
      let darkMode = config('darkMode')
      let variables = theme('variables', {})
      let darkVariables = theme('darkVariables', {})
      if (!isEmpty(variables)) {
        addBase(api.variables(variables, options))
      }

      if (!isEmpty(darkVariables) && (darkMode === 'class' || darkMode === 'media')) {
        addBase(api.darkVariables(darkVariables, options, darkMode))
      }
    }
  },
  (options) => ({
    theme: {
      extend: {
        colors: has(options, 'extendColors') ? convertColorVariables(options.extendColors) : {},
      },
    },
  })
)
