<template>
  <div class="hello">
    <h1 @click="clickMe">{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    propBableName: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      msg: 'Bable 方式的写法, data'
    };
  },
  methods: {
    clickMe() {
      console.log('Bable 方式的写法, methods');
    }
  },
  mounted() {
    console.log('Bable 方式的写法, mounted, Props: ' + this.propBableName);
  },

});
</script>