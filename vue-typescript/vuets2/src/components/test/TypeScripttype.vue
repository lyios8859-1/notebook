<template>
  <div class="hello">
    <h1 @click="clickMe">{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue';
// import Component from 'vue-class-component';
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class MyComponent extends Vue {

  // data
  private msg: string = 'TypeScript 方式的写法, data';

  // methods
  public clickMe() {
    console.log('TypeScript 方式的写法, methods');
  }

  // 钩子
  public mounted() {
    console.log('TypeScript 方式的写法, mounted, Props: ');
  }

}
</script>