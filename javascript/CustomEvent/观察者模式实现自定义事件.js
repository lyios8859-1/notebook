// 观察者模式实现自定义事件
const eventObserver = {
  // 存储函数的容器
  eventHandler: {},
  // 添加指定某种类型的函数事件
  add: function (eventType, eventFn) {
    const hanlders = this.eventHandler;
    // 判断是否存在 type 类型的函数事件
    if (hanlders[eventType]) {
      // 判断函数事件是否存在,不存在就添加
      if (hanlders[eventType].indexOf(eventFn) === -1) {
        hanlders[eventType].push(eventFn);
      }
    } else {
      hanlders[eventType] = [eventFn];
    }
  },
  // 移除指定的某种类型的函数
  remove: function (eventType, eventFn) {
      try {
        const targetFn = this.eventHandler[eventType];
        const index = targetFn.indexOf(eventFn);
        if (index === -1) throw `该 ${eventType} 类型中的函数 ${eventFn.name} 不存在`;
        targetFn.splice(index, 1);
      } catch (error) {
        console.error(`该 ${eventType} 类型中的函数不存在, 或者是该 ${eventType} 类型中的函数 ${eventFn.name} 不存在`);
      }
  },
  // 触发某种类型的事件函数, 有需要,可以实现触发某种类型中的某个函数
  fire: function (eventType, eventFn, mark) {
    // 使用 trycatch 可减少判断, 一劳永逸,但是提示信息不是很明确
    try {
      const targetFn = this.eventHandler[eventType];
      const len = targetFn.length;
      if (arguments.length === 1) {
        // 触发某种类型的全部函数
        for (let i = 0; i < len; i++) {
          targetFn[i] && targetFn[i]();
        }
      } else {
        if (mark === true) {
          alert(3)
          for (let i = 0; i < len; i++) {
            if (targetFn[i].name === eventFn.name) {
              // 触发某一个类型中的某一个函数
              targetFn[i] && targetFn[i]();
            }
          }
        } else if (mark === 'once') {
          // 执行 once 方法,是需要删除
          const index = targetFn.indexOf(eventFn);
          if (index===-1) throw `该 ${eventType} 类型中的函数 ${eventFn.name} 不存在`;
          eventFn && eventFn();
        } else {
          console.warn(`必须提供第三个参数,表示执行该 ${eventType} 中的 ${eventFn.name} 函数`)
        }
      }
      return true;
    } catch (error) {
      console.error(`该 ${eventType} 类型中的函数不存在, 或者是该 ${eventType} 类型中的函数 ${eventFn.name} 不存在`);
      return false;
    }
  },
  // 触发某种类型的函数,执行一次,然后删除该事件函数
  once: function (eventType, eventFn) {
    this.fire(eventType, eventFn, 'once') ? this.remove(eventType, eventFn) : null;
  }
};

const fn1 = function () {
  console.log('fn1');
}
const fn2 = function () {
  console.log('fn2');
}
const fn3 = function () {
  console.log('fn3');
}
eventObserver.add('f', fn1)
eventObserver.add('f', fn2)
eventObserver.add('f', fn3)

eventObserver.fire('f', fn3, true);
