
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

process.env.NODE_ENV = 'production';
module.exports = merge(baseConfig, {
  mode: 'production'
});
