<template>
  <div class="parent">
    parent
    <child :parentData="parentData"></child>
  </div>
</template>
<script>
import axios from "axios";
import child from "./child.vue";
export default {
  name: "Parent",
  data() {
    return {
      parentData: {}
    };
  },
  created() {
    setTimeout(() => {
      this.parentData = {
        name: "timly",
        age: 132,
        info: {
          sex: "boy"
        }
      };
    }, 5000);
  },
  components: {
    child
  }
};
</script>