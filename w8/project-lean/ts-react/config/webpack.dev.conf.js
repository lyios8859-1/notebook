/*eslint-disable*/
const path = require('path');
const { smart } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

const resolve = function (_path) {
  return path.resolve(__dirname, _path);
};

module.exports = smart(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', 
  devServer: {
    contentBase: resolve('../dist'),
    open: true
  }
});
