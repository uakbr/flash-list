module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "./node_modules/react-native/packages/babel-plugin-codegen",
    [
      "module-resolver",
      {
        root: "./src",
        cwd: "babelrc",
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
          assets: "./src/assets",
        },
      },
    ],
  ],
};
