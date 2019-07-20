# Vue 自定义指令

> 需要对普通 DOM 元素进行底层操作时,可以考虑自定义指令来实现。
> Vue 可自定义全局指令和局部指令

## directive 语法

> Vue.directive(指令名,配置对象)

1, **创建全局指令**

> 特点:可以在任意不同的实例对象挂载的范围进行使用

钩子函数：

> bind——只调用一次，在指令第一次绑定到元素上时调用。
> update——在 bind 之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值。
> unbind——只调用一次，在指令从元素上解绑时调用。

指令实例属性：所有的钩子函数都将被复制到实际的指令对象中，在钩子内 this 指向这个指令对象。

> el——指令绑定的元素。
> vm——拥有该指令的上下文 ViewModel.
> expression——指令的表达式，不包括参数和过滤器。
> arg——指令的参数。
> name——指令的名字，不包括前缀。
> modifiers——一个对象，包括指令的修饰符。
> descriptor——一个对象，包括指令的解析结果。
>
> 注：我们应当将这些属性视为只读，不要修改它们。我们也可以给指令对象添加自定义属性，但是注意不要覆盖已有的内部属性。

```html
<div id="demo" v-check:hello.a.b="msg"></div>
```

```javascript
/**
 * 钩子函数 bind update
 * 表单验证
 * 示例：
 * <span v-check="{type:'date',val:currentDate}"></span>
 */

Vue.directive("check", {
  bind: function() {
    //准备工作
    //例如，添加事件处理器或只需要运行一次的高耗任务
  },
  update: function() {
    //值更新时的工作
    //也会以初始值为参数调用一次

    this.el.innerHTML =
      "name-" +
      this.name +
      "</br>" +
      "expression-" +
      this.expression +
      "</br>" +
      "argument-" +
      this.arg +
      "</br>" +
      "modifiers-" +
      JSON.stringify(this.modifiers) +
      "</br>" +
      "value-" +
      this.value +
      "</br>" +
      "vm-msg-" +
      this.vm.msg +
      "</br>";
  },
  unbind: function() {
    //清理工作
    //例如，删除bind()添加的事件监听器
  }
});
```

2, **创建局部指令**

> 特点:在指定的实例对象挂载范围内使用

```javascript
directives: {
  check: {  // 使用时 v-check
    // 需要访问该指令所绑定元素的父级,必须要在inserted钩子中.
    bind(el, binding) {
      // 输出的结果为:null
      console.log('bind:', el, el.parentElement);
    },
      // 当绑定元素插入到 DOM 中。
    inserted(el, binding) {
      // 输出的结果为: 某个标签, 即对应的父级标签
      // 聚焦元素
      el.focus();
      console.log('inserted:', el, el.parentElement);
    },
    // 指令所绑定的值, 再次改变的时候, 才会触发 (组件更新)
    update(el, binding) {}
  }
}
```
