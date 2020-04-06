import { createElement, render, renderDom } from './element.js';

import diff from './diff.js';
import patch from './patch.js';

const virtualDom1 = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['A']),
  createElement('li', {class: 'item'}, ['B']),
  createElement('li', {class: 'item'}, ['C']),
]);

const virtualDom2 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {class: 'item', style: 'color: red;'}, ['D']),
  createElement('li', {class: 'item2'}, ['B']),
  createElement('div', {class: 'item'}, ['e']),
]);


// 真实的 DOM 节点元素
const el = render(virtualDom1);
// // 将 DOM 元素节点插入到页面的 id="root" 的元素中
renderDom(el, document.getElementById('root'));

// diff 虚拟 DOM 节点
const patchs = diff(virtualDom1, virtualDom2);

// 把更新后的节点补丁信息，去修改真实的 DOM 节点, 更新视图

patch(el, patchs);

// 问题
/**
 * 1, 如果只是平级元素调换位置有问题，
 * 2, 如果新增节点会有问题
 */