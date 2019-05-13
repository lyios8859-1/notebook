<template>
  <div id="app">
    <address-book msg="vue 通讯录组件开发" />
  </div>
</template>

<script>
import AddressBook from "./components/AddressBook/Test.vue";

export default {
  name: "App",
  components: {
    AddressBook
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
