<template>
  <div class="parentBox">
    <h1>index</h1>
    <!-- <parent></parent> -->
    <!-- <testSmartInput></testSmartInput> -->
    <!-- <Notification content="test notifiy"></Notification> -->
    <div class="notify"></div>
    <button @click="addNotify">addNotify</button>

    <div>
      <input type="text"
             v-check="{type:'phone',val:currentPhone}"
             placeholder="请输入手机号码"
             v-model="currentPhone" />
      <input type="text"
             v-check="{type:'date',val:currentDate}"
             placeholder="请输入日期"
             v-model="currentDate" />
      <input type="text"
             v-check="{type:'identification_card',val:currentIdentificationCard}"
             placeholder="请输入身份证"
             v-model="currentIdentificationCard" />
      <input type="text"
             v-check="{type:'email',val:currentEmail}"
             placeholder="请输入邮箱"
             v-model="currentEmail" />
      <input type="text"
             v-check="{type:'zip_code',val:currentZipCode}"
             placeholder="请输入邮编"
             v-model="currentZipCode" />
    </div>
    <!-- <div v-time="timeNow" />
    <div v-time="timeBefore" /> -->
    <ItemList></ItemList>
  </div>
</template>

<script>
import parent from "./parent.vue";
import testSmartInput from "./SmartInput/testSmartInput.vue";
import ItemList from './elementui-infinity-load/ItemList.vue';
export default {
  name: "App",
  data() {
    return {
      timeNow: new Date().getTime(),
      // timeBefore: 1488930695721
      timeBefore: new Date("2019-07-19 10:57:00").getTime(),
      currentPhone: "",
      currentDate: "",
      currentIdentificationCard: "",
      currentEmail: "",
      currentZipCode: ""
    };
  },
  mounted() {
    this.$notify({
      content: "ly content",
      btn: "开启"
    });
  },
  methods: {
    addNotify() {
      this.$notify({
        content: "ly content",
        btn: "开启"
      });
    }
  },
  components: {
    parent,
    testSmartInput,
    ItemList
  }
};
</script>

<style lang="stylus" scoped>
@import './index.css';

.parentBox {
  color: red;
  border: 1px solid red;
}

// 输入框
input[type='text'] {
  display: block;
  width: 90%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-indent: 1em;
  margin: 5px auto;
  outline: none; // 清除input默认样式
  border: 1px solid #ccc;
}

// 按钮
input[type='button'] {
  display: block;
  width: 70%;
  height: 40px;
  margin: 10px auto;
}
</style>
