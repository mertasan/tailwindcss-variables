const tailwind = require('tailwindcss')
const snapshotDiff = require('snapshot-diff')
const postcss = require('postcss')
const path = require('path')
const fs = require('fs')
const atImport = require('postcss-import')

module.exports = (contentFile) => {
  let utils = {}

  utils.run = function(config = {}, toBase = true) {
    let { currentTestName } = expect.getState()
    let filename = currentTestName + '.test.css'
    if (fs.existsSync(path.resolve(__dirname, '../' + filename))) {
      return this.runFromFile(filename, config)
    }

    return this.runInline(config, toBase)
  }

  utils.runInline = (config, toBase) => {
    let styles
    if (toBase) {
      styles = ['@tailwind base;', '@tailwind components;', '@tailwind utilities;']
    } else {
      styles = ['@tailwind components;', '@tailwind utilities;']
    }
    return postcss([tailwind({ corePlugins: [], ...config })])
      .process(styles.join('\n'), {
        from: undefined,
      })
      .then((result) => result.css)
  }

  utils.runFromFile = (filename, config) => {

    const css = fs.readFileSync(path.resolve(__dirname, '../' + filename), 'utf8')
    return postcss([tailwind({ corePlugins: [], ...config })])
      .use(atImport())
      .process(css, {
        from: path.resolve(__dirname, '../' + filename),
      })
      .then((result) => result.css)
  }

  utils.diffOnly = async function(options = {}, toBase = true) {
    const [before, after] = await Promise.all([utils.run({}, toBase), utils.run(options, toBase)])

    return `\n\n${snapshotDiff(before, after, {
      aAnnotation: '__REMOVE_ME__',
      bAnnotation: '__REMOVE_ME__',
      contextLines: 0,
    })
      .replace(/\n\n@@([^@@]*)@@/g, '') // Top level @@ signs
      .replace(/@@([^@@]*)@@/g, '\n---\n') // In between @@ signs
      .replace(/[-+] __REMOVE_ME__\n/g, '')
      .replace(/\+     /g, '+   ')
      // .replace(/\+ \}\n([\s]*)\+/g, '\+ \}\n$1\+')
      .replace(/\+(\s+?)\}\n(\s+?)\+/g, '\\+$1\\}')
      .replace(/Snapshot Diff:\n/g, '')
      .replace(/"/g, '\'')
      .split('\n')
      .map((line) => `  ${line}`)
      .join('\n')}\n\n`
  }

  utils.content = (filename, ext) => {
    if (!ext) {
      ext = 'html'
    }

    if (filename) {
      return path.resolve(__dirname, '../' + path.parse(filename).name + '.test.' + ext)
    } else {
      return path.resolve(__dirname, '../' + path.parse(contentFile).name + '.' + ext)
    }
  }

  return utils
}
