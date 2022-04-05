module.exports = {
    setupFilesAfterEnv: ["./jest.setup.js"],
    moduleNameMapper: {
        "^@/src/(.*)$": "<rootDir>/src/$1",
        "^~(.*)$": "<rootDir>/$1",
    },
    testEnvironment: "jsdom"
};
