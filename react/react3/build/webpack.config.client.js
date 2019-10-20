const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const resovePath = function (_path) {
  return path.join(__dirname, _path);
};

const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    app: resovePath('../src/App.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: resovePath('../dist'),
    publicPath: '/public' // 应用的静态资源之前的路径 src:'/public/app.3434dfsas.js'
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html', // 生成的入口文件的名字，默认就是index.html
      template: resovePath('../tpl.html'), // 有时候，插件自动生成的html文件，并不是我们需要结构，我们需要给它指定一个模板，让插件根据我们给的模板生成html
      inject: 'body' // true, body, head, false----true:默认值，script标签位于html文件的 body 底部 body:同true head:插入的js文件位于head标签内 false:不插入生成的js文件，只生成一个纯html
    })
  ]
};

if (isDev) {
  config.devServer = {
    host: '0.0.0.0', // 任意方式访问,127.0.0.1 或 localhost:
    port: '8888',
    hot: true,
    overlay: { // 网页显示错误提示
      errors: true
    },
    contentBase: resovePath('../build'), // 就是 output.path 值一致, 其实可以不一样,如果一样,就把编译成生成dist目录删掉,否这开发环境启动会报找不到静态文件.如 src:'/public/app.3434dfsas.js'
    // historyApiFallback与publicPath 解决开发环境中 html 中的静态引入的路径不对问题, 如 src:'/public/app.3434dfsas.js'
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html' // 请求出错进入的页面
    }
  };
}

module.exports = config;
