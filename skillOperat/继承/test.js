// 父类
function Person(name) {
  this.name = name || "书名";
  this.run = function() {
    console.log(this.name + "跑步！");
  };
}
Person.prototype.sleep = function() {
  console.log(this.name + "睡觉！");
};
Person.prototype.age = 12;

// 子类
function Man(name, sex) {
  let person = new Person();
  for (let p in person) {
    Man.prototype[p] = person[p];
  }
  this.sex = sex || "男";
  // 不能传递参数给父类
  this.name = name || "Man";
}
Man.prototype.work = function() {
  console.log(this.name + ":" + this.sex + ":" + "工作");
};
let boy = new Man("Tom", "女");

boy.run(); // Tom跑步！
boy.work(); // Tom工作！
boy.sleep(); // Tom睡觉！

console.log(boy instanceof Person); // false
console.log(boy instanceof Man); // true
