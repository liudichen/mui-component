export default {
  esm: 'babel',
  cjs: 'babel',
  extraBabelPresets:[
    // '@babel/preset-env',
  ],
  extraBabelPlugins: [
    "@babel/plugin-transform-runtime",
  ]
};
