// 获取列表项目中没一项的位置
function getAllListItemPosition() {
  // 需要滚动的列表项
  let ulDom = document.querySelector('.list-items-wrap');
  let listItem = ulDom.children;
  let listItems = [].slice.call(listItem);
  // 存储每个列表标题项的位置和该元素
  let listItemTitlePosition = [];
  listItems.forEach(el => {
    listItemTitlePosition.push({
      el: el.firstElementChild,
      pos: el.firstElementChild.offsetTop
    });
  });
  return listItemTitlePosition;
}

// 获取索引的元素
function getAllListIndexElement() {
  // 存储索引
  let listIndexElement = [];

  let ulDom = document.querySelector('.list-index');
  let listItem = ulDom.children;
  let listItems = [].slice.call(listItem);
  listItems.forEach(el => {
    listIndexElement.push({
      el: el,
    });
  });
  return listIndexElement;
}

// 获取某个列表标题元素的位置和设置新的索引
function getTopBarElement(scrollPosition) {
  let i = 0;
  let gutter = 20;
  let allListItemPosition = getAllListItemPosition();
  let allListIndexElement = getAllListIndexElement();
  let len = allListItemPosition.length;
  // 判断是否当前的列表标题项的位置小于滚动的高度就索引加 1 
  while ((i < len) && ((scrollPosition + gutter) >= allListItemPosition[i].pos)) {
    i++;
  }
  if (i == 0) {
    return null;
  } else {
    console.log(">>>> i= ", i);
    // 向上滚动 i 减 1；向下滚动 i 加 1;
    return {
      listItemElement: allListItemPosition[i - 1].el,
      listIndexElement: allListIndexElement[i - 1].el
    }
  }
}
let topBarElement = null;
let lastScrollPosition = 0;
// 滚动初始化
function scrollLisenter() {
  // 获取产生滚动条的元素
  const scrollbarDom = document.querySelector('.scrollbar');

  // 监听滚动事件
  scrollbarDom.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    // 滚动的距离
    lastScrollPosition = scrollbarDom.scrollTop;

    // 解决快速滚动卡顿
    window.requestAnimationFrame(() => {
      // 列表项标题
      let allListItemPosition = getAllListItemPosition();
      allListItemPosition.forEach(el => {
        el.el.classList.remove('active');
      });

      // 索引
      let allListIndexElement = getAllListIndexElement();
      allListIndexElement.forEach(el => {
        el.el.classList.remove('active');
      });

      topBarElement = getTopBarElement(lastScrollPosition);
      topBarElement && topBarElement.listItemElement.classList.add('active'), topBarElement.listIndexElement.classList.add('active');
    });
  }, false);
}

scrollLisenter();