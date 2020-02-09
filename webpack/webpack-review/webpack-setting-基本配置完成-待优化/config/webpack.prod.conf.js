const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 此插件适合在生产环境使用，官方说了还没有实现热更替
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 这个压缩的代码如果产生的 map 定位错误文件是有问题的（暂时没有找到原因）
const TerserJSPlugin = require('terser-webpack-plugin');

// 最新的npm i -D uglifyjs-webpack-plugin@beta 才可以压缩 es6， 这个解决了 terser-webpack-plugin 的 bug
const UglifyESPlugin = require('uglifyjs-webpack-plugin');

// 使用 PWA
const WorkboxPlugin =  require('workbox-webpack-plugin');

const commonConfig = require('./webpack.common.conf.js');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

prodConfig = {
  mode: 'production', // production：生产环境（压缩代码），development|none：开发环境（不压缩代码）
  output: { // 编译打包后的输出文件信息
    // 打包后的文件中资源文件引用路径（比如src），一般是服务器指定的资源文件路径（CDN）最好区分一下开发环境和生产环境
    // publicPath: 'http://www.baidu.com',
    filename: 'js/[name].[contenthash:8].js', // 打包后的entry配置的入口文件名，在开发时入口开启热更替不能使用 [chunkhash] or [contenthash]  只能使用 [hash]
    chunkFilename: 'js/[name].[contenthash:8].js', // 非入口文件的文件名
  },
  // source-map： 会生成map文件 
  // inline-source-map：不会生成map文件，但是会在文件后面添加一个base64的字符串
  // cheap: 表示代码出错，代码表示那一行出错。如果没有cheap会精确到那一行那一列出错（非常耗费打包性能）
  // module： 表示代码出错不尽是自己的业务代码还包含了第三方库（loader）是否出错
  // eval: 打包速度最快的一种方式，不会产生map文件，eval方式处理代码（针对于复杂的代码不建议使用）
  devtool: 'cheap-module-source-map', // 生成sourceMap文件，cheap-module-eval-source-map建议使用在开发环境，cheap-module-source-map建议使用在生产环境（一般不使用）
  module: {
    rules: [
      {
        test: /\.(s?css|styl|less)/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
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
      }
    ]
  },
  // plugins: [new BundleAnalyzerPlugin()]
  plugins: [
    // 清除之前打包的所有文件
    new CleanWebpackPlugin({
      verbose: true, // 控制台打印日志
    }),
    // 提取 css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    // 压缩 css
    new OptimizeCSSAssetsPlugin({}),

    // 生产环境支持 PWA
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
  ],
  // optimization: {
  //   minimizer: [
  //     // 用terser-webpack-plugin替换掉uglifyjs-webpack-plugin解决uglifyjs不支持es6语法问题
  //     new TerserJSPlugin({
  //       parallel: true,
  //       sourceMap: true  // 这个生成的sourceMap在生产环境出错定位有问题。暂时没找到原因
  //     }),
  //   ]
  // },

  optimization: {
    minimizer: [
      // 压缩 js
      new UglifyESPlugin({ // 使用  npm i -D uglifyjs-webpack-plugin@beta  替换 terser-webpack-plugin 打包的生成的sourceMap 定位错误有bug ，使用 beta版本是为了可以打包 es6
        parallel: true,
        sourceMap: true, // 生成map文件
        // 多嵌套了一层
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
          }
        }
      })
    ]
  }
}

module.exports = merge(commonConfig, prodConfig);