// 获取距离浏览器四边的距离
function getRect(element) {
  let rect = element.getBoundingClientRect();
  let top = document.documentElement.clientTop;
  let left = document.documentElement.clientLeft;
  return {
    top: rect.top - top,
    bottom: rect.bottom - top,
    left: rect.left - left,
    right: rect.right - left
  };
}
/**
 * 获取窗口的宽度和高度
 */
function getWindowWH() {
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  return {
    width: width,
    height: height
  };
}
