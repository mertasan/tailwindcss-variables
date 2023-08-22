const plugin = require('tailwindcss/plugin')
const isEmpty = require('lodash/isEmpty')
const isUndefined = require('lodash/isUndefined')
const api = require('./pluginApi')
const has = require('lodash/has')
const get = require('lodash/get')
const { convertColorVariables } = require('./helpers')

/**
 * @typedef pluginOptions
 * @property {Boolean} darkToRoot
 * @property {Boolean} useHost
 * @property {Object} extendColors
 * @property {Boolean} forceRGB
 * @property {Boolean} toBase
 * @property {Boolean} colorVariables
 * @property {String} variablePrefix
 * @property {String} darkSelector - @deprecated
 */

/**
 * @typedef  {Object} plugin
 * @property {function} withOptions
 */

module.exports = plugin.withOptions(
  /**
   * @param {pluginOptions} options
   */
  function (options) {
    return function ({ addBase, addComponents, theme, config }) {
      let variables = theme('variables', {})
      let darkVariables = theme('darkVariables', {})
      let toBase = get(options, 'toBase', true)
      if (!isEmpty(variables)) {
        let getVariables = api.variables(variables, options)
        toBase ? addBase(getVariables) : addComponents(getVariables)
      }

      if (isUndefined(options)) {
        options = {}
      }

      let [mode, darkSelector = get(options, 'darkSelector', '.dark') ?? '.dark'] = [].concat(
        config('darkMode', 'media')
      )

      options.darkSelector = darkSelector

      if (!isEmpty(darkVariables) && ['class', 'media'].includes(mode)) {
        let getDarkVariables = api.darkVariables(darkVariables, options, mode)
        toBase ? addBase(getDarkVariables) : addComponents(getDarkVariables)
      }
    }
  },
  (options) => ({
    theme: {
      extend: {
        colors: has(options, 'extendColors')
          ? convertColorVariables(options.extendColors, options.forceRGB ? options.forceRGB : false)
          : {},
      },
    },
  })
)
