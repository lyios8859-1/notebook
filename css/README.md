# CSS 的笔记

## CSS 书写顺序

- 1、位置属性(position, top, right, z-index, display, float等)
- 2、大小(width, height, padding, margin)
- 3、文字系列(font, line-height, letter-spacing, color- text-align等)
- 4、背景(background, border等)
- 5、其他(animation, transition等)

## 常见的盒子垂直并水平居中

1、position 和 margin 实现

html

```html
<div class="parentBox">
  <div class="childBox"></div>
</div>
```

css

```css
.parentBox {
  position: relative;
  /* 针对与relative绝对定位，最好是行级元素（可修改高宽） */
  display: inline-block;
  width: 400px;
  height: 400px;
  background: #ccc;
}
.childBox {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px; /*高度的一半*/
  margin-left: -50px; /*宽度的一半*/
  background: red;
}
```

2、translate 实现
html

```html
<div class="parentBox">
  <div class="childBox"></div>
</div>
```

css

``` css
.parentBox {
  position: relative;
  /* 针对与relative绝对定位，最好是行级元素（可修改高宽） */
  display: inline-block;
  width: 400px;
  height: 400px;
  background: #ccc;
}

.childBox {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);/*x和y方向的偏移*/
  background: red;
}
```

3、display: flex/grid 和 margin: auto;配合

html

```html
<div class="parentBox">
  <div class="childBox"></div>
</div>
```

css

```css
.parentBox {
  /* 垂直居中 flex，inline-flex， grid， inline-grid */
  display: flex;
  width: 400px;
  height: 400px;
  background: #ccc;
}

.childBox {
  /* 水平居中 */
  margin: auto;
  width: 100px;
  height: 100px;
  background: red;
}
```

## 一层 HTML 结构实现左右布局

> display: flex 与 margin-left: auto; 配合

html

```html
<div class="items">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
  </div>
```

css

```css
.items {
  /* display: flex; 核心*/
  display: flex;
  width: 500px;
  margin: 1px;
  text-align: center;
  background: #ccc;
}

.item {
  margin: 1px;
  width: 50px;
  color: #fff;
  background: red;
}

.items > .item:last-child {
  /* 最有一列向右对齐 */
  margin-left: auto;
}
```