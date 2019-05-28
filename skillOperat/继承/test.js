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
  person.name = name || "Man";
  return Object.assign(this, person);
}
Man.prototype.work = function() {
  console.log(this.name + ":" + this.sex + ":" + "工作");
};
let boy = new Man("Tom", "女");

console.log(boy.age); // 12
boy.run(); // Tom跑步！
boy.sleep(); // Tom睡觉！
boy.work(); // 报错，不能调用子类的实例和原型的方法和属性！

console.log(boy instanceof Person); // false
console.log(boy instanceof Man); // true
