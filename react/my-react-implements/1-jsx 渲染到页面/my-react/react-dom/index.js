import Component from '../react/Component.js';
const MyReactDOM = {
  render
}

function setAttribute (el, key, value) {
  if (!el) return;
  if (key === 'className') {
    key = 'class';
  }

  //#region 设置属性
  // 如果是事件 onClick, onBlur ...
  if (/on\w+/.test(key)) {
    // 将事件转成原生 js 的写法 onclick, onblur ...
    key = key.toLowerCase();
    el[key] = value || '';
  } else if (key === 'style') { // 如果是 style 它的值可能是字符串,也可能是对象
    if (!value || typeof value === 'string') {
      el.style.cssText = value || '';
    } else if (value && typeof value === 'object') {
      // style={{width: '23px', height: '45px'}}
      for (let k in value) {
        if (typeof value[k] === 'number') {
          el.style[k] = value[k] + 'px';
        } else {
          el.style[k] = value[k];
        }
      }
    }
  } else {
    // 其他的属性 id title ...
    if (key in el) {
      el[key] = value || '';
    }
    if (value) {
      // 更新
      el.setAttribute(key, value);
    } else {
      el.removeAttribute(key);
    }
  }
  //#endregion
}

function render (vnode, container) {
  return container.appendChild(_render(vnode));
}

// 创建一个函数组件
function createComponent (comp, props) {

  let instance = null;

  // 如果是类(class)定义的组件
  if (comp.prototype && comp.prototype.render) {
    instance = new comp(props);
  } else {
    // 如果是 function 定义的函数组件,将函数组件转换成类 (class) 组件
    instance = new Component(props);
    instance.constructor = comp;
    instance.render = function () {
      return this.constructor(props); 
    };
  }
  return instance;
}

// 渲染组件
function renderComponent (comp) {
  let base = null;
  const render = comp.render();
  base = _render(render);
  comp.base = base;
}

// 设置组件属性
function setComponentProps (comp, props) {
  comp.props = props;

  // 渲染组件
  renderComponent(comp);
}

function _render(vnode) {
  if (!vnode) {
    console.error('vnode is not exit');
    return;
  }

  // 如何 vnode.tag 是函数, 表明是函数做组件
  if (typeof vnode.tag === 'function') {
    // 创建组件
    const comp = createComponent(vnode.tag, vnode.attrs);
    console.log('函数com', comp);
    // 设置组件属性
    setComponentProps(comp, vnode.attrs);
    // 返回组件渲染的节点
    return comp.base;
  }

  // 如果是普通字符串
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  // 如果是 虚拟 DOM 对象
  const { tag, attrs } = vnode;
  const el = document.createElement(tag);

  // 如果标签有属性 title="124" id="test"
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      setAttribute(el, key, attrs[key]);
    });
    setAttribute(el);
  }

  vnode.childrens && vnode.childrens.length && vnode.childrens.forEach(child => render(child, el));
  return el;
}

export default MyReactDOM;