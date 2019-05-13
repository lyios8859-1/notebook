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
            name: "Tom",
            index: "A",
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
  data() {
    return {
      description: "通讯录组建"
    };
  },
  methods: {
    getItem(e) {
      const result = {
        html: e.target.innerHTML
      };
      this.$emit("getItem", { result: result });
    }
  }
};

export default BookComponents;
