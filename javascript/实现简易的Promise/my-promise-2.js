class MyPromise {
  constructor(fn) {

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

  init() {
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

  initBind() {
    // 修正在回调中 this 的指向问题
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  // 执行失败的回调
  reject(reason) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(func => func(this.reason));
    }
  }

  // 执行成功的回调
  resolve(value) {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(func => func(this.value));
    }
  }

  then(onFulfilled, onRejected) {
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

    // 注意: 要实现链式调用,且改变了后面 then 的值,必须是通过创建新的实例.
    let newMyPromise = new MyPromise((resolve, reject) => {
      switch (this.state) {
        case MyPromise.FULFILLED:
          const t1 = setTimeout(() => {
            try {
              // 返回普通值
              const newThen = onFulfilled(this.value);
              resolve(newThen);
            } catch (error) {
              reject(error);
            }
            clearTimeout(t1);
            newMyPromise = null;
          });
          break;
        case MyPromise.REJECTED:
          const t2 = setTimeout(() => {
            try {
              // 返回普通值
              const newThen = onRejected(this.reason);
              reject(newThen);
            } catch (error) {
              reject(error);
            }
            clearTimeout(t2);
            newMyPromise = null;
          })
          break;
        default: // 是 pending 状态
          this.onFulfilledCallbacks.push((value) => {
            const t3 = setTimeout(() => {
              try {
                // 返回普通值
                const newThen = onFulfilled(value);
                resolve(newThen);
              } catch (error) {
                reject(error);
              }
              clearTimeout(t3);
              newMyPromise = null;
            });
          });
          this.onRejectedCallbacks.push((reason) => {
            const t4 = setTimeout(() => {
              try {
                // 返回普通值
                const newThen = onRejected(reason);
                reject(newThen);
              } catch (error) {
                reject(error);
              }
              clearTimeout(t4);
              newMyPromise = null;
            })
          });
          break;
      }
    });

    return newMyPromise;
  }
}

new MyPromise((resolve, reject) => {
  // throw new Error(333333333);
  setTimeout(() => {
    resolve('MyPromise执行成功');
  });
  // setTimeout(() => {
  //   reject('MyPromise失败');
  // });
}).then(value => {
  console.log('then-resolve1', value);
  return 'thenresolve1';
}, reason => {
  console.log('then-reject1', reason);
  return 'thenreject1';
}).then(value => {
  console.log('then-resolve2', value);
  return 'dkdjfkdjfkdjfjls';
}, reason => {
  console.log('then-reject2', reason);
  return '思考的肌肤拉萨就地方离开家的松开了房间'
}).then(value => {
  console.log('then-resolve3', value);
}, reason => {
  console.log('then-reject3', reason);
});
