
// 函数接口
interface GetNameFunc {
  (name: string, age: number):string;
}

let getName: GetNameFunc;

getName = function(name: string, age: number) {
  return name + '===' + age;
};

let getName1: GetNameFunc;
// ts 自动类型推断
getName1 = function(name, age) {
  return name + '===' + age;
};

// 类类型, 实现接口
interface IClock {
  // currentTime: Date;
  setTime(d: Date): void;
  getTime(): Date;
}

class ClockImpl implements IClock {
  currentTime: Date; // 私有属性
  constructor(h: number, m: number) {}
  // 实现方法 setTime
  setTime(d: Date) {
    this.currentTime = d;
  }
  getTime(): Date {
    return this.currentTime;
  }
}

// let timer = new ClockImpl(12, 23);
// timer.setTime(Date.now()); // ts
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", timer.getTime());

class Test {
  names: Array<string> = ['小王', '小强', '小张'];
  idx: number = 0;
  GetVisitor(): string {
    this.idx++;
    if (this.idx === this.names.length) {
      this.idx = 0;
    }
    return this.names[this.idx];
  }
}

import Vue from 'vue';
const tester = new Test();

export default Vue.extend({
  name: 'Hello',
  data() {
    return {
      marks: tester.GetVisitor() + getName1('Jerry', 100)
    };
  },
  methods: {
    changed() {
      this.marks = tester.GetVisitor();
    }
  }
});
