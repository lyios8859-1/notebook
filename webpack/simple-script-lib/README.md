# 实现简单的 k 库打包 min 文件开发环境

## 搭建简易的开发环境

> `i` 是 `install` 简写， `-D` 是 `--save-dev` 简写， `-S` 是 `--save` 简写。如果很慢建议使用淘宝镜像：`--registry=https://registry.npm.taobao.org`

```shell
# 初始化 package.json
npm init -y

# 安装 webpack
npm i webpack webpack-cli webpack-dev-server -D

# 安装 babel 和 babel 相关插件
npm i babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D

# 生产环境代码压缩
npm i uglifyjs-webpack-plugin@beta -D

# 模板生成
npm i html-webpack-plugin@1 -D
```

## 支持引入方式

> CommonJS，AMD 和 全局引用（\<script\>\</script\>）

## 引用方式

```javascript
<script src="url" />;
LyVariable.xxx();
```
