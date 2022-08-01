module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-standard-vue/scss",
  ],
  rules: {
    'scss/no-global-function-names': null,
    'selector-class-pattern': null,
    'scss/at-import-partial-extension': null,
    'string-quotes': null,
    'color-function-notation': null,
    'alpha-value-notation': null
  }
}
