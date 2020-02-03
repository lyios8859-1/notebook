const path = require('path');

module.exports = {
  entry: './src/index.js',// 入口文件程序
  output: { // 编译打包后的输出文件信息
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist') // 必须绝对路径
  },
  module: {
    rules: [
      {
        test: /\.(css|styl|scss|less)/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          //'postcss-loader' // 这个配合autoprefixer插件添加css前缀,在根目录下创建postcss.config.js
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('autoprefixer'), // 添加css前缀
                // require('precss'),
              ]),
            },
          },
        ]
      },
      {
        test: /\.jpe?g/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'assest/', //打包后文件文件输出目录
              limit: 102400, //小于102400kb时，打包为base64格式;大于时打包为文件,引用的地方使用路径
            }
          }
        ]
      }
    ]
  }
}