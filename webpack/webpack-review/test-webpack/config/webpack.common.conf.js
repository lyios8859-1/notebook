const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: { // 入口文件程序
		index: './src/index.js'
	},
	output: { // 编译打包后的输出文件信息
		// 打包后的文件中资源文件引用路径（比如src），一般是服务器指定的资源文件路径（CDN）最好区分一下开发环境和生产环境
		// publicPath: 'http://www.baidu.com',
		// filename: 'js/[name].[hash:8].js', // 打包后的entry配置的入口文件名，在开发时入口开启热更替不能使用 [chunkhash] or [contenthash]  只能使用 [hash]
		// chunkFilename: 'js/[name].[chunkhash:8].js', // 非入口文件的文件名
		path: path.resolve(__dirname, '../dist') // 必须绝对路径
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/', //打包后文件文件输出目录
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png)/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[hash:8].[ext]',
							outputPath: 'images/', //打包后文件文件输出目录
							limit: 102400, //小于102400kb时，打包为base64格式;大于时打包为文件,引用的地方使用路径
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProgressPlugin(), // 进度条
		/**
		 * code-spliting webpack3 如下配置,webpack4已经废弃
		 * 方案一，分割代码配置
		 * 
		 * 1, 在入口entry中配置需要分割的第三方库
		 * vendor: ['vue', 'axios']
		 * 
		 * 2, 在入口plugins中配置需要分割的第三方库的chunk名与entry中的属性相同
		 * new webpack.optimize.CommonsChunkPlugin({
		      name: 'vendor',
		   }),
		 * 详解：
		 * 如下配置分割后的chunk名表示
		 * Webpack 大佬，在所有的 chunk 中，帮我找到依赖2次及以上的模块，然后移到 vendor 这个 chunk 里面，感激不尽。
			1, 所有的 chunk（ app.js 和 vendor.js ）中，app.js 和 vendor.js 都引用了 vue 和 axios
			2, 加起来2次，那把他们都移动到 vendor.js 里面。
			3, 最后，app.js 原本包含的 vue 和 axios 都移动到了 vendor.js 。

			方案二，自动分割代码配置，如果我们想把所有 node_modules 目录下的所有 .js 都自动分离到 vendor.js ，则需要用到 minChunks
			1, 不需要在entry配置指定那些第三方库
			entry: {
				// vendor: ['vue', 'axios'] // 删掉!
			},
			2, 直接在 plugins中配置
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: ({ resource }) => (
					resource &&
					resource.indexOf('node_modules') >= 0 &&
					resource.match(/\.js$/)
				),
			})
			详解：
			Webpack 大佬，如果你看见某些模块是来自 node_modules 目录的，并且名字是 .js 结尾的话，麻烦把他们都移到 vendor chunk 里去，如果 vendor chunk 不存在的话，就创建一个新的。
				1, 找到了，vue 和 axios 都来自 node_modules 并且是 JS 文件
				2, vendor chunk 不存在，那我就创建一个
				3, 把他们俩移动到 vendor chunk
		 */
		new HtmlWebpackPlugin({
			template: './index.html',
			// 如果采用了代码分割注意配置chunks: ['index']会引入不到分割的第三方模块
			// chunks: ['index'] // 打包后的文件中引入的入口的js文件，就是entry对象的属性名
    }),
    // 支持 PWA
	],
	optimization: {
		// 兼容老版本的contenthash打包后文件没有修改的不一致的问题, 或多生成一个带 runtime~ 的映射文件信息
		runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
		// 但是一些不需要TreeShaking的模块文件，需要在 package.json 中配置 
		// "sideEffects": ["@babel/polyfill", "*.css"]
		// 表示配置了 TreeShaking 了也不会对这里配置的文件做TreeShaking(比如：@babel/polyfill 和 .css 的文件是不需要TreeShaking，如果都需要TreeShaking操作就配置："sideEffects": false)
    /*
    没有使用TreeShaking前
    ! exports provided: add, minus 

    打包后出现这个表示TreeShaking作用了
    ! exports provided: add, minus 
    ! exports used: add 
    */
		// 如果配置 mode: 'production',是生产环境都不用配置了，已经内置了，但是这个"sideEffects": ["@babel/polyfill", "*.css"]还是需要配置的
		usedExports: true, // 表示导入的模块需要TreeShaking
		splitChunks: { // 表示对webpack对代码分割
			// async 只针对于异步引入的做代码分割，如 import(/* webpackChunkName: "lodash" */'lodash').then(({default: _}) => {});有效，对于同步引入的是不会做代码分割的， 如：import _ from 'lodash';
			// all 表示不管是异步还是同步引入都分割，但是需要在cacheGroups中配置
			// initial 表示只对同步的引入做分割
			// 对于同步引入的模块会到cacheGroups中判断一下
			chunks: 'async',
			minSize: 30000, // 针对于引入的模块或者库的文件内容大小，大于30kb就做代码分割，如果小于30kb会走配置cacheGroups中的default的配置（此时default不能配置为false）做代码分割成一个模块
			maxSize: 0,  // 如果打包的模块大于这里配置的数值，会再次做代码分割，（不过一般设置0（或者就不配置了）,没必要再次分割了）
			minChunks: 1, // 表示某个模块引入次数大于等于这里的设置的数值就做代码分割
			maxAsyncRequests: 5, // 表示同时加载的模块数量，如果同时加载的模块数大于这里设置的数值就不会做代码分割了
			maxInitialRequests: 3, // 表示入口文件加载的模块数，大于这里设置的就不会在做代码分割了
			automaticNameDelimiter: '~', // 如果不配置cacheGroups中的filename，默认使用 ～ 作文件名的连接符号， 
			name: true, // 表示打包生成的文件名使用cacheGrops中配置的文件名
			cacheGroups: {
				vendors: { // vendors 任意名
					test: /[\\/]node_modules[\\/]/, // 表示针对于 node_module 中需要引入的第三方模块
					priority: -10, // 表示模块同时满足多个test条件的话，打包的文件优先级会打包到那里去
					// filename: 'lib/vendors.min.js' // 打包出的文件名，这个文件不在前面指定的js下的，默认是vendors～模块.js, vendors是和对应的属性一致
					name: 'lib/vendors' // 打包后的文件名，这个文件是在前面指定的js下的
				},
				default: {
					minChunks: 2, // 表示某个模块引入次数大于等于这里的设置的数值就做代码分割
					priority: -20,
					reuseExistingChunk: true, //表示如果一个模块已经打包了，再次打包的时候就忽略不重复再次打包，直接使用之前打包的模块
					filename: 'common/common.min.js'
				}
			}
		}
	},
	// 表示打包后文件超过规定的文件大小不报警告
	performance: false
}