const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['lodash'], // 开发的组件依赖的第三方库不需要打包到一起
  /**
   * externals: {
   *    lodash: {
   *      commonjs: 'lodash', // 表示在 commonjs环境只能使用lodash 这个变量
   *      commonjs2: 'lodash',
   *      amd: 'lodash',
   *      root: '_', // 表示在 通过<script>引入环境只能使用 _ 这个变量
   *    },
   * },
   */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ly.min.js',  // 这个文件是其他开发者引入的，那么在 package.json 配置入口程序 main: './dist/ly.min.js'
    /**
     * 配置了
     * library: 'ly',
     * libraryTarget: 'umd',
     * 可支持多种方式引入
     * import ly from ‘ly.min’;
     * const ly = require('ly.min');
     * require(['ly.min'], function(){ });
     * <script src="ly.min.js"></script> 这样使用 ly.属性
     */
    library: 'ly', // 支持脚本引入（<script src=“main.min.js”>） ly 就会挂载到window上
    libraryTarget: 'umd', // 支持 import require
  }
}