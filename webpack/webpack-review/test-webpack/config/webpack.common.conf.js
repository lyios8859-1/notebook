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
		new HtmlWebpackPlugin({
			template: './index.html',
			chunks: ['index'] // 打包后的文件中引入的入口的js文件，就是entry对象的属性名
		})
	],
}