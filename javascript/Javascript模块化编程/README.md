# Javascript 模块化编程

**模块**：指把实现某一特定的功能的一些方法聚集在一起。通俗的讲：只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

## 全局函数

- 实践一

```js
function fn1 () {
    // TODO
}

function fn2 () {
    // TODO
}
```

PS: 函数 fn1(), f2() 就组成一个模块，直接调用即可。但是“污染”了全局变量，无法保证与其他模块一起使用时导致变量名的冲突。模块各成员之间没有啥直接关系。

## 对象
- 实践二：解决了实践一的缺点

```js
let module1 = {
    _index: 0,
    fn1: function () {},
    fn2: function () {}
};
```

PS: 对象 module1 的 函数 fn1(), fn2(), _index 同属一个模块。使用时对象(module1)调用属性即可
`module1.fn1`。但是这样会暴露该模块的所有的成员，内部状态可以被外部修改，如`module1._index = 100;`

## 闭包（立即执行函数）

```js
(function(params){
    // TODO
})(params);
```


- 实践三：解决了实践二存在的问题

```js
let module1 = (function(){
    let _index = 0;
    const fn1 = () => {
        // TODO
    };
    const fn2 = () => {
        // TODO
    };
    return {
        fn1,
        fn2
    }
})();
```

PS： 外部代码无法读取内部的_index变量,` module1._index === undefined `为 `true`

- 实践四：模块的放大模式

> 一个模块如果内容太多，导致模块太大，必须分成几个部分，或者一个模块去继承另一个模块，就需要这种放大模式去处理

```js
// 相当于对模块的扩展
let module1Extend = (function(mod) {
    // 扩展了 fn3 这个函数
    mod.fn3 = function () {
        // TODO
    };

    return mod;
})(module1);
```

- 实践五：模块的宽放大模式,

> 与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。
> 模块之间的加载顺序并完成无法预知，某一模块执行的部分可能加载到一个不存在的空对象

```js
// 相当于对模块的扩展
let module1Extend = (function(mod) {
    // 扩展了 fn3 这个函数
    mod.fn3 = function () {
        // TODO
    };

    return mod;
})(window.module1 || {});
```

## 模块调用全局变量

> 模块具有独立性，模块内部最好不与程序的其他部分直接交互，为了在模块内部调用全局变量，必须显式地将其他变量传递到模块内。

```js
// 相当于对模块的扩展
let module1Extend = (function($, _, R) {
    // 扩展了 fn3 这个函数
    mod.fn3 = function () {
        // TODO
    };

    return mod;
})(jQuery, loadsh, ramda);
```

## 模块规范
> Javascript模块规范共有两种：CommonJS 和 AMD

### AMD

> 主要是 浏览器（客户端）模块。
> 如果使用 require 引入模块（主要是同步引入），但是在浏览器端使用 require 引入模块的话，会出现一个等待
> require 加载模块的时间由于网速原因，导致加载实践很长，引起浏览器处于"假死"状态，因此在浏览器端主要是异步加
> 模块，所以出现 AMD 规范。
> 
> AMD 也是 `require` 语法加载模块, 不同于 CommonJS，它要求两个参数: `require([module], callback);`;

> `require.js` 是 AMD 规范的最好体现， 当然还有 `curl.js`。

#### require.js 的用法

在 require.js 之前加载其他模块方式，在一个文件用引入，而且每个引入的顺序还必须注意，依次加载

```js
<script src="1.js"></script>
<script src="2.js"></script>
<script src="3.js"></script>
// ...
```

PS：首先，加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；
其次，由于js文件之间存在依赖关系，因此必须严格保证加载顺序。依赖性最强的模块一定要放到最后加载。

因此，require.js 出现。解决了：

1、实现js文件的异步加载，避免网页失去响应；

2、管理模块之间的依赖性，便于代码的编写和维护。

- 使用 require.js 
下载 https://requirejs.org/docs/download.html，引入

放在网页底部引入 `<script src="js/require.js"></script>` 或者 `<script src="js/require.js" defer async="true" ></script>`

接下来，加载我们的模块, `<script src="js/require.js" data-main="js/main.js"></script>`

`main.js` 叫做主模块，主模块如果依赖于其他模块，这时就要使用AMD规范定义的的require()函数。

```js
// main.js
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
    // TODO
});
```

PS： require() 异步加载 moduleA，moduleB 和 moduleC，浏览器不会失去响应；它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

例如：

```js
require(['jquery', 'underscore', 'ramda'], function ($, _, R){
    // TODO
});
```

- 模块的加载
```js
require(['jquery', 'underscore', 'ramda'], function ($, _, R){
    // TODO
});
```
PS： 这段代码加载，默认 'jquery', 'underscore', 'ramda'在同一个目录 分别是 jquery.js,underscore.js,ramda.js 命名的文件。

如果不再同一个文件夹下且文件名不同，需要通过 require.config() 配置，
在 主文件 (main.js) 的头部添加

```js
// 路径默认与main.js在同一个目录（js子目录）
require.config({
    paths: {
        "jquery": "jquery.min.js",
        "underscore": "underscore.min.js",
        "backbone": "backbone.min.js"
    }
});

// 如果这些模块在其他目录，比如js/lib目录，则有两种写法。一种是逐一指定路径。
require.config({
    paths: {
        "jquery": "lib/jquery.min.js",
        "underscore": "lib/underscore.min.js",
        "backbone": "lib/backbone.min.js"
    }
});


require.config({
    baseUrl: "js/lib",
    paths: {
        "jquery": "jquery.min.js",
        "underscore": "underscore.min.js",
        "backbone": "backbone.min.js"
    }
});
```

PS：require.js要求，每个模块是一个单独的js文件。这样的话，如果加载多个模块，就会发出多次HTTP请求，会影响网页的加载速度。因此，require.js提供了一个优化工具，当模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少HTTP请求数。优化工具链接地址（http://requirejs.org/docs/optimization.html）


#### AMD模块的写法，就是我们自己的模块必须遵循 AMD 规范

> 导入：`require(['模块名',...], function(模块引用变量) {})`
> 导出：`define(function(){return '值'});`

- 实践

模块 utils.js

```js
// utils.js
define(function () {
    let add = function (x, y) {
        return x + y;
    };
    return {
        add: add
    }
});

// 该模块依赖其他模块
define(['other'], function (other) {
    let oth = function () {
        other.doSomething();
    };
    return {
        oth: oth
    }
});
```
当 `require()` 函数加载上面这个模块的时候，就会先加载 `other.js` 文件。

引入模块 utils.js

```js
// main.js

require(['utils'], function (utils) {
    console.log(utils.add(1, 2));
});
```


#### 加载非规范的模块 （不符合AMD规范的模块）
> 这样的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征。
> underscore和backbone这两个库，都没有采用AMD规范编写

```js
require.config({
    // 每个模块要定义
    //（1）exports值（输出的变量名），表明这个模块外部调用时的名称；
    //（2）deps数组，表明该模块的依赖性。
    shim: { // shim 用来配置不兼容的模块
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: 'Backbone'
        }
    }
});
```

jQuery的插件可以这样定义：

```js
require.config({
    // 每个模块要定义
    //（1）exports值（输出的变量名），表明这个模块外部调用时的名称；
    //（2）deps数组，表明该模块的依赖性。
    shim: { // shim 用来配置不兼容的模块
        "jquery.scroll": {{
            deps: ["jquery"],
            exports: 'jQuery.fn.scroll'
        }
    }
});
```

##### require.js 自己的插件

domready插件，可以让回调函数在页面DOM结构加载完成后再运行。

```js
require(['domready!'], function (doc){
    // 在页面DOM结构加载完成后再运行
});
```

text和image插件，则是允许require.js加载文本和图片文件。
```js
define([
    "text!review.txt",
    "image!cat.jpg"
], function(review,cat){
    console.log(review);
    document.body.appendChild(cat);
});
```


http://www.ruanyifeng.com/blog/2012/11/require_js.html



### CommonJS
> 主要是 nodejs 服务器端模块。
> nodejs 是 CommonJS 规范的最好体现，有一个全局性方法require()，用于加载模块。
> 模块可以多次加载，但是只会在第一次加载时运行一次，就缓存了，以后的都读缓存的。**要想让模块再次运行，必须清除缓存**,

> 同步加载，会阻碍接下来的代码执行，必须等待加载完才继续往下执行代码。

> 导入： require('模块路径');
> 导出：module.exports 和 exports

```js
// 相当于每个模块头部 var exports = module.exports;
exports.a = 'Hello World!!!'; // 相当于 module.exports.a = 'Hello World!!!';
```

### CMD
> AMD是异步加载，但是存在一个问题，一开始就把所有依赖写出来这个不太现实，那么 CMD 出现了，既可以异步加载，
> 还可以像 CommonJS 那样需要使用的时候再引入（require）进来
> seajs 就是 CMD 的最好体现。就进依赖

> 导入： `define(function(require, exports, module) {});`
> 导出：`define(function () { return '值';});`

AMD 与 CMD （都是异步加载）

- AMD
 - 依赖前置，立即加载
- CMD
 - 就进依赖，需要时候才引入加载

```js
define(function (require, exports, module) {
    let math = require("math");
    math.add(1, 2);
});
```

### UMD

> AMD 和 CommonJS 的结合体。
> AMD 以浏览器为主，异步加载
> CommonJS 以服务端为主，同步加载
> UMD 可跨平台

实现方式：
判断是否支持nodejs的模块（CommonJS规范）判断是否存在 exports。存在则是Nodejs模块。
不存在，再判断是否支持 AMD 规范，判断是否存在 define，存在则是AMD方式加载，
否则就是浏览器模式了。

```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS (Nodejs)
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量（root即window）
        root.returnExports = factory(root.jQuery);
    }

})(this, function ($) {
    function myFunc () {};

    // 暴露公共方法
    return myFunc;
});
```


### ES6 module

> 导入： `import`
> 导出：`export / export default`
> `import('模块路径').then()`

#### 导出的几种写法

```js
// 写法一
export const m = 100;

// 写法二
const m = 100;
export { m };

// 写法三
const n = 100;
export { n as m };

// 写法四
const n = 100;
export default n;

// 写法五
if (true) {
    import('./myModule.js').then(({ export1, export2 }) => {
        // TODO
    });
}

// 写法六
Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js')
]).then(([module1, module1, module3]) => {
    // TODO
});
```