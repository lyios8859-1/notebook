<template>
  <div class="child">
    <p>直接从props获取：{{parentData.name}} = {{parentData.age}} = {{childData1.info && parentData.info.sex}}</p>
    <p>通过munted钩子直接赋值获取不到：{{childData}}</p>
    <p>通过watch监听获取：{{childData1.name}} = {{childData1.age}} = {{childData1.info && childData1.info.sex}}</p>
  </div>
</template>
<script>
export default {
  props: {
    parentData: {
      type: Object,
      default() {
        return {
          name: "",
          age: 0
        };
      }
    }
  },
  data() {
    return {
      childData: {},
      childData1: {}
    };
  },
  mounted() {
    this.childData = this.parentData;
    console.log(
      "获取不到数据，由于这个钩子函数只会触发一次等页面渲染完也还没有接受到数据",
      this.childData
    );
  },
  watch: {
    // parentData(newValue, oldValue) {
    //   // 可以判断值的变化
    //   this.childData1 = this.parentData;
    // }
    // 深度监听
    parentData: {
      deep: true,
      handler(newValue, oldValue) {
        this.childData1 = this.parentData;
      }
    }
  }
};
</script>