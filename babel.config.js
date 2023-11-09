module.exports = {
  plugins: [
    ['react-native-worklets-core/plugin'],
    ['react-native-reanimated/plugin', {globals: ['__scanOCR']}],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
