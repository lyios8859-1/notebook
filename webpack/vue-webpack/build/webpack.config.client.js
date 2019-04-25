const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: "./template.html"
      })
    ]
  });
} else {
  console.log("正在打包.....");
  const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
  const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
  const CleanWebpackPlugin = require("clean-webpack-plugin");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  config = merge(baseConfig, {
    mode: "production",
    entry: {
      index: path.join(__dirname, "../src/index.js")
    },
    output: {
      filename: "[name].bundle.[hash:8].js",
      // 打包的存放路径
      path: path.join(__dirname, "../dist"),
      // 打包的静态文件 [index].html 中的文件引用路径（一般服务器的路径）
      publicPath: "http://127.0.0.1:8000/dist/"
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
    optimization: {
      minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].css",
        chunkFilename: "[id].css"
      }),
      // 删除 output 中以前的的文件生成新的 dist 目录下所有文件
      // @ts-ignore
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./template.html"
      })
    ]
  });
}

module.exports = config;
