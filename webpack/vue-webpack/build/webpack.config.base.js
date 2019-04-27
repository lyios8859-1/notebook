const path = require("path");
//const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  // 指定入口文件，可以多个，这里的对象属性提供给打包输出的 [name] 使用是一样的
  entry: {
    index: path.join(__dirname, "../src/index.js")
  },
  output: {
    filename: "[name].bundle.[hash:8].js",
    // 输入的路径（绝对路径）
    path: path.join(__dirname, "../dist"),
    // 文件的引入的路径
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
        // 这一个loader当然是vue项目必须的加载器啦，不加其他规则的话，
        // 简单的这样引入就可以了，vue-loader会把vue单文件直接转成js。
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "resources/[path][name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 以当前目录的index.html为模板生成新的index.html，这个插件就是将新生成的文件（js,css）引入
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./template.html")
    })
  ],
  resolve: {
    //引入路径是不用写对应的后缀名
    extensions: [".js", ".vue", ".jsx", ".json"],
    //缩写扩展
    alias: {
      //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
      vue$: "vue/dist/vue.esm.js", // 'vue/dist/vue.common.js' for webpack 1
      //用@直接指引到src目录下，如：'./src/main'可以写成、'@/main'
      "@": path.resolve(__dirname, "./src")
    }
  }
};

module.exports = config;
