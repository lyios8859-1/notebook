import utils from "./utils.js";
let BookComponents = {
  name: "AddressBook",
  props: {
    listItem: {
      type: Array,
      default: () => {
        // 对象{} 或者 数组[]使用 函数的方式
        return [
          {
            id: 1,
            subject: "默认A",
            content: [
              { name: "a1", tel: "1576542365" },
              { name: "a2", tel: "1512542365" },
              { name: "a3", tel: "1325423654" }
            ]
          }
        ];
      }
    }
  },
  computed: {
    subjectIndex() {
      // 索引的过滤
      return this.filterSubjectIndex(this.listItem);
    }
  },
  data() {
    return {
      description: "通讯录组建",
      isShow: -1, // 不选中,
      bMove: false, // 默认点击操作,
      tel: "",
      isShowCover: false
    };
  },
  methods: {
    // 获取指定的某一个列表项的信息
    getItem(e) {
      const result = {
        html: e.target.innerHTML,
        tel: e.target.dataset.tel
      };
      if (e.target.dataset.name === e.target.innerHTML) {
        this.tel = result.tel;
        this.isShowCover = true;
        this.$emit("getItem", { result: result });
      } else {
        console.log("点击了索引标题");
      }
    },
    // 索引的过滤
    filterSubjectIndex(data) {
      let result = [];
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].subject) {
          result.push(data[i].subject);
        }
      }
      //result.push("#");
      return result;
    },
    // 点击索引设置滚动条的高度
    setScrollHeight(e) {
      const scrollDom = this.$refs.scrollbarRefs;
      // 判断是否有滚动条出现
      if (utils.hasScrollbar(scrollDom)) {
        let h3Dom = this.$refs.listItemRefs.getElementsByTagName("h3");
        // 选中
        this.isShow = e.target.dataset.active * 1;
        if (Object.is(e.target.nodeName.toLocaleLowerCase(), "h3")) {
          for (let i = 0, len = h3Dom.length; i < len; i++) {
            // 判断是否与列表项的h3的内容一致
            if (Object.is(e.target.innerHTML, h3Dom[i].innerHTML)) {
              scrollDom.scrollTop = h3Dom[i].offsetTop;
            }
          }
        }
      } else {
        console.log("没有滚动条");
      }
    },
    cancel() {
      this.isShowCover = false;
    },
    confirm() {
      // 其他的操作
      // ...

      this.isShowCover = false;
    }
  }
};

export default BookComponents;
