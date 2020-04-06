

// 对比元素节点的属性
function diffAttr (oldAttrs, newAttrs) {
  const attrsPatch = {};

  for (let key in oldAttrs) {
    // 判断旧的元素节点的属性与新的元素节点的属性不一样
    if (oldAttrs[key] !== newAttrs[key]) {
      attrsPatch[key] = newAttrs[key]; // 有可能是 undefined
    }
  }

  for (let key in newAttrs) {
    /*
    ({}).hasOwnProperty.call(foo, 'bar'); // true
    // 也可以使用 Object 原型上的 hasOwnProperty 属性
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
    */
    // 对比旧的元素节点没有新的元素节点属性
    if (!Object.prototype.hasOwnProperty.call(oldAttrs, key)) {
      attrsPatch[key] = newAttrs[key];
    }
  }

  console.log('attrsPatch', attrsPatch)
  return attrsPatch;
}

function isString (node) {
  return Object.prototype.toString.call(node) === '[object String]';
}

// 对子节点对比
function diffChildren (oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++globalIndex, patches);
  });
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let globalIndex = 0;

// 遍历树，生成补丁包
function walk (oldNode, newNode, index, patches) {
  // 存放有更改的元素节点信息
  let currentPatch = [];
  if (!newNode) {
    currentPatch.push({
      type: REMOVE,
      index: index
    });
  } else if (isString(oldNode) && isString(newNode)) {
    // 判断文本是否一样，不一样就修改了
    if (oldNode !== newNode) {
      currentPatch.push({
        type: TEXT,
        text: newNode
      });
    }
  } else if (oldNode.type === newNode.type) { // 判断元素节点类型一样
    // 对比该元素节点的属性是否有更改
    let attrs = diffAttr(oldNode.props, newNode.props);
    // 如果有属性更改
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({
        type: ATTRS,
        attrs: attrs
      });
    }
    // 如果存在子节点, 注意这里要判读，否则有问题
    diffChildren(oldNode.children, newNode.children, index, patches);
  } else {
    // 如果元素不是相同的, 节点被替换了
    currentPatch.push({
      type: REPLACE,
      newNode: newNode
    });
  }

  // 判断是否存在更改的补丁
  if (currentPatch.length > 0) {
    // 将更改后的元素对应其旧元素
    patches[index] = currentPatch;
    console.log('patches', patches)
  }
}

/**
 * 对比规则：
 * 1, 当元素节点类型相同是，再对比该元素节点的属性是否相同，产生一个新的属性补丁包：{type: "ATTRS", attrs: {class: "list-group"}}
 * 2, 对比新的 DOM 节点不存在：{type: "REMOVE", index: "记录该节点的位置"}
 * 3, 如果元素节点的类型不同，直接替换旧的元素节点：{type: "REPLACE", newNode: "记录新节点的信息"}
 * 4, 如果元素节点的文本有变化：{type: "TEXT", text: "记录文本信息"}
 */
function diff (oldTree, newTree) {
  const patches = {};
  // 递归遍历树, 比较的结果存放到补丁包中
  walk(oldTree, newTree, globalIndex, patches);
  return patches;
}

export default diff;