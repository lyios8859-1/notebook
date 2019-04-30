<template>
  <div class="items">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus" scoped>
.items {
  display: flex;
  width: 500px;
  margin: 1px;
  text-align: center;
  background: #ccc;
}

.item {
  margin: 1px;
  width: 50px;
  color: #fff;
  background: red;
}

.items > .item:last-child {
  /* 最有一列向右对齐 */
  margin-left: auto;
}
</style>
