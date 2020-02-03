import avator from './1.jpeg';
const img = new Image();
console.log(img)
img.src = avator;
const root = document.getElementById('root');
root.appendChild(img);