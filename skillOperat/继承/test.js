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
  // 构造函数继承（可以向父类构造函数传递参数）
  Person.call(this, name);
  this.sex = sex;
}

// 原型继承
// Man.prototype = new Person();
// 推荐
Man.prototype = Person.prototype;

// 注意：修复构造函数指向的
Man.prototype.constructor = Man;

// 子类新增属性和方法，必须要在 new 父类() ’new Person()‘ 这样的语句之后执行，不能放到构造器中
Man.prototype.work = function() {
  console.log(this.name + "工作!");
};
let boy = new Man("Tom");

// 使用了默认的 name 变量值”书名“，也就是说原型链继承不能传递参数给父类
boy.run(); // Tom跑步！
boy.work(); // Tom工作！
boy.sleep(); // Tom睡觉！

console.log(boy instanceof Person); // true
console.log(boy instanceof Man); // true
