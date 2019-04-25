const path = require("path");

const config = {
  entry: {
    index: path.join(__dirname, "../src/index.js")
  },
  output: {
    filename: "[name].bundle.[hash:8].js",
    path: path.join(__dirname, "../dist"),
    publicPath: "http://127.0.0.1:8080/dist/"
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
  }
};

module.exports = config;
