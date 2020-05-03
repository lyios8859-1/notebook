const subscribe = (function() {
  // 发布订阅类
  class Sub {
    constructor () {
      // 事件池容器
      this.$pod = [];
    }

    // 向事件池添加事件方法
    add (func) {
      // 查找是否有存在的方法, 使用 includes 也可以 flag = this.$pod.includes(func);
      const flag = this.$pod.some(item => {
        return item === func;
      });

      !flag ? this.$pod.push(func) : null;
    }

    // 从事件池中移除指定的事件方法
    remove (func) {
      // const $pod = this.$pod; // 引用数据类型, 以后操作 $pod 变量也会影响到 this.$pod
      for (let i = 0, len = this.$pod.length; i < len; i++) {
        if (this.$pod[i] === func) {
          // 这种删除有问题,如过前面有一个触发的函数把往前的事件池中的移除了,
          // 那么按顺序执行就会后面的事件池后面的索引都往前移动,就造成往前移动会不执行.
          // 因此不能使用 $pod.splice(i, 1); 方式移除事件池中的方法, 解决方案: $pod[i] = null, 当前移除的赋值为 null ,占位这样索引就不会往前移动了
          // $pod.splice(i, 1);等触发时 fire 再判断是不是 null 是就删除
          this.$pod[i] = null;
          break; // 找到了就返回了
        }
      }
    }

    // 通知事件池中的时间方法, 去触发方法执行
    fire (...args) {
      // 这里必须 i < this.$pod.length 不能提前获取长度
      for (let i = 0; i < this.$pod.length; i++) {
        if (typeof this.$pod[i] !== 'function') {
          console.log('>>', this.$pod[i]);
          // 此时,再移除
          this.$pod.splice(i, 1);
          i--; // 保证执行的顺序,不会有缺失
          continue; // 执行下一次循环,就不用继续执行, if 下面的代码了 
        }
        this.$pod[i].call(this, ...args); // 3 个参数以上, call 性能越由于 apply
      }
    }
  }

  return function () {
    return new Sub();
  };
})();


const sub1 = subscribe();

function fn1 () {
  console.log(1);
}
function fn2 () {
  console.log(2);
  sub1.remove(fn1);
}
function fn3 () {
  console.log(3);
}
function fn4 () {
  console.log(4);
}

sub1.add(fn1);
sub1.add(fn2);
sub1.add(fn3);
sub1.add(fn4);


sub1.fire();
console.log('--------------------')
sub1.fire();
console.log('--------------------')
sub1.fire();
console.log('--------------------')
sub1.fire();