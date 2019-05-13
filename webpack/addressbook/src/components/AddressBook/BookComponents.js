import Vue from "vue";
import BookComponentsTpl from "./BookComponents.vue";
import utils from "./utils.js";

const BookComponents = (function() {
  // 默认配置
  let defaultConfig = [
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
  // 模板实例
  let vm = null;
  const BookComponents = Vue.extend(BookComponentsTpl);
  return function(option, mark, callback) {
    // 这个地方最好用混入
    let options = option || defaultConfig;
    console.log(options);
    // 如果已经存在，则删除, 如果需要多个组件
    if (vm && mark) {
      document.body.removeChild(vm.$el);
      vm = null;
    }
    vm = new BookComponents({
      el: document.createElement("div"),
      created() {
        // 初始化数据
        this.listItem = options;
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
          listItem: options,
          isShow: -1, // 不选中,
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
            callback && callback(result);
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
          // code

          this.isShowCover = false;
        }
      }
    });
    document.body.appendChild(vm.$el);
  };
})();

export default BookComponents;
/**
 * 注意：
 * // 使用 import 引入的时候相当与初始化了AddressBook函数, 也就是这里的默认配置， return 前的默认配置操作，调用的时候执行 return 后面的匿名函数
    import AddressBook from "./BookComponents.js";
 */
