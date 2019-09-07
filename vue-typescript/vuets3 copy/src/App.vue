<template>
  <div class="app">
    <h1>Hello World</h1>
    <MyComponent typeScriptName="typeScriptName"></MyComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MyComponent from './Typescript.vue';
export default Vue.extend({
  components: {
    MyComponent
  }
})
</script>