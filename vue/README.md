# Vuejs 学习

## :+1: Vue 的数据双向绑定原理

核心使用 ES5 的 API `Object.defineProperty()` 对数据的劫持，劫持数据处理后再再返回给使用者。Vue3.x 话说 通过 ES6 的 API `Proxy()` 来处理。

![vue 数据双向绑定原理](./vue数据双向绑定原理.png "vue 数据双向绑定原理")

PS:

1、实现一个 Observer 的监听器，用来劫持并监听所有的属性，如果有操作，则通知订阅者。

2、实现一个 Watcher 的订阅者，用来接收属性的变化通知并执行相应的函数，从而更新视图。

3、实现一个 Compile 的解析器，用来对页面的节点进行扫描并解析每个节点的相关指令，并初始化的模板数据和初始化相应的订阅器

- **创建一个监听器**
  > 实现一个 Observer 的监听器，如果需要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进行 Object.defineProperty()处理

```javascript
// 1,实现一个 Observer 的监听器，
// 如果需要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进行Object.defineProperty()处理
function defineReactive(data, key, value) {
  // 遍历递归所有的子属性
  observer(value);
  // 劫持数据
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
      console.log(
        "属性" + key + "已经被监听，现在值为：“" + newVal.toString() + "”"
      );
    }
  });
}

// 遍历属性
function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

// 测试
observer(Demo);
Demo.name = "Jerry";
```

- **接下来，需要一个订阅者容器**

> 订阅者容器（Dep），主要负责收集订阅者,然后在属性变化的时候去执行对应订阅者的更新函数.

```javascript
// 创建一个可以容纳订阅者的消息订阅器 Dep，主要负责收集订阅者，然后在属性变化的时候去执行对应订阅者的更新函数
// 因此修改一下上面的 Observer 监听器
function defineReactive(data, key, value) {
  // 遍历递归所有的子属性
  observer(value);
  // 创建一个消息订阅的容器 Dep,存放所有的订阅者
  const dep = new Dep();
  // 劫持数据
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 判断是否需要添加订阅者
      if (isAddWatcher) {
        // 需要添加订阅者 watcher
        dep.addSub(watcher);
      }
      return value;
    },
    set(newValue) {
      // 判断是否修改了原始的值
      if (val === newVal) {
        return;
      }
      console.log(
        "属性" + key + "已经被监听，以前的值为：“" + value.toString() + "”"
      );
      // 修改旧的值
      value = newValue;
      console.log(
        "属性" + key + "已经被监听，现在值为：“" + newValue.toString() + "”"
      );

      // 如果数据变化，通知所有订阅者 watcher
      dep.notify();
    }
  });
}

// 遍历属性
function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

// 订阅者容器
function Dep() {
  this.subs = [];
}
Dep.prototype.addSub = function(sub) {
  // 添加订阅者
  this.subs.push(sub);
};
Dep.prototype.notify = function() {
  // 通知对应订阅者的更新函数，（触发函数）
  this.subs.forEach(sub => {
    // 执行函数
    sub.update();
  });
};
```

- **接下来，需要创建一个订阅者**

> 创建一个订阅者 `Watcher`
> 初始化的时候需要将订阅者（Watcher）自己添加进订阅器 Dep 中，只需要在在初始化订阅者 Watcher 的时候出发 get 就可以了，即获取对应的属性值就即可触发，这非差容易理解。
> 此时，只需要在订阅者初始化（Watcher）初始化的时候才需要添加订阅这，因此，这一判断一下是否在初始化的时候判断是否添加订阅这。那么需要在订阅者容器 Dep 中缓存（Dep.target）一下订阅者，添加成功后，将其删除即可，

```javascript
// 创建一个订阅者
function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.cb = cb;
  this.exp = exp;
  // 将自己添加到订阅其的操作
  this.value = this.get();
}
Watcher.prototype.update = function() {
  this.run();
};
Watcher.prototype.run = function() {
  let value = this.vm.data[this.exp];
  let oldVal = this.value;
  if (value !== oldVal) {
    this.value = value;
    this.cb.call(this.vm, value, oldVal);
  }
};
Watcher.prototype.get = function() {
  // 缓存自己
  Dep.target = this;
  // 强制执行监听器里的get函数
  let value = this.vm.data[this.exp];
  // 释放自己
  Dep.target = null;
  return value;
};
```

与此同时，需要对监听器 Observer 修改一下，主要是对应订阅者 Watcher 类原型上的 get 函数。需要修改代码地方在 defineReactive 函数的 get 中

```javascript
function defineReactive(data, key, value) {
  // 遍历递归所有的子属性
  observer(value);
  // 创建一个消息订阅的容器 Dep,存放所有的订阅者
  const dep = new Dep();
  // 劫持数据
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 判断是否需要添加订阅者
      if (Dep.target) {
        // 需要添加订阅者 watcher
        dep.addSub(Dep.target);
      }
      return value;
    },
    set(newValue) {
      // 判断是否修改了原始的值
      if (val === newVal) {
        return;
      }
      console.log(
        "属性" + key + "已经被监听，以前的值为：“" + value.toString() + "”"
      );
      // 修改旧的值
      value = newValue;
      console.log(
        "属性" + key + "已经被监听，现在值为：“" + newValue.toString() + "”"
      );

      // 如果数据变化，通知所有订阅者 watcher
      dep.notify();
    }
  });
  Dep.target = null;
}
```

## 将监听器（Observer）和订阅者（Watcher）相关联

```javascript
// 将监听器（Observer）与订阅者（Watcher）关联起来，即可实现简单的数据双向绑定
function MyVue(data, el, exp) {
  this.data = data;
  // 劫持数据
  observer(data);
  // 初始化模板数据的值
  el.innerHTML = this.data[exp];
  // 订阅
  new Watcher(this, exp, function(value) {
    el.innerHTML = value;
  });
}
```

调用

```html
<body>
  <p id="test"></p>
</body>
```

```javascript
let ele = document.querySelector("#test");
let myVue = new MyVue(
  {
    test: "Tom"
  },
  ele,
  "test"
);
setTimeout(function() {
  console.log("test值改变了");
  // myVue.data.test 这种调用方式不是我们想要的，myVue.test 才是
  myVue.data.test = "Jerry";
}, 1000);
```

修改属性的调用方式 `myVue.data.test` => `myVue.test`

```javascript
// 修改属性的调用方式 myVue.data.test => myVue.test
function MyVue(data, el, exp) {
  this.data = data;
  // 劫持数据
  observer(data);
  // 初始化模板数据的值
  el.innerHTML = this.data[exp];
  // 订阅
  new Watcher(this, exp, function(value) {
    el.innerHTML = value;
  });
}
```

## 实现模板（Dom）的简单编译（Compile）

> - 1、解析模板的指令，并替换模板的数据，初始化视图
> - 2、将模板的指令对应的节点绑定对应的更新函数，初始化对应的订阅器

既然涉及到模板，那么就会涉及到 Dom 元素的获取和操作，先创建一个 fragment 片段，将需要解析的 Dom 节点放入 fragment 片段里再进行处理。

```javascript
// Dom 节点的统一插入处理
function nodeToFragment(el) {
  // 创建一个 Dom 碎片对象
  const fragment = document.createDocumentFragment();
  let child = el.firstChild;
  while (child) {
    // 将 Dom 元素存入 fragment 中
    fragment.appendChild(child);
    child = el.firstChild;
  }
  return fragment;
}
```

遍历各个节点处理指令，事件，以及 `{{}}` 大括号，这里先处理**大括号的解析**

```javascript
// 解析编译模板
function Compile(el, vm) {
  this.vm = vm;
  console.log(el);
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}

// Dom 节点的统一插入处理
Compile.prototype.init = function() {
  if (this.el) {
    this.fragment = this.nodeToFragment(this.el);
    this.compileElement(this.fragment);
    this.el.appendChild(this.fragment);
  } else {
    console.log("Dom元素不存在");
  }
};

// Dom 的文档碎片
Compile.prototype.nodeToFragment = function(el) {
  var fragment = document.createDocumentFragment();
  var child = el.firstChild;
  while (child) {
    // 将Dom元素移入fragment中
    fragment.appendChild(child);
    child = el.firstChild;
  }
  return fragment;
};

// 解析处理 {{}}
Compile.prototype.compileElement = function(el) {
  const _this = this;
  let childNodes = el.childNodes;
  [].slice.call(childNodes).forEach(function(node) {
    // 正则匹配 {{变量}} 不能有空格
    const reg = /\{\{(.*)\}\}/;
    const text = node.textContent;

    if (_this.isTextNode(node) && reg.test(text)) {
      // 判断是否是符合这种形式{{}}的指令
      _this.compileText(node, reg.exec(text)[1]);
    }

    if (node.childNodes && node.childNodes.length) {
      // 继续递归遍历子节点
      _this.compileElement(node);
    }
  });
};

// 填充数据到视图模板中
Compile.prototype.compileText = function(node, exp) {
  const _this = this;
  const initText = _this.vm[exp];
  // 将初始化的数据初始化到模板视图中
  _this.updateText(node, initText);
  new Watcher(_this.vm, exp, function(value) {
    // 生成订阅器并绑定更新函数
    _this.updateText(node, value);
  });
};

// 把数据插入到模板中
Compile.prototype.updateText = function(node, value) {
  node.textContent = typeof value == "undefined" ? "" : value;
};

// 检测是否是文本节点
Compile.prototype.isTextNode = function(node) {
  return node.nodeType == 3;
};
```

将解析器 Compile 与监听器 Observer 和订阅者 Watcher 关联

```javascript
function MyVue(options) {
  const _this = this;
  _this.vm = this;
  _this.data = options.data;

  // 修改属性的调用方式 myVue.data.test => myVue.test
  Object.keys(_this.data).forEach(key => {
    // 绑定代理属性
    _this.proxyKeys(key);
  });

  // 劫持数据
  observer(_this.data);
  // 编译模板
  new Compile(options.el, _this.vm);
  return _this;
}

// 绑定代理属性
MyVue.prototype.proxyKeys = function(key) {
  const _this = this;
  Object.defineProperty(_this, key, {
    enumerable: false,
    configurable: true,
    get() {
      return _this.data[key];
    },
    set(newValue) {
      _this.data[key] = newValue;
    }
  });
};
```

调用>测试：

html

```html
<div id="test">
  <!-- {{}} 中不能有空格-->
  <p>{{name}}</p>
  <p>{{age}}</p>
</div>
```

js

```javascript
const myVue = new MyVue({
  el: "#test",
  data: {
    name: "Tom",
    age: 998
  }
});
setTimeout(function() {
  console.log("name值改变了");
  myVue.name = "Jerry";
}, 1000);
setTimeout(function() {
  console.log("age值改变了");
  myVue.age = 100;
}, 2000);
```

- **指令的解析编译**

添加一个 v-model 指令和事件指令的解析编译，对于这些节点我们使用函数 compile 进行解析处理

```javascript
function compile(node) {
  const nodeAttrs = node.attributes;
  const _this = this;
  Array.prototype.forEach.call(nodeAttrs, attr => {
    const attrName = attr.name;
    if (_this.isDirective(attrName)) {
      const exp = attr.value;
      const dir = attrName.substring(2);
      if (_this.isEventDirective(dir)) {
        // 事件指令
        _this.compileEvent(node, _this.vm, exp, dir);
      } else {
        // v-model 指令
        _this.compileModel(node, _this.vm, exp, dir);
      }
      node.removeAttribute(attrName);
    }
  });
}
```

PS: 把该函数挂在到 Compile 的原型上;首先遍历所有节点属性，然后再判断属性是否是指令属性。再区分是哪种指令，在对应处理函数

此时，修改 MyVue 类

```javascript
function MyVue(options) {
  const _this = this;
  this.data = options.data;
  this.methods = options.methods;

  Object.keys(this.data).forEach(key => {
    _this.proxyKeys(key);
  });

  observe(this.data);
  new Compile(options.el, this);
  // 所有事情处理好后执行mounted函数
  options.mounted.call(this);
}
```

调用>测试

html

```html
<div id="test">
  <p>{{name}}</p>
  <input v-model="name" />
  <p>{{age}}</p>
  <button v-on:click="clickMe">click me!</button>
</div>
```

## :+1: Vue2.x 生命周期

![Vue2的生命周期](./Vue2的生命周期.png "Vue2的生命周期")

## :+1: Vue 组件

> `Vue.extend(options);` options 是对象；使用基础 Vue 构造器，创建一个子类，参数是一个包含组件选项的对象，data 选项是特例，它必须是函数。

```javascript
let BaseExtendComponent = Vue.extend({
  name: "BaseExtendComponent",
  template: "<h2>== {{name}} ==</h2>",
  data() {
    return {
      name: "Timly"
    };
  }
});

// 用法一，创建一个 BaseExtendComponent 实例，挂载到元素上
new BaseExtendComponent().$mount("#lyTest");

// 用法二，将组件注册到  Vue.component(); 全局方法里面
Vue.component(BaseExtendComponent.name, BaseExtendComponent);
// 页面使用
<div class="component">
  <BaseExtendComponent />
</div>;

// 用法三，将组件注册为局部组件
new Vue({
  el: "#app",
  data() {
    return {};
  },
  components: {
    BaseExtendComponent
  }
});
// 页面使用
<div class="component">
  <BaseExtendComponent />
</div>;
```

- **Vue.extends**

```javascript
let extendsObj = {
  updated() {
    console.log("我是扩展的updated");
  },
  methods: {
    //这个并没有被执行，如果方法名一样，只执行构造器里面的原生方法，混入跟扩展类似
    add() {
      console.log("我是扩展出来的方法");
      this.num++;
    }
  }
};

new Vue({
  el: "#app",
  data() {
    return {
      num: 1
    };
  },
  methods: {
    add() {
      console.log("我是原生的方法");
      this.num++;
    }
  },
  //全局的最优先，混入的先执行，原生的后执行，下面的后执行
  updated() {
    console.log("我是原生的update");
  },
  //下面扩展放的是对象，而混入放的是数组
  extends: extendsObj,
  delimiters: ["${", "}"]
});
```

## Vue 中子组件调用父组件的方法

**方法一：**
通过 `this.$parent` 实现，如：`this.$parent.eventName()`

```javascript
// 父组件
<template>
  <div class="parentCom">
    <child></child>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  name: "ParentCom",
  components: {
    child
  },
  methods: {
    parentMethods() {
      console.log("test");
    }
  }
}
</script>

/****************************************************/

// 子组件
<template>
  <div class="childCom">
    <button @click="childMethods"></button>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  name: "ChildCom",
  methods: {
    childMethods()
      // 子组件调用父组件的方法
      this.$parent.parentMethods();
    }
  }
}
</script>
```

**方法二：**
通过 `this.$emit`, 如：`this.$emit("eventName", paramers)`

```javascript
// 父组件
<template>
  <div class="parentCom">
    <child :fatherMethods="parentMethods"></child>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  name: "ParentCom",
  components: {
    child
  },
  methods: {
    parentMethods() {
      console.log("test");
    }
  }
}
</script>

/****************************************************/

// 子组件
<template>
  <div class="childCom">
    <button @click="childMethods"></button>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  name: "ChildCom",
  methods: {
    childMethods()
      // 子组件触发父组件的方法
      this.$emit("childMethods", "参数");
    }
  }
}
</script>
```

## Vue 中的一些事件处理

v-on: 缩写 @

```javascript
// 绑定多个事件
<button @click="doSomething" @mousedown="doMousedown" @mouseup="doMouseup">绑定多个事件</button>

// 2.4.0+，对象方式绑定多个事件
<button v-on:={click: doSomthing1, mousedown: doMousedown, mouseup: doMouseup}>对象方式绑定多个事件</button>

// 阻止冒泡
<button @click.stop="doSomething">阻止冒泡</butto>

// 阻止默认行为
<button @click.prevent="doSomething">阻止默认行为</butto>

// 阻止冒泡和默认行为
<button @click.stop.prevent="doSomething">阻止冒泡和默认行为</butto>

// 点击只触发一次
<button v-on：click.once="doSomething">点击只触发一次</butto>
```
