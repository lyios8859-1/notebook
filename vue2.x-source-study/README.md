# Vue2.x 的源码学习

## 轻量级的构建工具 rollup，只处理js文件

## 使用 Flow 进行类型检查（类似与Typescript的类型检查）

主目录下有 .flowconfig 文件，就是Flow的配置文件，里面有个配置 `[libs]` 指定了库检测的目录，默认名是 flow-typed 的目录， 这里配置为 flow，其目录下的文件如下：
- compiler.js     # 编译相关
- component.js    # 组件数据结构
- global-api.js   # Global API 结构
- modules.js      # 第三方库定义
- options.js      # 选项相关
- ssr.js          # 服务端渲染相关
- vnode.js        # 虚拟 Node 相关

## Runtime Only 与 Runtime+Compiler

- 在使用 Runtime Only 版本时，通常借助 webpack 的 vue-loader 工具把 `.vue` 文件编译成
javascript，因为这是在编译阶段做的，所以它只包含运行时的Vue.js代码，因此代码体积比较轻量。运行时不编译，离线编译

- Runtime+Compiler Vue在运行时会动态编译 template 这个模板编译成render函数需要这个版本。

也就是说 如果使用属性 template 那么就需要 Runtime+Compiler 来编译成render函数，如果使用 render函数就使用 Runtime Only 

```html
<script>
// 使用 Runtime+Compiler 版本
new Vue({
    template: '<div>{{msg}}</div>'
});

//  使用 Runtime Only 版本
new Vue({
    render (h) {
        return h('div', this.msg);
    }
});
</script>
```

总结：Vue2.x 最终渲染都通过render函数处理，如果写template属性需要再编译成render函数，这个编译过程发生在运行时，因此需要使用 Runtime+Compiler 版本。

如果是 `.vue` 文件中的template是在编译过程中已经通过 vue-loader 先编译了，在运行时已经是javascript代码了，template部分已经编译成render函数了。