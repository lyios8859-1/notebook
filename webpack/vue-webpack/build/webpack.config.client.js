const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";
let devServer = {
  contentBase: path.join(__dirname, "../dist"),
  // compress: true,
  port: 9000,
  host: "127.0.0.1",
  overlay: true, // 如果代码出错，会在浏览器页面弹出“阴影层”。类似于 vue-cli 等脚手架
  open: true, // 打开浏览器
  hot: true
};

// @ts-ignore
let config = Object.create(null);
if (isDev) {
  console.log("正在开发中......");
  // 合并覆盖基本配置
  // @ts-ignore
  config = merge(baseConfig, {
    mode: "development",
    devtool: "#cheap-module-eval-source-map",
    module: {
      rules: [
        {
          test: /\.(styl|css)/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            "stylus-loader"
          ]
        }
      ]
    },
    // @ts-ignore
    devServer: devServer,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  });
} else {
  console.log("正在打包.....");
  const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
  const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
  const optimization = {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤 .min.js 结尾的不需要再打包
        include: /\.\/src/,
        cache: false,
        parallel: true, // 开启并行压缩，充分利用 CPU 快速压缩
        sourceMap: false,
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `debugger` 语句
            drop_debugger: true,
            // 删除所有的 `console` 语句
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  };
  config = merge(baseConfig, {
    mode: "production",
    entry: {
      index: path.join(__dirname, "../src/index.js"),
      vendor: ["vue"] // 提取出库文件， 比如 vue，react，jquery
    },
    output: {
      filename: "[name].bundle.[hash:8].js",
      path: path.join(__dirname, "../dist")
      // publicPath: "http://127.0.0.1:8000/dist/"
    },
    module: {
      rules: [
        {
          test: /\.(styl|css)/,
          use: [
            //"style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            "stylus-loader"
          ]
        }
      ]
    },
    optimization: optimization,
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].css",
        chunkFilename: "[id].css"
      })
    ]
  });
}

module.exports = config;
