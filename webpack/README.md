# webpack4.x 学习

## publicPath 路径问题

```javascript
output: {
  filename: "[name].js",
  path:path.resolve(__dirname,"build")
}
```

如果没有指定 pubicPath,则引入路径如下:

```javascript
<body>
  <script src="a.js" />
</body>
```

```javascript
output: {
  filename: "[name].js",
  path:path.resolve(__dirname,"build"),
  publicPath:"/assets/"
}
```

如果指定 pubicPath,则引入路径如下:

```javascript
<body>
  <script src="assets/a.js" />
</body>
```

## webpack-dev-server 环境下，path、publicPath、区别与联系

- path：指定编译目录而已（/build/js/），不能用于 html 中的 js 引用。
- publicPath：虚拟目录，自动指向 path 编译目录（/assets/ => /build/js/）。html 中引用 js 文件时，必须引用此虚拟路径（但实际上引用的是内存中的文件，既不是/build/js/也不是/assets/）。

## 发布到生产环境

- webpack 进行编译（编译到/build/js/）
- 把编译目录（/build/js/）下的文件，全部复制到/assets/目录下（注意：不是去修改 index.html 中引用 bundle.js 的路径）
