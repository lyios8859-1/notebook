
/*************************************************/
// 自定义事件监听

function LyEventDispatcher() {
  this.events = Object.create(null);
}

// 添加需要监听的事件
LyEventDispatcher.prototype.LyAddEventListener = function (type, handler) {
  if (typeof handler !== "function") {
    return;
  }
  this.events[type] = handler;
};

// 触发定义的事件
LyEventDispatcher.prototype.dispatchEvent = function (type, body) {
  const e = Object.create(null);
  e.body = body;
  this.events[type](e);
};

let dispatch = new LyEventDispatcher();

dispatch.LyAddEventListener("lyTest", function (e) {
  console.log("Test >>> ", e.body);
});

dispatch.dispatchEvent("lyTest", { name: "Jerry" });

/*************************************************/

// const eventUtil = {
//   // 触发事件 (事件类型，传输的数据)
//   notiyEvent(type, data) {
//     let event = document.createEvent("HTMLEvents");
//     event.initEvent("lyEvent");
//     event.eventType = type;
//     event.eventData = data;
//     // 触发事件
//     document.dispatchEvent(event);
//   },
//   // 监听事件的触发（执行） （事件类型，回调函数）
//   listenerEvent(type, callback) {
//     document.addEventListener(
//       "lyEvent",
//       event => {
//         if (event.eventType === type) {
//           console.log("data:", event.eventData);
//           callback && callback(event.eventData);
//         }
//       },
//       false
//     );
//   }
// };

/**
// 自定义事件
(function() {
  if (typeof window.CustomEvent === "undefined") {
    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent("Events");
      var bubbles = true;
      for (var name in params) {
        name === "bubbles"
          ? (bubbles = !!params[name])
          : (evt[name] = params[name]);
      }
      evt.initEvent(event, bubbles, true);
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
})();

// 触发自定义事件，并传递（事件类型，参数）：
window.dispatch = function(event, params) {
  var e = new CustomEvent(event, {
    bubbles: true,
    cancelable: true,
    detail: params
  });
  window.dispatchEvent(e);
};

// 在需要数据的地方监听数据的变化
window.addEventListener("ly", event => {
  console.log(".....", event.detail);
});


function lyEvents(params, eventName = 'lyEvent') {
  // 这是一个浏览器事件
  let lyEvent = new CustomEvent(eventName, {
    bubbles: true, // 是否冒泡
    cancelable: true, // 是否可以取消该事件
    detail: params // 需传递的数据
  });
  // 触发
  document.dispatchEvent(lyEvent);
}
lyEvents({ name: 'ejfl' })
// 监听事件
document.addEventListener('lyEvent', function (ev) {
  console.log('数据：', ev.detail)
});


 */
