import src from './1.jpeg';
import './font/iconfont.css'
import './index.less'; // 这样是全局部引入是没有作用的
const img = new Image();
img.src = src;
img.classList.add('imgStyle');

consoled.log('kkkkkkkkk')
document.querySelector('#root').append(img);