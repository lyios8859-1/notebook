<template>
  <div class="parentBox">
    <h1>index</h1>
    <parent></parent>
    <testSmartInput></testSmartInput>
  </div>
</template>

<script>
import parent from "./parent.vue";
import testSmartInput from "./SmartInput/testSmartInput.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    parent,
    testSmartInput
  }
};
</script>

<style lang="stylus" scoped>
@import './index.css';

.parentBox {
  color: red;
  border: 1px solid blue;
}
</style>
