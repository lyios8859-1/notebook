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