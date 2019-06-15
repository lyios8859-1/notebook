<template>
  <div class="parentBox">
    <h1>index</h1>
    <!-- <parent></parent> -->
    <!-- <testSmartInput></testSmartInput> -->
    <!-- <Notification content="test notifiy"></Notification> -->
    <div class="notify"></div>
    <button @click="addNotify">addNotify</button>
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
  mounted() {
    this.$notify({
      content: "ly content",
      btn: "开启"
    });
  },
  methods: {
    addNotify() {
      this.$notify({
        content: "ly content",
        btn: "开启"
      });
    }
  },
  components: {
    parent,
    testSmartInput
  }
};
</script>

<style lang="stylus" scoped>
@import './index.css';

.parentBox {
  color: blue;
  border: 1px solid red;
}
</style>
