# 懒加载与预加载

## 懒加载

> 又叫延迟加载，通常针对于图像（很长的页面），在用户滚动页面之前，在用户可视区域之外的信息不会加载。

1、提升用户体检
2、减少无效的资源加载
3、防止并发加载资源过多阻塞 js 加载

**原理**：将图片的 `src` 属性设置空字符串（或者贼小的 loading 图），图片的真实路径则设置在 `data-original` 属性中，当页面滚动的时去监听 `scroll` 事件，在 `scroll` 事件的回调中，判断我们的延迟加载的图片是否进入可视区域，如果图片已经进入可视区内则将图片的 `src` 属性设置为 `data-original` 的值，这样即可实现懒加载。

html

```html
<style>
  img.img-item {
    display: block;
    margin-top: 50px;
    /* 图片高度必须设置，占位 */
    height: 300px;
  }
</style>
<div class="img-container">
  <img src="" lazyload="true" data-original="img/1.png" />
  <img src="" lazyload="true" data-original="img/2.png" />
  <img src="" lazyload="true" data-original="img/3.png" />
  <img src="" lazyload="true" data-original="img/4.png" />
  <img src="" lazyload="true" data-original="img/5.png" />
  <img src="" lazyload="true" data-original="img/6.png" />
  <img src="" lazyload="true" data-original="img/7.png" />
  <img src="" lazyload="true" data-original="img/8.png" />
</div>
```

js

```javascript
// 获取(屏幕)可视区域的高度 IE，火狐，谷歌，360浏览器，Safari都支持
let vH = document.documentElement.clientHeight;

// 处理函数
const lazyload = () => {
  // 获取所有的图片 DOM
  let imgDom = document.querySelectorAll("img[data-original][lazyload]");

  Array.prototype.forEach.call(imgDom, (ietm, index) => {
    let rect = null;
    if (Object.is(item.dataset.original, "")) {
      // 如果不需要延迟加载的就返回
      return;
    }
    // 获取页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
    rect = item.getBoundingClientRect();
    // 进入可视区域
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      (funciton () {
        let img = new Image();
        img.src = item.dataset.original;
        img.onload = () => {
          item.src = img.src;
        }
        //移除属性，下次不再遍历
        item.removeAttribute("data-original");
        item.removeAttribute("lazyload");
      })();
    }
  });
};

// 首次调用
lazyload();
// 滚动调用
document.addEventListener("scroll"，lazyload);
```

PS:
**屏幕可视窗口大小**:

```javascript
// js原生
window.innerHeight /*标准浏览器及IE9+*/ ||
document.documentElement.clientHeight /*标准浏览器及低版本IE标准模式*/ ||
  document.body.clientHeight;
/*document.body.clientHeight，低版本混杂模式,
 需要设置 css 样式：
  body {
    height: 100%;
    overflow: hidden;
  }
  body, div, p, ul {
    margin: 0;
    padding: 0;
  }
*/

// jquery
$(window).height();
```

**浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离**：

```javascript
// js 原生
window.pagYoffset /*标准浏览器及IE9+*/ ||
document.documentElement.scrollTop /*兼容ie低版本的标准模式*/ ||
  document.body.scrollTop /*兼容混杂模式*/;

// jQuery
$(document).scrollTop();
```

**获取元素的尺寸**：

```javascript
// jquery    <==>    js 原生
$(o).width() = o.style.width;
$(o).innerWidth() = o.style.width+o.style.padding;
$(o).outerWidth() = o.offsetWidth = o.style.width+o.style.padding+o.style.border；
$(o).outerWidth(true) = o.style.width+o.style.padding+o.style.border+o.style.margin；
```

PS:
要使用原生的 `style.xxx` 方法获取属性，这个元素必须已经有内嵌的样式，如 `<div style="...."></div>`;
如果原先是通过外部或内部样式表定义 css 样式，必须使用 `o.currentStyle[xxx] || document.defaultView.getComputedStyle(0)[xxx]` 来获取样式值.
