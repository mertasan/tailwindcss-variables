const startsWith = require('lodash/startsWith')
const mapValues = require('lodash/mapValues')
const isPlainObject = require('lodash/isPlainObject')

const withRgb = (variable, forceRGB) => {
  if (forceRGB) {
    return startsWith(variable, 'var') ? variable : 'var(' + variable + ')'
  }
  return startsWith(variable, 'var') ? variable.replace(')', '-rgb)') : 'var(' + variable + '-rgb)'
}

const colorVariable = (variable, forceRGB) => {
  return function ({ opacityVariable, opacityValue }) {
    if (opacityValue !== undefined) {
      return `rgba(${withRgb(variable, forceRGB)}, ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `rgba(${withRgb(variable, forceRGB)}, var(${opacityVariable}, 1))`
    }
    return `rgb(${withRgb(variable, forceRGB)})`
  }
}

const setColorVariable = (color) => {
  return startsWith(color, 'var') ? colorVariable(color, true) : color
}
const convertColorVariables = (colors) => {
  return mapValues(colors, (color) =>
    isPlainObject(color) ? mapValues(color, (subColor) => setColorVariable(subColor)) : setColorVariable(color)
  )
}

module.exports.colorVariable = colorVariable
module.exports.convertColorVariables = convertColorVariables
