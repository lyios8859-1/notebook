<template>
  <div class="parentBox">
    <div class="childBox"></div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus" scoped>
.parentBox {
  display: inline-block; /* 这里的 display: inline-block; 不影响居中 */
  text-align: center; /* 水平居中 */
  width: 400px;
  height: 400px;
  background: #ccc;
}

.parentBox:after {
  content: '';
  display: inline-block; /* 这里的 display: inline-block; 影响垂直居中 */
  vertical-align: middle; /* 这里的 vertical-align: middle; 必须 与子元素 childBox 中 vertical-align: middle;一起使用 */
  height: 100%;
}

.childBox {
  display: inline-block; /* 这里的 display: inline-block; 影响全部居中 */
  vertical-align: middle;
  width: 100px;
  height: 100px;
  background: red;
}
</style>
