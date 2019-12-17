# Vue 组件

- 智能组件原理

>智能组件可以称为第三方通用组件，也可以称之为业务型公用组件，与父组件之间的关系是完全解耦的，只能通过 props 进行数据传递，event 进行事件传递，不依赖于任何环境，只需要传递相应的数据和事件，就能得到你想要的操作。

- 木偶组件原理

> 木偶组件是为了业务页面进行拆分而形成的组件模式。比如一个页面，可以分多个模块，而每一个模块与其余页面并没有公用性，只是纯粹拆分。

## 了解一下 props

> Vue 是单向数据流的，父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
> 因此不应该在子组件中直接修改props的值

几个小技巧：

- 如果传递的prop仅仅用作展示，不涉及修改，则在模板中直接使用即可
- 如果需要对prop的值进行转化然后展示，则应该使用computed计算属性
- 如果prop的值用作初始化，应该定义一个子组件的data属性并将prop作为其初始值

## 组件之间的通信

- 父子组件的关系可以总结为 prop 向下传递，事件event向上传递
- 祖先组件和后代组件（跨多代）的数据传递，可以使用provide和inject来实现
- 跨组件或者兄弟组件之间的通信，可以通过eventBus或者vuex等方式来实现

### “绕开”单向数据流

- 事件回传（有的叫状态提升）: 直接通过props将父元素的数据处理逻辑传入子组件，子组件只做数据展示和事件挂载即可

```html
<!-- 子组件 -->
<template>
  <div class="counter">
    <div class="counter_btn" @click="onMinus">-</div>
    <div class="counter_val">{{value}}</div>
    <div class="counter_btn" @click="onPlus">+</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    onMinus: Function,
    onPlus: Function
  },
};
</script>

<!-- 父组件,调用 -->
<template>
  <div>
    <counter :value="counter2Val" :on-minus="minusVal" :on-plus="plusVal"></counter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      counter2Val: 0,
    }
  },
  methods: {
    minusVal(){
      this.counter2Val--;
    },
    plusVal(){
      this.counter2Val++;
    }
  }
}
</script>
```

- v-model语法糖
  拆解为 props: value 和 events: input。通俗说组件只要提供一个名为 value 的 prop，以及名为 input 的自定义事件。

```html
<!-- 子组建 -->
<template>
  <div>
    <button @click="changeValue(-1)">-1</button>
    <span>{{currentVal}}</span>
    <button @click="changeValue(1)">+1</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number // 定义value属性
    }
  },
  data() {
    return {
      currentVal: this.value
    };
  },
  methods: {
    changeVal(val) {
      this.currentVal += parseInt(val);
      this.$emit("input", this.currentVal); // 定义input事件
    }
  }
};
</script>

<!-- 父组件,调用 -->
<counter v-model="counerVal"/>

<!-- 在2.2之后的版本中，可以自定义v-model指令的prop和event名称 -->
<!-- 子组件, Children.vue -->
<template>
  <div v-show="show">
    <div>
      <p>这是一个Model框</p>
      <input type="text" v-model="value">
      {{value}}
        <button @click="closeModel">关闭model</button>
    </div>
  </div>
</template>
<script>
export default {
  // 通过 model 选项的改变，把 props 从原本的value换成了show，input触发的事件换成了close
  model: {
    prop: 'show',
    event: 'close'
  },
  data () {
    return {
      value: 10
     }
  },
  props: ['show'],
  methods: {
    closeModel () {
      this.$emit('close',false)
    }
  }
  // Other Code
 }
</script>

<!-- 父组件 -->
<template>
  <div class="hello">
    <button @click="show=true">打开model</button>
    <Children v-model="show" ></Children>
  </div>
</template>

<script>
import Demo from './Children.vue'
export default {
  name: 'hello',
  components: {
    Children
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
```

- 王者回归 .sync (数据双向流动)
> `<demo :foo.sync="something"></demo>` <==> 语法糖的扩展 `<demo :foo="something" @update:foo="val => something = val"></demo>`

- foo 则是 demo 子组件需要从父组件 props 接收的数据
- 通过事件显示监听 update:foo (foo则是 props 显示监听的数据)，通过箭头函数执行回调，把参数传给 something，则就形成了一种双向绑定的循环链条

> 当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件： `this.$emit('update:foo', newValue)`

第一个参数则是 update 是显示更新的事件，跟在后面的：foo则是需要改变对应的props值。

第二个参数传入的是你希望父组件foo数据里将要变化的值，以用于父组件接收update时更新数据。

```html
<!-- 子组件 -->
<template>
   <div v-show="show">
      <p>这是一个Model框</p>
      <button @click="closeModel">关闭model</button>
   </div>
</template>
<script>
export default {
  props: ['show'],
  methods: {
    closeModel () {
      this.$emit('update:show',false)
    }
  }
}
</script>
<!-- 父组件 -->

<template>
  <div class="hello">
    <button @click="show=true">打开model</button>
    <demo :show.sync="show" ></demo>
  </div>
</template>

<script>
  import Demo from './Demo.vue'
  export default {
    name: 'hello',
    components: {
      Demo
    },
    data () {
      return {
        show: false
      }
    }
  }
</script>
```

[参考1](https://juejin.im/post/5cb3eed65188251b0351f2c4#heading-2)
[参考2](https://juejin.im/post/5bd97e7c6fb9a022852a71cf#heading-53)

## 封装API组件

- 消息弹窗组件

```html
<!-- alert.vue -->
<template>
  <div class="alert">
    <div class="alert-main" v-for="item in notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
let seed = 0;
function getUuid() {
  return 'alert_' + (seed++);
}

export default {
  data() {
    return {
      notices: []
    }
  },
  methods: {
    add(notice) {
      const name = getUuid();
      let _notice = Object.assign({
        name: name
      }, notice);
      this.notices.push(_notice);
      // 定时移除，单位：秒
      const duration = notice.duration;
      setTimeout(() => {
        this.remove(name);
      }, duration * 1000);
    },
    remove(name) {
      const notices = this.notices;
      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    }
  }
}
</script>

<!-- 实现消息组件挂载到页面的逻辑， 并对外暴露展示消息的接口 -->
<!-- alert.js -->
<script>
import Vue from 'vue';
// 页面（可以通用）其他的页面
import Alert from './alert.vue';

Alert.newInstance = properties => {
  const props = properties || {};
  // 实例化一个组件，然后挂载到body上
  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Alert, {
        props: props
      });
    }
  });
  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  // 通过闭包维护alert组件的引用
  const alert = Instance.$children[0];
  return {
    // Alert组件对外暴露的两个方法
    add (noticeProps) {
      alert.add(noticeProps);
    },
    remove (name) {
      alert.remove(name);
    }
  }
};

// 提示单例
let messageInstance;
function getMessageInstance () {
  messageInstance = messageInstance || Alert.newInstance();
  return messageInstance;
}

function notice({ duration = 1.5, content = ''， confim: function(){} }) {
  // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
  let instance = getMessageInstance();
  instance.add({
    content: content,
    duration: duration,
    confim: confim // 回调函数给外界使用
  });
}

// 对外暴露的方法
export default {
  info (options) {
    return notice(options);
  }
}
</script>

<!-- 调用 -->
<script>
import alert from './alert.js';
alert.info({content: '消息提示', duration: 2});
</script>
```

## 高阶组件

> 高阶组件可以看做是函数式编程中的组合。可以把高阶组件看做是一个函数，他接收一个组件作为参数，并返回一个功能增强的组件
> 高阶组件是一个接替Mixin实现抽象组件公共功能的方法，不会因为组件的使用而污染DOM（添加并不想要的div标签等）、可以包裹任意的单一子元素等等
> Vue实现方式：在组件的render函数中，只需要返回一个vNode数据类型即可，如果在render函数中提前做一些处理，并返回this.$slots.default[0]对应的vnode，就可以实现高阶组件。

- 实例 throttle（节流）：常见的场景有及时搜索框避免频繁触发搜索接口、表单按钮防止在短暂时间误重复提交等

```html
<script>
// 节流函数
const throttle = function (fn, wait = 50, ctx) {
  let timer;
  let lastCall = 0;
  return function (...params) {
    const now = new Date().getTime();
    if (now - lastCall < wait) return;
    lastCall = now;
    fn.apply(ctx, params);
  }
}

export default {
  name: 'throttle',
  abstract: true,
  props: {
    time: Number,
    events: String
  },
  created() {
    this.eventKeys = this.events.split(',');
    this.originMap = {};
    this.throttledMap = {};
  },
  // render函数直接返回slot的vnode，避免外层添加包裹元素
  render(h) {
    const vnode = this.$slots.default[0];
    this.eventKeys.forEach((key) => {
      const target = vnode.data.on[key];
      if (target === this.originMap[key] && this.throttledMap[key]) {
        vnode.data.on[key] = this.throttledMap[key];
      } else if (target) {
        // 将原本的事件处理函数替换成throttle节流后的处理函数
        this.originMap[key] = target;
        this.throttledMap[key] = throttle(target, this.time, vnode);
        vnode.data.on[key] = this.throttledMap[key];
      }
    })
    return vnode;
  }
}
</script>

<!--
  调用：
  time表示节流的时间间隔
  events表示需要处理的事件名，多个事件用逗号分隔 
-->
<template>
  <div>
    <Throttle :time="1000" events="click">
      <button @click="clickBtn">click {{count}}</button>
    </Throttle>
  </div>
</template>
```
