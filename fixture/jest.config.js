module.exports = {
  verbose: true,
  preset: "react-native",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/__tests__/**/*.(test|spec).(ts|tsx|js)"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!((jest-)?react-native(-flipper)?|@react-native(-community)?|@shopify/flash-list)/)",
  ],
  setupFiles: ["<rootDir>/setup.js"],
};
