/*eslint-disable*/
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = function (_path) {
  return path.resolve(__dirname, _path);
};

module.exports = {
  entry: {
    index: resolve('../src/main.ts')
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [resolve('../dist')]
    }),
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html')
    })
  ]
};

