const startsWith = require('lodash/startsWith')
const mapValues = require('lodash/mapValues')
const isPlainObject = require('lodash/isPlainObject')
const includes = require('lodash/includes')

const withFallback = (variable, startsWithVar = false) => {
  if (includes(variable, ',')) {
    variable = variable.replace(',', '-rgb,')
    return startsWithVar ? variable : variable + ')'
  } else {
    return startsWithVar ? variable.replace(')', '-rgb)') : variable + '-rgb'
  }
}
const withRgb = (variable, forceRGB) => {
  if (forceRGB) {
    return startsWith(variable, 'var') ? variable : 'var(' + variable + ')'
  }
  return startsWith(variable, 'var') ? withFallback(variable, true) : 'var(' + withFallback(variable) + ')'
}

const colorVariable = (variable, forceRGB = false) => {
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

const setColorVariable = (color, forceRGB) => {
  return startsWith(color, 'var') ? colorVariable(color, forceRGB) : color
}
const convertColorVariables = (colors, forceRGB) => {
  return mapValues(colors, (color) =>
    isPlainObject(color)
      ? mapValues(color, (subColor) => setColorVariable(subColor, forceRGB))
      : setColorVariable(color, forceRGB)
  )
}

module.exports.colorVariable = colorVariable
module.exports.convertColorVariables = convertColorVariables
