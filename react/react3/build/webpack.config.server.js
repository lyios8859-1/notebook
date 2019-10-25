const path = require('path');

const resovePath = function (_path) {
  return path.join(__dirname, _path);
};
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'node', // 指定编译后的代码时候node环境
  entry: {
    app: resovePath('../src/server/App.js')
  },
  output: {
    filename: 'server-entry.js',
    path: resovePath('../dist'),
    publicPath: '/', // 应用的静态资源之前的路径 src:'/public/app.3434dfsas.js'
    libraryTarget: 'commonjs2' // umd cmd, commonjs等,表示编译的符合commonjs2规范
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
