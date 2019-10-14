// 发布者(Subject 被实时观察的监听的对象)
class Publish {
  constructor (state) {
    this.state = state || ''; // 触发更新的状态
    // 存储所有的订阅者
    this.subscribers = [];
  }
  getState () {
    return this.state;
  }
  setState (state) {
    if (this.state === state) {
      console.log('不能设为之前的相同的 state，这个是无效的.');
      return;
    }
    this.state = state;
    // 有更新，自动触发通知！【原本手动触发通知的，现在根据数据变化来触发】
    this.notify();
  }

  // 提供订阅方法(注册)
  subscribeRegister (subscribe, func) {
    // subscribe 是订阅者对象
    this.subscribers.push({ subscribe: subscribe, subsFunc: func });
  }
  // 取消订阅方法
  removeSubscribe (subscribe) {
    const index = this.subscribers.findIndex(item => item === subscribe);

    // 如果存在该订阅者,就从subscribers中删除,取消订阅者的订阅
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    } else {
      console.log('不存在该订阅者');
      return '不存在该订阅者';
    }
  }

  // 发布者发布消息(通知已订阅的订阅者)
  notify () {
    // 收集需要发布的要系
    this.subscribers.forEach(subs => {
      // 调用订阅者(subscribe)中的实时监听更新处理方法
      // subscribe.update();
      subs.subscribe.listenerUpdate(subs.subsFunc);
    });
  }
}

// 订阅者(Observer 观察者)
class Subscribe {
  constructor (name) {
    this.name = name;
  }
  // 对发布者的订阅方法代理
  subscribe (publish) {
    // publish 是发布者对象
    publish.subscribeRegister(this);
  }

  // 更新处理方法 listener(监听是否发布者发布新消息)
  // update () {
  listenerUpdate (param) {
    console.log('订阅者获取(更新)发布者的发布的消息', param());
  }
}
const publish1 = new Publish('publish1');

const subscribe1 = new Subscribe('subscribe1');
const subscribe2 = new Subscribe('subscribe2');
// subscribe2.update = function () {}; // 修改update方法，实现不同逻辑
// subscribe2.listenerUpdate = function () {}; // 修改listenerUpdate方法，实现不同逻辑

// 为发布者添加订阅者
publish1.subscribeRegister(subscribe1, () => {
  return 1;
});
publish1.subscribeRegister(subscribe2, () => {
  return 2;
});

// 状态变化就自动触发
publish1.setState('Tom');
// publish1.setState('Jerry');

