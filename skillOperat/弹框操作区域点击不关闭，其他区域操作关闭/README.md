# 弹框操作区域点击不关闭，其他区域操作关闭

```html
<style>
  .box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #ccc;
  }
  .box1 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 300px;
    margin-left: -250px;
    margin-top: -150px;
    background: #ddd;
  }
</style>

<div class="box">
  <div class="box1">
    操作区域
  </div>
</div>
```

```javascript
// 点击其他区域，隐藏指定区域
document.querySelector(".box").addEventListener(
  "click",
  ev => {
    ev.stopPropagation();
    // 操作区域
    const cDom = document.querySelector(".box1");
    // 非操作区域
    const tDom = ev.target;
    if (cDom == tDom || cDom.contains(tDom)) {
      // 操作区域的代码
      console.log(cDom, tDom, cDom.contains(tDom));
      alert(1);
    } else {
      // 点击非操作区域关闭指定的区域
      tDom.style.display = "none";
      console.log(cDom, tDom, cDom.contains(tDom));
    }
  },
  false
);
```
