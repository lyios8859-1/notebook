import './index.less';
import './font/iconfont.css';

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  });
});
const src = require('./34kb大小.png').default;

const r = document.getElementById('images');
const span = document.createElement('span');
span.classList.add('iconfont', 'icon-kouzhao');
const img = new Image();
img.id = '333';
img.src = src;
r.appendChild(img);
r.appendChild(span);
console.log(promise); // eslint-disable-line
