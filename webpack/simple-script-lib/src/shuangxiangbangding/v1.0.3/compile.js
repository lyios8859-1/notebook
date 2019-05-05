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
    //检测是否是元素节点
    if (_this.isElementNode(node)) {
      _this.compile(node);
    } else if (_this.isTextNode(node) && reg.test(text)) {
      // 检测是否是文本节点
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

// 节点 v-model 值处理
Compile.prototype.modelUpdater = function(node, value, oldValue) {
  node.value = typeof value == "undefined" ? "" : value;
};

// 解析指令和事件
Compile.prototype.compile = function(node) {
  const _this = this;
  const nodeAttrs = node.attributes;
  Array.prototype.forEach.call(nodeAttrs, attr => {
    let attrName = attr.name;
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
};
// 解析 v-model 指令
Compile.prototype.compileModel = function(node, vm, exp, dir) {
  const _this = this;
  let val = _this.vm[exp];
  _this.modelUpdater(node, val);
  new Watcher(_this.vm, exp, value => {
    _this.modelUpdater(node, value);
  });
  // v-model 指针对于文本框
  node.addEventListener("input", e => {
    let newValue = e.target.value;
    if (val === newValue) {
      return;
    }
    _this.vm[exp] = newValue;
    val = newValue;
  });
};

// 解析事件指令
Compile.prototype.compileEvent = function(node, vm, exp, dir) {
  let eventType = dir.split(":")[1];
  let cb = vm.methods && vm.methods[exp];

  if (eventType && cb) {
    node.addEventListener(eventType, cb.bind(vm), false);
  }
};
// 判断是 "v-" 指令
Compile.prototype.isDirective = function(attr) {
  return attr.indexOf("v-") == 0;
};

// 判断 "on:" 事件指令
Compile.prototype.isEventDirective = function(dir) {
  return dir.indexOf("on:") === 0;
};

// 检测是否是元素节点
Compile.prototype.isElementNode = function(node) {
  return node.nodeType == 1;
};

// 检测是否是文本节点
Compile.prototype.isTextNode = function(node) {
  return node.nodeType == 3;
};
