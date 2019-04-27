# Vue + Webpack4.x 开发配置

## webpack 的基本插件和开发服务的启动插件

```shell
npm i webpack webpack webpack-cli -D
npm i html-webpack-plugin -D
npm i webpack-dev-server webpack-merge -D
```

## 引入一些基本的 loader

### ES6+语法支持

> 依赖安装要求：webpack 4.x | babel-loader 7.x | babel 6.x,注意 babel-loader 和 babel 的版本，不然会报错.
> `babel-preset-env` 支持 ES6 众多语法，此时在根目录下配置 ES6 配置文件（.babelrc）

```shell
npm install -D babel-loader @babel/core babel-preset-env
```

### Vue 模板支持

> 每个 vue 包的新版本发布时，一个相应版本的 `vue-template-compiler` 也会随之发布。编译器的版本必须和基本的 vue 包保持同步，这样 `vue-loader` 就会生成兼容运行时的代码。这意味着你每次升级项目中的 vue 包时，也应该匹配升级 `vue-template-compiler`。

```shell
# vue-server-renderer 服务端渲染会用到
npm install -D vue-loader vue-template-compiler
```

### CSS 编译的支持

```shell
npm install -D style-loader css-loader stylus-loader
```

PS: 注意引入顺序
