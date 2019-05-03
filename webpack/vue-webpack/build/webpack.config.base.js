const path = require("path");
//const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 多线程处理
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const config = {
  // 指定入口文件，可以多个，这里的对象属性提供给打包输出的 [name] 使用是一样的
  entry: {
    index: path.join(__dirname, "../src/index.js")
  },
  output: {
    filename: "[name].bundle.[hash:8].js",
    // 输入的路径（绝对路径）
    path: path.join(__dirname, "../dist"),
    // 文件的引入的路径, 必须
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        //loader: "babel-loader",
        exclude: /node_modules/,
        use: ["happypack/loader?id=js"]
      },
      {
        test: /\.jsx$/,
        //loader: "babel-loader",
        use: ["happypack/loader?id=js"]
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
              // 低于这个limit就直接转成base64插入到style里，不然以name的方式命名存放
              // 单位时bit
              limit: 2048,
              name: "resources/images/[path][name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        // 字体图标啥的，跟图片分处理方式一样
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "resources/font/[path][name].[hash:8].[ext]"
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
      template: path.resolve(__dirname, "./template.html"),
      filename: "index.html",
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 移除属性的引号
        cache: true, // 表示内容变化的时候生成一个新的文件
        caseSensitive: false, //是否大小写敏感
        collapseWhitespace: true //是否去除空格
      }
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: "js",
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool - 2, // 个人不需要完全使用 cpu 进程
      //允许 HappyPack 输出日志
      verbose: true
    })
  ],
  optimization: {
    //优化
    splitChunks: {
      cacheGroups: {
        //缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
        commonjs: {
          name: "vender", //输出的名字（提出来的第三方库,所有的都打在一个文件中，vue,jauery等等）
          test: /\.js/, //通过条件找到要提取的文件
          chunks: "initial" //只对入口文件进行处理
        }
      }
    }
  },
  resolve: {
    //引入路径是不用写对应的后缀名
    extensions: [".js", ".vue", ".jsx", ".json"],
    //缩写扩展
    alias: {
      //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本,// 配置别名'vue$'，不然import 'vue'时，webpack找不到
      vue$: "vue/dist/vue.esm.js", // 'vue/dist/vue.common.js' for webpack 1
      //用@直接指引到src目录下，如：'./src/main'可以写成、'@/main'
      "@": path.resolve(__dirname, "./src")
    }
  }
};

module.exports = config;
