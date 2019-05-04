// 修改属性的调用方式 myVue.data.test => myVue.test
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
