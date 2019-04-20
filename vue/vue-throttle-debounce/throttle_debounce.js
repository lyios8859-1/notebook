const throttleOrdebounce = (fn, wait = 300, isDebounce, ctx) => {
  let timer = null;
  let previousTime = null;
  return function(...params) {
    if (isDebounce) {
      console.log("防抖，一直触发就清除定时器，不执行应有的操作");
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(ctx, params);
        console.log(333);
      }, wait);
    } else {
      console.log(
        "节流，一直触发，也只会在规定的时间间隔后执行，例如：下拉滚动加载"
      );
      let now = +new Date(); // + 为了转换成数值
      console.log("now>>>", now);
      if (!previousTime) {
        previousTime = now;
      }

      // 当上一次执行的时间与当前的时间差大于设置的时间间隔时长，就执行一次操作
      if (now - previousTime >= wait) {
        fn.apply(ctx, params);
        // 立即记录当前的时间
        previousTime = now;
        console.log(111);
      } else {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          console.log(222);

          fn.apply(ctx, params);
        }, wait);
      }
    }
  };
};

export default {
  name: "Throttle",

  // 定义为抽象组件，不会在页面有任何标签，缺点：只能包含一个子元素的根
  abstract: true,
  props: {
    time: {
      type: Number,
      default: 600
    },
    events: {
      type: String,
      default: "click"
    },
    isDebounce: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.eventKeys = this.events.split(",");
    this.originMap = {};
    this.throttleMap = {};
  },
  render() {
    const _this = this;
    const vNode = this.$slots.default && this.$slots.default[0];
    _this.eventKeys.forEach(key => {
      const target = vNode.data.on[key];
      if (target === _this.originMap[key] && _this.throttleMap[key]) {
        vNode.data.on[key] = _this.throttleMap[key];
      } else if (target) {
        _this.originMap[key] = target;
        _this.throttleMap[key] = throttleOrdebounce(
          target,
          _this.time,
          _this.isDebounce,
          vNode
        );
        vNode.data.on[key] = _this.throttleMap[key];
      }
    });
    return vNode;
  }
};

/**
 * <Throttle :time="1000"
              events="click">
      <button @click="onAdd1($event, 1)">click + 1 {{val}}</button>
    </Throttle>
    <Throttle :time="1000"
              events="click"
              :isDebounce="true">
      <button @click="onAdd">click + 3 {{val}}</button>
    </Throttle>
    <Throttle :time="1000"
              events="mouseleave"
              :isDebounce="true">
      <button @mouseleave.prevent="onAdd">click + 3 {{val}}</button>
    </Throttle>
 */
/*
// 函数节流
function throttle1(fn, time = 300) {
  let isRun = true;
  return function() {
    if (!isRun) return;
    isRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
}

// 函数防抖
function debounce1(fn, time = 300) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
}

// 实例
document.onclick = throttle1(function() {
  console.log("throttl");
}, 1000);

// 函数节流
function throttle2(fn, time = 300) {
  let lastTime = 0;
  return function() {
    let nowTime = new Date();
    if (nowTime - lastTime > time) {
      fn.apply(this, arguments);
      lastTime = nowTime;
    }
  };
}

// 函数防抖
function debounce2(fn, time = 300) {
  let lastTime = 0;
  return function() {
    let nowTime = new Date();
    if (nowTime - lastTime > time) {
      fn.apply(this, arguments);
    }
    lastTime = nowTime;
  };
}
*/
