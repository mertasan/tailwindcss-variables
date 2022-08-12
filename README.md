<p>
    <a href="https://github.com/mertasan/tailwindcss-variables/actions"><img src="https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/tests?label=tests" alt="Test Status"></a>
    <a href="https://github.com/mertasan/tailwindcss-variables/tree/master/examples"><img src="https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=examples" alt="Build Status"></a>
    <a href="https://www.npmjs.com/package/@mertasan/tailwindcss-variables"><img src="https://img.shields.io/npm/dt/@mertasan/tailwindcss-variables" alt="Total Downloads"></a>
    <a href="https://github.com/mertasan/tailwindcss-variables/releases"><img src="https://img.shields.io/npm/v/@mertasan/tailwindcss-variables.svg" alt="Latest Release"></a>
    <a href="https://github.com/mertasan/tailwindcss-variables/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-GPLv3-green.svg?label=license" alt="License"></a>
</p>

# Tailwind CSS Variables

This plugin allows you to configure CSS variables in the `tailwind.config.js`

Similar to the tailwindcss configurations you are used to. It is also possible to define a different group of variables for Dark Mode. Alternatively, it has an API that you can use for your own plugins.


## Highlights

- Variables are as easy as defining tailwindcss colors...
- You can designate the variables to `:root` or custom CSS selectors.
- Variables can be formed through using nested object notation.
- Different variables can be composed for the Dark Mode.
- Dark Mode variables are set automatically through the `class` or `media` modes on your configuration.
- If `darkMode` config are set as `class`, custom dark selector can be defined.
- It allows you to add custom themes while creating your own plugin via the plugin API.
- Prefix can be defined for variables. (It is useful when using the plugin API)
- You can configure your own needs such as multi-themes without needing an additional plugin!


## Documentation

| Language | Documentation link|
| --- | --- |
| English | Documentation |
| Turkish | [**Dökümantasyon**](./README.tr.md) |

## Version Compatibility
| Tailwind CSS | Package |
|--------------|----------------|
| 2.x          | 1.x            |
| 3.x          | 2.x            |

## Installation

```cli
npm install -D @mertasan/tailwindcss-variables
```

## Playground
Simple example: https://play.tailwindcss.com/hCpcvnGsPx?file=config

## Usage

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    colors: {
        red: {
            50: 'var(--colors-red-50)'
        }
    },
    variables: {
      DEFAULT: {
        sizes: {
          small: '1rem',
          button: {
            size: '2rem'
          }
        },
        colors: {
          red: {
            50: '#ff3232',
          },
        },
      },
      '.container': {
        sizes: {
          medium: '1.5rem',
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')
  ]
}
```

**Output:**

```css
:root {
  --sizes-small: 1rem;
  --sizes-button-size: 2rem;
  --colors-red-50: #ff3232
}

.container {
  --sizes-medium: 1.5rem
}
```

## Dark Mode

### with the `class` mode

```javascript
// tailwind.config.js

module.exports = {

  darkMode: 'class',

  theme: {
    variables: {
      DEFAULT: {
        sizes: {
          small: '1rem',
        },
        colors: {
          red: {
            50: 'red',
          },
        },
      },
      '.container': {
        colors: {
          red: {
            50: 'indigo',
          },
        },
      },
    },
    darkVariables: {
      DEFAULT: {
        colors: {
          red: {
            50: 'blue',
          },
        },
      },
      '.container': {
        colors: {
          red: {
            50: 'green',
          },
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')
  ]
}
```

**Output:**

```css
:root {
  --sizes-small: 1rem;
  --colors-red-50: red
}

.container {
  --colors-red-50: indigo
}

:root.dark {
  --colors-red-50: blue
}

:root.dark .container {
  --colors-red-50: green
}
```

#### with the `darkToRoot` and `darkSelector` configurations

If the `darkMode`configuration is set as `'class'` in your tailwindcss configuration, you can change and customize the `darkToRoot` and `darkSelector` settings.


| Option       	| Type   	| Default 	| Description                                                             	|
|--------------	|--------	|---------	|-------------------------------------------------------------------------	|
| darkSelector 	| string 	| .dark   	| CSS selector used for Dark mode.                                  	|
| darkToRoot   	| bool   	| true    	| Does the selector defined as`darkSelector` being used as :root ?  	|

```javascript
// tailwind.config.js

module.exports = {

  darkMode: 'class',

  theme: {
    variables: {
      DEFAULT: {
        sizes: {
          small: '1rem',
        },
        colors: {
          red: {
            50: 'red',
          },
        },
      },
      '.container': {
        colors: {
          red: {
            50: 'indigo',
          },
        },
      },
    },
    darkVariables: {
      DEFAULT: {
        colors: {
          red: {
            50: 'blue',
          },
        },
      },
      '.container': {
        colors: {
          red: {
            50: 'green',
          },
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')({
      darkToRoot: false,
      darkSelector: '.custom-dark-selector',
    })
  ]
}
```

**Output:**

```css
:root {
    --sizes-small: 1rem;
    --colors-red-50: red
}

.container {
    --colors-red-50: indigo
}

.custom-dark-selector {
    --colors-red-50: blue
}

.custom-dark-selector .container {
    --colors-red-50: green
}
```

### with the `media` mode

```javascript
// tailwind.config.js

module.exports = {

  darkMode: 'media',

  theme: {
    variables: {
      DEFAULT: {
        sizes: {
          small: '1rem',
        },
        colors: {
          red: {
            50: 'red',
          },
        },
      },
      '.container': {
        colors: {
          red: {
            50: 'indigo',
          },
        },
      },
    },
    darkVariables: {
      DEFAULT: {
        colors: {
          red: {
            50: 'blue',
          },
        },
      },
      '.container': {
        colors: {
          red: {
            50: 'green',
          },
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')
  ]
}
```

**Output:**

```css
:root {
  --sizes-small: 1rem;
  --colors-red-50: red
}

.container {
    --colors-red-50: indigo
}

@media (prefers-color-scheme: dark) {
  :root {
    --colors-red-50: blue
  }

  .container {
    --colors-red-50: green
  }
}
```

## Prefix

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    variables: {
      DEFAULT: {
        sizes: {
          small: '1rem',
          button: {
            size: '2rem'
          }
        },
        colors: {
          red: {
            50: '#ff3232',
          },
        },
      },
      '.container': {
        sizes: {
          medium: '1.5rem',
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')({
      variablePrefix: 'admin'
    })
  ]
}
```

**Output:**

```css
:root {
  --admin-sizes-small: 1rem;
  --admin-sizes-button-size: 2rem;
  --admin-colors-red-50: #ff3232
}

.container {
    --admin-sizes-medium: 1.5rem
}
```

## Nested object notation

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    variables: {
      DEFAULT: {
        sizes: {
          DEFAULT: '1px',
          small: '1rem',
          admin: {
            DEFAULT: '2px',
            buttons: {
              colors: {
                red: {
                  DEFAULT: '#ffffff',
                  500: '#ff0000',
                  600: '#e60000',
                }
              }
            }
          }
        },
      }
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')
  ]
}
```

```css
:root {
  --sizes: 1px;
  --sizes-small: 1rem;
  --sizes-admin: 2px;
  --sizes-admin-buttons-colors-red-500: #ff0000;
  --sizes-admin-buttons-colors-red-600: #e60000;
  --sizes-admin-buttons-colors-red: #ffffff
}
```


## Rules for keys of variables

Variable keys can only include designated characters. Other characters will be automatically removed. Because using underscores (_) on objects is allowed, underscores will be transformed into middle dashes (-).


Rule:
````jsregexp
/[^a-zA-Z0-9-.]+/gi
````

| Before                               | After                             |
|--------------------------------------|-----------------------------------|
| hello[$&+,:;=?@#'<>-^*()%!]WORLD     | hello-WORLD                     	 |
| hello__world                       	 | hello-world   	                   |
| css_variables_for-tailwindcss   	    | css-variables-for-tailwindcss   	 |
| foo-bar-1.0   	                      | foo-bar-1\\.0   	                 |

Here's an example:
```javascript
// tailwind.config.js

module.exports = {
  theme: {
    variables: {
      DEFAULT: {
        colors: {
          'hello[$&+,:;=?@#|\'<>-^*()%!]WORLD': '100%',
          underscore_to_dash: '100%',
          'underscore_to_dash-with-dash': '100%',
          auto_dash: '100%',
        },
        sizes: {
          1.5: '1rem',
          xl: {
            '3.0': '2rem',
          },
        },
      },
      '[type=\'button\']': {
        'hello[$&+,:;=?@#|\'<>-^*()%!]WORLD': '100%',
        underscore_to_dash: '100%',
        'underscore_to_dash-with-dash': '100%',
        auto_dash: '100%',
        nested_auto_dash: {
          color_primary: '100%',
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')
  ]
}
```

**Output:**

```css
:root {
  --colors-hello-WORLD: 100%;
  --colors-underscore-to-dash: 100%;
  --colors-underscore-to-dash-with-dash: 100%;
  --colors-auto-dash: 100%;
  --sizes-1\.5: 1rem;
  --sizes-xl-3\.0: 2rem
}

[type='button'] {
  --hello-WORLD: 100%;
  --underscore-to-dash: 100%;
  --underscore-to-dash-with-dash: 100%;
  --auto-dash: 100%;
  --nested-auto-dash-color-primary: 100%
}
```

## Helpers

### `colorVariable()`

You can use the `colorVariable` helper to add `text-opacity` or `bg-opacity` to the variables for which colors are defined.


```javascript
// tailwind.config.js

const colorVariable = require('@mertasan/tailwindcss-variables/colorVariable')

module.exports = {
  theme: {
    screens: false,
    colors: {
      primary: colorVariable('--colors-primary'), // HEX (3 digits)
      secondary: colorVariable('var(--colors-secondary)'), // HEX (6 digits)
      white: '#ffffff', // no variable
      blue: colorVariable('var(--colors-blue)'), // RGB
      red: {
        400: colorVariable('var(--colors-red-400)'), // RGBA
        500: colorVariable('var(--colors-red-500)'), // RGBA
        600: 'var(--colors-red-500)', // RGBA (without using colorVariable() helper)
      },
      gray: 'var(--colors-gray)', // HEX (6 digits) (without using colorVariable() helper)
      green: 'var(--colors-green)', // RGB (without using colorVariable() helper)
    },
    variables: {
      DEFAULT: {
        colors: {
          primary: '#ff0',
          secondary: '#000000',
          gray: '#6B7280',
          blue: 'rgb(0,0,254)',
          red: {
            400: 'rgba(254,0,0,0.5)',
            500: 'rgba(254,0,0,1)',
          },
          green: 'rgb(0,255,0)',
        },
        sizes: {
          small: '10px',
          medium: '2rem',
          large: '100%',
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')({
      colorVariables: true
    })
  ]
}
```

**Purge:**

```html
<div class="text-primary text-opacity-50"></div>
<div class="bg-secondary bg-opacity-50"></div>
<div class="bg-gray bg-opacity-50"></div>
<div class="text-blue text-opacity-50"></div>
<div class="bg-red-400"></div>
<div class="bg-red-500"></div>
<div class="bg-red-600"></div>
<div class="bg-green bg-opacity-50"></div>
<div class="bg-white bg-opacity-50"></div>
```
**Output:**

```css
:root {
  --colors-primary: #ff0;
  --colors-secondary: #000000;
  --colors-gray: #6B7280;
  --colors-blue: rgb(0,0,254);
  --colors-red-400: rgba(254,0,0,0.5);
  --colors-red-500: rgba(254,0,0,1);
  --colors-red-400-rgb: 254,0,0;
  --colors-red-500-rgb: 254,0,0;
  --colors-green: rgb(0,255,0);
  --colors-primary-rgb: 255,255,0;
  --colors-secondary-rgb: 0,0,0;
  --colors-gray-rgb: 107,114,128;
  --colors-blue-rgb: 0,0,254;
  --colors-green-rgb: 0,255,0;
  --sizes-small: 10px;
  --sizes-medium: 2rem;
  --sizes-large: 100%
}

.text-primary {
 --tw-text-opacity: 1;
 color: rgba(var(--colors-primary-rgb), var(--tw-text-opacity))
}

.text-blue {
 --tw-text-opacity: 1;
 color: rgba(var(--colors-blue-rgb), var(--tw-text-opacity))
}

.text-opacity-50 {
 --tw-text-opacity: 0.5
}

.bg-secondary {
 --tw-bg-opacity: 1;
 background-color: rgba(var(--colors-secondary-rgb), var(--tw-bg-opacity))
}

.bg-white {
 --tw-bg-opacity: 1;
 background-color: rgba(255, 255, 255, var(--tw-bg-opacity))
}

.bg-red-400 {
 --tw-bg-opacity: 1;
 background-color: rgba(var(--colors-red-400-rgb), var(--tw-bg-opacity))
}

.bg-red-500 {
 --tw-bg-opacity: 1;
 background-color: rgba(var(--colors-red-500-rgb), var(--tw-bg-opacity))
}

.bg-red-600 {
  background-color: var(--colors-red-500)
}

.bg-gray {
 background-color: var(--colors-gray)
}

.bg-green {
 background-color: var(--colors-green)
}

.bg-opacity-50 {
 --tw-bg-opacity: 0.5
}
```



### forceRGB

If `forceRGB` is set to `true`, no additional variables are created.

#### Before

```javascript
// tailwind.config.js

const colorVariable = require('@mertasan/tailwindcss-variables/colorVariable')

module.exports = {
  theme: {
    screens: false,
    colors: {
      green: colorVariable('var(--colors-green)'),
    },
    variables: {
      DEFAULT: {
        colors: {
          green: '#11ff00',
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')({
      colorVariables: true,
    })
  ]
}
```

**Output:**

```css
:root {
  --colors-green: #11ff00;
  --colors-green-rgb: 17,255,0
}

.text-green {
  --tw-text-opacity: 1;
  color: rgba(var(--colors-green-rgb), var(--tw-text-opacity))
}
```

#### After

```javascript
// tailwind.config.js

const colorVariable = require('@mertasan/tailwindcss-variables/colorVariable')

module.exports = {
  theme: {
    screens: false,
    colors: {
      green: colorVariable('var(--colors-green)', true),
    },
    variables: {
      DEFAULT: {
        colors: {
          green: '#11ff00',
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')({
      colorVariables: true,
      forceRGB: true,
    })
  ]
}
```

**Output:**

```css
:root {
  --colors-green: 17,255,0;
}

.text-green {
  --tw-text-opacity: 1;
  color: rgba(var(--colors-green), var(--tw-text-opacity))
}
```


### extendColors for colorVariable

Instead of using each of the colors between the variables as `colorVariable('var(--colors-red)')`,
You can define colors in the `extendColors` option.

**Example:**

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    screens: false,
    colors: {
      white: '#fff',
      green: 'var(--colors-green)',
    },
    variables: {
      DEFAULT: {
        colors: {
          blue: '#0065ff',
          red: '#ff0000',
          green: '#11ff00',
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')({
      colorVariables: true,
      extendColors: {
        blue: 'var(--colors-blue)',
        red: 'var(--colors-red)',
      }
    })
  ]
}
```

**Output:**

```css
:root {
  --colors-blue: #0065ff;
  --colors-red: #ff0000;
  --colors-green: #11ff00;
  --colors-blue-rgb: 0,101,255;
  --colors-red-rgb: 255,0,0;
  --colors-green-rgb: 17,255,0
}

.text-white {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity))
}

.text-green {
  color: var(--colors-green)
}

.text-blue {
  --tw-text-opacity: 1;
  color: rgba(var(--colors-blue-rgb), var(--tw-text-opacity))
}

.text-red {
  --tw-text-opacity: 1;
  color: rgba(var(--colors-red-rgb), var(--tw-text-opacity))
}

.text-opacity-50 {
  --tw-text-opacity: 0.5
}
```


**Example 2 - Using with [forceRGB](#forcergb):**

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    screens: false,
    colors: {
      white: '#fff',
      green: 'var(--colors-green)',
    },
    variables: {
      DEFAULT: {
        colors: {
          blue: '#0065ff',
          red: '#ff0000',
          green: '#11ff00',
        },
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables')({
      colorVariables: true,
      forceRGB: true,
      extendColors: {
        blue: 'var(--colors-blue)',
        red: 'var(--colors-red)',
      }
    })
  ]
}
```

**Output:**

```css
:root {
  --colors-blue: 0,101,255;
  --colors-red: 255,0,0;
  --colors-green: 17,255,0
}

.text-white {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity))
}

.text-green {
  color: var(--colors-green)
}

.text-blue {
  --tw-text-opacity: 1;
  color: rgba(var(--colors-blue), var(--tw-text-opacity))
}

.text-red {
  --tw-text-opacity: 1;
  color: rgba(var(--colors-red), var(--tw-text-opacity))
}

.text-opacity-50 {
  --tw-text-opacity: 0.5
}
```

### toBase

By default, variables are added to `@tailwind base;` styles.
If you don't include `@tailwind base;` styles in your `css`, set the `toBase` option to `false`. In this case, the variables will be added to the `@tailwind components;` styles.

```js
//...
plugins: [
  require('@mertasan/tailwindcss-variables')({
    toBase: false, // default: true
  })
]
//...
```

- [tailwindcss.com - Functions and directives](https://tailwindcss.com/docs/functions-and-directives#tailwind)

## API example for your own plugins

- [Detailed Explanation](#gerçek-kullanım-örneği-detaylı)

```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')
const variablesApi = require('@mertasan/tailwindcss-variables/api')

let variableOptions = {
  variablePrefix: 'myplugin'
}

const pluginVariables = {
  DEFAULT: {
    colors: {
      primary: 'black',
      secondary: 'white',
      warning: 'orange',
    },
  },
}

const pluginDarkVariables = {
  DEFAULT: {
    colors: {
      primary: 'red',
      secondary: 'yellow',
      warning: 'green',
    },
  },
}

module.exports = {
  plugins: [
    plugin(function({ addComponents, config }) {

      addComponents(variablesApi.variables(pluginVariables, variableOptions))

      addComponents(variablesApi.darkVariables(pluginDarkVariables, variableOptions, config('darkMode'))) // darkMode: class

    })
  ]
}
```

**Output:**

```css
:root {
  --myplugin-colors-primary: black;
  --myplugin-colors-secondary: white;
  --myplugin-colors-warning: orange
}

:root.dark {
  --myplugin-colors-primary: red;
  --myplugin-colors-secondary: yellow;
  --myplugin-colors-warning: green
}
```

### API component helper

You can also use tailwindcss-variables plugin API to register your components.

```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')
const variablesApi = require('@mertasan/tailwindcss-variables/api')

let variableOptions = {
  variablePrefix: 'myplugin'
}

const pluginVariables = {
  DEFAULT: {
    colors: {
      primary: 'black',
      secondary: 'white',
      warning: 'orange',
    },
  },
}

const pluginDarkVariables = {
  DEFAULT: {
    colors: {
      primary: 'red',
      secondary: 'yellow',
      warning: 'green',
    },
  },
}

module.exports = {
  plugins: [
    plugin(function({ addComponents, config }) {
      const formComponents = {
        select: {
          DEFAULT: {
            backgroundColor: 'var(--myplugin-colors-primary)',
          },
          multi: {
            '&.default-multi': {
              backgroundColor: 'var(--myplugin-colors-secondary)',
            },
            '&.other-multi': {
              backgroundColor: 'var(--myplugin-colors-warning)',
            },
          },
        },
      }

      addComponents(variablesApi.variables(pluginVariables, variableOptions))

      addComponents(variablesApi.darkVariables(pluginDarkVariables, variableOptions, config('darkMode'))) // darkMode: class

      // Automatically register components via API.
      addComponents(variablesApi.getComponents('.form', formComponents))
    })
  ]
}
```

**Output:**
```css
:root {
  --myplugin-colors-primary: black;
  --myplugin-colors-secondary: white;
  --myplugin-colors-warning: orange;
}

:root.dark {
  --myplugin-colors-primary: red;
  --myplugin-colors-secondary: yellow;
  --myplugin-colors-warning: green;
}

.form-select {
    background-color: var(--myplugin-colors-primary);
}

.form-select.default-multi {
    background-color: var(--myplugin-colors-secondary);
}

.form-select.other-multi {
    background-color: var(--myplugin-colors-warning);
}
```

## Detailed example of the API

**What are the advantages?**

Imagine you are creating a form builder (PHP) package for Laravel. In this case, I am sure there will be a lot of styles to customize. Nonetheless, one of the most necessary things is the colors! You'll develop the components with the colors you pick out. Of course these colors can be customized with the `vendor:publish` command but you can make it simpler for everyone. Users can customize the colors for their own likings and if they wish they can also configure your plugin for the dark mode as well. This way, users don't have to alter the `.css` or `.blade.php` files for some small and simple customizations. Thus, they can use your package with up to date components and can adapt to future version updates. If you have read this statement, it means that now you know why this plugin came about. :)



**What are the disadvantages?**

If you have any ideas, please don't refrain to send a PR.

**Resources on this example:**

- [Source](https://github.com/mertasan/tailwindcss-variables/tree/master/examples/api-examples/readme-source)
- [test](https://github.com/mertasan/tailwindcss-variables/tree/master/__tests__/readme.test.js)

**Your own plugin themes:**
```javascript
// myplugin/themes.js
module.exports = (theme) => ({
  themes: {
    DEFAULT: {
      colors: {
        primary: 'black',
        secondary: 'white',
        warning: 'orange',
      },
    }
  }
})
```

**Your own plugin components:**
```javascript
// myplugin/components.js
module.exports = (theme) => ({
  select: {
    DEFAULT: {
      backgroundColor: 'var(--forms-colors-primary)',
    },
    multi: {
      '.default-multi': {
        backgroundColor: 'var(--forms-colors-secondary)',
      },
      '.other-multi': {
        backgroundColor: 'var(--forms-colors-warning)',
      },
    },
  },
})
```

**Your own plugin source:**
```javascript
// myplugin/index.js
const plugin = require('tailwindcss/plugin')
const _ = require('lodash')
const variablesApi = require('@mertasan/tailwindcss-variables/api')
const pluginComponents = require('./components')
const pluginThemes = require('./themes')

module.exports = plugin.withOptions(
  function (options) {
    return function ({addComponents, theme, config}) {

      let variableOptions = {
        variablePrefix: theme('myPlugin.prefix', 'forms')
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
```

**User config:** (`tailwind.config.js`)
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    myPlugin: {
      options: {
        colors: {
          primary: 'indigo', // custom color instead of default color
        }
      }
    },
  },
  plugins: [require('my-plugin')],
}
```

**Output:**
```css
:root {
  --forms-colors-primary: indigo; /* <<< default color changed via root configuration */
  --forms-colors-secondary: white;
  --forms-colors-warning: orange;
}

.form-select {
    background-color: var(--forms-colors-primary);
}

.form-select .default-multi {
    background-color: var(--forms-colors-secondary);
}

.form-select .other-multi {
    background-color: var(--forms-colors-warning);
}
```

Based on these examples, it won't be necessary to publish extra .css files for your plugin styles and also, it won't be necessary for the users to sort out your style files to compile your packages.



## Examples and tests

I have prepared examples on both helping with the usage and for testing all of the features that's being offered to make sure it works just fine.


| Source | State |
| --- | --- |
| [Examples](https://github.com/mertasan/tailwindcss-variables/tree/master/examples/examples) | ![Examples](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=examples)	|
| [Plugin API Examples](https://github.com/mertasan/tailwindcss-variables/tree/master/examples/api-examples) | ![API Examples](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=api-examples) |
| [Tests](https://github.com/mertasan/tailwindcss-variables/tree/master/__tests__) | ![Tests](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/tests?label=tests) |

> Documents on examples and tests are re-organized on pull-request, push, release and etc. events.
> For this reason, file paths like `require(../index)` have been used on the example files. If you were to use the examples, you need to change the relevant lines as `require('@mertasan/tailwindcss-variables')`.
>


## If You Need Help

Please send any questions and issues through GitHub issues. I will try my best to help you.

## Contribution

If you are to improve or/and add new features, please feel free to send pull-requests.

## License

The GPL-3.0 License (GNU General Public License 3.0)

Please see License File for more information.
