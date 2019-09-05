<template>
  <div class="hello">
    <h1 @click="clickMe">{{ propTypeScriptTypeNmae }}</h1>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue';
// import Component from 'vue-class-component';
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

import FormValidataeMixin from './FormValidataeMixin.vue';
@Component({
  mixins: [FormValidataeMixin]
})
export default class MyComponent extends Vue {
  @Prop(String)
  public propTypeScriptTypeNmae!: string;

  public clickMe() {
    console.log(3);
  }

  public mounted() {
    console.log(this.handleSubmit('dfdfdf'));
  }
}
</script>