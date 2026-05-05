module.exports = {
  testResultsProcessor: "jest-junit",
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  reporters: [
    "default",
    "jest-junit"
  ],
  collectCoverage: true,
  coverageReporters: ["text", "lcov", "html"],
  verbose: true,
  coverageProvider: "v8",
  testTimeout: 10000
};