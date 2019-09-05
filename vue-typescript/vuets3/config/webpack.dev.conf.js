const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

function resolve (dir) {
  console.log('>>path: ', path.join(__dirname, '..', dir));
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/index.ts'
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
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  devtool: 'cheap-module-eval-source-map' // 开发环境推荐： cheap-module-eval-source-map 生产环境推荐： cheap-module-source-map
}