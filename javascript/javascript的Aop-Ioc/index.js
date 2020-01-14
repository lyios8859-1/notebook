const Aspects = function () {
  // 依赖前置
  /**
   * target: 被注入的对象 ,
   * method: 被注入的对象的方法名 ,
   * advice: 通知函数
   */
  this.before = function (target, method, advice) {
    const original = target[method];
    target[method] = function () {
      (advice)();
      original.apply(target, arguments);
    };
    return target;
  },
    // 依赖后置
    this.after = function (target, method, advice) {
      const original = target[method];
      target[method] = function () {
        original.apply(target, arguments);
        (advice)();
      };
      return target;
    },
    // 依赖环绕
    this.around = function (target, method, advice) {
      const original = target[method];
      target[method] = function () {
        (advice)();
        original.apply(target, arguments);
        (advice)();
      };
      return target;
    }
};


// 实例一
function voice () {
  console.log('救命啊！');
}
const btn = document.getElementById("btn");
const aspects1 = new Aspects;
aspects1.before(btn, 'onclick', function () {
  console.log('HELP！HELP！')
});

// 实例二
function Person () {
  this.say = function (name) {
    console.log(`My name is ${name}`);
  }
}
let person = new Person;
const aspects2 = new Aspects;
person = aspects2.before(person, 'say', function () {
  console.log('请你介绍一下自己！')
});
// 执行注入的方法的函数
person.say("司徒正美");