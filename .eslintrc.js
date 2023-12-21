module.exports = {
    root: true,

    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        tsconfigRootDir: __dirname,

        ecmaFeatures: {
            jsx: true,
            globalReturn: false,
        },

        project: [
            './tsconfig.json'
        ]
    },

    extends: [
        'eslint:recommended',
    ],

    plugins: [
        '@typescript-eslint'
    ],

    env: {
        es6: true,
        node: true,
        browser: true,
        amd: true
    },

    globals: {
        $: true,
        require: true,
        process: true
    },

    ignorePatterns: [
        'node_modules/**/*',
        'scripts/**/*',
        '.eslintrc.js',
    ],

    rules: {
        semi: [
            'warn',
            'always'
        ],

        'no-plusplus': 'off',
        'implicit-arrow-linebreak': 'off',
        'operator-linebreak': 'off',

        'arrow-body-style': 'off',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
        'function-paren-newline': 'off',
        'no-mixed-spaces-and-tabs': 'off',

        'eol-last': 'warn',

        'linebreak-style': [
            'error',
            'unix'
        ],


        'prefer-const': 'warn',

        'max-len': [
            'warn',
            {
                code: 125
            }
        ],

        indent: [
            'warn',
            4
        ],

        'dot-notation': 'warn',
        'no-continue': 'warn',
        'no-dupe-else-if': 'error',

        'block-spacing': [
            'error',
            'never'
        ],

        'no-spaced-func': 'error',

        'object-curly-spacing': [
            'error',
            'always'
        ],

        'no-trailing-spaces': [
            'error',
            {
                'ignoreComments': false
            }
        ],

        'quotes': [
            'warn',
            'single'
        ],

        'no-return-await': [
            'error'
        ]
    },
}
