# Vue3.0 尝鲜

> 面向函数式编程

## 克隆 Vue3.0 的源码

```shell
git clone https://github.com/vuejs/vue-next.git
```

## 查看源码调试，需要几个简单的操作

> - 找到 `rollup.config.js` 中的 `createConfig()` 函数 添加一行代码，启动输出的源码映射（sourcemap），便于调试
> `output.sourcemap = true`
> - 找到 `tsconfig.json` 中的 `compilerOptions` 对象属性, 添加或修改属性为 `"sourceMap": true,`

## 开发阶段执行编译打包，生成 vue 库

> 执行命令 `npm run dev` 或者 `yarn dev` 打包生成文件 `packages/vue/dist/vue.global.js` 和 `packages/vue/dist/vue.global.js.map`

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const App = {
        template: `<div>{{msg}}</div>`,
        data: {
            msg: 'Hello Tom!!!'
        }
    }
    Vue.createApp().mount(App, '#root');
</script>
```

## 基本使用 

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const {createApp, reactive} = Vue;
    const App = {
        template: `<div>{{msg}}</div>`,
        // setup 在 beforeCreate 钩子后，created 之前执行
        setup () {
            // 创建一个响应式数据
            const state = ractive({msg: 'Hello reactive!!!'});

            // 必须返回才可以在模板里使用, 返回的对象会和render函数上下文合并
            return state;
        }
    }
    createApp().mount(App, '#root');
</script>
```

## 事件，响应式数据的写法

- 方案一

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const {createApp, reactive} = Vue;
    const App = {
        template: `<div @click="handleClick">{{count}}</div>`,
        setup () {
            // 创建一个响应式数据
            const state = ractive({count: 0});
            
            // 不建议这么写
            state.handleClick = function () {
                state.count += 1;
                console.log('Click Event: ', state.count);
            }
            // 必须返回才可以在模板里使用, 返回的对象会和render函数上下文合并
            return state;
        }
    }
    createApp().mount(App, '#root');
</script>
```

- 方案二 reactive 单个属性

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const {createApp, reactive} = Vue;
    const App = {
        template: `<div @click="handleClick">{{state.count}}={{stat.name}}</div>`,
        setup () {
            // 把原始值处理成响应式的数据对象
            const state = ractive({count: 0, name: 'Tom'});
            
            // 优雅的写法
            const handleClick = () => {
                state.count += 1;
                console.log('name: ', state.name);
                console.log('Click Event: ', state.count);
            }
            // 必须返回才可以在模板里使用, 返回的对象会和render函数上下文合并
            return {
                state,
                handleClick
            };
        }
    }
    createApp().mount(App, '#root');
</script>
```

- 方案三 ref 单个属性对象

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const {createApp, ref} = Vue;
    const App = {
        template: `<div @click="handleClick">{{count}}={{name}}</div>`,
        setup () {
            
            // 把原始值处理成响应式的数据对象
            const count = ref(0);
            const name = ref('Tom');

            // 优雅的写法
            const handleClick = () => {
                count.value += 1;
                console.log('name: ', name.value);
                console.log('Click Event: ', count.value);
            }

            // 必须返回才可以在模板里使用, 返回的对象会和render函数上下文合并
            return {
                count,
                name,
                handleClick
            };
        }
    }
    createApp().mount(App, '#root');
</script>
```

- 方案四 toRefs 多个个属性对象

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const {createApp, reactive, toRefs} = Vue;
    const App = {
        template: `<div @click="handleClick">{{count}}={name}}</div>`,
        setup () {
            
            // 把原始值处理成响应式的数据对象
            const state = ractive({count: 0, name: 'Tom'});

            // 优雅的写法
            const handleClick = () => {
                state.count += 1;
                console.log('name: ', state.name);
                console.log('Click Event: ', state.count);
            }

            // 必须返回才可以在模板里使用, 返回的对象会和render函数上下文合并
            return {
                ...toRefs(state),
                handleClick
            };
        }
    }
    createApp().mount(App, '#root');
</script>
```

## computed, watch 等等 

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const {createApp, reactive, toRefs, computed, watch} = Vue;
    const App = {
        template: `
            <div @click="handleClick">count: {{count}}</div>
            <div>doubleCount: {{doubleCount}}</div>
        `,
        setup () {
            
            // 把原始值处理成响应式的数据对象
            const state = ractive({count: 0});

            // 优雅的写法
            const handleClick = () => {
                state.count += 1;
            }
            
            // 接收一个getter函数，返回响应式的数据，ref 对象
            const doubleCount = computed(() => state.count * 2);

            // 监听数据变化 API
            watch(() => {
                console.log('数据有变化：', state.count);
            });

            // 必须返回才可以在模板里使用, 返回的对象会和render函数上下文合并
            return {
                ...toRefs(state),
                doubleCount
                handleClick
            };
        }
    }
    createApp().mount(App, '#root');
</script>
```

[参考](https://vue-composition-api-rfc.netlify.com/)

## onMounted 等等，钩子函数 

[参考](https://vue-composition-api-rfc.netlify.com/)

## 逻辑组合（混入）

- Vue2.x

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const {createApp, reactive, toRefs, onMounted, onUnmounted} = Vue;
    const useMouse = {
        data () {
            return {
                x: 0,
                y: 0
            }
        }
        mounted () {
            window.addEventListener('mousemove', update);
        },
        deforeDestroy () {
            window.removeEventListener('mousemove', update);
        },
        methods: {
            update (e) {
                this.x = e.pageX;
                this.y = e.pageY;
            };
        }
    };
    const useTime = {
        data () {
            return {
                time: new Date()
            }
        },
        mounted () {
            setInterval(() => {
                this.time = new Date();
            }, 1000);
        }
    };

    const App = {
        template: `<div>x={{x}}, y={{y}}, <mark>timer={{timer}}</mark></div>`,
        // 这种的换对数据的来源，处理不是很清晰， 在组件中定义一些属性和方法很可能和mixin中的重复，受影响
        mixins: [useMouse, useTime]
    }
    createApp().mount(App, '#root');
</script>
```


- Vue3.x

```html
<div id="root"></div>
<script src="/dist/vue.gloagl.js"></script>
<script>
    const {createApp, reactive, toRefs, onMounted, onUnmounted} = Vue;
    
    function useMouse () {
        const state = reactive({x: 0, y: 0});
        const update = e => {
            state.x = e.pageX;
            state.y = e.pageY;
        };
        onMounted(() => {
            window.addEventListener('mousemove', update);
        });
        onUnmounted(() => {
            window.removeEventListener('mousemove', update);
        });
        return toRefs(state);
    }

    function useTime () {
        const state =  reactive({time: new Date()});
        onMounted(() => {
            setInterval(() => {
                state.time = new Date();
            }, 1000);
        });
        return toRefs(state);
    }

    const App = {
        template: `<div>x={{x}}, y={{y}}, <mark>timer={{timer}}</mark></div>`,
        setup () {
            const {x, y} = useMouse();
            const {time} = useTime();
            return {x, y, time};
        }
    }
    createApp().mount(App, '#root');
</script>
```

## @vue/composition-api 函数式编程的体现, 模块开发时, npm 安装, import 导入

```html
<template>
    <div></div>
</template>

<script>
// 在 Vue2.x中体验 Vue3 的 composition-api
import Vue from 'vue';
import compositionApi from '@vue/composition-api';
Vue.use(compositionApi);

</script>
```

## Vue3.0 的响应式原理

- Vue2.x 响应式的一些问题 `Object.defineProperty()`
    - 响应过程需要遍历 data,props 等，消耗性能
    - 不支持 Set/Map, Class, 数组等类型
    - 新添加或删除属性无法监听变化
    - 数组的响应化需要额外实现
    - 对应的额外响应的修改语法不同，有限制

- Vue3.0 `Proxy()` 解决 Vue2.x 的问题