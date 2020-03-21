const { resolve } = require('path');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common.config.js');


module.exports = merge(commonConfig, {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        // 编译编写的源码，第三方库排除
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          force: 'pre'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
    })
  ]
});