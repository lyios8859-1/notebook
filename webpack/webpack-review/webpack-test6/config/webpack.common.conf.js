const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: { // 入口文件程序
		index: './src/index.js'
	},
	output: { // 编译打包后的输出文件信息
		// 打包后的文件中资源文件引用路径（比如src），一般是服务器指定的资源文件路径（CDN）最好区分一下开发环境和生产环境
		// publicPath: 'http://www.baidu.com',
		filename: 'js/[name].[hash:8].js', // 在开发时入口开启热更替不能使用 [chunkhash] or [contenthash]  只能使用 [hash]
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
		new CleanWebpackPlugin({ // 清除之前打包的所有文件
			verbose: true, // 控制台打印日志
		}),
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
	],
	optimization: {
		splitChunks: { // 表示对webpack对代码分割
			// async 只针对于异步引入的做代码分割，如 import(/* webpackChunkName: "lodash" */'lodash').then(({default: _}) => {});有效，对于同步引入的是不会做代码分割的， 如：import _ from 'lodash';
			//all 表示不管是异步还是同步引入都分割，但是需要在cacheGroups中配置
			// initial 表示只对同步的引入做分割
			// 对于同步引入的模块会到cacheGroups中判断一下
			chunks: 'all',
			minSize: 30000, // 针对于引入的模块或者库的文件内容大小，大于30kb就做代码分割，如果是同步引入的模块配置cacheGroups中的default做分割成一个模块
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: { // vendors 任意名
					test: /[\\/]node_modules[\\/]/, // 表示针对于 node_module 中需要引入的第三方模块
					priority: -10,
					filename: 'lib/vendors.min.js' // 打包出的文件名，默认是vendors～模块.js, vendors是和对应的属性一致
				},
				default: false
			}
		}
	}
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all',
	// 		minSize: 30000,
	// 		minRemainingSize: 0,
	// 		maxSize: 0,
	// 		minChunks: 1,
	// 		maxAsyncRequests: 6,
	// 		maxInitialRequests: 4,
	// 		automaticNameDelimiter: '~',
	// 		automaticNameMaxLength: 30,
	// 		name: true,
	// 		cacheGroups: {
	// 			defaultVendors: {
	// 				test: /[\\/]node_modules[\\/]/, // 表示引入的库是否是node_module下的库
	// 				priority: -10
	// 			},
	// 			default: {
	// 				minChunks: 2,
	// 				priority: -20,
	// 				reuseExistingChunk: true
	// 			}
	// 		}
	// 	}
	// }
}