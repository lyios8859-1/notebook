import src from './1.jpeg';
import './font/iconfont.css'
import './index.less'; // 这样是全局部引入是没有作用的

import counter from './count.js';
counter();

const img = new Image();
img.src = src;
img.classList.add('imgStyle');

console.log('顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶的');
const root = document.querySelector('#root');
root.append(img);

const btn = document.createElement('button');
btn.innerHTML = 'btn';
btn.id = 'btn';
root.append(btn);
let i = 0;
btn.onclick = function () {
    const divDom = document.createElement('div');
    divDom.innerHTML = 'item' + (i++);
    divDom.className = 'item'
    document.body.appendChild(divDom);
};

if (module.hot) {
    console.log('hot');
    module.hot.accept();
}