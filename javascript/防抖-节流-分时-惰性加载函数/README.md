# 一些函数的优化

## 函数防抖

> 防抖(debounce): 压弹簧, 在规定的时间一直触发,就会重新计算时间(从零开始),直到你不再触发了会在规定的时间到了之后才会触发,否则,一直不会触发.
> 例如: 定时器实现表单验证. window.scroll

```js
// 函数防抖：如果一个事件被频繁触发多次，函数可以按照固定频率去执行对应的事件处理方法。当持续触发事件时（重新计时），debounce会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件
// debounce函数用来包裹我们的事件处理方法
function debounce(fn, delay) {
  // 持久化一个定时器
  let timer = null;

  // 闭包函数可以访问timer
  return function() {
    // 通过 this 和 arguments 获得函数的作用域和参数
    let context = this;
    let args = arguments;
    // 如果事件被触发，清除timer并重新开始计时
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

function foo() {
  console.log("You are scrolling!");
}

document.addEventListener("scroll", debounce(foo, 50));
```

## 函数节流

> 节流(throttle): 拧水龙头的水滴流出, 在指定的时间内一直触发,也不会触发, 除非指定的时间到了才会触发. **用户不去主动触发的**
> 例如: 定时器和时间戳实现滚动加载.

```js
// 函数节流针对的事件**不是用户主动调用的**
// 函数节流：如果一个事件被频繁触发多次，并且触发的时间间隔过短，则函数可以使得对应的事件处理函数只执行一次。当持续触发事件时，保证隔间时间触发一次事件。
// 函数节流的原理是：延迟当前函数的执行，如果该次延迟还没有完成，那么忽略接下来该函数的请求。也就是说会忽略掉很多函数请求。
/*
JavaScript中的大多数函数都是用户主动触发的，一般情况下是没有性能问题，
但是在一些特殊的情况下不是由用户直接控制。容易大量的调用引起性能问题
  window.resise事件。
  mouse, input等事件。
  上传进度
等等
*/
function throttle(fn, threshold) {
  let last;
  let timer;
  threshold || (threshold = 250);

  return function() {
    let context = this;
    let args = arguments;
    // 记录上次触发事件
    let now = +new Date();

    // 本次事件触发与上一次的时间比较
    if (last && now < last + threshold) {
      clearTimeout(timer);

      timer = setTimeout(function() {
        // 更新最近事件触发的时间
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


/**
* 节流函数 **不是用户主动调用的**
* @param {*} fn 
* @param {*} interval 
*/
const throttle2 = function (fn, interval = 500) {
let timer = null, // 计时器 
    isFirst = true // 是否是第一次调用
return function () {
  let args = arguments, _me = this
  // 首次调用直接放行
  if (isFirst) {
    fn.apply(_me, args)
    return isFirst = false
  }
  // 存在计时器就拦截
  if (timer) {
    return false
  }
  // 设置timer
  timer = setTimeout(function (){
    console.log(timer)
    window.clearTimeout(timer)
    timer = null
    fn.apply(_me, args)
  }, interval)
}
}
// 使用节流
window.onresize = throttle2(function() {
  console.log('throttle')
},600)
```

## 分时函数

> 分时函数处理的问题是**用户主动调用**的

```js
// 分时函数处理的问题是**用户主动调用**的，比如插入千百个节点
function insertDomNode() {
  let arr = [];
  for (let i = 1; i <= 100000; i++) {
    arr.push(i) //假设arr装载了100000个好友数据
  }
  let renderFriendList = function (data) {
    for (let i = 0, len = data.length; i < len; i++) {
      let div = document.createElement('div');
      div.innerHTML = i;
      document.body.appendChild(div)
    }
  }
  renderFriendList(arr)
}
// console.time('分时函数');
// insertDomNode();
// console.timeEnd('分时函数')


// 分时函数的原理是让创建节点的工作分批进行，
// 比如把1s创建100000个节点，改为每200ms创建8个节点（其实就是一种异步函数的思想）
let timeChunk = function (arr, fn, count) {
  let obj, t;
  let len = arr.length;
  let start = function () {
    for (let i = 0; i < Math.min(count || 1, arr.length); i++) {
      let obj = arr.shift();
      fn(obj)
    }
  };
  return function () {
    t = setInterval(function () {
      if (arr.length === 0) {
        return clearInterval(t);
      }
      start()
    }, 200)
  }
}

function insertDomNode2 () {
  let arr = [];
  for (let i = 1; i <= 100000; i++) {
    arr.push(i) //假设arr装载了100000个好友数据
  }
  let renderFriendList = timeChunk(arr, function (n) {
    let div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div)
  }, 8) // 一个时间里就创建8个
  renderFriendList();
}
console.time('分时函数');
insertDomNode2(); // 异步的创建
console.timeEnd('分时函数')
```

## 惰性加载函数

> 例如：未优化的 addEventListener（浏览器兼容性的判断），每调用一次都会进行一次判断。而优化后的 addEventListener 只在首次被调用时进行判断，其后再次调用时，将不再进行浏览器支持的事件监听判断。

**惰性载入函数应用场景总结（以下2条件同时满足）**：

1. 应用频繁，如果只用一次，是体现不出它的优点出来的，用的次数越多，越能体现这种模式的优势所在。
2. 固定不变，一次判定，在固定的应用环境中不会发生改变。

缺点：第一次执行的时候函数会意味赋值而执行的慢一些

```js
/* 没有优化的添加事件方法：每次调用都会判断*/
function addEvent(type, element, fun) {
  if (element.addEventListener) {
    console.log(123);
    element.addEventListener(type, fun, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, fun);
  } else {
    element['on' + type] = fun;
  }
}
let div = document.getElementById('testLazy');
// 调用了两次，输出了两次 123
addEvent('click', div, function () {
  alert(1);
})
addEvent('click', div, function () {
  alert(2)
})

// 惰性函数加载
/* 优化方案一：方法重写后再调用*/
function addEvent(type, element, fun) {
  if (element.addEventListener) {
    console.log(123);
    addEvent = function (type, element, fun) {
      element.addEventListener(type, fun, false);
    }
  } else if (element.attachEvent) {
    addEvent = function (type, element, fun) {
      element.attachEvent('on' + type, fun);
    }
  } else {
    addEvent = function (type, element, fun) {
      element['on' + type] = fun;
    }
  }
  addEvent(type, element, fun);
}

/* 优化方案二：匿名函数重写与执行*/
let addEvent = (function (type, element, fun) {
  if (window.addEventListener) {
    console.log(123);
    return function (type, element, fun) {
      element.addEventListener(type, fun, false) //webkit、os
    }
  }
  if (window.attachEvent) {
    return function (type, element, fun) {
      element.attachEvent('on' + type, fun) //IE浏览器
    };
  }
})();

let div = document.getElementById('testLazy');
// 使用惰性函数加载后，调用两次，输出一个 123
addEvent('click', div, function () {
  alert(1);
})
addEvent('click', div, function () {
  alert(2)
})
```