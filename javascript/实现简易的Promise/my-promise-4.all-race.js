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
    MyPromise.resolvePromise = function (newMyPromise, newThen, resolve, reject) {
      if (newMyPromise === newThen) {
        /**
         // 防止循环调用,如下的方式调用:
         const a = new Promise(resolve => {
           resolve(2);
          })
          
          const b = a.then(() => {
            return b;
          });
        */
        reject(new TypeError('Chaining cycle detected for promise'));
      }

      // 标识是否被调用过
      let called = false;
      if (newThen instanceof MyPromise) {
        // newThen 是 MyPromise 实例对象
        newThen.then(value => {
          MyPromise.resolvePromise(newMyPromise, value, resolve, reject);
        }, reason => {
          reject(reason);
        });
      } else if (newThen && (typeof newThen === 'object' || typeof newThen === 'function')) {
        // newThen 是回调的值是否是对象或函数
        try {
          const then = newThen.then;
          if (typeof then === 'function') {
            then.call(newThen, value => {
              if (called) return;
              called = true; // 表示已经调用
              MyPromise.resolvePromise(newMyPromise, value, resolve, reject);
            }, reason => {
              if (called) return;
              called = true; // 表示已经调用
              reject(reason);
            });
          } else {
            if (called) return;
            called = true; // 表示已经调用
            resolve(newThen);
          }
        } catch (error) {
          if (called) return;
          called = true; // 表示已经调用
          reject(error);
        }
      } else {
        if (called) return;
        called = true; // 表示已经调用
        // newThen 是回调的值是普通的值
        resolve(newThen);
      }

      return newMyPromise;
    };

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
              // 返回 MyPromise 实例对象
              const newThen = onFulfilled(this.value);
              MyPromise.resolvePromise(newMyPromise, newThen, resolve, reject);
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
              // 返回 MyPromise 实例对象
              const newThen = onRejected(this.reason);
              MyPromise.resolvePromise(newMyPromise, newThen, resolve, reject);
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
                // 返回 MyPromise 实例对象
                const newThen = onFulfilled(value);
                MyPromise.resolvePromise(newMyPromise, newThen, resolve, reject);
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
                // 返回 MyPromise 实例对象
                const newThen = onRejected(reason);
                MyPromise.resolvePromise(newMyPromise, newThen, resolve, reject);
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

MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) return value;
  return new MyPromise(resolve => resolve(value));
}

MyPromise.reject = function (value) {
  return new MyPromise((resolve, reject) => reject(value));
}

// https://segmentfault.com/a/1190000012820865
// https://juejin.im/post/5e907ae9518825739b2d383d#heading-4

// 将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值
MyPromise.all = (promises) => {
  // 返回一个新的promise实例
  return new MyPromise((resolve, reject) => {
    const arr = [];
    let count = 0; // 记录fulfilled状态的promise个数
    const promiseArr = Array.from(promises); // 参数除了数组还可以是具有Iterator接口的数据类型
    const len = promiseArr.length
    for (let i = 0; i < len; i++) {
      MyPromise.resolve(promiseArr[i]).then(value => { // 如果参数不是promise，会调用Promise.resolve()转成promise
        count++; // 进入这里，表示成功的回调，即fulfilled状态
        arr[i] = value; // 将该成功的promise装进数组
        if (count === len) {
          console.log(count, 'count');
          resolve(arr);
          // 如果count和数组总长度相等，说明都是fulfilled状态了
          // 所有resolve的时机就是所有都变成fulfilled状态是resolve
        }
      }, reject);
    }
  })
}

// MyPromise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态
MyPromise.race = (promises) => {
  return new MyPromise((resolve, reject) => {
    const promiseArr = Array.from(promises);
    const len = promises.length;
    for (let i = 0; i < len; i++) {
      MyPromise.resolve(promiseArr[i]).then(value => {
        resolve(value); // 直接resolve第一个then是成功时的回调函数接收到的终值
      });
    }
  })
};

/*************************************MyPromise.all 测试***************************************/
const a = MyPromise.resolve(1);
const b = MyPromise.resolve(2);
const c = new MyPromise(resolve => {
  setTimeout(() => {
    resolve(33);
  })
})

MyPromise.all([a, b, c]).then(value => console.log('MyPromise.all>', value));
/*************************************华丽的分割线***************************************/

/*************************************MyPromise.race 测试***************************************/
const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject('failed');
  }, 500);
});
MyPromise.race([p1, p2]).then(function(value) {
  console.log('MyPromise.race>', value);
});
/*************************************华丽的分割线***************************************/

/*************************************new MyPromise 测试***************************************/
new MyPromise((resolve, reject) => {
    // throw new Error(333333333);
    //  setTimeout(() => {
       resolve('new MyPromise执行成功');
    // });
    // setTimeout(() => {
      // reject('new MyPromise失败');
    // });
}).then(value => {
  console.log('then-resolve1', value);
  return new MyPromise((resolve) => {
    resolve('返回MyPromise');
  });
}, reason => {
  console.log('then-reject1', reason);
  return 'thenreject1';
}).then(value => {
  console.log('then-resolve2', value);
  return 'dkdjfkdjfkdjfjls';
}, reason => {
  console.log('then-reject2', reason);
  return '思考的肌肤拉萨就地方离开家的松开了房间'
});
/*************************************华丽的分割线***************************************/

/*
// 测试 promise 的是否可以: npm i promises-aplus-tests; 执行: npx promises-aplus-tests my-promise-dev.js 
MyPromise.defer = MyPromise.deferred = function() {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}
module.exports = MyPromise;
*/