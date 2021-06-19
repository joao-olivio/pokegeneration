module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: ["**/**/*.spec.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "src/**/*.vue",
    "!src/**/main.js",
    "!src/**/index.js",
    "!<rootDir>/node_modules/",
    "!<rootDir>/coverage/"
  ],
  moduleFileExtensions: ["js", "vue"],
  moduleNameMapper: {
    "^vue$": "vue/dist/vue.common.js"
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
};