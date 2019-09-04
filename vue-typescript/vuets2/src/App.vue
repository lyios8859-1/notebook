<template>
  <div class="app">
    <!-- <BabelType propBableName="BableName"></BabelType> -->
    <MyComponent></MyComponent>
  </div>
</template>

<script lang="ts">
// import BabelType from './components/test/BabelType.vue';
import MyComponent from './components/test/TypeScripttype.vue';

export default {
  components: {
    // BabelType,
    MyComponent
  },
  name: 'App',
};
</script>

<style lang="less">
  .app {
    background: #ccc;
  }
</style>