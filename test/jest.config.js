const { resolve } = require('path')
const ROOT = resolve(__dirname, '..')
const rootConfig = require(`${ROOT}/jest.config.js`)

module.exports = {
  ...rootConfig,
  ...{
    rootDir: ROOT,
    displayName: 'E2E Tests',
    setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
    testMatch: ['<rootDir>/test/**/*.test.ts']
  }
}
