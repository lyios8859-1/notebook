<template>
  <div id="app">
    <h2>{{msg}}</h2>
    <HelloCom></HelloCom>
  </div>
</template>

<script>
import HelloCom from './components/Hello.vue';
export default {
  name: "App",
  data() {
    return {
      msg: "Hello World"
    };
  },
  components: {
    HelloCom
  }
};
</script>

<style>
@import "./components/test.less";
#app {
  background-color:blue;
}
</style>