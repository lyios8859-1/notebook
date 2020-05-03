class Promise {
  constructor(executor) {
    // 参数不是函数，报错
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    this.init() // 初始化值
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      // 使用 try...catch 的目的是为了把executor()中的错误抛出给then的回调去捕获
      this.reject(err)
    }
  }


  init = () => {
    this.value = null // 终值
    this.reason = null // 拒因
    this.state = Promise.PENDING // 状态

    this.onFulfilledCallbacks = [] // 成功回调, 在then()方法中push，resolve()时执行
    this.onRejectedCallbacks = [] // 失败回调，在then()方法中push，reject()时执行
  }

  resolve = (value) => {
    // 成功后的一系列操作 (状态的改变，成功回调的执行 )
    // 状态的改变：pending -> fulfilled

    // console.log(this.constructor === Promise) // true
    // this 在箭头函数中，作用域绑定在父级执行上下文，即定义时所在的对象
    // 即this相当于父级的this，这里又是在勾走函数中，所以this指向了实例对象 
    if (this.state === Promise.PENDING) {
      this.state = Promise.FULFILLED
      this.value = value

      this.onFulfilledCallbacks.forEach(fn => fn(this.value))
      // 当promise的参数函数中有异步操作时，then方法会优先于resolve()或者reject()先执行
      // 这样就是导致执行then()方法时，状态是pending状态，因为状态的改变是在resolve()或reject()中改变的，而他们因为异步都没执行
      // 这是需要用一个数组来存储将来才会执行的onFulfilled函数
      // 这里push进onFulfilledCallbacks的函数，将在resolve()函数中去执行
    }
  }

  reject = (reason) => {
    // 失败后的一系列操作 (状态的改变，失败回调的执行 )
    // 状态的改变：pending -> rejected
    if (this.state === Promise.PENDING) {
      this.state = Promise.REJECTED
      this.reason = reason

      this.onRejectedCallbacks.forEach(fn => fn(this.reason))
    }
  }

  then = (onFulfilled, onRejected) => {
    // 参数校验，穿透效果，即then不传任何参数具有穿透效果
    if (typeof onFulfilled !== 'function') {
      onFulfilled = value => value
    }
    // 参数校验，穿透效果，即then不传任何参数具有穿透效果
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason
      }
    }

    // then()方法返回的是一个新的 promse 实例
    // 因为返回新的promise实例，可以可以实现链式调用
    let promise2 = new Promise((resolve2, reject2) => {
      // 执行onFulfilled函数的条件
      if (this.state === Promise.FULFILLED) {
        setTimeout(() => {
          // 这里中间的then()方法中的回调 onFulfilled() 函数是有返回值的
          // 中间then()参数函数onFulfilled()的返回值，会被当做下一个then回调的参数传入
          try {
            const x = onFulfilled(this.value)
            Promise.resolvePromise(promise2, x, resolve2, reject2)
          } catch (err) {
            reject2(err)
          }

        })
      }
      if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            Promise.resolvePromise(promise2, x, resolve2, reject2)
          } catch (err) {
            reject2(err)
          }

        })
      }
      if (this.state === Promise.PENDING) {
        // 如果状态是 pending
        // 当promise的参数函数中有异步操作时，then方法会优先于resolve()或者reject()先执行
        // 这样就是导致执行then()方法时，状态是pending状态，因为状态的改变是在resolve()或reject()中改变的，而他们因为异步都没执行
        // 这时需要用一个数组来存储将来才会执行的onFulfilled函数
        // 这里push进onFulfilledCallbacks的函数，将在resolve()函数中去执行
        this.onFulfilledCallbacks.push((value) => {
          // 这里仍然需要使用setTimeout，因为这个函数是在resolve()中执行的，如果resolve()后面任然后同步代码，要保证同步代码先执行
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              Promise.resolvePromise(promise2, x, resolve2, reject2)
            } catch (err) {
              reject2(err)
            }
          })
        })
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason)
              Promise.resolvePromise(promise2, x, resolve2, reject2)
            } catch (err) {
              reject2(err)
            }

          })
        })
      }
    })
    return promise2
  }
}

// 这里使用静态属性，是为了避免 魔法字符串
Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'
Promise.resolvePromise = function (promise2, x, resolve, reject) {
  // x 与 promise2 相等
  if (promise2 === x) {
    reject(new TypeError('chainning cycle detected for promise'))
  }
  // x 是 Promise
  if ( x instanceof Promise) {
    x.then(value => {
      // resolve(value)
      Promise.resolvePromise(promise2, value, resolve, reject)
    }, reason => {
      reject(reason)
    })
  } 
  else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // x 为对象或函数
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          value => {
            if (called) return
            called = true
            MyPromise.resolvePromise(promise2, value, resolve, reject)
          },
          reason => {
            if (called) return
            called = true
            reject(reason)
          }
        )
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}


const promise = new Promise((resolve, reject) => {
  // throw new Error('出错了')
  console.log(1)
  setTimeout(() => {
    console.log(4)
    resolve(6)
    console.log(5)
  })
  console.log(2)
})
  .then(
    value => {
      console.log(value, 'value')
      return new Promise(resolve => {
        resolve(new Promise(resolve3 => {
          resolve3(7)
        }))
      })
    },
    reason => {
      console.log(reason, 'reason')
    })
  .then(
    value => {
      console.log(value, 'vvvvvvvvvvvv')
    }, reason => {
      console.log(reason)
    })
console.log(3)

Promise.defer = Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise;

// then
  // then中的两个参数回调函数需要异步，setTimeout解决
  // 如果promise参数函数内部抛出错误，需要在then()中捕获 => try ... catch
  // 如果promise中存在异步，then的回调不会执行 => 因为在执行then方法的时，state === 'pending' 不满足执行then两个回调的任何一个，而当setTimeout中的 resolve() 执行的时，then执行过了就不会再继续执行
