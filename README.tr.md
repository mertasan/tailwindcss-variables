<p>
    <a href="https://github.com/mertasan/tailwindcss-variables/actions"><img src="https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/tests?label=tests" alt="Test Status"></a>
    <a href="https://github.com/mertasan/tailwindcss-variables/tree/master/examples"><img src="https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=examples" alt="Build Status"></a>
    <a href="https://www.npmjs.com/package/@mertasan/tailwindcss-variables"><img src="https://img.shields.io/npm/dt/@mertasan/tailwindcss-variables" alt="Total Downloads"></a>
    <a href="https://github.com/mertasan/tailwindcss-variables/releases"><img src="https://img.shields.io/npm/v/@mertasan/tailwindcss-variables.svg" alt="Latest Release"></a>
    <a href="https://github.com/mertasan/tailwindcss-variables/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-GPLv3-green.svg?label=license" alt="License"></a>
</p>

# Tailwind CSS Variables

Bu eklenti, tailwindcss için CSS değişkenlerini `tailwind.config.js` dosyası aracılığıyla kolayca yapılandırmaya
olanak sağlar.

Kullanım şekli, tailwindcss'in varsayılan yapılandırmaları ile benzer şekildedir. Dark Mode için ayrı değişken
grubu belirleyebilmek, plugin API aracılığıyla kendi eklentilerinize kolayca entegre edebilmek de mümkün.

## Öne çıkan özellikler

- Değişkenler, tailwindcss renklerini tanımlamak kadar basit.
- Değişkenleri `:root` ya da custom CSS seçicilere tanımlayabilirsiniz.
- Değişkenler iç içe geçmiş obje notasyonu (nested object notation) kullanılarak oluşturulabilir.
- Dark Mode için farklı değişkenler oluşturulabilir.
- Dark Mode değişkenleri, yapılandırmanızdaki `class` ya da `media` moduna göre otomatik tanımlanır.
- Yapılandırmadaki `darkMode` ayarı eğer `class` olarak belirtilmiş ise özel seçiciler tanımlanabilir.
- Plugin API aracılığıyla kendi eklentinizi oluştururken tema yapılandırması yapmanıza olanak sağlar.
- Değişkenler için prefix tanımlaması yapılabilir. (plugin API için faydalı)
- Değişkenler, yapılandırma dosyasında veya .css vb. stil dosyalarında kullanılabilir.
- Çoklu tema gibi gereksinimlerinizi ek bir eklentiye gerek kalmadan kendiniz yapılandırabilirsiniz!

## Dökümantasyonlar

| Dil | Dökümantasyon linki |
| --- | --- |
| English | [**Documentation**](./README.md) |
| Türkçe | Dokümantasyon |

## Versiyon Uyumluluğu
| Tailwind CSS | Paket |
|--------------|-------|
| 2.x          | 1.x   |
| 3.x          | 2.x   |

## Kurulum

```cli
npm install -D @mertasan/tailwindcss-variables
```

## Canlı önizleme
Basit bir örnek: https://play.tailwindcss.com/hCpcvnGsPx?file=config

## Basit Kullanım

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

### `class` modu ile

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

#### `darkToRoot` ve `darkSelector` ayarları ile

Eğer tailwindcss yapılandırmanızda `darkMode: 'class'` olarak tanımlıysa, eklentinin `darkToRoot` ve `darkSelector`
ayarlarını kullanarak özelleştirebilirsiniz.

| option       	| type   	| default 	| description                                                             	|
|--------------	|--------	|---------	|-------------------------------------------------------------------------	|
| darkSelector 	| string 	| .dark   	| Dark mode için kullanılan CSS seçici.                                   	|
| darkToRoot   	| bool   	| true    	| `darkSelector` ayarında tanımlanan seçici :root olarak mı kullanılıyor? 	|

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

### `media` modu ile

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

## Prefix Kullanımı

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

## İç içe geçmiş obje notasyonu (Nested)

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


## Key adlandırma kuralları

Değişken keyleri yalnızca belirli karakterlere sahip olabilir. Diğer karakterler otomatik olarak temizlenir.
Objelerde alt tire (_) kullanımı mümkün olduğundan, alt tireler de orta çizgiye (-) dönüştürülür.

Rule:
````jsregexp
/[^a-zA-Z0-9-.]+/gi
````

| öncesi                               | sonrası                           |
|--------------------------------------|-----------------------------------|
| hello[$&+,:;=?@#'<>-^*()%!]WORLD     | hello-WORLD                     	 |
| hello__world                       	 | hello-world   	                   |
| css_variables_for-tailwindcss   	    | css-variables-for-tailwindcss   	 |
| foo-bar-1.0   	                      | foo-bar-1\\.0   	                 |

İşte bir örnek:

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

## Yardımcı Fonksiyonlar (Helpers)

### `colorVariable()`

Renk değişkenlerini `colorVariable` helper fonksiyonunu kullanarak tanımlamanız halinde, renkleri `text-opacity` ya da `bg-opacity` gibi
ek classlar ile uyumlu hale getirmeniz mümkün.

```javascript
// tailwind.config.js

const colorVariable = require('@mertasan/tailwindcss-variables/colorVariable')

module.exports = {
  theme: {
    screens: false,
    colors: {
      primary: colorVariable('--colors-primary'), // HEX (3 haneli)
      secondary: colorVariable('var(--colors-secondary)'), // HEX (6 haneli)
      white: '#ffffff', // standart kullanım (output incelemesi için)
      blue: colorVariable('var(--colors-blue)'), // RGB
      red: {
        400: colorVariable('var(--colors-red-400)'), // RGBA
        500: colorVariable('var(--colors-red-500)'), // RGBA
        600: 'var(--colors-red-500)', // RGBA (colorVariable() yardımcısı kullanmadan)
      },
      gray: 'var(--colors-gray)', // HEX (6 haneli) (colorVariable() yardımcısı kullanmadan)
      green: 'var(--colors-green)', // RGB (colorVariable() yardımcısı kullanmadan)
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
    require('@mertasan/tailwindcss-variables'){
      colorVariables: true
    }
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

Eğer forceRGB `true` olarak tanımlanırsa ek değişkenler oluşturulmaz.

#### Öncesi

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
    require('@mertasan/tailwindcss-variables'){
      colorVariables: true,
    }
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

#### Sonrası

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
    require('@mertasan/tailwindcss-variables'){
      colorVariables: true,
      forceRGB: true,
    }
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


### colorVariable için extendColors

Değişkenler arasındaki renklerin her birisini `colorVariable('var(--colors-red)')` şeklinde kullanmak yerine,
renkleri `extendColors` kısmında tanımlayabilirsiniz.

**Örnek:**

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
    require('@mertasan/tailwindcss-variables'){
      colorVariables: true,
      extendColors: {
        blue: 'var(--colors-blue)',
        red: 'var(--colors-red)',
      }
    }
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


**2. Örnek - [forceRGB](#forcergb) ile birlikte kullanımı:**

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
    require('@mertasan/tailwindcss-variables'){
      colorVariables: true,
      forceRGB: true,
      extendColors: {
        blue: 'var(--colors-blue)',
        red: 'var(--colors-red)',
      }
    }
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

Varsayılan olarak, değişkenler `@tailwind base;` stillerine eklenir.
Eğer projenizin `css` dosyasına `@tailwind base;` stillerini dahil etmiyorsanız, `toBase` seçeneğini `false` durumuna getirebilirsiniz.
Bu durumda değişkenler `@tailwind components;` stillerine dahil edilecektir.

```js
//...
plugins: [
  require('@mertasan/tailwindcss-variables')({
    toBase: false, // varsayılan: true
  })
]
//...
```

- [tailwindcss.com - Functions and directives](https://tailwindcss.com/docs/functions-and-directives#tailwind)


## Kendi eklentileriniz için API örneği

- [Ayrıntılı açıklama](#gerçek-kullanım-örneği-detaylı)

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

### API Component helper

tailwindcss-variables plugin API'yi bileşenlerinizi kayıt etmek için de kullanabilirsiniz.

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

## Gerçek kullanım örneği (detaylı)

**Avantajları neler?**

Laravel için bir form oluşturucu (PHP) paketi oluşturduğunuzu hayal edin. Bu durumda özelleştirmeniz gereken
birçok stil olacağına eminim. Ancak en gerekli olan şeylerden bir tanesi renkler! Bileşenleri kendi belirlediğiniz
renklerle oluşturursunuz. Elbette bu renkler `vendor:publish` komutu ile kullanıcılar tarafından özelleştirilebilir ama
bunu herkes için daha basit hale getirebilirsiniz. Kullanıcılar renkleri kendileri yapılandırabilir, isterlerse
eklentinizi dark mode için yapılandırabilirler. Böylelikle, kullanıcılar bazı basit değişiklikler için
`.css` veya `.blade.php` dosyalarını özelleştirmek zorunda kalmazlar. Bu sayede eklentinizi güncel şablonlarıyla
birlikte kullanarak, gelecekteki versiyon güncellemelerine uyum sağlayabilirler. Bu açıklamayı okuduysanız eğer,
bu eklentininin ortaya çıkma nedenini artık biliyorsunuz demektir. :)


**Dezavantajları neler?**

Bir fikriniz varsa eğer, lütfen PR göndermekten çekinmeyin.

**Bu örnek ile ilgili kaynaklar:**

- [kaynak](https://github.com/mertasan/tailwindcss-variables/tree/master/examples/api-examples/readme-source)
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

Bu örnekteki gibi bir kurgu sayesinde, eklentinizin stilleri için, sizin ek .css dosyaları yayınlamanıza,
kullanan kişilerin ise paketlerinizi kullanabilmek için stil dosyaları derlemelerine gerek kalmayacak.


## Örnekler ve testler

Hem kullanım şekli konusunda yardımcı olması için, hem de sunulan tüm özellikleri test ederek
doğru çalıştığından emin olmak için örnekler hazırladım.


| Kaynak | Durum |
| --- | --- |
| [Örnekler](https://github.com/mertasan/tailwindcss-variables/tree/master/examples/examples) | ![Examples](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=examples)	|
| [Plugin API örnekleri](https://github.com/mertasan/tailwindcss-variables/tree/master/examples/api-examples) | ![API Examples](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/build?label=api-examples) |
| [Testler](https://github.com/mertasan/tailwindcss-variables/tree/master/__tests__) | ![Tests](https://img.shields.io/github/workflow/status/mertasan/tailwindcss-variables/tests?label=tests) |

> Örneklere ve testlere ait dosyalar pull-request, push, release vb. etkinliklerde otomatik olarak yeniden
> derlenmektedir. Bu nedenle, örnek dosyalarda `require(../index)` gibi dosya yolları kullanıldı.
> Örnekleri kullanacaksanız eğer, ilgili yerleri `require('@mertasan/tailwindcss-variables')` şeklinde değiştirmeniz gerekiyor.


## Yardım

Lütfen GitHub issues aracılığıyla tüm soru ve sorunlarınızı iletin. Size yardımcı olmaya çalışacağım.

## Katkı

Herhangi bir özelliği iyileştirir veya yeni özellikler eklerseniz eğer, lütfen pull-request göndermekten çekinmeyin.

## License

The GPL-3.0 License (GNU General Public License 3.0)

Please see License File for more information.
