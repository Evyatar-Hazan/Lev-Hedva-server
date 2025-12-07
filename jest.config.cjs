module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
