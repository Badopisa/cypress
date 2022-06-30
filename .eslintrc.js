module.exports = {
    root: true, // Make sure eslint picks up the config at the root of the directory
    parserOptions: {
        ecmaVersion: 2021, // Use the latest ecmascript standard
        sourceType: 'module', // Allows using import/export statements
        ecmaFeatures: {
            jsx: true, // Enable JSX since we're using React
            tsx: true // Enable TypeScript since we're using React
        }
    },
    settings: {
        react: {
            version: 'detect' // Automatically detect the react version
        }
    },
    env: {
        browser: true, // Enables browser globals like window and document
        es6: true,
        amd: true, // Enables require() and define() as global variables as per the amd spec.
        node: true // Enables Node.js global variables and Node.js scoping.
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
        'plugin:react-hooks/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],

    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton']
            }
        ],
        'react/prop-types': [1, { ignore: [], customValidators: [], skipUndeclared: false }]
    },
    overrides: [
        {
            files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
            env: { browser: true, es6: true, node: true },
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:jsx-a11y/recommended',
                'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
                'plugin:react-hooks/recommended'
            ],
            globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
            parserOptions: {
                ecmaFeatures: { jsx: true, tsx: true },
                ecmaVersion: 'latest',
                sourceType: 'module'
            },
            plugins: ['react', 'jsx-a11y', 'react-hooks', 'prettier', '@typescript-eslint'],
            rules: {
                'linebreak-style': ['error', 'unix'],
                'quotes': ['error', 'single', { allowTemplateLiterals: true }],
                'prettier/prettier': ['error', {}, { usePrettierrc: true }],
                'react/react-in-jsx-scope': 'off',
                'jsx-a11y/no-static-element-interactions': 'off',
                'jsx-a11y/click-events-have-key-events': 'off',
                'no-case-declarations': 'off',
                'jsx-a11y/anchor-is-valid': [
                    'error',
                    {
                        components: ['Link'],
                        specialLink: ['hrefLeft', 'hrefRight'],
                        aspects: ['invalidHref', 'preferButton']
                    }
                ],
                'react/prop-types': [
                    1,
                    { ignore: [], customValidators: [], skipUndeclared: false }
                ],
                'react/display-name': 'off',
                'no-empty-pattern': 'off'
            },
            settings: { react: { version: 'detect' } }
        }
    ]
};
