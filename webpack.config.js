const path = require('path');

module.exports = {
  entry: './dist/esm/index.js',
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'simpleUniswapSdk.js',
    library: 'simpleUniswapSdk',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  }
};