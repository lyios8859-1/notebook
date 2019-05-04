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
