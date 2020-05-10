
/*eslint-disable*/
const { smart } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

module.exports = smart(baseConfig, {
  mode: 'production',
  devtool: false
});

