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
  // 执行监听器里的get函数
  var value = this.vm.data[this.exp];
  // 释放自己
  Dep.target = null;
  return value;
};
