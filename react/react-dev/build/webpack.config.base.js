const path = require('path');
const resovePath = function (_path) {
  return path.join(__dirname, _path);
};
const isDev = process.env.NODE_ENV === 'development';
console.log("Environment: ", process.env.NODE_ENV);
module.exports = {
  mode: isDev ? 'development' : 'production',
  output: {
    path: resovePath('../dist'),
    publicPath: '/public' // 热更替必须配置,应用的静态资源之前的路径 src:'/public/app.3434dfsas.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',// 表示在使用babel-loader编译之前先使用eslint-loader检查一下编码格式,通过则继续编译
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
  },
};