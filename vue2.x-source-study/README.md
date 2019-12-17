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