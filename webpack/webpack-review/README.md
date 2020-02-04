# webpack4

1, webpack助力前端开发的一个模块打包工具.

2, `npx`的会在运行时,到`node_modules/.bin`路径和环境变量`$PATH`里面,检查命令是否存在.

[参考](https://www.jianshu.com/p/b63cc830aaf3)

## 什么是模块打包工具

- webpack支持的模块方法：ES6、CommonJS、AMD、标签模块(Labeled Modules)、 webpack 特定方法.
- 模块规范：ES Module、CommonJS(Node.js使用该规范)、CMD(requireJS使用该规范)、AMD(SeaJS使用该规范).
- webpack 通过 loader 可以支持各种语言和预处理器编写模块.

## 安装

建议局部安装,这样每个项目如果webpack的版本不一样也不会有意外的错误出现.

1, 安装Node.js(webpack需要nodejs的支持).

- `npm init -y` 初始化一个项目.
- `npm install webpack webpack-cli -D`(项目内安装webpack).
  
如果需要使用指定版本这样操作`npm install webpack@4.16.5 webpack-cli --save-dev` 安装指定版本webpack.

2, `npx webpack -v` 检查当前项目webpack版本.

3, `npm info webpack` 查看webpack历史版本信息.

4, package.json配置信息：
`private: true || false`(防止意外发布私有库,如果你设置`"private": true`,npm就不会发布它.)
main属性值指向模块的入口程序.（一般模块默认为该文件下当前目录下的index.js文件）

## 项目中使用webpack

1, `npx webpack` 默认使用webpack.config.js文件进行打包,使用`npx webpack --config xxx.js`可以指定配置文件进行打包.

2, webpack打包的三种方式

- webpack 入口文件(index.js), 需要全局安装webpack
- npx webpack 入口文件(index.js), 局部安装webpack
- npm run build, 在package.json文件script中配置并指定webpack的处理文件

```js
const path = require('path');
module.exports = {
  // development|none 配置在开发环境(不压缩代码), production 配置在生产环境(会压缩代码)
  mode: 'development',
  entry: './src/index.js',// 入口文件程序
  output: { // 编译打包后的输出文件信息
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle') // 必须绝对路径
  }
}
```

```json
Hash: 09f836d6278f5500e6e3 (本次打包的hash)
Version: webpack 4.41.5  (本次打包的webpack版本)
Time: 166ms (本次打包的耗时)
Built at: 02/02/2020 3:28:51 PM
  Asset       Size  Chunks             Chunk Names
main.js  963 bytes       0  [emitted]  main
Entrypoint main = main.js (本次打包的后引用入口文件)
[0] ./src/index.js 34 bytes {0} [built]
```

Asset: main.js(打包出来的文件名)

Size: 963 bytes(打包出来的文件大小)

Chunks: 0(每一个js文件对应的ID)  [emitted]

Chunk Names: main(每一个js文件对应的名)

## 什么是loader

webpack默认识别.js结尾的文件,如果不是.js结尾的文件是不能识别的,只能通过配置相应的loader来让webpack可以识别并处理.

## loader 处理图片

url-loader 封装了 file-loader(file-loader处理为的是url路径)，但在文件大小（单位 byte）低于limit指定的限制时，会将图片转化为base64格式. url-loader 如果处理大于limit指定的限制时依赖file-loader, 字体图标打包用 file-loader

```bash
npm install --save-dev file-loader url-loader
```

```js
module: {
  rules: [
    {
      test: /\.jpe?g/,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'assest/', //打包后文件文件输出目录
            limit: 102400, //小于102400kb时,打包为base64格式到js文件中;大于时打包为文件,引用的地方使用路径
          }
        }
      ]
    }
  ]
}
```

## loader 处理CSS样式

1, 使用多个loader时, webpack遵循从右到左, 从下到上的顺序打包.

2, 样式加浏览器前缀可以使用postcss-loader中的autoprefixer插件.

css-loader 处理各个css文件中的css文件依赖,style-loader 负责把css样式插入到页面的style标签中

```bash
npm install --save-dev style-loader css-loader
```

## loader 处理 Less, Stylus, Sass样式的预处理

```bash
 npm install less less-loader --save-dev
```

## loader 处理CSS 样式添加前缀

```bash
 npm i postcss-loader autoprefixer
```

- 方案一的配置

```js
{
  test: /\.(css|styl|scss|less)/,
  use: [
    'style-loader',
    'css-loader',
    'less-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => ([
          require('autoprefixer'), // 添加css前缀
        ]),
      },
    }
  ]
},
```

- 方案二的配置, 需要在项目根目录下创建postcss.config.js文件

**postcss.config.js 配置内容**:

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

**webpack 配置内容**:

```js
{
  test: /\.(css|styl|scss|less)/,
  use: [
    'style-loader',
    'css-loader',
    'less-loader',
    'postcss-loader'
  ]
},
```

## css-loader的局部引入(modules: true)和多个样式文件中@import的文件处理(importLoaders: 2)

```js
{
  test: /\.(css|styl|scss|less)/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2, //配置css-loader 作用于样式文件中 @import 的样式资源都会重新通过postcss-loader.less-loader往上再依次处理 @import 引入的样式文件
        //modules: true这样配置以后,通过 import './index.less'; 方式全局部引入是没有作用的
        modules: true, // css模块 应用import css from './index.less'这样局部引入; css.属性
      },
    },
    'less-loader',
    'postcss-loader' // 这个配合autoprefixer插件添加css前缀,在根目录下创建postcss.config.js
  ]
}
```

PS: 配置`modules: true,`这个时候注意样式的作用情况

**例如**:

```js
import src from './1.jpeg';
import css from './index.less'; // 这样是局部引入
import './index.less'; // 这样是全局部引入是没有作用的
const img = new Image();
img.src = src;
img.classList.add(css.imgStyle); // 这个有样式作用
document.querySelector('#root').append(img);

const imgs = new Image();
imgs.src = src;
imgs.classList.add('imgStyle'); // 这个是没有样式作用的
document.querySelector('#root').append(imgs);
```

## loader 处理字体文件

```js
{
  test: /\.(eot|svg|ttf|woff)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        outputPath: 'assest/', //打包后文件文件输出目录
      }
    }
  ]
}
```


## plugins 自动模板处（html-webpack-plugin）

```bash
npm install --save-dev html-webpack-plugin
```

```js
plugins: [
    new webpack.ProgressPlugin(), // 进度条
    new CleanWebpackPlugin({
      verbose: true, // 控制台打印日志
    }), // 清除之前打包的所有文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['index'] // 打包后的文件中引入的入口的js文件，就是entry对象的属性名
    })
  ]
```

## sourceMap 处理

- source-map： 会生成map文件 
- inline：不会生成map文件，但是会在文件后面添加一个base64的字符串
- cheap: 表示代码出错，代码表示那一行出错。如果没有cheap会精确到那一行那一列出错（非常耗费打包性能）
- module： 表示代码不仅仅是自己的业务代码还包含了第三方库（loader）是否出错
- eval: 打包速度最快的一种方式，eval方式处理代码（针对于复杂的代码不建议使用）

PS：需要组合使用

```js
devtool: 'cheap-module-eval-source-map'
```

PS：`cheap-module-eval-source-map`建议使用在开发环境，`cheap-module-source-map`建议使用在生产环境（一般不使用）

## webpack-dev-server

```bash
npm install --save-dev webpack-dev-server
```

```json
"dev": "webpack-dev-server --config config/webpack.prod.config.js"
```

```js
devServer: {
  // webpackDevserver启动的服务在那个文件夹目录下
  contentBase: [path.resolve(__dirname, '../dist')],
  open: true, // 启动项目时会自动打开页面
}
```

## 热更替

表示页面不重新刷新，只是某个文件发生变化做变化处理

```js
devServer: {
  // 热更替
  hot: true, // 开启热更替
  hotOnly: true, // 开启热更替以后需要设置浏览器不刷新页面
  // Other Code ...
},
plugins: [
  // 热加载时直接返回更新文件名,而不是文件的id
  new webpack.NamedModulesPlugin(),
  // 热更新模块
  new webpack.HotModuleReplacementPlugin(),

  // Other Code ...
]
```


