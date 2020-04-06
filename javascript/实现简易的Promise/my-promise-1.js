class MyPromise {
  constructor (fn) {
    
    // 接收一个函数
    if (typeof fn !== 'function') {
      throw new TypeError(`MyPromise resolver ${fn} is not a function`);
    }
    
    this.init();
    
    try {
      fn(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  
  init () {
    MyPromise.FULFILLED = 'fulfilled';
    MyPromise.REJECTED = 'rejected';
    MyPromise.PENDING = 'pending';

    this.value = null; // 成功返回的结果值
    this.reason = null; // 失败返回的结果值
    this.state = MyPromise.PENDING; // 当前执行的状态

    this.onFulfilledCallbacks = []; // 异步后的成功回调
    this.onRejectedCallbacks = []; // 异步后的失败回调

    this.initBind();
  }

  initBind () {
    // 修正在回调中 this 的指向问题
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  // 执行失败的回调
  reject (reason) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(func => func(this.reason));
    }
  }

  // 执行成功的回调
  resolve (value) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(func => func(this.value));
    }
  }

  then (onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (value) {
        return value;
      };
    }
    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {
        throw reason;
      };
    }

    switch (this.state) {
      case MyPromise.FULFILLED:
        const t1 = setTimeout(()=> {
          onFulfilled(this.value);
          clearTimeout(t1);
        });
        break;
      case MyPromise.REJECTED:
        const t2 = setTimeout(()=> {
          onRejected(this.reason);
          clearTimeout(t2);
        })
        break;
      default: // 是 pending 状态
        this.onFulfilledCallbacks.push((value) => {
          const t3 = setTimeout(()=> {
            onFulfilled(value);
            clearTimeout(t3);
          });
        });
        this.onRejectedCallbacks.push((reason) => {
          const t4 = setTimeout(()=> {
            onRejected(reason);
            clearTimeout(t4);
          })
        });
        break;
    }
  }
}

console.log(1)
new MyPromise((resolve, reject) => {
  console.log(2);
  // setTimeout(() => {
  //   console.log('haha')
  //   resolve('MyPromise执行成功');
  //   console.log(4)
  // });
  setTimeout(() => {
    console.log('wuwu')
    reject('MyPromise失败');
    console.log(4)
  });
}).then(value => {
  console.log('then-resolve', value)
  console.log(5)
}, reason => {
  console.log('then-reject', reason)
  console.log(5)
});

console.log(3)