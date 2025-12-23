const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
  },
  collectCoverageFrom: [
      'components/**/*.{ts,tsx}',
      'utils/**/*.{ts,tsx}',
      'hooks/**/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
      '!**/.next/**',
    ],
  testMatch: ['**/**/tests/**/*.test.ts', '**/**/tests/**/*.test.tsx'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
};

module.exports = createJestConfig(customJestConfig);
