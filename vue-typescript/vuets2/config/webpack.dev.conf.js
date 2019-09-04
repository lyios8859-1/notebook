const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // 引入vue-loader库
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config_build_assetsSubDirectory = 'static';
const config_dev_assetsSubDirectory = 'static';
const config_build_assetsRoot = path.resolve(__dirname, '../dist');
const config_build_assetsPublicPath = '/';
const config_dev_assetsPublicPath = '/';

function resolve(dir) {
  console.log('>path: ', path.join(__dirname, '..', dir));
  return path.join(__dirname, '..', dir);
}
function assetsPath(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config_build_assetsSubDirectory
    : config_dev_assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config_build_assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config_build_assetsPublicPath
      : config_dev_assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', 'ts', '.tsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'vue-tslint-loader',
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.(ts|tsx)$/,
        // enforce: 'pre',
        loader: 'tslint-loader',
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
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
  ]
};
