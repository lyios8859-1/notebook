# JavaScript 继承

## 原型链继承

```javascript
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
function Man(name) {}

// 原型继承 推荐：Man.prototype = Person.prototype;
Man.prototype = new Person();

// 子类新增属性和方法，必须要在 new 父类() ’new Person()‘ 这样的语句之后执行，不能放到构造器中
Man.prototype.work = function() {
  console.log(this.name + "工作!");
};
let boy = new Man("Tom");

// 使用了默认的 name 变量值”书名“，也就是说原型链继承不能传递参数给父类
boy.run(); // 书名跑步！
boy.work(); // 书名工作！
boy.sleep(); // 书名睡觉！

console.log(boy instanceof Person); // true
console.log(boy instanceof Man); // true
```

**缺点**：
1、来自原型对象的所有属性与方法被所有实例共享。
2、创建子类实例时，无法向父类构造函数传参。
3、为子类新增属性和方法，必须要在 new 父类()这样的语句之后执行，不能放到构造器中。
4、无法实现多继承。
**优点**：
1、实例是子类的实例，也是父类的实例。
2、父类新增原型方法/原型属性，所有子类都能访问到。

## 构造函数继承（对象冒充）

> 使用父类的构造函数来增强子类实例，等于把父类的实例属性、方法复制给子类（子类继承下来），但是不能
> 继承父类的原型上的属性和方法。（可以传递参数给父类）

```javascript
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
function Man(name) {
  // 构造函数继承（对象冒充）可传递给父类的参数
  Person.call(this, name);
}

let boy = new Man("Tom");
boy.run(); // Tom跑步！
boy.age; // undefined 不能继承原型上的属性
boy.sleep(); // 报错不能继承原型上的方法

console.log(boy instanceof Person); // false
console.log(boy instanceof Man); // true
```

**优点**：
1、解决了原型链中，所有子类实例共享父类引用属性和方法的问题。
2、创建子类实例时，可以向父类传递参数。
3、可以实现多继承（call 多个父类对象）。
**缺点**：
1、只能继承父类的实例属性和方法，不能继承原型属性/方法。
2、无法实现函数复用，每个子类都有父类实例函数的副本，影响性能。
4、实例并不是父类的实例，只是子类的实例。

## 组合继承（构造函数 + 原型链）

```javascript
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
```

**优点**：
1、可以继承实例属性/方法，也可以继承原型属性/方法。
2、既是子类的实例，也是父类的实例。
3、不存在引用属性共享问题。
4、子类可向父类构造函数可传参。
5、函数可复用。

**缺点**：
1、使用 `Man.prototype = new Person();` 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）（使用 `Man.prototype = Person.prototype;` 也解决了两次调用父类构造函数）

## 寄生组合继承（解决了组合继承的两次调用父类构造函数）

> 通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

```javascript
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
  this.sex = sex || "男";
}

(function() {
  // 创建一个没有实例的方法类
  let Super = function() {};
  Super.prototype = Person.prototype;
  // 将实例作为子类的原型
  Man.prototype = new Super();
  // 修复子类的构造函数指向
  Man.prototype.constructor = Man;

  // 子类新增属性和方法，必须要在 new 父类() ’new Person()‘ 这样的语句之后执行，不能放到构造器中
  Man.prototype.work = function() {
    console.log(this.name + "工作!");
  };
})();

let boy = new Man("Tom");

boy.run(); // Tom跑步！
boy.work(); // Tom工作！
boy.sleep(); // Tom睡觉！

console.log(boy instanceof Person); // true
console.log(boy instanceof Man); // true
```

## 拷贝继承

```javascript
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
```

[参考](https://www.cnblogs.com/humin/p/4556820.html)
