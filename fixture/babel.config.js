const path = require("path");

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    // [
    //   "module-resolver",
    //   {
    //     root: "./src",
    //     cwd: "babelrc",
    //     extensions: [".ts", ".tsx", ".js", ".jsx"],
    //     alias: {
    //       "@shopify/flash-list": "../src",
    //     },
    //   },
    // ],
    "react-native-reanimated/plugin",
  ],
};
