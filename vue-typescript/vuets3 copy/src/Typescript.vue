<template>
  <div class="typescript">
    <h2>====={{name}}===={{typeScriptName}}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
console.log('使用vue-shims.d.ts定义的全局变量', _, _underscore);
@Component
export default class MyComponent extends Vue{
  
  @Prop(String)
  public typeScriptName!: string;

  // data
  public name: string = "";

  // 钩子
  private mounted() {
    this.name = "Hello TypeScript";
  }
}
</script>