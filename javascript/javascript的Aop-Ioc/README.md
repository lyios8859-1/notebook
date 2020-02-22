# Aop IoC

## 咀嚼 Aop

> 面向切面编程,对OOP的补充: (函数执行前后的操作,环绕操作,这个函数与当前函数共同一个 `this` 和参数)
> 一种方式,在运行时，动态的将代码切入到类的指定方法或者指定位置上的编程思想，就是面向切面的编程。
> 另外一种是在编译代码的时，将代码切入到指定的方法或者位置上去，这是静态添加的方式。
> 1, 防止 `winodw.onload` 被二次覆盖
> 2, 无侵入统计代码
> 3, 分离表单请求和校验
> 4, 给 `ajax` 请求动态添加参数
> 5, 职责链模式
> 6, 组合替代模式

- 前置通知（Before advice）：在某连接点之前执行的通知，但这个通知不能阻止连接点之前的执行流程（除非它抛出一个异常）。
- 后置通知（After returning advice）：在某连接点正常完成后执行的通知：例如，一个方法没有抛出任何异常，正常返回。
- 异常通知（After throwing advice）：在方法抛出异常退出时执行的通知。
- 最终通知（After (finally) advice）：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）。
- 环绕通知（Around Advice）：包围一个连接点的通知，如方法调用。这是最强大的一种通知类型。环绕通知可以在方法调用前后完成自定义的行为。它也会选择是否继续执行连接点或直接返回它自己的返回值或抛出异常来结束执行。

实际的业务中有一些公共逻辑，比如日志的记录，事务的管理等等，而如果每次都把日志和事务的代码手动写到业务逻辑前后，这样重复代码就相当可怕了:bug:，
而如果这些额外代码有修改，必须要每个都修改，这是相当不明智的。Aop思想来了:star:

[参考1](https://www.jianshu.com/p/ec24aa4b3ee7 "AOP")

[参考2](https://www.jb51.net/article/130906.htm "AOP")

**AOP的几个概念**：

1. 连接点(JointPoint): 能够被拦截的地方，一般是成员方法或者属性，它们都可以称之为连接点。
2. 切点(PointCut): 具体定位的连接点，既然每个方法(或属性)都可以作为连接点，我们不可能对所有方法都进行增强，那么被我们匹配用来增强的方法就是切点。
3. 增强/通知(Advice): 就是我们用来添加到特定切点上的逻辑代码，用于"增强"原有的功能。
4. 切面(Aspect): 切面由切点和增强组成，就是定义你要在"什么地方"以"何种方式"做"什么事"。

```js
const Aspects = function () {
  /**
   * target: 被注入的对象 ,
   * method: 被注入的对象的方法名 ,
   * advice: 通知函数（需要植入的我们的逻辑函数）
   */
  // 依赖前置
  this.before = function (target, method, advice) {
    const original = target[method];
    target[method] = function () {
      let self = this;
      const pointCut = {
        target,
        method: original,
        args: arguments,
        self
        // 在连接点信息中还加入了 self 即当前对象的引用，是因为当增强代码如果是箭头函数时，后面的 apply 和 call 方法无法修改增强代码的 this 引用，可通过这个 self 来访问目标对象的属性
        // 使用 function 定义的回调可以直接使用 this 访问目标对象的
      };
      (advice).call(self, pointCut);
      original.apply(target, arguments);
    };
    return target;
  },
    // 依赖后置
    this.after = function (target, method, advice) {
      const original = target[method];
      target[method] = function () {
        let self = this;
        const pointCut = {
          target,
          method: original,
          args: arguments,
          self
          // 在连接点信息中还加入了 self 即当前对象的引用，是因为当增强代码如果是箭头函数时，后面的 apply 和 call 方法无法修改增强代码的 this 引用，可通过这个 self 来访问目标对象的属性
          // 使用 function 定义的回调可以直接使用 this 访问目标对象的 
        };
        original.apply(target, pointCut);
        (advice).call(self, arguments);
      };
      return target;
    },
    // 依赖环绕
    this.around = function (target, method, advice) {
      const original = target[method];
      target[method] = function () {
        let self = this;
        const pointCut = {
          target,
          method: original,
          args: arguments,
          self
          // 在连接点信息中还加入了 self 即当前对象的引用，是因为当增强代码如果是箭头函数时，后面的 apply 和 call 方法无法修改增强代码的 this 引用，可通过这个 self 来访问目标对象的属性
          // 使用 function 定义的回调可以直接使用 this 访问目标对象的
        };
        (advice).call(self, pointCut);
        original.apply(target, arguments);
        (advice).call(self, pointCut);
      };
      return target;
    }
};

// 实例一
function voice() {
  console.log('救命啊！');
}
const btn = document.getElementById("btn");
const aspects1 = new Aspects;
aspects1.before(btn, 'onclick', function () {
  console.log('HELP！HELP！')
});

// 实例二
function Person() {
  this.say = function (name) {
    console.log(`My name is ${name}`);
  }
}
let person = new Person;
const aspects2 = new Aspects;
person = aspects2.before(person, 'say', function (param) {
  console.log(param)
  console.log('请你介绍一下自己！')
});
// 执行注入的方法的函数
person.say('欧阳明日');
```

## IoC（Inversion of Control）依赖倒置（反转）

## 咀嚼 IoC

> 对于一个大项目来说，对项目拆解成多个模块/组件（完了，任务量大了...），从而又把他们组合起来使用，提高代码复用性，来提高开发效率（美滋滋 :star:）。
> 类 `A` 直接依赖类 `B`, 加入要将类 `A` 改为依赖类 `C`,则必须修改类 `A` 的代码来实现, 对于类 `A` 一般都是高层模块,负责复杂的业务逻辑; 类 `B` 和 类 `C` 是底层模块,负责基本的原子操作, 原子操作: 修改类 `A`, 会给程序带来不可预测的麻烦.. 如此一来,不是我们开发这所期望的.
> 解决方案: IoC
> 将类 `A` 修改为依赖接口 `I`, 类 `B` 和类 `C` 各自实现接口 `I`, 类 `A` 通过接口 `I` 间接与类 `B` 或类 `C` 发生联系, 这样就会减低修改类 `A` 代码.:sparkles:

IoC：两个准则（核心：面向接口编程）

- 高层次的模块不应该依赖于低层次的模块，他们都应该依赖于抽象。
- 抽象不应该依赖于具体实现，具体实现应该依赖于抽象
  
（说人话）
例如：需要实现一个弹框，弹框一个显示提示信息（用于展示），一个显示的数据内容加载（用于逻辑）
