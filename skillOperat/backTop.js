/*
 * 回到页面顶部
 * @param {*} _
 *
 * 使用：scorllToTop();
 */
const scorllToTop = _ => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  if (top > 0) {
    window.requestAnimationFrame(scorllToTop);
    window.scrollTo(0, top - top / 8);
  }
};
/**
 * 确定页面的底部是否可见 true 则到底了
 *
 * @param {*} _
 *
 * bottomVisible();
 */
const bottomVisible = _ =>
  document.documentElement.clientHeight + window.scrollY >=
    document.documentElement.scrollHeight ||
  document.documentElement.clientHeight;

/**
 * 判断元素是否在可视窗口可见
 * 使用 Element.getBoundingClientRect() 和 window.inner(Width|Height) 值来确定给定元素是否在可视窗口中可见。 
 * 省略第二个参数来判断元素是否完全可见，或者指定 true 来判断它是否部分可见。
 * @param {*} el 
 * @param {*} partiallyVisible 
 * 
 * 
 * 举个例子，有一个 100x100 可视窗口， 和一个 10x10px 元素定位在 {top: -1, left: 0, bottom: 9, right: 10}
 * elementIsVisibleInViewport(el) -> false (not fully visible)
 * elementIsVisibleInViewport(el, true) -> true (partially visible)
 */
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
      ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom < = innerHeight && right <= innerWidth;
};

/**
 * 获取滚动条的位置
 * @param {*} el
 * 
 * 使用： getScrollPos() -> {x: 0, y: 200}
 */
const getScrollPos = (el = window) =>
  ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});