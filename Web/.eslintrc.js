module.exports = {
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended'
  ],
  plugins: [
    '@typescript-eslint'
  ],
  env: {
    es2015: true,
    node: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-trailing-spaces': 'error',
    'space-before-function-paren': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-unreachable': 'error',
    'spaced-comment': 'error',
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': 1,
        'outerIIFEBody': 1,
        'MemberExpression': 1,
        'FunctionDeclaration': {
          'parameters': 1,
          'body': 1
        },
        'FunctionExpression': {
          'parameters': 1,
          'body': 1
        },
        'CallExpression': {
          'arguments': 1
        },
        'ArrayExpression': 1,
        'ObjectExpression': 1,
        'ImportDeclaration': 1,
        'flatTernaryExpressions': false,
        'ignoreComments': false,
        'ignoredNodes': [
          'TemplateLiteral *'
        ]
      }
    ],
    'keyword-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'no-console': 'off',
    'linebreak-style': 'off',
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'newline-before-return': 'warn',
    'padding-line-between-statements': [
      'warn',
      {
        'blankLine': 'always',
        'prev': 'if',
        'next': '*'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'if'
      }
    ]
  }
}
