# 父组件异步获取数据传递给子组件的问题

> 子组件使用父组件传递是的数据展示出来，所需 options 由父组件通过 prop 传入，父组件中的 options 初始值为空，在 mounted 钩子函数中发起 http 异步请求获取数据然后更新 options，结果子组件无法正确显示出所需数据

```javascript
// 父组件
<template>
  <div class="parent">
    parent
    <child :parentData="parentData"  v-if="flag"></child>
  </div>
</template>
<script>
import child from "./child.vue";
export default {
  name: "Parent",
  data() {
    return {
      parentData: {},
      flag: false // 判断是否返回数据了
    };
  },
  created() {
    // 模拟异步请求
    setTimeout(() => {
      this.parentData = {
        name: "timly",
        age: 132
      };
      // 获取数据结束 （这样不会出要子组建中props的对象获取是办错问题）
      this.flag = true;
    }, 5000);
  },
  components: {
    child
  }
};
</script>

<template>
  <div class="child">
    child==={{parentData.name}}={{parentData.age}}
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
      childData: {}
    };
  },
  mounted() {
    this.childData = this.parentData;
    console.log(
      "获取不到数据，由于这个钩子函数只会触发一次等页面渲染完也还没有接受到数据",
      this.childData
    );
  }
};
</script>
```

## 解决方案一，使用 watch 监听到父组件的数据变化后重新赋值给新的变量

```javascript
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
```

## 解决方案二，使用 $emit, $on, BUS 方式监听父组件的数据变化后传递和接收

```javascript
// 父组件
<template>
  <div class="parent">
    parent
    <child></child>
  </div>
</template>
<script>
import Vue from "vue";
import child from "./child.vue";
export default {
  name: "Parent",
  data() {
    return {
      parentData: {}
    };
  },
  created() {
    window.bus = new Vue();
    setTimeout(() => {
      this.parentData = {
        name: "timly",
        age: 132,
        info: {
          sex: "boy"
        }
      };
      // 触发子组件，并且传递数据过去
      window.bus.$emit("triggerChild", this.parentData);
    }, 5000);
  },
  components: {
    child
  }
};
</script>

// 子组件
<template>
  <div class="child">
    {{childData}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      childData: {}
    };
  },
  created() {
    // 绑定
    window.bus.$on("triggerChild", parmas => {
      this.childData = parmas;
      console.log(">>>>", this.childData);
    });
  }
};
</script>
```

## 解决方案三，使用 自定义事件的方式监听父组件的数据变化后传递和接收

```javascript
// 父组件
<template>
  <div class="parent">
    parent
    <child></child>
  </div>
</template>
<script>
import Vue from "vue";
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
      // 触发子组件，并且传递数据过去
      window.dispatch("ly", this.parentData);
    }, 5000);
  },
  components: {
    child
  }
};
// 自定义事件
(function() {
  if (typeof window.CustomEvent === "undefined") {
    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent("Events");
      var bubbles = true;
      for (var name in params) {
        name === "bubbles"
          ? (bubbles = !!params[name])
          : (evt[name] = params[name]);
      }
      evt.initEvent(event, bubbles, true);
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
})();

// 触发自定义事件，并传递（事件类型，参数）：
window.dispatch = function(event, params) {
  var e = new CustomEvent(event, {
    bubbles: true,
    cancelable: true,
    detail: params
  });
  window.dispatchEvent(e);
};

// 在需要数据的地方监听数据的变化
// window.addEventListener("ly", event => {
//   console.log(".....", event.detail);
// });
</script>

// 子组件
<template>
  <div class="child">
    {{childData}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      childData: {}
    };
  },
  created() {},
  mounted() {
    // 监听数据的变化
    window.addEventListener("ly", event => {
      console.log(".....", event.detail);
      this.childData = event.detail;
    });
  }
};
</script>
```