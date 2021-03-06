let index = -1; // 索引
let timer = null; // 定时器
let list = []; // 原始数据
let filtered = []; // 对输入的过滤
let searching = false; // 对面板的展开控制
let preSearching = false;
const multiple = false; // 是否支持多选
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
  list = ['Hello', 'Cat', 'Tom', 'Jery', 'Dog', 'Worlld'];
  filtered = list;
}

window.onload = function() {
  const smartUl = document.querySelector('#smartItem');
  const input = smartUl.previousElementSibling;
  // 初始化数据
  init();

  // 获取焦点, 显示选项面板
  input.onfocus = function() {
    if (searching) {
      let html = '';
      for (let i = 0; i < filtered.length; i++) {
        html += `<li>${filtered[i]}</li>`;
      }
      smartUl.innerHTML = html;
      smartUl.style.display = 'block';
    }
  };

  // 键盘输入
  input.oninput = function() {
    // 如果输入框为空
    if (!input.value) {
      filtered = list;
      return;
    }
    // 使用分号分割多个数据
    const inputArr = input.value.split(';');
    // 如果支持多选
    if (multiple) {
      // 存储输入的数据不再原始数据中的容器
      const isinvalidData = []; // 存储合法的数据
      const noinvalidData = []; // 存储不合法的数据
      // 删除 ”;“ 分割成的数组中的最后一个空值
      if (inputArr.length > 1) {
        inputArr.pop();
      }
      inputArr.forEach(item => {
        // 判断输入的数据是否不存在原始 list 中 //includes() 方法用来判断一个数组是否包含一个指定的值，
        if (!list.includes(item)) {
          isinvalidData.push(item);
        } else {
          noinvalidData.push(item);
        }
      });
      if (isinvalidData.length) {
        console.log(`输入的 ${isinvalidData.join(',')} 数据不合法`);
      } else {
        console.log(`输入的 ${noinvalidData.join(',')} 数据合法`);
      }
    }
    // 修该某些数据
    // let other = input;
  };

  // 联想搜索的主体功能函数，这里使用keydown是为了保证持续性的上下键能够保证执行
  input.onkeydown = function(event) {
    preSearching = searching;
    // 非搜索状态进行点击，则呼出面板
    if (searching) {
      searching = true;
    }
    const ev = event || window.event;
    const code = ev.keyCode;
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

        timer = setTimeout(() => {
          // 进行可选项过滤
          filtered = list.filter(item => {
            return item.toLowerCase().includes(key(input.value).toLowerCase());
          });
          if (filtered.length < 0) {
            console.log('没有匹配的数据......');
          } else {
            // 匹配数据后的操作,展示的面板数据
            console.log('模糊匹配： ', filtered);
            let html = '';
            for (let i = 0; i < filtered.length; i++) {
              html += `<li>${filtered[i]}</li>`;
            }
            smartUl.innerHTML = '';
            smartUl.innerHTML = html;
          }
          // 修正索引
          index = -1;
        }, 300);
        break;
    }
  };

  // 键盘按下
  function keyUpDown(code, scrollContainer) {
    const isScroll = hasScrolled(scrollContainer, 'vertical');
    const itemChildren = scrollContainer.children;
    const len = itemChildren.length;
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
        const _index_positon =
          smartUl.clientHeight / 2 / itemChildren[index].offsetHeight;
        const postion =
          Math.ceil(_index_positon) * itemChildren[index].offsetHeight;
        itemChildren[index].offsetHeight;

        smartUl.scrollTo(0, itemChildren[index].offsetTop - postion);
      }

      for (let i = 0; i < len; i++) {
        itemChildren[i].style.backgroundColor = null;
      }
      itemChildren[index].style.backgroundColor = '#ccc';
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
        const _index_positon =
          smartUl.clientHeight / 2 / itemChildren[index].offsetHeight;
        const postion =
          Math.ceil(_index_positon) * itemChildren[index].offsetHeight;

        smartUl.scrollTo(0, itemChildren[index].offsetTop - postion);
      }

      for (let i = 0; i < len; i++) {
        itemChildren[i].style.backgroundColor = null;
      }
      itemChildren[index].style.backgroundColor = '#ccc';
    }
    if (Object.is(code, 13)) {
      // if (preSearching && index < listLength()) {
      //   selectOne();
      // }
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
function hasScrolled(el, direction = 'vertical') {
  if (Object.is(direction, 'vertical')) {
    return el.scrollHeight > el.clientHeight;
  } else if (Object.is(direction, 'horizontal')) {
    return el.scrollWidth > el.clientWidth;
  }
}
