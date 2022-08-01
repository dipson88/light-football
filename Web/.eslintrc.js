module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ],
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        "ignoreVoid": true
      }
    ],
    'newline-before-return': 'warn',
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: 'if',
        next: '*'
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'if'
      }
    ]
  }
}
