const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
process.env.NODE_ENV = 'development';
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    port: 3000,
    overlay: true,
  }
});
