const tailwind = require('tailwindcss')
const snapshotDiff = require('snapshot-diff')
const postcss = require('postcss')
const path = require('path')

module.exports = (contentFile) => {
  let utils = {}

  utils.run = (config = {}) => {
    return postcss([tailwind({ corePlugins: [], ...config })])
      .process(['@tailwind base;', '@tailwind components;', '@tailwind utilities;'].join('\n'), { from: undefined })
      .then((result) => result.css)
  }

  utils.diffOnly = async function(options = {}) {
    const [before, after] = await Promise.all([utils.run(), utils.run(options)])

    return `\n\n${snapshotDiff(before, after, {
      aAnnotation: '__REMOVE_ME__',
      bAnnotation: '__REMOVE_ME__',
      contextLines: 0,
    })
      .replace(/\n\n@@([^@@]*)@@/g, '') // Top level @@ signs
      .replace(/@@([^@@]*)@@/g, '\n---\n') // In between @@ signs
      .replace(/[-+] __REMOVE_ME__\n/g, '')
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

    let file = filename ? filename : contentFile

    return path.resolve(__dirname, '../' + path.parse(file).name + '.' + ext)
  }

  return utils
}
