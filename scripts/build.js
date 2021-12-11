const fs = require('fs')
const postcss = require('postcss')
const tailwind = require('tailwindcss')

function buildDistFile(examplePath, message) {
  console.info('Building: ' + message + '...')

  let styleFilename = 'style'
  if (process.env.CLEAN) {
    styleFilename = 'clean'
  }
  return postcss([
    tailwind({
      ...require('../' + examplePath + '/tailwind.config'),
      content: ['./' + examplePath + '/*.html'],
    }),
    require('autoprefixer'),
  ])
    .process(['@tailwind base;', '@tailwind components;', '@tailwind utilities;'].join('\n'), {
      from: undefined,
      to: `./${examplePath}/${styleFilename}.css`,
      map: false,
    })
    .then((result) => {
      fs.writeFileSync(`./${examplePath}/${styleFilename}.css`, result.css)
      return result
    })
    .catch((error) => {
      console.log(error)
    })
}

console.info('Building...')

Promise.all([
  buildDistFile('examples/simple', 'Examples -> simple'),
  buildDistFile('examples/prefix', 'Examples -> prefix'),
  buildDistFile('examples/dark-custom-selector', 'Examples -> dark-custom-selector'),
  buildDistFile('examples/dark-with-class', 'Examples -> dark-with-class'),
  buildDistFile('examples/dark-with-class-to-root', 'Examples -> dark-with-class-to-root'),
  buildDistFile('examples/dark-with-media', 'Examples -> dark-with-media'),
  buildDistFile('examples/color-variable-helper', 'Examples -> color-variable-helper'),
]).then(() => {
  console.log('Finished building.')
})
