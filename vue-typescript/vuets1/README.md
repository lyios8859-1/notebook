# typescript + vue + webpack

## 安装 webpack 支持

> npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D

## 按装 typescript 支持

> npm i typescript ts-loader -D

## Vue的相关插件

> npm i vue-loader vue-template-compiler css-loader vue-style-loader -D

## CSS单独打包插件

> npm i style-loader extract-text-webpack-plugin@4.0.0-beta.0  -D

## ts 识别 .vue

> 在 src目录下创建文件 vue.shim.d

```txt
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件

vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器


## tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "experimentalDecorators": true,// 启用装饰器
    "module": "es2015", // 采用的模块系统 'esnext' // 包含es6 es7 和commonjs
    "noImplicitAny": true, //为true时，将进行强类型检查，无法推断类型时，提示错误。(在表达式和声明上有隐含的any类型时报错)
    "strict": true, //启用所有严格类型检查选项。
    "noImplicitReturns": true, //true 时，不是函数的所有返回路径都有返回值时报错
    "removeComments": true, //编译生成的 JavaScript 文件是否移除注释
    "suppressImplicitAnyIndexErrors": true,
    "preserveConstEnums": true,
    "sourceMap": true, //编译文件对应关系
    "moduleResolution": "node", //决定如何处理模块。
    "target": "es5", //编译目标平台
    "emitDecoratorMetadata": true,// 启用设计类型元数据（用于反射）
    // 从 tslib 导入外部帮助库: 比如__extends，__rest等
    "importHelpers": true,
    // 编译过程中打印文件名
    "listFiles": true,
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 将每个文件作为单独的模块
    "isolatedModules": false,
    // 允许编译javascript文件
    "allowJs": true,
    // 解析非相对模块名的基准目录
    "baseUrl": "./",
    "paths": {
      "jquery": [
        "node_modules/jquery/dist/jquery"
      ]
    },
     // 编译过程中需要引入的库文件的列表
    "lib": [
      "dom",
      "es2015",
      "es2015.promise"
    ]
  },
  "include": [ //包含的编译目录
    "./src/**/*"
  ],
  "exclude": [ //排出不编译的目录
    "node_modules",
    "**/*.spec.ts"
  ]
}
```