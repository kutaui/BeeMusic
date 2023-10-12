/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  //clearMocks: true,
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      // Set the following to true to enable esModuleInterop in ts-jest
      // Useful to match your tsconfig.json configuration
      isolatedModules: true,
    },
  },
};
