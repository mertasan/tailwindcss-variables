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
