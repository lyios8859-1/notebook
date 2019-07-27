const Demo = {
  name: "Timly",
  info: {
    age: 23,
    sex: "boy"
  }
};

debugger;
// 如果需要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进行Object.defineProperty()处理
function defineReactive(data, key, value) {
  debugger;
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
      if (value === newValue) {
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
Dep.prototype.addSub = function() {
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

// 初始化的时候需要将订阅者（Watcher）自己添加进订阅器 Dep 中，只需要在在初始化订阅者 Watcher 的时候出发 get 就可以了，即获取对应的属性值就即可触发，这非差容易理解。
// 此时，只需要在订阅者初始化（Watcher）初始化的时候才需要添加订阅这，因此，这一判断一下是否在初始化的时候判断是否添加订阅这。那么需要在订阅者容器 Dep 中缓存（Dep.target）一下订阅者，添加成功后，将其删除即可，

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
  var value = this.vm.data[this.exp];
  var oldVal = this.value;
  if (value !== oldVal) {
    this.value = value;
    this.cb.call(this.vm, value, oldVal);
  }
};
Watcher.prototype.get = function() {
  // 缓存自己
  Dep.target = this;
  // 强制执行监听器里的get函数
  var value = this.vm.data[this.exp];
  // 释放自己
  Dep.target = null;
  return value;
};
observer(Demo);
Demo.name = "Jerry";

export default Demo;
