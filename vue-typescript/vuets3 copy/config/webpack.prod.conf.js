const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve (dir) {
  console.log('path: ', path.join(__dirname, '..', dir));
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/index.ts',
    lodash: ["lodash"], // 引入第三方库，如果需要全局使用：在plugins配置ProvidePlugin
    underscore: ["underscore"] 
    // vendor: ['underscore', 'lodash']
  },
  output: {
    path: resolve('dist'), // 必须是绝对路径
    filename: '[name].[hash:8].min.js',
    publicPath: '/' // 这里开发就不需要设置绝对路径了,否则 生成的js文件不会加载到index.html里
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: false, // true 编译就不检测typescript的语言但是这个没有意义, 所以就设置为fasle
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/,
        include: resolve('src')
      },
      { 
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: resolve('src')
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 需要自动注入的文件名称
      template: 'index.html', // 需要自动注入的模板的文件名称
      inject: true // 是否自动注入生成后的文件
    }),
    new webpack.ProvidePlugin({
      _: 'lodash', // 如何使用typescript 需要在vue-shims.d.ts中定义全局变量
      _underscore: "underscore"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: { // 对不同的文件做不同的处理
        // commonjs: { // 要针对js进行提取，所以叫commonjs
        //   name: 'vendor', //输出的名字（提出来的第三方库）
        //   test: /\.js/, // 通过条件找到要提取的文件
        //   chunks:'initial' // 只对入口文件进行处理
        // },
        // lodashjs: { // 要针对js进行提取，所以叫lodashjs
        //   name: 'lodash', //输出的名字（提出来的第三方库）
        //   test: /\.js/, // 通过条件找到要提取的文件
        //   chunks:'initial' // 只对入口文件进行处理
        // },
        // underscorejs: { // 要针对js进行提取，所以叫underscorejs
        //   name: 'underscore', //输出的名字（提出来的第三方库）
        //   test: /\.js/, // 通过条件找到要提取的文件
        //   chunks:'initial' // 只对入口文件进行处理
        // }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  devtool: 'cheap-module-eval-source-map' // 开发环境推荐： cheap-module-eval-source-map 生产环境推荐： cheap-module-source-map
}