# Vuejs 学习

## :+1: Vue 的数据双向绑定原理

核心使用 ES5 的 API `Object.defineProperty()` 对数据的劫持，劫持数据处理后再再返回给使用者。Vue3.x 话说 通过 ES6 的 API `Proxy()` 来处理。

![vue 数据双向绑定原理](./vue数据双向绑定原理.png "vue 数据双向绑定原理")

## :+1: Vue2.x 生命周期

![Vue2的生命周期](./Vue2的生命周期.png "Vue2的生命周期")

## :+1: Vue 组件

> `Vue.extend(options);` options 是对象；使用基础 Vue 构造器，创建一个子类，参数是一个包含组件选项的对象，data 选项是特例，它必须是函数。

```javascript
let BaseExtendComponent = Vue.extend({
  name: "BaseExtendComponent",
  template: "<h2>== {{name}} ==</h2>",
  data() {
    return {
      name: "Timly"
    };
  }
});

// 用法一，创建一个 BaseExtendComponent 实例，挂载到元素上
new BaseExtendComponent().$mount("#lyTest");

// 用法二，将组件注册到  Vue.component(); 全局方法里面
Vue.component(BaseExtendComponent.name, BaseExtendComponent);
// 页面使用
<div class="component">
  <BaseExtendComponent />
</div>;

// 用法三，将组件注册为局部组件
new Vue({
  el: "#app",
  data() {
    return {};
  },
  components: {
    BaseExtendComponent
  }
});
// 页面使用
<div class="component">
  <BaseExtendComponent />
</div>;
```

**Vue.extends**

```javascript
let extendsObj = {
  updated() {
    console.log("我是扩展的updated");
  },
  methods: {
    //这个并没有被执行，如果方法名一样，只执行构造器里面的原生方法，混入跟扩展类似
    add() {
      console.log("我是扩展出来的方法");
      this.num++;
    }
  }
};

new Vue({
  el: "#app",
  data() {
    return {
      num: 1
    };
  },
  methods: {
    add() {
      console.log("我是原生的方法");
      this.num++;
    }
  },
  //全局的最优先，混入的先执行，原生的后执行，下面的后执行
  updated() {
    console.log("我是原生的update");
  },
  //下面扩展放的是对象，而混入放的是数组
  extends: extendsObj,
  delimiters: ["${", "}"]
});
```

## Vue 中子组件调用父组件的方法

**方法一：**
通过 `this.$parent` 实现，如：`this.$parent.eventName()`

```javascript
// 父组件
<template>
  <div class="parentCom">
    <child></child>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  name: "ParentCom",
  components: {
    child
  },
  methods: {
    parentMethods() {
      console.log("test");
    }
  }
}
</script>

/****************************************************/

// 子组件
<template>
  <div class="childCom">
    <button @click="childMethods"></button>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  name: "ChildCom",
  methods: {
    childMethods() 
      // 子组件调用父组件的方法
      this.$parent.parentMethods();
    }
  }
}
</script>
```

**方法二：**
通过 `this.$emit`, 如：`this.$emit("eventName", paramers)`

```javascript
// 父组件
<template>
  <div class="parentCom">
    <child :fatherMethods="parentMethods"></child>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  name: "ParentCom",
  components: {
    child
  },
  methods: {
    parentMethods() {
      console.log("test");
    }
  }
}
</script>

/****************************************************/

// 子组件
<template>
  <div class="childCom">
    <button @click="childMethods"></button>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  name: "ChildCom",
  methods: {
    childMethods() 
      // 子组件触发父组件的方法
      this.$emit("childMethods", "参数");
    }
  }
}
</script>
```

## Vue 中的一些事件处理

v-on: 缩写 @

```javascript
// 绑定多个事件
<button @click="doSomething" @mousedown="doMousedown" @mouseup="doMouseup">绑定多个事件</button>

// 2.4.0+，对象方式绑定多个事件
<button v-on:={click: doSomthing1, mousedown: doMousedown, mouseup: doMouseup}>对象方式绑定多个事件</button>

// 阻止冒泡
<button @click.stop="doSomething">阻止冒泡</butto>

// 阻止默认行为
<button @click.prevent="doSomething">阻止默认行为</butto>

// 阻止冒泡和默认行为
<button @click.stop.prevent="doSomething">阻止冒泡和默认行为</butto>

// 点击只触发一次
<button v-on：click.once="doSomething">点击只触发一次</butto>
```