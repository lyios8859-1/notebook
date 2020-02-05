const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.conf.js');

const devConfig = {
  mode: 'development', // production：生产环境（压缩代码），development|none：开发环境（不压缩代码）
  // source-map： 会生成map文件 
  // inline-source-map：不会生成map文件，但是会在文件后面添加一个base64的字符串
  // cheap: 表示代码出错，代码表示那一行出错。如果没有cheap会精确到那一行那一列出错（非常耗费打包性能）
  // module： 表示代码出错不尽是自己的业务代码还包含了第三方库（loader）是否出错
  // eval: 打包速度最快的一种方式，不会产生map文件，eval方式处理代码（针对于复杂的代码不建议使用）
  devtool: 'cheap-module-eval-source-map', // 生成sourceMap文件，cheap-module-eval-source-map建议使用在开发环境，cheap-module-source-map建议使用在生产环境（一般不使用）
  devServer: {
    // webpackDevserver启动的服务在那个文件夹目录下
    contentBase: [path.resolve(__dirname, '../dist')],
    open: true, // 启动项目时会自动打开页面

    // 热更替
    /*
    如果配置 hotOnly: true,
    那么需要在入口文件中添加如下代码
    if (module.hot) {
      module.hot.accept();
    }
    反之如果配置 hotOnly: false, 或不配置，就不需要添加
    */
    hot: true, // 开启热更替
    hotOnly: true, // 开启热更替以后需要设置浏览器不刷新页面
  },
  plugins: [
    // 热加载时直接返回更新文件名,而不是文件的id
    new webpack.NamedModulesPlugin(),
    // 热更新模块
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    // 但是一些不需要TreeShaking的模块文件，需要在 package.json 中配置 
    // "sideEffects": ["@babel/polyfill", "*.css"]
    // 表示配置了 TreeShaking 了也不会对这里配置的文件做TreeShaking(比如：@babel/polyfill 和 .css 的文件是不需要TreeShaking，如果都需要TreeShaking操作就配置："sideEffects": false)
    /*
    没有使用TreeShaking前
    ! exports provided: add, minus 

    打包后出现这个表示TreeShaking作用了
    ! exports provided: add, minus 
    ! exports used: add 
    */
   // 如果配置 mode: 'production',是生产环境都不用配置了，已经内置了，但是这个"sideEffects": ["@babel/polyfill", "*.css"]还是需要配置的
    usedExports: true // 表示导入的模块需要TreeShaking
  }
}

module.exports = merge(commonConfig, devConfig);