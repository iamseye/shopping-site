module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['prettier'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-restricted-imports': [1],
        'import/prefer-default-export': 'off',
        'default-param-last': [1],
    },
};
