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