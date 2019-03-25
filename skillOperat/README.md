# ES6 的实现私有属性

```javascript
const [_x, _y] = [Symbol.for("_x"), Symbol.for("_y")];

class Test {
  constructor(x = 2, y = 4) {
    this[_x] = x;
    this[_y] = y;
  }
  // 这种访问方式 new Test().length 即可
  get length() {
    const [x, y] = [this[_x], this[_y]];
    return Math.sqrt(x * x + y * y);
  }
}

const test = new Test();
let result = test.length;
console.log(result);

console.log(test[_x], test[_y]); // 这种还是可以访问的哦
console.log(test._x, test._y); // 这种是不可以访问的哦 undefined
```

# new 做了什么

```javascript
function Test() {}
let o1 = new Test();
// new Test(); 做了如下的操作

// 第一：创建一个空对象
let o1 = new Object();

// 第二：设置原型链
o1.__proto__ = Test.prototype;

// 第三：将构造函数 Test 的 this 指向 o1, 并执行构造函数 Test
Test.call(o1); // 这三步已经可以了

// 其实还有一步：判断构造函数 Test 的返回值类型
// 若是引用类型，就返回这个引用类型的对象。若是值类型或没有 return，则返回空对象 o1。
if (typeof Test.call(o1) === "object") {
  return Test.call(o1);
} else {
  return o1; // 默认返回
}
// o1
```

# Object.create 理解

创建一个没用任何属性的空对象： `Object.create(null)`，它不等同于 new Object(); 也不等同于字面量的形式 `{}`

```javascript
function Test() {}
let o1 = Object.create(Test);
let o2 = new Test();

console.log(o1 !== o2); // true
```

图解：

![Object.create() 与 new 的区别](<Object.create()与new的区别.png> "Object.create() 与 new 的区别")

简单了解一下 Object.create() 的实现：

```javascript
Object.create = function(obj) {
  let Fn = function() {};
  Fn.prototype = obj;
  return new Fn();
};
```

```javascript
let Test = function() {
  this.num = 10;
};
let o1 = new Test();
let o2 = Object.create(Test);

console.log(o1.num); // 10
console.log(o2.num); // undefined
```

```javascript
let Test = function() {
  this.num = 10;
};
Test.prototype.a = 3;
let o1 = new Test();
let o2 = Object.create(Test);

console.log(o1.num); // 10
console.log(o2.num); // undefined 不是 3
```

|   比较   |           new           |      Object.create      |
| :------: | :---------------------: | :---------------------: |
| 构造函数 |   保留原构造函数属性    |   丢失原构造函数属性    |
|  原型链  | 原构造函数prototype属性 | 原构造函数/（对象）本身 |
| 作用对象 |        function         |    function和object     |

# constructor

```javascript
function Func(){}
console.log(Func.prototype.constructor === Func);//true

let f1 = new Func();
console.log(f1.constructor === Func); // true

// instanceof 说的是在 f1 的整条[[Prototype]](也就是__proto__) 是否含有 Func.prototype 对象。
console.lot(f1 instanceof Func); // true

let aa = {};
let bb = Object.create(aa);
console.log(bb.isPrototypeOf(aa)); // false 在 aa 的 [[Prototype]] 也就是 __proto__ 上是否出现过 bb
```

**PS**: `construct` 丢失

```javascript
function Func(){}
Func.prototype = {};
let f1 = new Func();

console.log(f1.constructor === Func);//false
console.log(f1.constructor === Object);//true
```

**PS**: 不要去修改对象，如果用了，请记得检查你的原型，避免出现 `.constructor` 的丢失。

```javascript
function Func(){}
Func.prototype = {}
let f1 = new Foo();
Object.defineProperty(Func.prototype, "constructor", {
  enumerable: false,
  writeable:true,
  configureable: true,
  value: Func // 让 .constructor 指向 Func
})
```