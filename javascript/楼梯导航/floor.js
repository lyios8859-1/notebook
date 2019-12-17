

const menuDocDom = document.getElementsByClassName('menuDoc')[0];
const ulHeight = menuDocDom.offsetHeight;
const menuDom = document.getElementsByClassName('menu')[0];
const contentDom = document.getElementsByClassName('content')[0];
const contentHeight = contentDom.offsetHeight;

window.onscroll = function() {
  let mTop = 0;
  const top = document.documentElement.scrollTop;
  mTop = (top * (ulHeight - menuDom.offsetHeight)) / (contentHeight - document.documentElement.clientHeight) + 2;
  // 滚动浏览器的滚动条是设置菜单的滚动条高度
  menuDom.scrollTo(0, mTop === 2 ? 0 : mTop);
};

// menuDom.onscroll = function() {
//   const top = menuDom.scrollTop;
//   mTop = (top * (contentHeight - document.documentElement.clientHeight)) / (ulHeight - menuDom.offsetHeight);
//   console.log(mTop);
//   // 滚动浏览器的滚动条是设置菜单的滚动条高度
//   document.documentElement.scrollTo(0, mTop === 2 ? 0 : mTop);
// };

const arr = ['头', 1, 2, 3, 4, 5, 6, 7, 8, 9, '尾'];
const len = arr.length;
let index = -1;
window.document.onkeydown = function(e) {
  if (e.keyCode === 38) {
    index = (index + 1 + len) % len;
  } else if (e.keyCode === 40) {
    index = (index - 1 + len) % len;
  }
  console.log(index);
};


let conHeight = 0;
let h = document.getElementsByClassName('content')[0].children[0].clientHeight;
menuDocDom.onclick = function (ev) {
  ev = ev || window.event;
  const target = ev.target;
  if (target.tagName === 'SPAN') {
    conHeight = target.dataset.index * h +  target.dataset.index * 10;
    console.log(target.dataset.index , conHeight);
    document.documentElement.scrollTo(0, conHeight);
    // style="scroll-behavior: smooth;"  平滑滚动， 产生滚动条的容器添加
  }
}