import Notification from "./notification.vue";

import notify from "./function.js";

export default (Vue) => {
  Vue.component(Notification.name, Notification);

  // 把扩展的挂到 Vue.prototype 上
  Vue.prototype.$notify = notify;
}