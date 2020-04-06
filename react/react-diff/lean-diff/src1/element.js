class Element {
  constructor (type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

function createElement (type, props, children) {
  return new Element(type, props, children);
}

// 为元素设置属性
function setElementAttr (node, key, value) {
  switch (key) {
    case 'value': // 判断是一个 input 或 textarea
      const elNodeName = node.tagName.toUpperCase();
      if (elNodeName === 'INPUT' || elNodeName === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style': 
      node.style.cssText = value;
      break;
    case 'className': 
      node.setAttribute('class', value);
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}
// 将 vnode 转换成真实 DOM
function render (elObj) {
  const el = document.createElement(elObj.type);

  for (let key in elObj.props) {
    setElementAttr(el, key, elObj.props[key]);
  }
  if (elObj.children && elObj.children.length > 0) {
    elObj.children.forEach(childElement => {
      childElement = (childElement instanceof Element) ? render(childElement) : document.createTextNode(childElement);
      el.appendChild(childElement);
    });
  }

  return el;
}

// 将真实的 DOM 插入页面
function renderDom (el, target) {
  target.appendChild(el);
}

export {
  createElement,
  render,
  renderDom
}