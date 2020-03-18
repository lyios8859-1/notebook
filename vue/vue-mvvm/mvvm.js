// 解析不同指令或者文本编译集合
const CompileUtil = {
  // 根据表达 'school.name' 获取对应的数据, 在绑定 key 上对应的值，从 vm.$data 中取到, 
  getValue (vm, expr) {
    return expr.split('.').reduce((prev, next) => {
      return prev[next.trim()];
    }, vm.$data);
  },
  // 获取文本编译后的对应的数据
  getTextValue (vm, expr) {
    const reg = /\{\{(.+?)\}\}/g;
    return expr.replace(reg, (...args) => {
      return this.getValue(vm, args[1]);
    });
  },
  setValue(vm, expr, value) { // 从 vm.$data 中取值 ‘school.name’ 把 value 的值赋值给
    expr.split('.').reduce((data, current, index, arr) => {
      if (index === arr.length - 1) {
        return data[current] = value;
      }
      return data[current];
    }, vm.$data);
  },
  // 文本 
  text (node, vm, expr) { // expr {{a}} {{b}} {{c}}
    const textUpdateFn = this.updater['textUpdate'];
    const reg = /\{\{(.+?)\}\}/g;
    const text = expr.replace(reg, (...args) => {
      new Watcher(vm, args[1], () => {
        textUpdateFn(node, this.getTextValue(vm, expr));
      });
      return this.getValue(vm, args[1]);
    });
    textUpdateFn(node, text);
  },
  // 输入框
  model (node, vm, expr) {
    // 给输入框属性 value 赋值 node.value = xxx
    const modelUpdateFn = this.updater['modelUpdate'];

    // 给数据框添加一个观察者，观察数据变化
    new Watcher(vm, expr, newVal => {
      modelUpdateFn(node, newVal);
    });
    node.addEventListener('input', e => {
      // 获取当前输入的数据
      const value = e.target.value;
      this.setValue(vm, expr, value);
    });
    const value = this.getValue(vm, expr);
    modelUpdateFn(node, value);
  },
  // html 标签内容
  html (node, vm, expr) {
    const htmlUpdateFn = this.updater['htmlUpdate'];
    new Watcher(vm, expr, () => {
      htmlUpdateFn(node, this.getValue(vm, expr));
    });
    const html = this.getValue(vm, expr);
    htmlUpdateFn(node, html);
  },
  on (node, vm, expr, eventName) { // expr 'v-on:click'= "change"
    node.addEventListener(eventName, (event) => {
      vm[expr].call(vm, event);
    });
  },
  // 更新函数
  updater: {
    // 文本赋值 node.textContent = xxx
    textUpdate (node, value) {
      node.textContent = value;
    },
    // 输入框 value 赋值
    modelUpdate (node, value) {
      node.value = value;
    },
    // 元素内容 node.innerHTML = xxx
    htmlUpdate (node, value) {
      node.innerHTML = value;
    }
  }
}

// 模板编译
class Compiler {
  constructor (el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 把当前节点中的元素获取，将其放入内存中
    const fragment = this.node2fragment(this.el);
    
    // 替换这个节点中的动态数据

    // 编译这些节点模板，添加数据
    this.compile(fragment);
    // 内容添加到页面
    this.el.appendChild(fragment);
  }

  // 模板编译,对存放在内存中的节点解析
  compile (node) {
    const childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        // element 元素节点
        this.compileElement(child);

        // 递归遍历子元素
        this.compile(child)

      } else {
        // text 文本节点
        this.compileText(child);
      }
    });
  } 

  // 解析文本节点
  compileText (node) {
    // 判断文本中是否包含 {{}}
    const text = node.textContent;
    // const reg = /\{\{([^}]+)\}\}/g;
    const reg = /\{\{(.+?)\}\}/g;
    if (reg.test(text)) {
      CompileUtil['text'](node, this.vm, text); // {{xxx}}
    }
  }

  // 解析元素节点
  compileElement (node) {
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      let { name, value: expr } = attr;
      // 如果是自定义指令，如：v-model, v-html, v-bind ...
      if (this.isDirective(name)) {
        if (name.includes(':')) {
          const [,directive] = name.split('-');
          const [directiveName, eventName] = directive.split(':');
          CompileUtil[directiveName](node, this.vm, expr, eventName);
        } else {
          const [,directive] = name.split('-');
          CompileUtil[directive](node, this.vm, expr);
        }

        
      }
    });
  }

  // 判断标签上是否有自定义指令
  isDirective (attName) {
    return attName.startsWith('v-');
  }

  // 判断元素节点
  isElementNode (node) {
    return node.nodeType === 1;
  }
  // 获取节点中的所有孩子节点,放如内存中
  node2fragment (node) {
    const fragment = document.createDocumentFragment();
    let firstChild = null;
    while (firstChild = node.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
}

// 数据劫持
class Observer {
  constructor (data) {
    this.observer(data);
  }

  observer (data) {
    if (data && typeof data === 'object') {
      for (const key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  // 数据劫持
  defineReactive (soureObj, key, value) {
    const _this = this;
    _this.observer(value);
    const dep = new Dep(); // 给每一个属性添加一个发布订阅的功能
    Object.defineProperty(soureObj, key, {
      get () {

        // 创建 Watcher 实例时，获取对应的信息
        Dep.target && dep.subs.push(Dep.target);
        return value;
      },
      set (newVal) { // {school:{name: '圣湖元'}}
        if (newVal !== value) {
          _this.observer(newVal);
          value = newVal;
          // 通知订阅者数据变化了
          dep.notify();
        }
      }
    });
  }
}

// 通知中心，存放观察者
class Dep {
  constructor () {
    // 存放所有的观察者 Watcher
    this.subs = [];
  }

  // 订阅 （添加观察者 Watcher）
  addSub (watcher) {
    this.subs.push(watcher);
  }

  // 发布（通知）
  notify () {
    this.subs.forEach(watcher => watcher.update());
  }
}

// 观察者模式（观察者模式包含发布订阅模式）
class Watcher {
  // expr: 表达式, cb: 数据改变后需要执行的回调函数
  constructor (vm, expr, callback) {
    this.vm = vm;
    this.expr = expr;
    this.callback = callback;
    // 默认，存放旧数据
    this.oldValue = this.get();
  }

  get () {
    Dep.target = this;
    // 获取旧的数据
    const oldValue = CompileUtil.getValue(this.vm, this.expr);
    Dep.target = null;
    return oldValue;
  }

  // 更新操作，数据变化后, 会调用观察者的该 update 方法
  update () {
    // 获取新的数据
    const newValue = CompileUtil.getValue(this.vm, this.expr);
    if (newValue !== this.oldValue) {
      this.callback(newValue);
    }
  }
}

class Vue {
  constructor (options) {
    this.$el = options.el;
    this.$data = options.data;

    const computed = options.computed;
    if (this.$el) {
      // 数据劫持
      new Observer(this.$data);
      
      // 监听计算属性
      const _this = this;
      for (const key in computed) {
        Object.defineProperty(this.$data, key, {
          get () {
            return computed[key].call(_this);
          }
        });
      }

      const methods = options.methods;

      for (const key in methods) {
        Object.defineProperty(this, key, {
          get () {
            return methods[key];
          }
        });
      }

      // 把 vm.$data 都代理到 vm上，直接 通过 vm.xxx获取数据，不代理的话，必须 vm.$data.xxx
      this.proxyVm(this.$data);

      // 编译模板，数据动态替换
      new Compiler(this.$el, this);
    }
  }
  proxyVm (data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get () {
          return data[key];
        },
        set (newVal) {
          if (newVal !== data[key]) {
            data[key] = newVal;
          } 
        }
      });
    }
  }
}