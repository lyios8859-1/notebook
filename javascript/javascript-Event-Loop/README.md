# Javascript 的 Event loop

JS的执行机制是一个主线程和一个任务队列(Eventqueue)，所有的同步任务都是在主线程上直接执行的。异步任务都被放在任务队列中。

![Javascripts事件循环](./Javascript循环事件Event-loop.png 'Javascripts事件循环')

1. 所有同步任务都在主线程上执行，形成一个执行栈
2. 主线程之外，还存在一个"消息队列"。只要异步操作执行完成，就到消息队列中排队
3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取消息队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行
4. 主线程不断重复上面的第三步

## 异步任务的执行，涉及到了宏任务和微任务

所有的任务在主线程执行，会形成一个执行栈，执行栈会区分出宏任务和微任务，并把任务放在各自的任务队列中。

所有的异步任务都会被分为宏任务和微任务。宏任务队列一次只会存放一个宏任务，当宏任务队列的任务执行完后，会执行所有的微任务。所有微任务执行完后，会进入下一个事件循环。

![异步事件中的宏任务-微任务](./异步事件中的宏任务-微任务.png '异步事件中的宏任务-微任务')

一个宏任务执行完后，执行所有的微任务，所有的微任务执行完后，再次开始执行下一个进入宏任务队列的宏任务。这个过程就是一次事件循环。

**注意：** 同一次事件循环中，微任务永远在宏任务之前执行。

### 宏任务（macrotask）

```js
I/O 
script // 标签代码块
setTimeout // （nodejs 浏览器）
setInterval // （nodejs 浏览器）
requestAnimationFrame  // （浏览器）
setImmediate // (nodejs)
```

### 微任务（microtask）

```js
process.nextTick // (nodejs)
MutationObserver // (浏览器)
Promise.then Promise.catch Promise.finally // （nodejs 浏览器）
```

```js
// 异步，宏任务，将其放到宏任务的【队列】里
setTimeout(() => {
  console.log(1)
});
// 同步，new Promise 立即执行
new Promise(resolve => {
  console.log(2);
  resolve();
}).then(() => {  // then方法,微任务,将其放到微任务的【队列】里
  console.log(3)
});
// 异步，宏任务，将其放到宏任务的【队列】里
var timer = setInterval(() => {
  console.log(4),
  clearInterval(timer);
});
// 同步，new Promise 立即执行
new Promise(resolve => {
  console.log(5)
  resolve();
}).then(() => { // then方法,微任务,将其放到微任务的【队列】里
  console.log(6)
});
// 同步, 立即执行
console.log(7);

// 2,5,7,3,6,1,4
```

[参考](https://www.cnblogs.com/fangdongdemao/p/10262209.html)