module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['/node_modules/(?!vue-chartjs/legacy)'],
  collectCoverageFrom: [
    '<rootDir>/src/{components,utils}/**/*.{js,ts,vue}',
    '!<rootDir>/node_modules/'
  ]
}
