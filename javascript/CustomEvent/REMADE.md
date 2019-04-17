# 自定义事件

``` javascript
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

**ES6**

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