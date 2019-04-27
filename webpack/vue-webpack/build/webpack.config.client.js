const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");
const isDev = process.env.NODE_ENV === "development";
/**
知识点一：
  __dirname: 获取当前文件所在路径，等同于path.dirname(__filename)
  console.log(__dirname);  ==> /Users/Timly
  console.log(path.dirname(__filename));  ==> /Users/Timly

知识点二：
  path.resolve([..paths]): 把一个路径或路径片段的序列解析为一个绝对路径
1, 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径
2, 如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上
3, 生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录
4, 长度为零的 path 片段会被忽略
5, 如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('node6.9', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/Timly/node，
// 则返回 '/home/Timly/node/node6.9/static_files/gif/image.gif'
*/
let devServer = {
  // devserver启动服务的根路径
  contentBase: path.join(__dirname, "../dist"),
  // compress: true,
  port: 9000,
  host: "127.0.0.1",
  overlay: true, // 如果代码出错，会在浏览器页面弹出“阴影层”。类似于 vue-cli 等脚手架
  open: true, // 打开浏览器
  hot: true,
  inline: false // 使用 iframe 显示相关的错误开发信息在页面
};

let config = Object.create(null);
if (isDev) {
  console.log("正在开发中......");
  // 合并覆盖基本配置
  config = merge(baseConfig, {
    mode: "development",
    // source-map,将编译后的代码映射到原代码，便于报错后定位错误
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
      // 删除 output 中以前的的文件生成新的 dist 目录下所有文件， 2.0之后不用指定删除的文件路径参数了
      new CleanWebpackPlugin()
    ]
  });
}

module.exports = config;
