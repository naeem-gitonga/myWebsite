module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/app/**/*.spec.{js,jsx,ts,tsx}',
    '<rootDir>/components/**/*.spec.{js,jsx,ts,tsx}',
    '<rootDir>/hooks/**/*.spec.{js,jsx,ts,tsx}',
    '<rootDir>/pages/**/*.spec.{js,jsx,ts,tsx}',
    '<rootDir>/types/**/*.spec.{js,jsx,ts,tsx}',
    '<rootDir>/utils/**/*.spec.{js,jsx,ts,tsx}',
  ],
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}', // Adjust these patterns to match your source files
    'components/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**', // Exclude node_modules
    '!**/vendor/**', // Exclude vendor directory, if applicable
  ],
  coverageDirectory: 'coverage',
};
