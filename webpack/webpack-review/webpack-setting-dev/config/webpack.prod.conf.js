const path = require('path');

module.exports = {
  mode: 'production', // production：会压缩代码
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 必须绝对路径
    // filename: '[name].bundle.[chunkhash:8].js',
    filename: '[name].bundle.js',
    // pubicPath: path.resolve(__dirname, '../static')   // 打包后的路径（如：CND）
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'url-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'images/',
          limit: 2048  // 小于 2048kb 使用base64 大于就使用url-loader的特性处理
        }
      },
    ]
  }
};