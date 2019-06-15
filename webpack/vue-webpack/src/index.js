import Vue from "vue";
import Index from "./index.vue";

import Notification from "./notification/index.js";
Vue.use(Notification);


new Vue({
  el: "#app",
  template: "<Index />",
  components: { Index }
});

// 如果莫名的报错，就不要使用了
if (module.hot) {
  // 检测是否有模块热更新
  module.hot.accept();
}
