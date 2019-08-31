
interface GetNameFunc {
  (name: string, age: number):string;
}

let getName: GetNameFunc;

getName = function (name: string, age: number) {
  return name + "===" + age;
};

class Test {
  public names: Array<string> = ["小王", "小强", "小张"];
  idx: number = 0;
  GetVisitor(): string {
    this.idx++;
    if (this.idx == this.names.length) {
      this.idx = 0;
    }
    return this.names[this.idx];
  }

}

import Vue from "vue";
let tester = new Test();

export default Vue.extend({
  name: 'Hello',
  data() {
    return {
      marks: tester.GetVisitor(),
    }
  },
  methods: {
    changed() {
      this.marks = tester.GetVisitor();
    }
  }
});