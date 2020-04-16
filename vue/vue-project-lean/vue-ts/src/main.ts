import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ActionHelper from './store/ActionHelper';
const a = new ActionHelper();
console.log('item1', a.dataList);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
