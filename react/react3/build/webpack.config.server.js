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
    libraryTarget: 'commonjs2', // umd cmd, commonjs等,表示编译的符合commonjs2规范
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        // enforce: 'pre',表示在使用babel-loader编译之前先使用eslint-loader检查一下编码格式,通过则继续编译
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};
