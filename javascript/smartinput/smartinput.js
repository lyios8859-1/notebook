let index = -1;
window.onload = function() {
  const smartUl = document.querySelector("#smartItem");
  const smartLi = smartUl.children;
  const input = smartUl.previousElementSibling;

  input.onkeydown = function(event) {
    const ev = event || window.event;
    let code = ev.keyCode;
    switch (code) {
      case 38:
        ev.preventDefault();
        keyUpDown(38, smartUl);
        break;
      case 40:
        ev.preventDefault();
        keyUpDown(40, smartUl);
        break;
      case 13:
        keyUpDown(13, smartUl);
        break;
      default:
        break;
    }
  };

  // 获取焦点, 显示选项面板
  input.onfocus = function() {
    smartUl.style.display = "block";
  };

  // 键盘按下
  function keyUpDown(code, scrollContainer) {
    const isScroll = hasScrolled(scrollContainer, "vertical");
    const itemChildren = scrollContainer.children;
    let len = itemChildren.length;
    const inputText = scrollContainer.previousElementSibling;

    if (Object.is(code, 38)) {
      // index--; 这种方式不友好，需要判断两个极端最大和最小
      // if (index < 0) {
      //   index = len - 1;
      // }

      // 获取索引
      index = (index - 1 + len) % len;

      // 设置滚动条的位置
      if (isScroll) {
        // 这确定选中的位置
        let _index_positon =
          smartUl.clientHeight / 2 / itemChildren[index].offsetHeight;
        let postion =
          Math.ceil(_index_positon) * itemChildren[index].offsetHeight;

        smartUl.scrollTo(0, itemChildren[index].offsetTop - postion);
      }

      console.log("up: ", index);

      for (let i = 0; i < len; i++) {
        itemChildren[i].style.backgroundColor = null;
      }
      itemChildren[index].style.backgroundColor = "#ccc";
    }
    if (Object.is(code, 40)) {
      // index++; 这种方式不友好，需要判断两个极端最大和最小
      // if (index > len - 1) {
      //   index = 0;
      // }

      // 获取索引
      index = (index + 1 + len) % len;
      // 设置滚动条的位置
      if (isScroll) {
        // 这确定选中的位置
        let _index_positon =
          smartUl.clientHeight / 2 / itemChildren[index].offsetHeight;
        let postion =
          Math.ceil(_index_positon) * itemChildren[index].offsetHeight;

        smartUl.scrollTo(0, itemChildren[index].offsetTop - postion);
      }

      console.log("down: ", index);

      for (let i = 0; i < len; i++) {
        itemChildren[i].style.backgroundColor = null;
      }
      itemChildren[index].style.backgroundColor = "#ccc";
    }
    if (Object.is(code, 13)) {
      console.log("enter: ", 13);
      inputText.value = itemChildren[index].innerText;
    }
  }
};

/**
 * 判断是否出现滚动条
 *
 * @param {显示滚动条的元素} el
 * @param {滚动条的方向} direction
 */
function hasScrolled(el, direction = "vertical") {
  if (Object.is(direction, "vertical")) {
    return el.scrollHeight > el.clientHeight;
  } else if (Object.is(direction, "horizontal")) {
    return el.scrollWidth > el.clientWidth;
  }
}
