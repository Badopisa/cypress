const nextJest = require('next/jest');
const { resolve } = require('path');
const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './'
});
// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        // Handle module aliases (this will be automatically configured for you soon)
        '^@/components/(.*)$': resolve(__dirname, './src/components/$1'),
        '^@/pages/(.*)$': resolve(__dirname, './src/pages/$1'),
        '^@/data/(.*)$': resolve(__dirname, './src/data/$1'),
        '^@/services/(.*)$': resolve(__dirname, './src/services/$1'),
        '^@/utils/(.*)$': resolve(__dirname, './src/utils/$1'),
        '^@/store/(.*)$': resolve(__dirname, './src/store/$1'),
        '^@/types/(.*)$': resolve(__dirname, './src/types/$1'),
        '^@/styles/(.*)$': resolve(__dirname, './src/styles/$1'),
        '^@/theme/(.*)$': resolve(__dirname, './src/theme/$1')
    },
    testEnvironment: 'jest-environment-jsdom'
};
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
