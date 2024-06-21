module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  collectCoverage: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "jest-environment-jsdom",
  setupFiles: [
    "./jest.setup.js"
  ],
  transform: {
    "^[^.]+.vue$": "@vue/vue2-jest",
    ".*\\.(js)$": "babel-jest"
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@vue/test-utils|@vue/vue2-jest)'
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.vue$': '<rootDir>/node_modules/@vue/vue2-jest'
  }
};
