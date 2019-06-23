function reomveImgSrc() {
  let imgs = document.getElementsByTagName('img');
  let imgsArr = [].slice.call(imgs);
  imgsArr.forEach(el => {
    el.removeAttribute('src');
  });
}
reomveImgSrc();


function addScrollListener() {
  let lastKnownScrollPosition = 0;
  let topBarElement = null;
  let ticking = false;

  // 获取产生滚动条的 DIV
  let scrollbarDom = document.querySelector('.scrollbar');
  // 监听滚动事件
  scrollbarDom.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    // 滚动的位置
    lastKnownScrollPosition = scrollbarDom.scrollTop;

    if (!ticking) {
      // 解决快速滚动卡顿
      window.requestAnimationFrame(() => {
        console.log('<<<<', lastKnownScrollPosition);
        listTitleDomPositions.forEach((item) => {
          item.el.classList.remove('ly-contacts-on-top');
        });
        topBarElement = getTopbarElement(lastKnownScrollPosition);
        topBarElement && topBarElement.classList.add('ly-contacts-on-top');

        ticking = false;
      });
    }
    ticking = true;
  }, false);
}

// 全局变量
// 存放列表所有标题的位置
let listTitleDomPositions = [];

// 获取列表标题的位置
function getAllListTitlePositions() {
  let listTitleDoms = document.querySelectorAll('.ly-contacts-hooks');
  listTitleDomArr = [].slice.call(listTitleDoms);

  listTitleDomArr.forEach(function (el) {
    listTitleDomPositions.push({
      el: el,
      pos: el.offsetTop
      // pos: el.getBoundingClientRect().top// 这个是针对与窗口
    });
  });
}

// 获取到达顶部的列表标题元素
function getTopbarElement(scrollPosition) {
  let i = 0;
  let gutter = 20;
  while ((i < listTitleDomPositions.length) && scrollPosition + gutter >= listTitleDomPositions[i].pos) {
    i++;
  }
  if (i == 0) {
    return null;
  } else {
    return listTitleDomPositions[i - 1].el;
  }
}


getAllListTitlePositions();

addScrollListener();



