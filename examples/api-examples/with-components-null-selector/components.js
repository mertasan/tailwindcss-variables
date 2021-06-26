module.exports = (theme) => ({
  '.select': {
    DEFAULT: {
      backgroundColor: 'var(--colors-prefix2-primary)',
    },
    multi: {
      '.default-multi': {
        backgroundColor: 'var(--prefix2-colors-secondary)',
      },
      '.other-multi': {
        backgroundColor: 'var(--prefix2-colors-warning)',
      },
    },
  },
})
