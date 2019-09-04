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

  public clickMe() {
    console.log(3);
  }
}
</script>