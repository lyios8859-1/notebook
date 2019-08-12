const path = require("path");
// 模板
const HtmlWebPackPlugin = require("html-webpack-plugin");
// 拆分css样式的插件
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// 删除文件
const CleanWebpackPlugin = require("clean-webpack-plugin");

// 查看打包后的文件模块大小
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// 配置热更新
const webpack = require("webpack");

/**
    entry: '',  // 入口文件
    output: {},  // 打包出口文件
    module: {},    // 处理对应模块
    plugin: [],  // 对应的插件
    devServer: {},  // 开发服务器配置 
    mode: "development",

  */
module.exports = {
  mode: "development",
  entry: {
    // 打包后的文件名称
    index: "./src/index.js"
  },
  output: {
    // 添加hash可以防止文件缓存，每次都会生成4位的hash串
    filename: "js/bundle.[hash:8].js",
    path: path.resolve("dist") // 打包后的目录，必须是绝对路径
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|less)$/, // 解析css
        use: ["style-loader", "css-loader", "less-loader"] // 从右向左解析
        /* 
          也可以这样写，这种方式方便写一些配置参数
          use: [
              {loader: 'style-loader'},
              {loader: 'css-loader'}
          ]
        */
      }
    ]
  },
  // 提取公共代码 (打包时候使用)
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         // 抽离第三方插件
  //         test: /node_modules/, // 指定是node_modules下的第三方包
  //         chunks: "initial",
  //         name: "vendor", // 打包后的文件名，任意命名
  //         // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
  //         priority: 10
  //       },
  //       utils: {
  //         // 抽离自己写的公共代码，utils这个名字可以随意起
  //         chunks: "initial",
  //         name: "utils", // 任意命名
  //         minSize: 0 // 只要超出0字节就生成一个新包
  //       }
  //     }
  //   }
  // },
  plugins: [
    // 热更新，热更新不是刷新
    new webpack.HotModuleReplacementPlugin(),
    // 模板文件(这种多个 new 多文件开发 )
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"], // 对应关系,index.js对应的是index.html
      hash: true // 会在打包好的bundle.js后面加上hash串
    }),
    // new HtmlWebPackPlugin({
    //   template: "./src/login.html",
    //   filename: "login.html",
    //   chunks: ["login"], // 对应关系,login.js对应的是login.html
    //   hash: true // 会在打包好的bundle.js后面加上hash串
    // }),
    // 拆分后会把css文件放到dist目录下的css/style.css
    new ExtractTextWebpackPlugin("css/style.css"),
    // 打包前先清空
    new CleanWebpackPlugin(
      [path.join(__dirname, "dist")] //匹配删除的文件
      // {
      //   root: __dirname, // 根目录
      //   verbose: true, // 开启在控制台输出信息
      //   dry: true // 启用删除文件
      // }
    )

    // 在打包下查看打包的文件大小
    //new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // compress: true, // gzip压缩
    port: 8033,
    host: "127.0.0.1", // 默认是localhost
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    historyApiFallback: true
  },
  resolve: {
    // 别名
    alias: {
      "@": "./src/components/"
    },
    // 省略后缀
    extensions: [".js", ".jsx", ".json", ".css"]
  }
};

// // 处理图片 loader
// npm i file-loader url-loader -D
// // 页面 img 引用图片
// npm i html-withimg-loader -D
