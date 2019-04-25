const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const config = {
  entry: {
    index: path.join(__dirname, "../src/index.js")
  },
  output: {
    filename: "[name].bundle.[hash:8].js",
    path: path.join(__dirname, "../dist"),
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
  plugins: [new VueLoaderPlugin()],
  resolve: {
    //引入路径是不用写对应的后缀名
    extensions: [".js", ".vue", ".json"],
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
