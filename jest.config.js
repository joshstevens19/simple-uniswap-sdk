module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/.*'],
  setupFilesAfterEnv: ['<rootDir>/src/jest/setup-jest.ts'],
  collectCoverage: true,
  verbose: true,
  coverageReporters: ['html'],
  coveragePathIgnorePatterns: ['<rootDir>/src/jest/*'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
