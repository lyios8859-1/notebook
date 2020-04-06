import { Element, render, setElementAttr} from "./element";

let globalIndex = 0; // 给默认的节点打补丁
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';

function doPatch (node, patchs) {
  patchs.forEach(patch => {
    switch (patch.type) {
      case ATTRS:
        for (let key in patch.attrs) {
          const value = patch.attrs[key];
          if (value) {
            setElementAttr(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case TEXT:
        node.textContent = patch.text;
        break;
      case REMOVE:
        node.parentNode.removeChild(node);
        break;
      case REPLACE:
        let newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      default:
        break;
    }
  });
}

// 遍历
function walk (node, patchs) {
  const currentPatch = patchs[globalIndex++];
  const childNodes = node.childNodes;
  childNodes.forEach(child => {
    walk(child, patchs);
  });
  if (currentPatch) {
    // 更新视图
    doPatch(node, currentPatch);
  }
}

function patch (node, patchs) {
  // 给更新的节点做处理

  walk (node, patchs);
}

export default patch;