import { createElement, render, renderDom } from './element.js';

const virtualDom = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['A']),
  createElement('li', {class: 'item'}, ['B']),
  createElement('li', {class: 'item'}, ['C']),
]);

console.log('virtualDom', virtualDom)
// 真实的 DOM 节点元素
const el = render(virtualDom);
// 将 DOM 元素节点插入到页面的 id="root" 的元素中
renderDom(el, document.getElementById('root'));
console.log('el', el);