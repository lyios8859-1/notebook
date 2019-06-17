const path = require('path');
// const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: {
    main: './src/mycom.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    // publicPath: '/lib/',
    filename: '[name].min.js',
    library: 'ly',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
    ]
  }
}
