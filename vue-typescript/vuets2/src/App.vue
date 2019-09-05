<template>
  <div class="app">
    <BabelType propBableName="BableName"></BabelType>
    <TypeScripttype propTypeScriptTypeNmae="TypeScriptTypeName"></TypeScripttype>
  </div>
</template>

<script lang="ts">
import BabelType from './components/test/BabelType.vue';
import TypeScripttype from './components/test/TypeScripttype.vue';

export default {
  components: {
    BabelType,
    TypeScripttype
  },
  name: 'App',
};
</script>

<style lang="less">
  .app {
    background: #ccc;
  }
</style>