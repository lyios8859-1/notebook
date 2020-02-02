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
  
如果需要使用指定版本这样操作`npm install webpack@4.16.5 webpack-cli -D` 安装指定版本webpack.

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
  mode: 'development', // development|none 配置在开发环境(不压缩代码), production 配置在生产环境(会压缩代码)
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

Chunk Names: main(每一个js文件对应的名

## 什么是loader

webpack默认识别.js结尾的文件,如果不是.js结尾的文件是不能识别的,只能通过配置loader来让webpack可以识别并处理.
