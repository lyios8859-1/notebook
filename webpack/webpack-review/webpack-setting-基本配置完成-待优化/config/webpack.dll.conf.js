const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    // 第三方模块
    // 方案一：都不拆分，把所有的第三哪方模块都打包到 vendors文件中
    // vendors: ['react', 'react-dom', 'react-router-dom', 'lodash']

    // 方案二：拆分一下
    lodash: ['lodash'],
    react: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'), // 必须绝对路径
    library: '[name]_[hash:8]' // 暴露出去的全局变量
  },
  plugins: [
    // 分析这个打包后的dll文件中的第三方库，把第三方库的信息存放到 [name].manifest.json 文件中
    new webpack.DllPlugin({
      name: '[name]_[hash:8]', // 这里配置的和output.library的属性值一致
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}