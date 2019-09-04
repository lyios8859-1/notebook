const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // 引入vue-loader库
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist') // 输出的目录名称
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(css|less)$/,
        use: [
          // 'style-loader',
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/.vue$/] // 识别vue文件
        }
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
  devtool: 'inline-source-map'
};
