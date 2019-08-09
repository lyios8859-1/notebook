# ES6 Proxy 实现简单的 MVVM

> `Proxy` 是 ES6 新的 API, 它可以对所需要操作的目标对象之前做一层"拦截"处理,外部对该目标对象的访问，都必须先通过
> 这层拦截,这样就可以对外部的访问进行过滤和改写.类似于 ES5 中的 `Object.defineProperty()`.

简单说一下 `new Proxy(param1, param2)`

```javascript
// 目标对象
  let targetObj = {};
  const proxyObj = new Proxy(targetObj, {
    get(target, key, receiver) {
      console.log(`getting ${key}`);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(`setting ${key}`);
      return Reflect.set(target, key, value, receiver);
    }
  });

  // 访问操作目标对象
  // 赋值
  proxyObj.count = 1; // setting count
  // 获取
  proxyObj.count // getting count
```

PS: `new Proxy(param1, param2)` 中 param1 表示需要拦截的对象, param2 表示用来定制拦截行为的对象.

## MVVM 的简单页面, 类似与 Vue

```html
 <div id="app">
    <h1>人类：{{people}}</h1>
    <h2>组成部分：</h2>
    <ul>
      <li>{{person.hande}}</li>
      <li>{{person.foot}}</li>
      <li>{{person.breast}}</li>
    </ul>
    <h2>描述：</h2>
    <p>{{describe}}</p>
    <!-- <p>年龄：{{age}}</p> -->
    <input placeholder="人呐" v-module="people" />
  </div>
  <script>
  const mvvm = new Mvvm({
    el: '#app',
    data: {
      people: '人类这种生物',
      person: {
        hande: '机智的头部',
        foot: '行走的脚',
        breast: '坦荡的胸'
      },
      describe: '人呐就那样吧,什么都明白了...',
      prvAge: 10,
      nowAge: 1
    },
    computed: {
      age() {
        return this.nowAge + this.prvAge
      }
    }
  })
  </script>
```

实现一个类

```javascript
class Mvvm {
  constructor(options = {}) {
    // 把options 赋值给 this.$options
    this.$options = options;
    // 把 options.data 赋值给 this._data
    let data = this._data = this.$options.data;
    let vm = this.initVm.call(this);
    // 要使得 Proxy 起作用，必须针对 Proxy 实例, 所以返回 Proxy 是实例
    return this._vm;
  }
  initVm() {
    // 使用 Proxy 代理
    this._vm = new Proxy(this, {
      // 拦截get
      get: (target, key, receiver) => {
        return this[key] || this._data[key] || this._computed[key];
      },
      // 拦截set
      set: (target, key, value) => {
        return Reflect.set(this._data, key, value);
      }
    });
    return this._vm;
  }
}

console.log(mvvm);
```

![ _vm 通过了代理](_vm实现了代理.png "_vm实现了代理.png")

PS: 打印出 mvvm 对象, 发现只有 _vm 通过了代理, 其他的 _data 下的所有数据没有通过代理处理, 因此, 接下来就需要对这些需要代理的目标对象做处理了.

在构造函数中添加一个数据处理的函数. `initObserve.call(this, data)`

```javascript
// 创建观察类
class Observe {
  constructor(data) {
    for (let key in data) {
      // 递归调用子对象, 通过层层递归添加proxy，把 _data 对象都添加一遍代理
      data[key] = observe(data[key]);
    }
    return this.proxy(data);
  }
  proxy(data) {
    return new Proxy(data, {
      get: (target, key, receiver) => {
        return Reflect.get(target, key, receiver);
      },
      set: (target, key, value) => {
        // 对于新添加的对象也要进行添加observe
        const result = Reflect.set(target, key, observe(value)); 
        return result;
      }
    });
  }
}
// 为了下面递归调用
function observe(data) {
  if (!data || typeof data !== 'object') {
    // 如果不是对象直接返回值
    return data;
  }
  return new Observe(data); // 调用类观察对象 Observe
}
class Mvvm {
  constructor(options = {}) {
    // 把options 赋值给 this.$options
    this.$options = options;
    // 把 options.data 赋值给 this._data
    let data = this._data = this.$options.data;
    let vm = this.initVm.call(this);

    // 把 this._data 的数据都添加到代理
    this.initObserve.call(this, data);

    // 要使得 Proxy 起作用，必须针对 Proxy 实例, 所以返回 Proxy 是实例
    return this._vm;
  }

  // 把 this._vm 添加代理
  initVm() {
    // 使用 Proxy 代理
    this._vm = new Proxy(this, {
      // 拦截get
      get: (target, key, receiver) => {
        return this[key] || this._data[key] || this._computed[key];
      },
      // 拦截set
      set: (target, key, value) => {
        return Reflect.set(this._data, key, value);
      }
    });
    return this._vm;
  }

  // 对 this._data 的数据添加代理
  initObserve(data) {
    this._data = observe(data); // 把所有observe都赋值到 this._data
  }
}

const mvvm = new Mvvm({
  el: '#app',
  data: {
    people: '人类这种生物',
    person: {
      hande: '机智的头部',
      foot: '行走的脚',
      breast: '坦荡的胸'
    },
    describe: '人呐就那样吧,什么都明白了...',
    prvAge: 10,
    nowAge: 1
  },
  computed: {
    age() {
      return this.nowAge + this.prvAge;
    }
  }
});

console.log(mvvm)
```

![_datat实现了代理](_data实现了代理.png "_datat实现了代理")

PS: 打印出 mvvm 对象, 对 _data 下的所有数据没有通过代理处理.

## 对 HTML 模板的编译

> 在 MVVM 构造函数中 添加 `new Compile(this.$options.el, vm)` 编译函数

```javascript
// 创建观察类
class Observe {
  constructor(data) {
    for (let key in data) {
      // 递归调用子对象, 通过层层递归添加proxy，把 _data 对象都添加一遍代理
      data[key] = observe(data[key]);
    }
    return this.proxy(data);
  }
  proxy(data) {
    return new Proxy(data, {
      get: (target, key, receiver) => {
        return Reflect.get(target, key, receiver);
      },
      set: (target, key, value) => {
        // 对于新添加的对象也要进行添加observe
        const result = Reflect.set(target, key, observe(value)); 
        return result;
      }
    });
  }
}
// html 模板编译类
class Compile {
  constructor(el, vm) {
    // 受 MVVM 管理的数据缓存
    this.vm = vm;
    // 受 MVVM 管理的 HTML 根节点
    let element = document.querySelector(el);

    // 为了性能,使用碎片添加操作元素
    let fragment = document.createDocumentFragment(); // 创建fragment代码片段
    // 把受 MVVM 管理的根节点添加到创建的 fragment 代码片段中
    fragment.append(element);
    // 模板的编译处理函数
    this.compile(fragment);

    document.body.appendChild(fragment);
  }
  compile(fragment) {
    // 获取缓存的的数据
    let vm = this.vm;
    // 循环操作子元素
    Array.from(fragment.childNodes).forEach((node) => {
        // 获取到文本
      let txt = node.textContent;

      // 匹配大括号 {{}} 中的变量  (这个需要优化, 如果大括号的两端有空格就有问题)
      let reg = /\{\{(.*?)\}\}/g;
      // 说明是文本节点
      if (node.nodeType === 3 && reg.test(txt)) {
        // 如果匹配到的，就替换文本
        node.textContent = txt.replace(reg, (matched, placeholder) => {
          let text = placeholder.split('.').reduce((obj, key) => {
            return obj[key]; // 如：获取到 vm.person.foot 对象的值
          }, vm);
          return text;
        });
      }
      // 如果还有字节点，并且长度不为0 
      if (node.childNodes && node.childNodes.length > 0) {
        // 直接递归匹配替换
        this.compile(node);
      }
    });
  }
}
// 为了下面递归调用
function observe(data) {
  if (!data || typeof data !== 'object') {
    // 如果不是对象直接返回值
    return data;
  }
  return new Observe(data); // 调用类观察对象 Observe
}
class Mvvm {
  constructor(options = {}) {
    // 把options 赋值给 this.$options
    this.$options = options;
    // 把 options.data 赋值给 this._data
    let data = this._data = this.$options.data;
    let vm = this.initVm.call(this);

    // 把 this._data 的数据都添加到代理
    this.initObserve.call(this, data);

    // 添加一个模板编译函数
    new Compile(this.$options.el, vm);

    // 要使得 Proxy 起作用，必须针对 Proxy 实例, 所以返回 Proxy 是实例
    return this._vm;
  }

  // 把 this._vm 添加代理
  initVm() {
    // 使用 Proxy 代理
    this._vm = new Proxy(this, {
      // 拦截get
      get: (target, key, receiver) => {
        return this[key] || this._data[key] || this._computed[key];
      },
      // 拦截set
      set: (target, key, value) => {
        return Reflect.set(this._data, key, value);
      }
    });
    return this._vm;
  }

  // 对 this._data 的数据添加代理
  initObserve(data) {
    this._data = observe(data); // 把所有observe都赋值到 this._data
  }
}

const mvvm = new Mvvm({
  el: '#app',
  data: {
    people: '人类这种生物',
    person: {
      hande: '机智的头部',
      foot: '行走的脚',
      breast: '坦荡的胸'
    },
    describe: '人呐就那样吧,什么都明白了...',
    prvAge: 10,
    nowAge: 1
  },
  computed: {
    age() {
      return this.nowAge + this.prvAge;
    }
  }
});

console.log(mvvm)
```

这样除了 HTML 模板页面的计算属性(computed中的age)的无法编译外都可以把数据值显示到页面了.

