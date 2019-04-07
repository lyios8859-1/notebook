# Vuejs 的数据双向绑定原理

核心使用 ES5 的 API `Object.defineProperty()` 对数据的劫持，劫持数据处理后再再返回给使用者。Vue3.x 话说 通过 ES6 的 API `Proxy()` 来处理。

![vue 数据双向绑定原理](./vue数据双向绑定原理.png "vue 数据双向绑定原理")

# Vue2.x 生命周期

![Vue2的生命周期](./Vue2的生命周期.png "Vue2的生命周期")
