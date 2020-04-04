<template>
  <div class="hello">
    <div>
      欢迎您[
      <span class="visitor">{{marks}}</span>]来到Typescript的世界
    </div>
    <button @click="changed">换个人</button>
  </div>
</template>
<script lang="ts" src="./hello.ts"></script>
<style lang="less" scope>
.hello {
  border: 1px solid yellow;
  .visitor {
    margin: 1em;
    color: yellow;
    font-size: 22px;
  }
}
</style>