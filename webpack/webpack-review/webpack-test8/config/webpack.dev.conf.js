const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.conf.js');

const devConfig = {
  mode: 'development', // production：生产环境（压缩代码），development|none：开发环境（不压缩代码）
  output: { // 编译打包后的输出文件信息
		// 打包后的文件中资源文件引用路径（比如src），一般是服务器指定的资源文件路径（CDN）最好区分一下开发环境和生产环境
		// publicPath: 'http://www.baidu.com',
		filename: 'js/[name].js', // 打包后的entry配置的入口文件名，在开发时入口开启热更替不能使用 [chunkhash] or [contenthash]  只能使用 [hash]
		chunkFilename: 'js/[name].chunk.js', // 非入口文件的文件名
	},
  // source-map： 会生成map文件 
  // inline-source-map：不会生成map文件，但是会在文件后面添加一个base64的字符串
  // cheap: 表示代码出错，代码表示那一行出错。如果没有cheap会精确到那一行那一列出错（非常耗费打包性能）
  // module： 表示代码出错不尽是自己的业务代码还包含了第三方库（loader）是否出错
  // eval: 打包速度最快的一种方式，不会产生map文件，eval方式处理代码（针对于复杂的代码不建议使用）
  devtool: 'cheap-module-eval-source-map', // 生成sourceMap文件，cheap-module-eval-source-map建议使用在开发环境，cheap-module-source-map建议使用在生产环境（一般不使用）
  devServer: {
    // webpackDevserver启动的服务在那个文件夹目录下
    contentBase: [path.resolve(__dirname, '../dist')],
    open: true, // 启动项目时会自动打开页面

    // 热更替
    /*
    如果配置 hotOnly: true,
    那么需要在入口文件中添加如下代码
    if (module.hot) {
      module.hot.accept();
    }
    反之如果配置 hotOnly: false, 或不配置，就不需要添加
    */
    hot: true, // 开启热更替
    hotOnly: true, // 开启热更替以后需要设置浏览器不刷新页面
  },
  module: {
    rules: [
      {
				test: /\.(s?css|styl|less)/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2, //配置css-loader 作用于样式文件中 @import 的样式资源都会重新通过postcss-loader.less-loader往上再依次处理 @import 引入的样式文件
							//modules: true这样配置以后,通过 import './index.less'; 方式全局部引入是没有作用的
							// modules: true, // css模块 应用import css from './index.less'这样局部引入; css.属性
						},
					},
					'less-loader',
					'postcss-loader' // 这个配合autoprefixer插件添加css前缀,在根目录下创建postcss.config.js
				]
			}
    ]
  },
  plugins: [
    // 热加载时直接返回更新文件名,而不是文件的id
    new webpack.NamedModulesPlugin(),
    // 热更新模块
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = merge(commonConfig, devConfig);