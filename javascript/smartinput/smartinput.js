let index = -1; // 索引
let timer = null; // 定时器
let list = []; // 原始数据
let filtered = []; // 对输入的过滤
let searching = false; // 对面板的展开控制
let preSearching = false;
let multiple = true; // 是否支持多选
let oldValue = []; // 多选是存储旧值
function key(value) {
  return /(?:.*,)*(.*)$/.exec(value)[1];
}
function listLength() {
  return filtered.length;
}
function init() {
  // 展开面板
  searching = true;

  // ajax获取数据
  list = ["Hello", "Cat", "Tom", "Jery", "Dog", "Worlld", "I", "You", "She", "He", "Me", "My", "Parent", "Son", "Sister"];
  filtered = list;
}

window.onload = function () {
  const smartUl = document.querySelector("#smartItem");
  const input = smartUl.previousElementSibling;
  // 初始化数据
  init();

  // 获取焦点, 显示选项面板
  input.onfocus = function () {
    if (searching) {
      let html = "";
      for (let i = 0; i < filtered.length; i++) {
        html += `<li>${filtered[i]}</li>`;
      }
      smartUl.innerHTML = html;
      smartUl.style.display = "block";
    }
  };

  // 键盘输入
  input.oninput = function () {
    // 如果输入框为空
    if (!input.value) {
      filtered = list;
      return;
    }
    /*
    // 使用分号分割多个数据 （针对与方案一的多选需要）
    let inputArr = input.value.split(";");
    // 如果支持多选
    if (multiple) {
      inputArr.pop();
      oldValue = inputArr;
    }
    */

    // 修该某些数据
    //let other = input;
  };

  // 联想搜索的主体功能函数，这里使用keydown是为了保证持续性的上下键能够保证执行
  input.onkeydown = function (event) {
    preSearching = searching;
    // 非搜索状态进行点击，则呼出面板
    if (!searching) {
      searching = true;
    }
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
        ev.preventDefault();
        keyUpDown(13, smartUl);
        break;
      default:
        // 延时搜索，降低卡顿, 还解决了最有一次删除不处理全部的问题
        if (timer) {
          clearTimeout(timer);
        }
        let _v = "";
        if (multiple) {
          // 多选 主要截取最后一个字符处理
          let inValue = input.value;
          let _i = inValue.lastIndexOf(";");
          _v = inValue.substring(_i + 1, inValue.length - 1);
        } else {
          // 单选
          _v = input.value;
        }
        timer = setTimeout(() => {
          // 进行可选项过滤
          filtered = list.filter(item => {
            return item.toLowerCase().includes(key(_v).toLowerCase());
          });
          if (filtered.length < 0) {
            console.log("没有匹配的数据......");
          } else {
            // 匹配数据后的操作,展示的面板数据
            console.log("模糊匹配： ", filtered);
            let html = "";
            for (let i = 0; i < filtered.length; i++) {
              html += `<li>${filtered[i]}</li>`;
            }
            smartUl.innerHTML = "";
            smartUl.innerHTML = html;
          }
          // 修正索引
          index = -1;
        }, 300);
    }
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
        itemChildren[index].offsetHeight;

        smartUl.scrollTo(0, itemChildren[index].offsetTop - postion);
      }

      for (let i = 0; i < len; i++) {
        itemChildren[i].style.backgroundColor = null;
        itemChildren[i].style.color = null;
      }
      itemChildren[index].style.backgroundColor = "#ccc";
      itemChildren[index].style.color = "red";
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

      for (let i = 0; i < len; i++) {
        itemChildren[i].style.backgroundColor = null;
        itemChildren[i].style.color = null;

      }
      itemChildren[index].style.backgroundColor = "#ccc";
      itemChildren[index].style.color = "red";
    }
    if (Object.is(code, 13)) {
      if (preSearching && index < listLength()) {
        if (multiple) {
          // 多选

          // 添加多个 方案一
          // if (oldValue.includes(itemChildren[index].innerText)) {
          //   inputText.value = oldValue.join(";");
          //   return;
          // }
          // oldValue.push(itemChildren[index].innerText);
          // inputText.value = oldValue.join(";");

          // 添加多个 方案二 建议
          let name = itemChildren[index].innerText.trim();
          // 判断输入的是否已经存在之前的输入中
          if (!inputText.value.split(";").includes(name)) {
            let input = inputText.value;
            input = input && input.substring(0, input.lastIndexOf(";") + 1);
            inputText.value = input + name + ";";
          } else {
            console.log("已经选择...");
          }
          // 关闭面板
          // searching = false;
          // smartUl.style.display = "none";
        } else {
          // 单选
          inputText.value = itemChildren[index].innerText + ";";

          // 关闭面板
          searching = false;
          // 以后优化时，调用函数关闭面板
          // smartUl.style.display = "none";
        }
      }
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
