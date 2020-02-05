const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.conf.js');


prodConfig = {
  mode: 'production', // production：生产环境（压缩代码），development|none：开发环境（不压缩代码）
  // source-map： 会生成map文件 
  // inline-source-map：不会生成map文件，但是会在文件后面添加一个base64的字符串
  // cheap: 表示代码出错，代码表示那一行出错。如果没有cheap会精确到那一行那一列出错（非常耗费打包性能）
  // module： 表示代码出错不尽是自己的业务代码还包含了第三方库（loader）是否出错
  // eval: 打包速度最快的一种方式，不会产生map文件，eval方式处理代码（针对于复杂的代码不建议使用）
  devtool: 'cheap-module-source-map', // 生成sourceMap文件，cheap-module-eval-source-map建议使用在开发环境，cheap-module-source-map建议使用在生产环境（一般不使用）
}

module.exports = merge(commonConfig, prodConfig);