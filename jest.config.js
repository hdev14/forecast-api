const { resolve } = require('path')
const ROOT = resolve(__dirname)

module.exports = {
  rootDir: ROOT,
  displayName: 'Root Tests',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest'
}
