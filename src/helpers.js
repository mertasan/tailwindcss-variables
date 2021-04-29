const startsWith = require('lodash/startsWith')

const withRgb = (variable) => {
  return startsWith(variable, 'var') ? variable.replace(')', '-rgb)') : 'var(' + variable + '-rgb)'
}
const colorVariable = (variable) => {
  return function ({ opacityVariable, opacityValue }) {
    if (opacityValue !== undefined) {
      return `rgba(${withRgb(variable)}, ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `rgba(${withRgb(variable)}, var(${opacityVariable}, 1))`
    }
    return `rgb(${withRgb(variable)})`
  }
}
module.exports.colorVariable = colorVariable
