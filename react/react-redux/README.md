# React Lean

##  babel 8.x

- babel-loader：加载器
- @babel/core：babel核心包,babel-loader的核心依赖
- @babel/preset-env：ES语法分析包
- @babel/runtime和@babel/plugin-transform-runtime：babel 编译时只转换语法，几乎可以编译所有时新的 JavaScript 语法，但并不会转化BOM（浏览器）里面不兼容的API。比如 Promise,Set,Symbol,Array.from,async 等等的一些API。这2个包就是来搞定这些api的。
- @babel/plugin-proposal-class-properties：用来解析类的属性的。
- @babel/preset-react 转译react的JSX


## redux react-redux redux-thunk

redux 异步需要 使用 redux-thunk

可以使用dvajs 来替换这个，dvajs封装了 redux的功能，使用更方便