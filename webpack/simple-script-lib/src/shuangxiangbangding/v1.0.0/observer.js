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

// 创建监听者
// 如果需要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进行Object.defineProperty()处理
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
  //Dep.target = null;
}
