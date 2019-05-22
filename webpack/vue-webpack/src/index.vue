<template>
  <div class="parentBox">
    dsfadsf
    <h1>dskfajlsjkd</h1>
    <parent></parent>
  </div>
</template>

<script>
import parent from "./parent.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    parent
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
