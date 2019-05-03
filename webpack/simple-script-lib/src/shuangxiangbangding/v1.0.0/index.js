// 将监听器（Observer）与订阅者（Watcher）关联起来
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
  return this;
}
