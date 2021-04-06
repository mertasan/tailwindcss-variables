![Tests](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/tests?label=tests)
[![Build Status](https://img.shields.io/travis/mertasan/tailwindcss-variables/master.svg?label=travis-ci)](https://travis-ci.com/mertasan/tailwindcss-variables)
[![Examples](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=examples)](https://github.com/mertasan/tailwindcss-variables/tree/master/examples)
![Dependencies](https://status.david-dm.org/gh/mertasan/tailwindcss-variables.svg)
[![license](https://img.shields.io/badge/License-GPLv3-green.svg?label=license)](//github.com/mertasan/tailwindcss-variables/tree/master/LICENSE)

# Tailwindcss CSS Variables

This plugin allows you to configure CSS variables for tailwindcss by enabling the `tailwind.config.js` file.


How it works is similar to the tailwindcss' default configirations. It is also possible to define a different variable group for Dark Mode and to integrate it with your packages through plugin API. 


## Highlighted Features

- Variables are as easy as defining tailwindcss' colors...
- You can designate the variables to `:root` or custom CSS selectors.
- Variables can be formed through using nested object notation. 
- Different variables can be composed for the Dark Mode.
- Dark Mode variables are set automatically through the `class` or `media` modes on your configuration.
- If `darkMode` settings are set as `class`, custom selectors can be defined.
- Enables you to configure themes when you are creating your own plugin through Plugin API. 
- Prefix can be defined for variables. (Benefits the Plugin API)
- Variables can be used for the configuration file or .css like style files.
- You can configure your own needs such as multi-themes without needing an additional plugin! 


## Documentation

| Language | Documentation Link|
| --- | --- |
| English | [**Documentation**](./README.md) |
| Turkish | Dokümantasyon |

## Installation

```cli
npm install -D @mertasan/tailwindcss-variables
```

## Easy Accessibility 

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    colors: {
        red: {
            50: 'var(--colors-red-50)'
        }
    }
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
+
:root.dark .container {
  --colors-red-50: green
}
```

#### with the `darkToRoot` and `darkSelector` configurations

If the `darkMode:`configuration is set as `'class'` in your tailwindcss configuration, you can change and customize the `darkToRoot` and `darkSelector` settings.


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

## Using Prefixes

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
      variablPrefix: '--admin'
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

## Nested Object Notation

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    variables: {
      DEFAULT: {
        sizes: {
          small: '1rem',
          admin: {
            buttons: {
              colors: {
                red: {
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

**Output:**

```css
:root {
  --sizes-small: 1rem;
  --sizes-admin-buttons-colors-red-500: #ff0000;
  --sizes-admin-buttons-colors-red-600: #e60000
}
```


## Rules for Naming Keys

Variable keys can only include designated characters. Other characters will be automatically removed. Because using underscores (_) on objects is allowed, underscores will be transformed into middle dashes (-).


Rule:
````jsregexp
/[^a-zA-Z0-9\-]+/gi
````

| Before        | After |
|--------------	|--------	|
| hello[$&+,:;=?@#'<>.-^*()%!]world   | hello-world                     	|
| hello__world                       	| hello-world   	                  |
| css_variables_for-tailwindcss   	  | css-variables-for-tailwindcss   	|

Here's an example:
```javascript
// tailwind.config.js

module.exports = {
  theme: {
    variables: {
      DEFAULT: {
        colors: {
          'hello[$&+,:;=?@#|\'<>.-^*()%!]world': '100%',
          underscore_to_dash: '100%',
          'underscore_to_dash-with-dash': '100%',
          auto_dash: '100%',
        },
      },
      '[type=\'button\']': {
        'hello[$&+,:;=?@#|\'<>.-^*()%!]world': '100%',
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
  --colors-hello-world: 100%;
  --colors-underscore-to-dash: 100%;
  --colors-underscore-to-dash-with-dash: 100%;
  --colors-auto-dash: 100%
}

[type='button'] {
  --hello-world: 100%;
  --underscore-to-dash: 100%;
  --underscore-to-dash-with-dash: 100%;
  --auto-dash: 100%;
  --nested-auto-dash-color-primary: 100%
}
```

## API example for your own plugins

- [Detailed Explanation](#gerçek-kullanım-örneği-detaylı)

```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')
const variablesApi = require('@mertasan/tailwindcss-variables/api')

let variableOptions = {
  variablePrefix: '--myplugin'
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

### API Component Helper

You can also use tailwindcss-variables plugin API to save your components.

```javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')
const variablesApi = require('@mertasan/tailwindcss-variables/api')

let variableOptions = {
  variablePrefix: '--myplugin'
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

## Detailed Authentic Usage Example

**What are the advantages?**

Imagine you are creating a form builder (PHP) package for Laravel. In this case, I am sure there will be a lot of styles to customize. Nonetheless, one of the most necessary things is the colors! You'll develop the components with the colors you pick out. Of course these colors can be customized with the `vendor:publish` command but you can make it simpler for everyone. Users can customize the colors for their own likings and if they wish they can also configure your extension for the dark mode as well. This way, users don't have to alter the `.css` or `.blade.php` files for some small and simple customizations. Thus, they can use your extension with up to date templates and can adapt to future version updates. If you have read this statement, it means that now you know why this plugin came about. :)



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
  variants: {},
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

With a setup just like on this example, it won't be necessary to publish extra .css flies for your plugin styles and also, it won't be necessary for the users to sort out your style files to compile your packages. 



## Examples and Tests

I have prepared examples on both helping with the usage and for testing all of the features that's being offered to make sure it works just fine. 


| Source | State |
| --- | --- |
| [Examples](https://github.com/mertasan/tailwindcss-variables/tree/master/examples/examples) | ![Examples](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=examples)	|
| [Plugin API Examples](https://github.com/mertasan/tailwindcss-variables/tree/master/examples/api-examples) | ![API Examples](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=api-examples) |
| [Tests](https://github.com/mertasan/tailwindcss-variables/tree/master/__tests__) | ![Tests](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/tests?label=tests) |
| [Travis CI](https://travis-ci.com/mertasan/tailwindcss-variables) | ![Tests](https://img.shields.io/travis/mertasan/tailwindcss-variables/master.svg?label=travis-ci) |

> Documents on examples and tests are re-organized on pull-request, push, release and etc. activities.
> For this reason, file paths like `require(../index)` have been used on the example files. If you were to use the examples, you need to change the relevant interiors as `require('@mertasan/tailwindcss-variables')`.
> 


## Help

Please send any questions and issues through GitHub issues. I will try my best to help you.

## Contribution

If you are to improve or/and add new features, please feel free to send pull-requests.

## License

The GPL-3.0 License (GNU General Public License 3.0)

Please see License File for more information.
