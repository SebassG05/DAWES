module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'jsx'],
    moduleDirectories: ['node_modules', 'src'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};