const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

const resovePath = function (_path) {
  return path.join(__dirname, _path);
};

module.exports = webpackMerge(baseConfig, {
  target: 'node', // 指定编译后的代码时候node环境
  entry: {
    app: resovePath('../src/server-entry-app.js')
  },
  // 不需要打包处理的模块(服务端是不需要的)
  // externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2', // umd cmd, commonjs等,表示编译的符合commonjs2规范
  }
});
