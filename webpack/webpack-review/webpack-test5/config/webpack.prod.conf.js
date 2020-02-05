const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production', // production：生产环境（压缩代码），development|none：开发环境（不压缩代码）
  entry: { // 入口文件程序
    index: './src/index.js'
  },
  output: { // 编译打包后的输出文件信息
    // 打包后的文件中资源文件引用路径（比如src），一般是服务器指定的资源文件路径（CDN）最好区分一下开发环境和生产环境
    // publicPath: 'http://www.baidu.com', 
    filename: 'js/[name].[hash:8].js', // 在开发时入口开启热更替不能使用 [chunkhash] or [contenthash]  只能使用 [hash]
    path: path.resolve(__dirname, '../dist') // 必须绝对路径
  },
  // source-map： 会生成map文件 
  // inline-source-map：不会生成map文件，但是会在文件后面添加一个base64的字符串
  // cheap: 表示代码出错，代码表示那一行出错。如果没有cheap会精确到那一行那一列出错（非常耗费打包性能）
  // module： 表示代码出错不尽是自己的业务代码还包含了第三方库（loader）是否出错
  // eval: 打包速度最快的一种方式，不会产生map文件，eval方式处理代码（针对于复杂的代码不建议使用）
  devtool: 'cheap-module-source-map', // 生成sourceMap文件，cheap-module-eval-source-map建议使用在开发环境，cheap-module-source-map建议使用在生产环境（一般不使用）
  // 生成环境不需要
  // devServer: {
  //   // webpackDevserver启动的服务在那个文件夹目录下
  //   contentBase: [path.resolve(__dirname, '../dist')],
  //   open: true, // 启动项目时会自动打开页面

  //   // 热更替
  //   hot: true, // 开启热更替
  //   hotOnly: true, // 开启热更替以后需要设置浏览器不刷新页面
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(s?css|styl|less)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, //配置css-loader 作用于样式文件中 @import 的样式资源都会重新通过postcss-loader.less-loader往上再依次处理 @import 引入的样式文件
              //modules: true这样配置以后,通过 import './index.less'; 方式全局部引入是没有作用的
              // modules: true, // css模块 应用import css from './index.less'这样局部引入; css.属性
            },
          },
          'less-loader',
          'postcss-loader' // 这个配合autoprefixer插件添加css前缀,在根目录下创建postcss.config.js
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/', //打包后文件文件输出目录
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/', //打包后文件文件输出目录
              limit: 102400, //小于102400kb时，打包为base64格式;大于时打包为文件,引用的地方使用路径
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(), // 进度条
    
    // 生产环境，不需要
    // // 热加载时直接返回更新文件名,而不是文件的id
    // new webpack.NamedModulesPlugin(),
    // // 热更新模块
    // new webpack.HotModuleReplacementPlugin(),
    
    new CleanWebpackPlugin({ // 清除之前打包的所有文件
      verbose: true, // 控制台打印日志
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['index'] // 打包后的文件中引入的入口的js文件，就是entry对象的属性名
    })
  ],
  // 生产环境已经内置了，不需要
  // optimization: {
  //   // 但是一些不需要TreeShaking的模块文件，需要在 package.json 中配置 
  //   // "sideEffects": ["@babel/polyfill", "*.css"]
  //   // 表示配置了 TreeShaking 了也不会对这里配置的文件做TreeShaking(比如：@babel/polyfill 和 .css 的文件是不需要TreeShaking，如果都需要TreeShaking操作就配置："sideEffects": false)
  //   /*
  //   没有使用TreeShaking前
  //   ! exports provided: add, minus 

  //   打包后出现这个表示TreeShaking作用了
  //   ! exports provided: add, minus 
  //   ! exports used: add 
  //   */
  //  // 如果配置 mode: 'production',是生产环境都不用配置了，已经内置了，但是这个"sideEffects": ["@babel/polyfill", "*.css"]还是需要配置的
  //   usedExports: true // 表示导入的模块需要TreeShaking
  // }
}