const plugin = require('tailwindcss/plugin')
const _ = require('lodash')
const variablesApi = require('../../../api')
// const variablesApi = require('@mertasan/tailwindcss-variables/api')
const pluginComponents = require('./components')
const pluginThemes = require('./themes')

module.exports = plugin.withOptions(
  function (options) {
    return function ({addComponents, theme, config}) {

      let variableOptions = {
        variablePrefix: theme('myPlugin.prefix', '--forms')
      };

      addComponents(variablesApi.variables(_.merge(pluginThemes(theme).themes, {DEFAULT: theme('myPlugin.options', {})}), variableOptions))

      let darkVariables = theme('myPlugin.darkOptions', {});
      if (!_.isEmpty(darkVariables)) {
        addComponents(variablesApi.darkVariables(darkVariables, variableOptions, config('darkMode')))
      }

      // Automatically register components via API.
      addComponents(variablesApi.getComponents('.form', pluginComponents(theme)))

    }
  }
)
