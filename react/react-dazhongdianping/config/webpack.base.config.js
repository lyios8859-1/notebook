const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom'],
    index: path.join(__dirname, '../src/index.js'),
  },
  output: {
    filename: 'js/[name].[contenthash:8].bundle.js',
    path: path.join(__dirname, '../dist'),
    // publicPath: '/public' // ,开发webpack-dev-启动的目录也在该文件目录下,script标签中src的路径/static/js/index.9o34adfa.bundle.js
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.BannerPlugin('Copytihhy by Tomly@github.com'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].bundle.css'
    }),
    new CleanWebpackPlugin()
  ]
};
