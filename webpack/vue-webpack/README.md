# Vue + Webpack4.x 开发配置

- 知识点一：

> __dirname: 获取当前文件所在路径，等同于path.dirname(__filename)
  
```javascript
  console.log(__dirname); // print: /Users/Timly
  console.log(path.dirname(__filename)); // print: /Users/Timly
```

- 知识点二：

> path.resolve([..paths]): 把一个路径或路径片段的序列解析为一个绝对路径

1、给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径
2、如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上
3、生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录
4、长度为零的 path 片段会被忽略
5、如果没有传入 path 片段，则 `path.resolve()` 会返回当前工作目录的绝对路径

```javascript
path.resolve('/foo/bar', './baz'); // 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/'); // 返回: '/tmp/file'

// 如果当前工作目录为 /home/Timly/node，
// 则返回 '/home/Timly/node/node6.9/static_files/gif/image.gif'
path.resolve('node6.9', 'static_files/png/', '../gif/image.gif');
```

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

### 处理 CSS 样式

> - stylus-loader: 将 stylus 转 css
> - css-loader: 将 css 转为 CommonJS 规范的 js 字符串
> - style-loader: 将 js 字符串转为 style node 插入到 html 中
> - postcss-loader: PostCSS 是一个允许使用 JS 插件转换样式的工具，我们用 postcss 的插件就要配置它，autoprefixer 就是 postcss 项目里的一个插件
> - autoprefixer: 添加了 vendor 浏览器前缀，它使用 Can I Use 上面的数据。

```shell
npm install -D style-loader css-loader stylus-loader postcss-loader
```

PS: 注意引入顺序, postcss-loader 处理需要在根目录新建个 postcss.config.js 文件来配置 autoprefixer。

### file-loader 与 url-loader

- `file-loader`: webpack 最终会将各个模块打包成一个文件，因此我们样式中的 url 路径是相对入口 html 页面的，而不是相对于原始 css 文件所在的路径的。这就会导致图片引入失败。这个问题是用 `file-loader` 解决的，`file-loader` 可以解析项目中的 url 引入（不仅限于 css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件
- `url-loader`： 如果图片较多，会发很多 http 请求，会降低页面性能。这个问题可以通过 `url-loader` 解决。`url-loader` 会将引入的图片编码，生成 dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此 `url-loader` 提供了一个 `limit` 参数，小于 `limit` 字节的文件会被转为 DataURl，大于 `limit` 的还会使用 `file-loader` 进行 copy。
- 总的来说：`url-loader` 封装了 `file-loader`。`url-loader` 赖于 `file-loader`，即使用 `url-loader` 时，也要安装 `file-loader`