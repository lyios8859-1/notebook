<template>
  <div class="parentBox">
    <h1>测试smartInput</h1>
    <smart-input v-bind="provinceList1"
                 @collect="collectProvince1"></smart-input>
    <br>
    <br>
    <br>
    <br>
    <smart-input v-bind="provinceList2"
                 @collect="collectProvince2"></smart-input>
    <br>
    <br>
    <br>
    <br>
    <smart-input v-bind="provinceList3"
                 @collect="collectProvince3"></smart-input>
  </div>
</template>

<script>
import SmartInput from "./SmartInput.vue";
const provinceList = [
  "北京市",
  "天津市",
  "上海市",
  "重庆市",
  "河北省",
  "山西省",
  "辽宁省",
  "吉林省",
  "黑龙江省",
  "江苏省",
  "浙江省",
  "安徽省",
  "福建省",
  "江西省",
  "山东省",
  "河南省",
  "湖北省",
  "湖南省",
  "广东省",
  "海南省",
  "四川省",
  "贵州省",
  "云南省",
  "陕西省",
  "甘肃省",
  "青海省",
  "台湾省",
  "内蒙古自治区",
  "广西壮族自治区",
  "西藏自治区",
  "宁夏回族自治区",
  "新疆维吾尔自治区",
  "香港特别行政区",
  "澳门特别行政区"
];
export default {
  name: "App",
  data() {
    return {
      provinceList1: {
        list: provinceList
      },
      province1: "",
      provinceList2: {
        list: provinceList,
        // 支持参数多选
        multiple: true
      },
      province2: "",
      provinceList3: {
        list: provinceList,
        multiple: true,
        value: ["河南省", "错误值"]
      },
      province3: ""
    };
  },
  mounted() {},
  methods: {
    // 跟智能输入框同步选中的业务
    collectProvince1(data) {
      this.province1 = data;
    },
    collectProvince2(data) {
      this.province2 = data;
    },
    collectProvince3(data) {
      this.province3 = data;
    }
  },
  components: {
    SmartInput
  }
};
</script>

<style lang="stylus" scoped></style>
