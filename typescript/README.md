# TypeScript 的基础学习

> TypeScript 是 JavaScript 的 超集

* type annotation (类型注解)：开发人员告诉 TS 变量是什么类型 `let count: number; count = 124;`
* type inference (类型推断)：开发人员不指定变量的类型，让 TS 自动分析变量类型 `let count = 124;`

**注意**： 这种情况是无法自动推断的
```ts
let count;
count = 34;
```

1. 基础类型： `boolean`、`number`、`string`、`void`、`null`、`undefined`、`symbol`。
2. 对象类型：`{}`、`Class`、`function`、`[]`, `Date`

## 基础类型

```ts
// Blooean类型
const isMark: boolean = false;
// String类型
const username: string = 'Tom';
// Number类型
const num: number = 12;

// Array类型
const list: number[] = [1, 3, 4];
const list1: Array<number> = [1, 3, 4];

// Tuple 元组类型，固定的长度，固定的类型
const x: [string, number] = ['Tom', 34];
x[1] = '34'; // 不允许
x[4] = 12; // 越界,不允许

// 元组，实例
// CSV 的文件内容格式比较固定
const tupleArr: [string, string, number][] = [
  ['Tom', 'male', 34],
  ['Jerry', 'female', 34]
];

// 枚举
enum Color {
  Red=1,
  Green,
  Blue
}

function test (status: number) {
  if (status === const_status.OFF_LINE) {
    console.log(0);
  } else if (status === const_status.ON_LINE) {
    console.log(1);
  }
}

const const_status = {
  OFF_LINE: 0,
  ON_LINE: 1
};

test(1);
test(0);

// 使用枚举类型替代上面的这个 const_status, 如果不赋值给 enmu 类型的属性，那么值是从 0 开始递增
enum enum_status {
  OFF_LINE,
  ON_LINE
};

test(enum_status.OFF_LINE);
test(enum_status.ON_LINE);

// null 和 undefined 类型
let u: undefined = undefined;
let u: null = undefined;
// 子类型可以赋值给父类型 但是如下例子--strictNullChecks 的严格模式是不可以的,, `--target es2015 表示编译后符合es6的规则`

// 如下: --strictNullChecks 开始严格模式会编译不通过
// tsc index.ts --strictNullChecks
let num: number;
num = null;

// 解决方案: 联合类型
let num1: number | null = 3;
num1 = null;

// never 类型: 任何类型的子类型,也就是说他可以赋值给其他任何类型
// 表示不存在的类型,使用场景
// 场景一
function error (msg: string): never {
  throw new Error(msg);
}

function fail () {
  return error('failed');
}

// 场景二
function inifiniteLoop (): never {
  while (true) {

  }
}

// Object 类型
declare function create(o: object | null): void;

create({ name: 'Tom' });
create(null);

// any 类型
let someValue: any = 'String';
someValue = 3;

// 类型断言
let someValue: any = 'String';
let strLength: number = (someValue as string).length;
```

## 抽象类

> 不可以直接实例化，通常作为其他派生类（子类）的基类（父类）
> `abstract` 标识
> 主要作用：表示其他子类的共性的属性和方法，在继承抽象方法时，必须实现其抽象属性和方法。

```ts
abstract class Animal {
  // 抽象的方法
  abstract makeSoun(): void;
  // 实际的方法可以在子类中不必须实现
  run () {
    console.log('The animal run...');
  }
}
```

例:

```ts
abstract class Department {
  name: string = 'Tom';
  constructor (name: string) {
    this.name = name;
  }
  abstract printMeeting (): void ;
  printName (): void {
    console.log('Department name ' + this.name);
  }
}

class AccountingDepartment extends Department {
  constructor () {
    super('Accouting ad Auditiong');
  }
  printMeeting(): void {
    console.log('The Department meets!');
  }
  genterteReports (): void {
    console.log('genterteReports');
  }
}

let department: Department = new AccountingDepartment();
department.printMeeting();
department.printName();
// 因为我们规定了 AccountingDepartment 实例是一个抽象的 Department，
// 因此 department.genterteReports(); 会编译报错
// department.genterteReports();
```

## 类继承

1. 继承

```ts
class Person {
  name: string = '';
  constructor (name: string) {
    this.name = name;
  }
  getMsg (): string {
    return this.name;
  }
}

// 继承
class Child extends Person {
  age: number = 0;
  constructor (name: string, age: number) {
    super(name); // 调用父类构造函数
    this.age = age;
  }
}

const child = new Child('Tom', 33);
console.log(child.getMsg()); // 调用父类方法 
```

2. 重写父类方法

```ts
class Person {
  private type: string = 'Person'; // private 只能在当前类的内部被调用
  protected name: string = ''; // protected 当前类的内部被调用，可以在子类中调用
  public count: number = 0; // public 当前类的内部被调用，可以在子类中调用，也可以在内外部调用 
  constructor (name: string) {
    this.name = name;
  }
  getMsg (): string {
    return this.name;
  }
}

// 继承
class Child extends Person {
  age: number = 0;
  constructor (name: string, age: number) {
    super(name); // 调用父类构造函数
    this.age = age;
  }
  // 重写父类的方法
  getMsg (): string {
    // 调用父类的 name 属性
    return `My name is ${this.name}, age is ${this.age}.`;
  }
}

const child = new Child('Tom', 33);
console.log(child.getMsg()); // 如果重写了父类方法，调用的是子类的和父类同名的方法 
```

3. 静态属性和方法

```ts
// 静态变量是所有的类对象共享的数据，只能通过类名调用静态方法和属性
class Person {
  private name: string = '';
  private static count: number = 0;
  constructor (name: string) {
    this.name = name;
  }
  getMsg () {
    return this.name;
  }
  static getCount (): number {
    return this.count++;
  }
}

const person1 = new Person('tom');
console.log(person1.getMsg(), Person.getCount()); // tom 0
const person2 = new Person('jerry');
console.log(person2.getMsg(), Person.getCount()); // tom 1
```

```ts
// 静态属性和修改静态属性
class Greeter {
  static standarGreeting: string = 'Hello, Tom!!!';
  greeting: string = '';
  constructor (msg?: string) {
    this.greeting = msg;
  }
  getGreeting () {
    return this.greeting ? `Hello, ${this.greeting}!!!` : Greeter.standarGreeting;
  }
}

let greeter1: Greeter = new Greeter('Jerry');
console.log(greeter1.getGreeting()); // Hello, Jerry!!!

let greeter2: Greeter = new Greeter();
console.log(greeter2.getGreeting()); // Hello, Tom!!!

// 修改静态属性
let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standarGreeting = 'Hi Tom.'

let greeter: Greeter = new greeterMaker();
console.log(greeter.getGreeting());
```

## 泛型

```ts
// 泛型函数
function indentity<T>(arg: T): T {
  return arg;
}

function indentity<T>(arg: T[]): T[] {
  // 是 T[] 否则编译时候报错：类型“T”上不存在属性“length”。 （所以需要有泛型约束）
  console.log(arg.length);
  return arg;
}

// 泛型约束1
interface LengthInterface {
  length: number
}
function indentity<T extends LengthInterface>(arg: T): T {
  // 是 T extends LengthInterface 否则编译时候报错：类型“T”上不存在属性“length”。 （所以需要有泛型约束）
  console.log(arg.length);
  return arg;
}
indentity({ length: 2 }); // 编译通过
indentity(2); // 编译报错：类型“2”的参数不能赋给类型“LengthInterface”的参数。

// 多个类型的泛型
function test<T, K> (name: T, age: K): void {
  console.log(`姓名：${name}, 年龄：${age}`);
}
test<string, number>('Tom', 34); // 开发人员指定了泛型的类型
test('Tom', 34); // 使用了类型推断

// 泛型约束2
// K 受到 T 的类型约束
function  getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let obj = {a: 1, b: 2, c: 3};
getProperty(obj, 'a');
// 编译报错：类型“"d"”的参数不能赋给类型“"a" | "b" | "c"”的参数。
getProperty(obj, 'd');

// 泛型约束3
// 泛型的工厂函数的构造器
function create<T>(c: {new(): T}): T{
  return new c();
}
// 实例
class BeeKeeper {
  hasMask: boolean = true;
}
class LionKeeper {
  nameTag: string = 'Tom';
}
class Animal {
  nameLengs: number = 998;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
class Lion extends Animal {
  keeper: LionKeeper = new LionKeeper();
}

// 工厂函数（接收构造器）
function createInstance<T extends Animal>(c: {new(): T} /*构造器类型*/): T /*实例类型*/ {
  return new c();
}

let bee = createInstance(Bee);
console.log('bee: ', bee.keeper.hasMask);
let lion = createInstance(Lion);
console.log('lion: ', lion.keeper.nameTag);
// console.log('lion', lion.name); // 编译报错：类型“Lion”上不存在属性“name”。


// 泛型类型接口
function love<T>(arg: T): T {
  return arg;
}

let myLove1: <T>(arg: T) => T = love; // 使用泛型类型接口

// 等价于如下这个对象字面量的形式定义
let myLove2: { <T>(arg: T) } = love; // 使用泛型类型接口

// 等价于
interface Other1 {
  <T>(arg: T): T // 泛型函数
}
let myLove3: Other1 = love; // 使用泛型类型接口

// 等价于(这种方式在使用时必须指定类型) （***** 推荐的写法）
interface Other2<T> {
  (arg: T): T // 非泛型函数
}
let myLove4: Other2<string> = love; // 使用泛型类型接口

// 泛型类
class WorldInfo <T> {
  country: T;
  findWoldPositon: (x: T, y: T) => T
}

// 使用泛型类
let myWorld1 = new WorldInfo<number>();
myWorld1.country = 0;
myWorld1.findWoldPositon = function (x: number, y: number) {
  return x + y;
}

console.log(myWorld1.findWoldPositon(myWorld1.country, 3));

// 使用泛型类
let myWorld2 = new WorldInfo<string>();
myWorld2.country = 'China';
myWorld2.findWoldPositon = function (x: string, y: string) {
  return x + y;
}
console.log(myWorld2.findWoldPositon('Helle ', myWorld2.country));
```

```ts
// 泛型继承另一个类型

interface Item {
  name: string,
  age: number
}

class DataManger<T extends number | string | Item> {
  constructor (private data: T[]) {}

  getItem (index: number): T {
    return this.data[index];
  }
}

new DataManger([1]);
new DataManger(['3']);
new DataManger([
  {
    name: 'Tom',
    age: 34
  }
])
```

## 函数

```ts
// 返回一个 T 类型的函数
const func: <T>(params: T) => T = (params) => {
  return params;
}

 // 等价于
function test<T> (params: T) {
  return params;
}
const func: <T>(params: T) => T = test;
```

```ts
// a: 表达式, 有3种方式
// 参数类型, 箭头后面的是返回值类型
// 方式一
let add1: (value1: number, value2: number) => number = function (x, y) {
  return x + y;
};
// 简写方式
let add1: (value1: number, value2: number) => number = (x, y) => {
  return x + y;
};

// 方式二
let add2: (value1: number, value2: number) => number = function (x: number, y: number): number {
  return x + y;
};

// 方式三
let add3 = function (x: number, y: number): number {
  return x + y;
};

// 声明式
function getName (x: number, y: number): number {
  return x + y;
}
```

* 函数的参数的解构赋值

```ts
function getAge1 ({ x, y }: { x: number, y: number }): number {
  return x + y;
}

function getAge2 ({ x }: { x: number }): number {
  return x;
}

const age1: number = getAge1({ x: 2, y: 3 });
const age2: number = getAge2({ x: 23 });
```

## 可选参数

> 参数可选，
> 1, 必须是最后一个参数，才是可选
> 2, 最好对可选参数判断，或者默认设置
> 3, 对于使用默认非可选参数，显示传递 `undefined` 才可以

```ts
function getInfo (id: number = 0, name: string, sex?: string): string {
 return `序号： ${id}, 名字： ${name}, 性别： ${sex ? sex : '男'}`; 
}

console.log(getInfo(undefined, 'Tom', '女')); // 序号： 0, 名字： Tom, 性别： 女
console.log(getInfo(undefined, 'Jerry')); // 序号： 0, 名字： Jerry, 性别： 男
console.log(getInfo(1, 'Cat')); // 序号： 1, 名字： Cat, 性别： 男
```

## 剩余参数

```ts
function getInfo (id: number = 0, name: string, ...restInfo: string[] ): string {
  return `序号： ${id}, 名字： ${name}, 剩余信息: ${restInfo}`; 
}
console.log(getInfo(undefined, 'Tom', '女', '游泳'));
console.log(getInfo(undefined, 'Jerry', '跑步'));
console.log(getInfo(1, 'Cat', '吃鱼'));

// 使用该函数类型
let getMessage: (id: number, name: string, ...rest) => string = getInfo;
console.log(getMessage(3, 'Tiger', '吃人'));
```

## 交叉类型

```ts
// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
  let result = {} as T & U;
  for (let key in first) {
    result[key] = first[key] as any;
  }  
  for (let key in second) {
    if (!result.hasOwnProperty(key))
    result[key] = second[key] as any;
  }  
  return result;
}

class Person {
  name: string = '';
  constructor (name: string) {
    this.name = name;
  }
}

interface Loggable {
  log(): void;
}
class ConsoleLooger implements Loggable {
  log () {
    // TODO
  }
}
ty
// 交叉类型
let tom = extend(new Person('Tom'), new ConsoleLooger());
tom.name; // 可以访问 Person 的相关属性、方法
tom.log(); // 可以访问 ConsoleLooger 的相关属性、方法
```

## 联合类型

```ts
function  padingLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }

  throw new Error('Expected string or nubmer got' + padding);
}

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  // TODO
  let type: Fish | Bird;
  return type;
}

let pet = getSmallPet();
pet.layEggs();
// pet.swim(); //编译报错， 只能是调用共有的属性或方法
```

* 数组的联合类型

```ts
const arr: (number | string)[] = [1, 2, '3'];


// 对象数组类型
const arr1: {name: string, age: number}[] = [
  {
    name: 'tom',
    age: 34
  }, {
    name: 'jerry',
    age: 334
  }
];

// 等价于
// 定义类型别名 (type alias)
type User = { name: string, age: number };
// 使用类型别名 User
const arr2: User[] = [
  {
    name: 'tom',
    age: 34
  }, {
    name: 'jerry',
    age: 334
  }
];
```

```ts
// 定义类型别名 (type alias)

type User1 = { name: string, age: number };
const arr1: User1[] = [
  {
    name: 'tom',
    age: 34
  }, {
    name: 'jerry',
    age: 334
  }
];

class User2 {
  name: string;
  age: number;
}
const arr2: User2[] = [
  new User2(),
  {
    name: 'Tom',
    age: 33
  }
];
```

## 类型保护

```ts
// typeof 的类型保护
function  padingLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }

  throw new Error('Expected string or nubmer got' + padding);
}

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  let type!: Fish | Bird; // 如果我们已经确定它已经被赋值了，这个时候就需要 ! 来标识
  return type; // 如果不加 “!”，报错：变量“类型”在分配之前使用
}

let pet = getSmallPet();
// 断言, 如下使用时不太友好
if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else if ((pet as Bird).fly) {
  (pet as Bird).fly();
}
// 解决方案一：
if (isFish1(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// 类型保护之谓词 is
function isFish1 (pet: Fish | Bird): pet is Fish{
  return (pet as Fish).swim !== undefined;
}

// 解决方案二：
// 类型保护之 typeof： （typeof === '基础类型'， typeof ！== '基础类型'）
function isNumber (x: any): x is number {
  return typeof x === 'number';
}

function isString(x: any): x is string {
  return typeof x === 'string';
}

// 解决方案三：
// 类型保护之 instanceof
class Bird1 {
  fly(): void {
    console.log('Brid Fly');
  };
  layEggs(): void {
    console.log('Brid Lay Eggs.')
  };
}

// 解决方案四：
// 类型保护之 in
function getSmallPet (pet: Bird | Fish) {
  if ('fly' in pet) {
    pet.fly();
  } else {
    pet.layEggs();
  }
}
```

PS： 一般使用 联合类型，都要做类型保护处理。

## null 与 undefined

> 编译时 `--strictNullChecks` 参数的影响

```ts
// 如下代码，执行 tsc index.ts直接编译没问题
let s1 = 'foo';
s1 = null;
let s2: string | null = 'bar';
s2 = undefined;

// 如果使用 --strictNullChecks 就会编译报错
let s3 = 'foo'; // Type 'null' is not assignable to type 'string'.
s3 = null;
let s4: string | null = 'bar';
s4 = undefined; // Type 'undefined' is not assignable to type 'string | null'.
```

PS：

- 1, `null` 不能赋值给联合类型变量，或 `undefinde`
- 2, 闭包里明确确保不会为 `null`

```ts
function broken(name: string | null): string {
  function postfix (epithet: string) {
    // 这里明确调用时不可能为null，所以使用 ’!‘ 类型断言
    // 否则 tsc index.ts --strictNullChecks 编译时就报错：Object is possibly 'null'.
    return name.charAt(0) + '. The ' + epithet;
  }

  name = name || 'Tom';
  return postfix(name);
}
```

## interface 接口的继承

```ts
// 原始写法
interface Teacher {
  name: string,
  teaching_age: number
}

interface Student {
  name: string,
  age: number
}

interface Driver {
  name: string,
  driver_age: number,
  occupation: string
}

const teach: Teacher = {
  name: 'Tom',
  teaching_age: 4
}

const student: Student = {
  name: '小明',
  age: 16
}

const driver: Driver = {
  name: '李师傅',
  occupation: '司机',
  driver_age: 3
}

const getMsg = (msg: Teacher | Student | Driver) => {
  console.log(JSON.stringify(msg, null, 2));
}

getMsg(teach);
getMsg(student);
getMsg(driver);
```

```ts
// 优化写法


// 接口(提取出共性的属性)继承
interface Person {
  name: string
}

interface Teacher extends Person {
  teaching_age: number
}

interface Student extends Person {
  age: number
}

interface Driver extends Person {
  driver_age: number,
  occupation: string
}

const teach: Teacher = {
  name: 'Tom',
  teaching_age: 4
}

const student: Student = {
  name: '小明',
  age: 16
}

const driver: Driver = {
  name: '李师傅',
  occupation: '司机',
  driver_age: 3
}

const getMsg = (msg: Person) => {
  console.log(JSON.stringify(msg, null, 2));
}

getMsg(teach);
getMsg(student);
getMsg(driver);
```

## type alias (类型别名) 与 interface (接口) 区别

* 类型别名

> 不仅可以定义的是单个变量，还可以是对象

```ts
type str = string;

type Person = {
  name: string;
  age: number
}

const first_name: str = '34';
console.log(first_name);
const person: Person = {
  name: 'tom',
  age: 34
};
console.log(person)
```

* 接口

> 只能定义对象

```ts
interface str = string; // 不允许，报错

interface Person {
  name: string;
  age: number
}
```

## 只读 readonly

```ts
interface Person {
  readonly name: string;
  age: number
}

const person: Person = {
  name: 'tom',
  age: 34
};

person.name = 'jerry'; // 报错，只允许读取
console.log(person)
```

## 可扩展属性 propName

```ts
interface Person {
  readonly name: string;
  age: number;
  [propName: string]: any; // 表示可以扩展多个属性，如果不设置，下面的sex就会编译出错
}

const person: Person = {
  name: 'tom',
  age: 34,
  sex: 'male'
};

function getMsg (person: Person) {
  console.log(person)
}
getMsg(person);
```

## class 中的 getter/setter

```ts
// setter 和 getter
class Person {
  private _name: string = '';

  constructor (name: string) {
    this._name = name;
  }

  get name (): string {
    return this._name;
  }

  set name (name: string) {
    this._name = name;
  }
}

const person = new Person('tom');
console.log(person.name)
person.name = 'jerry';
console.log(person.name);
```

## ES5 的单例模式实现

```ts
// 单例模式
class Singleton {
  // 只读属性
  readonly age: number = 0;

  private static instance: Singleton;

  private _name: string;

  private constructor (age: number) {
    this.age = age;
  }

  get name (): string {
    return this._name;
  }

  set name (name: string) {
    this._name = name;
  }

  static getInstance (age: number) {
    if (!this.instance) {
      this.instance = new this(age); // 这里 new 的 this 指向 Singleton 的实例对象
    }
    return this.instance;
  }
}

const singleton1 = Singleton.getInstance(34);
singleton1.name = 'tom';
console.log(singleton1.name);
console.log(singleton1.age);
// singleton1.age = 3433; // 编译报错，只读属性不能修改

const singleton2 = Singleton.getInstance(56);
singleton2.name = 'jerry';
console.log(singleton2.name);
console.log(singleton2.age);
// singleton2.age = 3433; // 编译报错，只读属性不能修改

console.log('singleton1 === singleton2', singleton1 === singleton2);
```

## namespace 命名空间

> 编译后形成一个闭包的代码模块, 不污染全局变量，导致全局变量冲突。
> 命名空间可以嵌套，可以导出接口 (`interface`), 变量，命名空间 (`namespace`)，

```ts
namespace index {
  class Header {
    constructor () {
      const headerDom = document.createElement('header'); // 自动类型推断
      headerDom.innerHTML = '我是头部';
      document.body.appendChild(headerDom);
    }
  }

  class Main {
    constructor () {
      const mainDom = document.createElement('main'); // 自动类型推断
      mainDom.innerHTML = '我是内容';
      document.body.appendChild(mainDom);
    }
  }

  class Footer {
    constructor () {
      const footerDom = document.createElement('footer'); // 自动类型推断
      footerDom.innerHTML = '我是底部';
      document.body.appendChild(footerDom);
    }
  }

  // 如果需要外部使用，需要导出
  export class CreatePage {
    constructor () {
      new Header();
      new Main();
      new Footer();
    }
  }
}
```

编译成 js 后：

```js
"use strict";
var index;
(function (index) {
    var Header = /** @class */ (function () {
        function Header() {
            var headerDom = document.createElement('header'); // 自动类型推断
            headerDom.innerHTML = '我是头部';
            document.body.appendChild(headerDom);
        }
        return Header;
    }());
    var Main = /** @class */ (function () {
        function Main() {
            var mainDom = document.createElement('main'); // 自动类型推断
            mainDom.innerHTML = '我是内容';
            document.body.appendChild(mainDom);
        }
        return Main;
    }());
    var Footer = /** @class */ (function () {
        function Footer() {
            var footerDom = document.createElement('footer'); // 自动类型推断
            footerDom.innerHTML = '我是底部';
            document.body.appendChild(footerDom);
        }
        return Footer;
    }());
    // 如果需要外部使用，需要导出
    var CreatePage = /** @class */ (function () {
        function CreatePage() {
            new Header();
            new Main();
            new Footer();
        }
        return CreatePage;
    }());
    index.CreatePage = CreatePage;
})(index || (index = {}));
```

* 分成多个模块引用, 方案一: namespace

components.ts 模块的代码：

```ts
namespace Component {
  export class Header {
    constructor () {
      const headerDom = document.createElement('header'); // 自动类型推断
      headerDom.innerHTML = '我是头部';
      document.body.appendChild(headerDom);
    }
  }

  export class Main {
    constructor () {
      const mainDom = document.createElement('main'); // 自动类型推断
      mainDom.innerHTML = '我是内容';
      document.body.appendChild(mainDom);
    }
  }

  export class Footer {
    constructor () {
      const footerDom = document.createElement('footer'); // 自动类型推断
      footerDom.innerHTML = '我是底部';
      document.body.appendChild(footerDom);
    }
  }
}
```

index.ts 模块的代码：

**注意**：模块 `componts.ts` 的引入方式的标志： `<reference path="./componts.ts" />`

```ts
/// <reference path="./componts.ts" />

namespace index {
  // 如果需要外部使用，需要导出
  export class CreatePage {
    constructor () {
      new Component.Header();
      new Component.Main();
      new Component.Footer();
    }
  }
}
```


* 分成多个模块引用, 方案二: ES6

components.ts 模块的代码：

```ts
export class Header {
  constructor () {
    const headerDom = document.createElement('header'); // 自动类型推断
    headerDom.innerHTML = '我是头部';
    document.body.appendChild(headerDom);
  }
}

export class Main {
  constructor () {
    const mainDom = document.createElement('main'); // 自动类型推断
    mainDom.innerHTML = '我是内容';
    document.body.appendChild(mainDom);
  }
}

export class Footer {
  constructor () {
    const footerDom = document.createElement('footer'); // 自动类型推断
    footerDom.innerHTML = '我是底部';
    document.body.appendChild(footerDom);
  }
}
```

index.ts 模块的代码：


**注意**：模块 `componts.ts` 的引入方式的标志： ES6的模块导出，引入方式（强烈推荐）`import { Header, Main, Footer} from './componts';`

```ts
import { Header, Main, Footer} from './componts';

// 如果需要外部使用，需要导出
export class CreatePage {
  constructor () {
    new Header();
    new Main();
    new Footer();
  }
}
```

## 类的装饰器

> 类的装饰器函数接收的参数是类的构造函数，对原始类的一些扩展和修改。

一般装饰器的写法（ts的编辑器提示不友好）

```ts
function decorator (constructor: any) {
  console.log('decotator');
}

@decorator
class Test { }

const test = new Test();

// 如果传递参数
function decorator (flag: boolean) {
  if (flag) {
    return function (constructor: any) {
      constructor.prototype.getName = () => {
        console.log('tom');
      }
    }
  } else {
    return function (constructor: any) {}
  }
}

@decorator(true)
class Test { }
const test = new Test();
(test as any).getName(); // 不做类型断言就编译不通过
```

通用的写法：（ts的编辑器提示也不友好）

```ts
function dectorator<T extends new (...args: any[]) => any> (constructor: T) {
  return class extends constructor {
    name = '修改了原始类的name属性值';
    getName (): void {
      console.log('Jerry');
    }
  }
}

@dectorator
class Test {
  name: string;
  constructor () {
    this.name = 'tom';
  }
}

const test = new Test();
console.log(test); // class_1 { name: '修改了原始类的name属性值' }
(test as any).getName(); // 不做类型断言就编译不通过
```

工厂模式使得编辑器提示更加友好，可以把装饰器中的属性和方法提示出来（推荐）

```ts
function dectorator () {
  return function <T extends new (...args: any[]) => any> (constructor: T) {
    return class extends constructor {
      name = '修改了原始类的name属性值';
      getName (): void {
        console.log('Jerry');
      }
    }
  }
}

const Test = dectorator()(class {
  name: string;
  constructor () {
    this.name = 'tom';
  }
})

const test = new Test();
console.log(test); // class_1 { name: '修改了原始类的name属性值' }
test.getName(); // 这样就不需要类型断言了
```

## 类方法装饰器

```ts
// 参数和这个原生的基本没啥区别  Object.defineProperty(target, key, descriptor);

function getNameDecorator (target: any, key: string, descriptor: PropertyDescriptor) {
  // target：是要装饰的函数，key：是要装饰的函数的名字， descriptor：约束要装饰的函数的一些特性
  descriptor.writable = true;

}

class Test {
  name: string;
  constructor (name: string) {
    this.name = name;
  }

  @getNameDecorator
  getName () {
    return this.name;
  }
}

const test = new Test('tom');
```

## set/get 访问器的装饰器

```ts
// 参数和这个原生的基本没啥区别  Object.defineProperty(target, key, descriptor);

function setDecorator (target: any, key: string, descriptor: PropertyDescriptor) {
  // target：是要装饰的函数，key：是要装饰的函数的名字， descriptor：约束要装饰的函数的一些特性
  descriptor.writable = false;
}

class Test {
  private _name: string;
  constructor (name: string) {
    this._name = name;
  }

  get name () {
    return this._name;
  }

  @setDecorator
  set name (name: string) {
    this._name = name;
  }
}

const test = new Test('tom');
// test.name = '343'; // descriptor.writable = false; 装饰器设置不可修改，运行时报错。
console.log(test.name)
```

## 类属性的装饰器

```ts
function nameDecorator (target: any, key: any): any {
  const descriptor: PropertyDescriptor = {
    writable: false
  };
  return descriptor;
}

class Test {
  @nameDecorator
  name: string;
  constructor () {
    this.name = 'tom'
  }
}

const test = new Test();
console.log(test.name);
test.name = 'jerry'; // 这是不允许修改的，在装饰器中设置了不可修改
console.log(test.name);
```

如果在装饰器修改属性的值，是无效的。

```ts
function nameDecorator (target: any, key: any): any {
  // 修改原始类的属性的值，但是访问时却没有效果
  target[key] = '3333';
}

class Test {
  @nameDecorator
  name: string;
  constructor () {
    this.name = 'tom'
  }
}

const test = new Test();
console.log(test.name); // 这个name是挂载在类实例上的。这样是访问不到装饰器修改的值的，因为装饰器的值修改后是挂载到原型上了，因此通过原型(__proto__)可以访问到
console.log((test as any).__proto__.name); // 访问到了装饰器的修改的属性值
```

## 类方法参数的装饰器

```ts
/**
 * 
 * @param target 原型
 * @param methods 方法名
 * @param paramIndex 参数的位置
 */
function paramDecorator (target: any, methods: string, paramIndex: number) {
  console.log(target, methods, paramIndex);
}

class Test {
  name: string;
  constructor () {
    this.name = 'tom'
  }

  getMsg (@paramDecorator name: string) {
    return name + this.name;
  }
}

const test = new Test();
console.log(test.getMsg('ly_'));
```

## 装饰器实现一个异常捕获实例

不使用装饰器：

```ts
class Test {
  userInfo: any = undefined;

  getName () {
    try {
      return this.userInfo.name;
    } catch (error) {
      return 'userInfo.name 不存在';
    }
  }
  getAge () {
    try {
      return this.userInfo.age;
    } catch (error) {
      return 'userInfo.age 不存在';
    }
  }
}

const test = new Test();
console.log(test.getName());
```

使用装饰器：

```ts
function catchError (msg: string) {
  /**
   * 
   * @param target 原型
   * @param methods 方法名
   * @param descriptor 扩展信息
   */
  return function (target: any, methods: string, descriptor: PropertyDescriptor) {
    // console.log(target, methods, descriptor);
    const fn = descriptor.value; // 拿到对应的函数
    // 重写对应的函数
    descriptor.value = function () {
      try {
        fn();
      } catch (error) {
        console.log(msg);
      }
    }; 
  }
}

class Test {
  userInfo: any = undefined;

  @catchError('userInfo.name 不存在')
  getName () {
    return this.userInfo.name;
  }

  @catchError('userInfo.age 不存在')
  getAge () {
    return this.userInfo.age;
  }
}

const test = new Test();
test.getName();
test.getAge();
```