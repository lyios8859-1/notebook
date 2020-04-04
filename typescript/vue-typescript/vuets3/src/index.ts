import Vue from 'vue';
import App from './App.vue';
console.log("ddd")
const vm = new Vue({
  render: h => h(App)
});
vm.$mount('#root');
