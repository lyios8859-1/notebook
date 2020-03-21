const { resolve } = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

// MiniCssExtractPlugin 在开发时，对热更替不友好，判断一下，开发环境使用 style-loader
const miniCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // 默认使用 webpackOptions.output中的publicPath, 这里要指定，否则css中引入的css图片路径有问题
    publicPath: '../'
  },
}; 

const styleLoader = isDev ? 'style-loader' : miniCssLoader;

const commonCssLoader = [ 
  styleLoader,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  {
    // 使用这个 css 兼容，还需要在 package.json 中配置 "browserlist": {}
    /*
      "browserslist": {
        "development": [
          "last 2 version"
        ],
        "production": [
          "last 5 version",
          "> 0.5%",
          "maintained node versions",
          "not dead",
          "not op_mini all"
        ]
      }
    */
   loader: 'postcss-loader',
   options: {
     ident: 'postcss',
     plugins: () => [
       require('autoprefixer')()
     ]
   }
  }
];

const commonConfig = {
  mode: isDev ? 'development' : 'production',
  entry: {
    index: resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[id].[chunkhash:8].js',
    path: resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        // 编译编写的源码，第三方库排除
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          'presets': [
            [
              '@babel/preset-env', // 编译基本的es6语法
              {
                useBuiltIns: 'usage', // 按需引入兼容的实现的es6的一些浏览器不支持的方法，这样就不需要在入口文件引入 import "babel-polyfill"; 造成文件体积增大
                corejs: { version: 3  }, // 配合使用一些不兼容的es6的函数实现
                // targets: {"chrome": "67"} 这个配置放到package.json 中配置了 "browserslist":{}
              }
            ]
          ]
        }
      },
      {
        test: /\.css/,
        use: [...commonCssLoader]
      },
      {
        test: /\.less/,
        use: [
          ...commonCssLoader,
          'less-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024, // 1字节(Byte)=8位(bit),1千字节(KB)=1024字节(Byte)   10KB=10 * 1024Byte
          name: '[name].[hash:8].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name].[hash:8].[ext]',
          outputPath: 'media'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 50,
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts', //打包后文件文件输出目录
        }
      },
      {
        // 处理 html 中的 img 图片
        test: /\.html/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(), // 进度条
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV : isDev ? '"development"' : '"production"'
      }
    }),
    
  ]
};

// 生产环境下使用
if (!isDev) {
  commonConfig.plugins.push(
    // 这里的路径是相对于 output 中配置的 publicPath的
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css',
      
    })
  );
}

module.exports = commonConfig;