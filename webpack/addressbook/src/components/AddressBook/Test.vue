<template>
  <div class="index">
    <h1>{{ newMsg }}</h1>
    <hr />
    <button @click="instance">instance</button>
  </div>
</template>

<script>
// 引入的时候相当与初始化了AddressBook函数
import AddressBook from "./BookComponents.js";
export default {
  name: "Test",
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  mounted() {},
  data() {
    return {
      listItem: [
        {
          id: 1,
          subject: "A",
          content: [
            { name: "a1", tel: "1576542365" },
            { name: "a2", tel: "1512542365" },
            { name: "a3", tel: "1325423654" }
          ]
        },
        {
          id: 2,
          subject: "B",
          content: [
            { name: "b1", tel: "23576542365" },
            { name: "b2", tel: "13431254236" },
            { name: "b3", tel: "15632542365" }
          ]
        },
        {
          id: 3,
          subject: "C",
          content: [
            { name: "c1", tel: "34654565466" },
            { name: "c2", tel: "45656867236" },
            { name: "c3", tel: "15665767756" }
          ]
        },
        {
          id: 4,
          subject: "D",
          content: [
            { name: "d1", tel: "34654565466" },
            { name: "d2", tel: "45656867236" },
            { name: "d3", tel: "15665767756" }
          ]
        },
        {
          id: 5,
          subject: "F",
          content: [
            { name: "f1", tel: "34654565466" },
            { name: "f2", tel: "45656867236" },
            { name: "f3", tel: "15665767756" }
          ]
        }
      ],
      // 使用data的方式： 把 props 的值赋值给新的变量，为了不修改 props 的值，修改新的变量即可，否则会有警告
      newMsg: this.msg
    };
  },
  methods: {
    instance() {
      // false 表示不需要多个实例
      AddressBook(this.listItem, false, result => {
        this.newMsg = result.tel;
        // eslint-disable-next-line
        console.log("value: ", result);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
