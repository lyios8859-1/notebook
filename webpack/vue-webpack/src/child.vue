<template>
  <div class="child">
    {{childData}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      childData: {}
    };
  },
  created() {},
  mounted() {
    // 监听数据的变化
    window.addEventListener("ly", event => {
      console.log(".....", event.detail);
      this.childData = event.detail;
    });
  }
};
</script>