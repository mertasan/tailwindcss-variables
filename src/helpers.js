const startsWith = require('lodash/startsWith')

const colorVariable = (variable) => {
  return function ({ opacityVariable, opacityValue }) {
    variable = startsWith(variable, 'var') ? variable : 'var(' + variable + ')'
    if (opacityValue !== undefined) {
      return `rgba(${variable}, ${opacityValue})`
    }
    if (opacityVariable !== undefined) {
      return `rgba(${variable}, var(${opacityVariable}, 1))`
    }
    return `rgb(${variable})`
  }
}
module.exports.colorVariable = colorVariable
