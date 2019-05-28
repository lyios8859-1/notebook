# 自定义事件

```javascript
// 自定义事件监听

function LyEventDispatcher() {
  this.events = Object.create(null);
}

// 添加需要监听的事件
LyEventDispatcher.prototype.LyAddEventListener = function(type, handler) {
  if (typeof handler !== "function") {
    return;
  }
  this.events[type] = handler;
};

// 触发定义的事件
LyEventDispatcher.prototype.dispatchEvent = function(type, body) {
  const e = Object.create(null);
  e.body = body;
  this.events[type](e);
};

let dispatch = new LyEventDispatcher();

dispatch.LyAddEventListener("lyTest", function(e) {
  console.log("Test >>> ", e.body);
});

dispatch.dispatchEvent("lyTest", { name: "Jerry" });
```

**ES6**:

```javascript
class LyEventDispatcher {
  constructor() {
    this.events = Object.create(null);
  }
  addEventListener(type, handler) {
    if (typeof handler !== "function") {
      return;
    }
    this.events[type] = handler;
  }
  dispatchEvent(type, body) {
    const e = Object.create(null);
    e.body = body;
    this.events[type](e);
  }
}
```

```javascript
const eventUtil = {
  // 触发事件 (事件类型，传输的数据)
  notiyEvent(type, data) {
    let event = document.createEvent("HTMLEvents");
    event.initEvent("lyEvent");
    event.eventType = type;
    event.eventData = data;
    // 触发事件
    document.dispatchEvent(event);
  },
  // 监听事件的触发（执行） （事件类型，回调函数）
  listenerEvent(type, callback) {
    document.addEventListener(
      "lyEvent",
      event => {
        if (event.eventType === type) {
          console.log("data:", event.eventData);
          callback && callback(event.eventData);
        }
      },
      false
    );
  }
};
```
