const merge = require('lodash/merge')
const fromPairs = require('lodash/fromPairs')
const toPairs = require('lodash/toPairs')
const assign = require('lodash/assign')
const entries = require('lodash/entries')
const indexOf = require('lodash/indexOf')
const isPlainObject = require('lodash/isPlainObject')
const hasOwn = require('lodash/has')
const _forEach = require('lodash/forEach')
const _replace = require('lodash/replace')
const startsWith = require('lodash/startsWith')
const trimStart = require('lodash/trimStart')
const trimEnd = require('lodash/trimEnd')
const get = require('lodash/get')

const setComponent = (component, modifier, options) => {
  return { [`${component}${modifier}`]: options }
}

const setVariable = (themeName, options) => {
  return { [`${themeName}`]: options }
}
const setDarkMediaVariable = (themeName, options) => {
  return {
    ['@media (prefers-color-scheme: dark)']: {
      [`${themeName}`]: options,
    },
  }
}

const flattenOptions = (options) => {
  return merge(
    {},
    ...toPairs(options).map(([keys, value]) => {
      const flattenValue = isPlainObject(value) ? flattenOptions(value) : value
      return fromPairs(keys.split(', ').map((key) => [key, flattenValue]))
    })
  )
}

const formatVariableKey = (key) => {
  if (key === 'DEFAULT') {
    return ''
  }
  key = key.toString()
  return key
    .replace(/_/g, '-')
    .replace(/[^a-zA-Z0-9-.]+/gi, '')
    .replace(/\./gi, '\\.')
    .replace('---', '--')
}

const splitVars = (source) => {
  let results = {}

  ;(function recurse(obj, current) {
    for (let key in obj) {
      let newKey = formatVariableKey(current ? current + '-' + key : key)
      if (indexOf(obj, key) && isPlainObject(obj[key])) {
        recurse(value, newKey)
      } else {
        results[newKey] = obj[key]
      }
    }
  })(source)
  return entries(results)
}

const parseVariables = (object, varPrefix) => {
  let newObject = {}
  let results = []

  function recurse(object, varPrefix) {
    for (let key in object) {
      let pre = _replace(varPrefix === undefined ? '' : varPrefix + '-', '---', '--')
      let formattedKey = formatVariableKey(key)
      if (hasOwn(object, key) && isPlainObject(object[key])) {
        newObject = recurse(object[key], formattedKey ? pre + formattedKey : pre.slice(0, -1))
      } else {
        newObject[formattedKey ? pre + formattedKey : pre.slice(0, -1)] = `${object[key]}`
      }
    }
    return newObject
  }

  _forEach(splitVars(recurse(object, '--' + varPrefix)), ([key, items]) => results.push([key, items]))
  return results
}

const RGBAtoRGB = (rgba) => {
  rgba = trimStart(rgba, 'rgba(')
  rgba = trimEnd(rgba, ')')
  return rgba.substring(0, rgba.lastIndexOf(','))
}

const getRGBKey = (key, forceRGB) => {
  if (forceRGB) {
    return key
  }
  if (key === 'DEFAULT') {
    return 'rgb'
  } else {
    return key + '-rgb'
  }
}

const hexToRGB = (key, h, forceRGB) => {
  if (startsWith(h, 'rgba')) {
    return [getRGBKey(key, forceRGB), RGBAtoRGB(h)]
  } else if (startsWith(h, 'rgb')) {
    h = trimStart(h, 'rgb(')
    h = trimEnd(h, ')')
    return [getRGBKey(key, forceRGB), h]
  } else if (!startsWith(h, '#')) {
    return [key, h]
  }

  let r = 0,
    g = 0,
    b = 0

  // 3 digits
  if (h.length === 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]

    // 6 digits
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }

  return [getRGBKey(key, forceRGB), '' + +r + ',' + +g + ',' + +b + '']
}

const setColorVariables = (source, forceRGB) => {
  return merge(
    source,
    ...toPairs(source).map(([keys, value]) => {
      const flattenValue = isPlainObject(value) ? setColorVariables(value, forceRGB) : value
      return fromPairs(keys.split(', ').map((key) => hexToRGB(key, flattenValue, forceRGB)))
    })
  )
}

const build = (options, source) => {
  let varPrefix = formatVariableKey(get(options, 'variablePrefix', ''))
  let colorVariables = get(options, 'colorVariables', false)
  let forceRGB = get(options, 'forceRGB', false)

  if (colorVariables) {
    source = setColorVariables(source, forceRGB)
  }
  if (!varPrefix) {
    varPrefix = ''
  }
  let componentOptions = {}
  _forEach(toPairs(flattenOptions(source)), ([key, config]) => {
    let block = key === 'DEFAULT' ? `:root` : `${key}`

    if (!hasOwn(componentOptions, block)) {
      componentOptions[block] = []
    }

    assign(componentOptions[block], parseVariables(config, varPrefix))
  })

  return componentOptions
}

const darkBuild = (options, darkMode, source) => {
  let varPrefix = formatVariableKey(get(options, 'variablePrefix', ''))
  if (!varPrefix) {
    varPrefix = ''
  }
  let colorVariables = get(options, 'colorVariables', false)
  let forceRGB = get(options, 'forceRGB', false)
  if (colorVariables) {
    source = setColorVariables(source, forceRGB)
  }
  let darkSelector = get(options, 'darkSelector', '.dark')
  if (!darkSelector) {
    darkSelector = '.dark'
  }
  let darkToRoot = hasOwn(options, 'darkToRoot') ? options.darkToRoot : true

  let componentOptions = {}

  _forEach(toPairs(flattenOptions(source)), ([key, config]) => {
    let block

    if (key === 'DEFAULT') {
      if (darkMode === 'class') {
        block = darkToRoot ? `:root${darkSelector}` : `${darkSelector}`
      } else {
        block = `:root`
      }
    } else {
      if (darkMode === 'class') {
        block = darkToRoot ? `:root${darkSelector} ${key}` : `${darkSelector} ${key}`
      } else {
        block = `${key}`
      }
    }

    if (!hasOwn(componentOptions, block)) {
      componentOptions[block] = []
    }

    assign(componentOptions[block], parseVariables(config, varPrefix))
  })

  return componentOptions
}

module.exports.build = build
module.exports.darkBuild = darkBuild
module.exports.flattenOptions = flattenOptions
module.exports.setComponent = setComponent
module.exports.setVariable = setVariable
module.exports.setDarkMediaVariable = setDarkMediaVariable
