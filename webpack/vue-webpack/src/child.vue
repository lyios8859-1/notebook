<template>
  <div class="child">{{ childData }}反对是否的发达是否 、 打算</div>
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
    window.addEventListener('ly', event => {
      console.log('.....', event.detail);
      this.childData = event.detail;
    });
  }
};
</script>

<style>
* {
  backface-visibility: hidden;
}
</style>
