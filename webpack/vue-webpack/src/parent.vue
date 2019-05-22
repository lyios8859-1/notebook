<template>
  <div class="parent">
    parent
    <child></child>
  </div>
</template>
<script>
import Vue from "vue";
import child from "./child.vue";
export default {
  name: "Parent",
  data() {
    return {
      parentData: {}
    };
  },
  created() {
    setTimeout(() => {
      this.parentData = {
        name: "timly",
        age: 132,
        info: {
          sex: "boy"
        }
      };
      // 触发子组件，并且传递数据过去
      window.dispatch("ly", this.parentData);
    }, 5000);
  },
  components: {
    child
  }
};
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
</script>