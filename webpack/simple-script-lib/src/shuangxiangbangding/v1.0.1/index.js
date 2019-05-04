// 修改属性的调用方式 myVue.data.test => myVue.test
function MyVue(data, el, exp) {
  this.data = data;

  // 修改属性的调用方式 myVue.data.test => myVue.test
  Object.keys(data).forEach(key => {
    this.proxyKeys(key); // 绑定代理属性
  });

  // 劫持数据
  observer(data);
  // 初始化模板数据的值
  el.innerHTML = this.data[exp];
  // 订阅
  new Watcher(this, exp, function(value) {
    el.innerHTML = value;
  });
}

// 绑定代理属性
MyVue.prototype.proxyKeys = function(key) {
  const _this = this;
  Object.defineProperty(this, key, {
    enumerable: false,
    configurable: true,
    get: function proxyGetter() {
      return _this.data[key];
    },
    set: function proxySetter(newValue) {
      _this.data[key] = newValue;
    }
  });
};
