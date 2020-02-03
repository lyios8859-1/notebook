const path = require('path');

module.exports = {
  mode: 'development', // development：不会压缩代码
  entry: {
    index: './src/index.js'
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'), // 必须绝对路径
    filename: '[name].bundle.[chunkhash:8].js'
  }
};