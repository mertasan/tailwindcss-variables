const fromPairs = require('lodash/fromPairs')
const toPairs = require('lodash/toPairs')
const merge = require('lodash/merge')
const isEmpty = require('lodash/isEmpty')
const _forEach = require('lodash/forEach')
const { setVariable, setDarkMediaVariable, setComponent, build, darkBuild, flattenOptions } = require('./utils')

const variables = (variables, options) => {
  let variableList = {}
  let data = build(options, variables)

  _forEach(data, (value, key) => merge(variableList, setVariable(key, fromPairs(value))))

  return variableList
}

const darkVariables = (variables, options, darkMode) => {
  let variableList = {}

  if (darkMode === 'class' || darkMode === 'media') {
    let data = darkBuild(options, darkMode, variables)
    _forEach(data, (value, key) =>
      merge(
        variableList,
        darkMode === 'media' ? setDarkMediaVariable(key, fromPairs(value)) : setVariable(key, fromPairs(value))
      )
    )
  }

  return variableList
}

const getComponents = (selector, components) => {
  let componentList = {}
  selector = isEmpty(selector) ? '' : selector
  toPairs(flattenOptions(components)).forEach(([key, config]) => {
    const modifier = key === 'DEFAULT' ? '' : isEmpty(selector) ? `${key}` : `-${key}`
    toPairs(config)
      .filter(([, options]) => !isEmpty(options))
      .forEach(([subKey, options]) => merge(componentList, setComponent(selector, modifier, options)))
  })

  return componentList
}
module.exports.getComponents = getComponents
module.exports.variables = variables
module.exports.darkVariables = darkVariables
