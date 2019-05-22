const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");
const isDev = process.env.NODE_ENV === "development";

let devServer = {
  // devserver启动服务的根路径
  contentBase: path.join(__dirname, "../dist"),
  // compress: true,
  port: 9000,
  host: "127.0.0.1",
  overlay: true, // 如果代码出错，会在浏览器页面弹出“阴影层”。类似于 vue-cli 等脚手架
  open: true, // 打开浏览器
  hot: true,
  overlay: true, // 如果代码出错，会在浏览器页面弹出“阴影层”。类似于 vue-cli 等脚手架
  // inline: false // 使用 iframe 显示相关的错误开发信息在页面
  proxy: {
    "/": {
      target: "http://127.0.0.1:8080/",
      changeOrigin: true
    }
  }
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
      // 启用模块热替换(HMR)
      new webpack.HotModuleReplacementPlugin(),
      // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
      new webpack.NamedModulesPlugin(),
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
      filename: "resources/js/[name].bundle.[hash:8].js",
      // 打包的存放路径
      path: path.join(__dirname, "../dist"),
      // 打包的静态文件 [index].html 中的文件引用路径（一般服务器的路径）
      publicPath: "http://127.0.0.1:8080/"
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
        filename: "resources/css/[name].bundle.[chunkhash:8].css",
        chunkFilename: "resources/css/[id].css"
      }),
      // 删除 output 中以前的的文件生成新的 dist 目录下所有文件， 2.0之后不用指定删除的文件路径参数了
      new CleanWebpackPlugin()
    ]
  });
}

module.exports = config;
