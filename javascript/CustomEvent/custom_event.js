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
let dispatch = new LyEventDispatcher();

dispatch.addEventListener("lyTest", function(e) {
  console.log("Test >>> ", e.body);
});

dispatch.dispatchEvent("lyTest", { name: "Jerry" });
