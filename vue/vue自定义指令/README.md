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

```javascript
/**
 * 模板
 * v-tmpl
 * 五个注册指令的钩子函数
 */
Vue.directive('tmpl', {
  /**
   * 1.被绑定（父节点还不存在）
   * 做绑定的准备工作
   * 比如添加事件监听器，或是其他只需要执行一次的复杂操作
   */
  bind: function(el, binding, vnode) {
    console.log('1 - bind');
  },
  // 2.绑定到节点 （父节点已经存在）
  inserted: function(el, binding, vnode) {
    console.log('2 - inserted');
  },
  /**
   * 3.组件更新
   * 根据获得的新值执行对应的更新
   * 对于初始值也会调用一次
   */
  update: function(el, binding, vnode, oldVnode) {
    console.log('3 - update');
  },
  // 4.组件更新完成
  componentUpdated: function(el, binding, vnode, oldVnode) {
    console.log('4 - componentUpdated');
  },
  /**
   * 5.解绑
   * 做清理操作
   * 比如移除bind时绑定的事件监听器
   */
  unbind: function(el, binding, vnode) {
    console.log('5 - bind');
  }
})
/**
钩子函数
1、bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
2、inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
3、update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4、componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
5、unbind:只调用一次，指令与元素解绑时调用。
*/

/**
钩子函数的参数：(el, binding, vnode, oldVnode)
el：指令所绑定的元素，可以用来直接操作 DOM 。
binding：一个对象，包含以下属性
  name：指令名，不包含v-的前缀；
  value：指令的绑定值；例如：v-my-directive="1+1"，value的值是2；
  oldValue：指令绑定的前一个值，仅在update和componentUpdated钩子函数中可用，无论值是否改变都可用；
  expression：绑定值的字符串形式；例如：v-my-directive="1+1"，expression的值是'1+1'；
  arg：传给指令的参数；例如：v-my-directive:foo，arg的值为 'foo'；
  modifiers：一个包含修饰符的对象；例如：v-my-directive.a.b，modifiers的值为{'a':true,'b':true}
vnode：Vue编译的生成虚拟节点；
oldVnode：上一次的虚拟节点，仅在update和componentUpdated钩子函数中可用。
*/
```

注：
（1）页面加载时：`bind` `inserted`
（2）更新组件：`update`` componentUpdated`
（3）卸载组件：`unbind`
（4）重新安装组件：`bind` `inserted`

注意区别：

1, `bind`与`inserted`：`bind`时父节点为`null`，`inserted`时父节点存在；

2, `update`与`componentUpdated`：`update`是数据更新前，`componentUpdated`是数据更新后

## 实例

```javascript
import Vue from 'vue'

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。(父节点已经存在)
  inserted: function (el) {
    // 元素获取焦点
    el.focus();
  }
})

/**
 * 钩子函数 bind update
 * 表单验证
 * v-check="{type:'date',val:currentDate}"
 */
Vue.directive('check', {
  // 被绑定
  bind: function () {
    // 仅首次调用（父节点不存在）
    console.log('指定绑定成功');
  },
  // 组件更新
  update: function (el, binding) {
    // 获取当前的值
    // console.log(binding.value);
    // 进行判断,避免同时触发多个判断
    if (binding.oldValue.val != binding.value.val) {
      // 定义验证状态 局部变量
      let checkStatus = true;
      if (binding.value.type == 'phone') {
        // 验证手机号码
        if (!/^1(3|4|5|7|8)\d{9}$/g.test(binding.value.val)) {
          checkStatus = false;
        }
      } else if (binding.value.type == 'date') {
        // 验证日期
        if (!/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g.test(binding.value.val)) {
          checkStatus = false;
        }
      } else if (binding.value.type == 'identification_card') {
        // 验证身份证
        if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(binding.value.val)) {
          checkStatus = false;
        }
      } else if (binding.value.type == 'email') {
        // 验证邮箱
        if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g.test(binding.value.val)) {
          checkStatus = false;
        }
      } else if (binding.value.type == 'zip_code') {
        // 验证邮编
        if (!/^\d{6}$/g.test(binding.value.val)) {
          checkStatus = false;
        }
      }

      // checkStatus true 成功 false 失败
      if (checkStatus) {
        el.style.border = "1px solid #ccc";
      } else {
        el.style.border = "1px solid red";
      }
    }
  }
});
```