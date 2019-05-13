// 判断是否有滚动条出现
function hasScrollbar(div) {
  let isShowScroll = false;
  if (div) {
    isShowScroll = div.scrollHeight > div.clientHeight;
  } else {
    isShowScroll =
      document.body.scrollHeight >
      (window.innerHeight || document.documentElement.clientHeight);
  }
  return isShowScroll;
}
/********************
 * 取窗口滚动条高度
 ******************/
function getScrollTop() {
  let scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}
/********************
 * 取窗口可视范围的高度
 *******************/
function getWindowHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    let clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    let clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
}
/********************
 * 取文档内容实际高度
 *******************/
function getScrollHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
}
function test() {
  if (getScrollTop() + getClientHeight() == getScrollHeight()) {
    alert("到达底部");
  } else {
    alert("没有到达底部");
  }
}

// 判断某个元素的滚动条已经到底了
function isCheckScrollBottom(div) {
  let nDivHight = div.offsetHeight; // 元素自身的高度
  let nScrollHight = div.scrollHeight; //滚动距离总长(注意不是滚动条的长度)
  let nScrollTop = div.scrollTop; //滚动到的当前位置
  if (nScrollTop + nDivHight >= nScrollHight) {
    console.log("已经到底！");
    return true;
  } else {
    return false;
  }
}
export default {
  getWindowHeight,
  getScrollHeight,
  getScrollTop,
  hasScrollbar,
  isCheckScrollBottom
};
