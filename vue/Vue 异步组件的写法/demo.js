// 工厂函数的方式
Vue.component('async-example', function (resolve, reject) {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 Ajax 请求自动下载。
    require(['./my-async-component'], resolve)
})


// Promise 的方式
Vue.component(
    'async-webpack-example',
    // 该 `import` 函数返回一个 `Promise` 对象。
    () => import('./my-async-component')
)

// 高级异步组件
const AsyncComp = () => ({
    // 需要加载的组件。应当是一个 Promise
    component: import('./MyComp.vue'),
    // 加载中应当渲染的组件
    loading: LoadingComp, // 加载 Loading 提示
    // 出错时渲染的组件
    error: ErrorComp, // 加载错误提示
    // 渲染加载中组件前的等待时间。默认：200ms。
    delay: 200,
    // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
    timeout: 3000
})
Vue.component('async-example', AsyncComp)
