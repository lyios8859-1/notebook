import src from './1.jpeg';
import './index.less';
console.log('kkkkkkkkkkkkkkkkkk');
const img = new Image();
img.src = src;
img.classList.add('imgStyle');
document.querySelector('#root').append(img);