const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    publicPath: '/', // 热更新，必须加 publicPath
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/transform-runtime']
          }
        }
      }, {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html', // 生成的入口文件的名字，默认就是index.html
      template: './tpl.html', // 有时候，插件自动生成的html文件，并不是我们需要结构，我们需要给它指定一个模板，让插件根据我们给的模板生成html
      inject: 'body' // 有四个选项值 true, body, head, false----true:默认值，script标签位于html文件的 body 底部 body:同true head:插入的js文件位于head标签内 false:不插入生成的js文件，只生成一个纯html
    }),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8888,
    open: true, // 自动拉起浏览器
    hot: true, // 自动刷新 (只用页面刷新吧)
  }
};

// 但是通过日志发现页面先热更新然后又自动刷新，这和自动刷新是一样的。
// 如果只需要触发HMR，可以再加个参数hotOnly:true,这时候只有热更新，禁用了自动刷新功能。
// 如果需要自动刷新就不需要设置热更新。

// 热跟新必须有以下5点：
// 1.引入webpack
// 2.output里加publicPath
// 3.devServer中增加hot:true
// 4.devServer中增加hotOnly:true
// 5.在plugins中配置 new webpack.HotModuleReplacementPlugin()
