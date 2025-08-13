module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|@expo|expo|expo-router|@testing-library|react-native-reanimated|react-native-svg)/)",
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  globals: {
    __DEV__: true,
  },
};
