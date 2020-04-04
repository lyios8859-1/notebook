import Vue from 'vue';
import App from './App.vue';

const vm = new Vue({
  components: {
    App
  },
  template: '<App />'
});
vm.$mount('#root');
