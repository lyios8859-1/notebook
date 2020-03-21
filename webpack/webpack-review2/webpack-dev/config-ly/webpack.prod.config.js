const { resolve } = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common.config.js');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(commonConfig, {
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.(less|css)$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  plugins: [
    // 清除之前打包的所有文件
    new CleanWebpackPlugin({
      verbose: true, // 控制台打印日志
    }),
    // 压缩 CSS
    new OptimizeCSSAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      }
    })
  ]
});