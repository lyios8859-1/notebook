# TypeScript 的基础学习

> TypeScript 是 JavaScript 的 超集

* type annotation (类型注解)：开发人员告诉 TS 变量是什么类型 `let count: number; count = 124;`
* type inference (类型推断)：开发人员不指定变量的类型，让 TS 自动分析变量类型 `let count = 124;`

**注意**： 这种情况是无法自动推断的
```js
let count;
count = 34;
```

1. 基础类型： `boolean`、`number`、`string`、`void`、`null`、`undefined`、`symbol`。
2. 对象类型：`{}`、`Class`、`function`、`[]`, `Date`

## 基础类型

```typescript
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
> abstract 标识

```typescript
abstract class Animal {
  abstract makeSoun(): void;
  run () {
    console.log('The animal run...');
  }
}

// 例
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
// 因为我们规定了AccountingDepartment实例是一个抽象的Department，
// 因此department.genterteReports();会编译报错
// department.genterteReports();

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

```typescript
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

## 函数

```typescript
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

```js
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

```typescript
function getInfo (id: number = 0, name: string, sex?: string): string {
 return `序号： ${id}, 名字： ${name}, 性别： ${sex ? sex : '男'}`; 
}

console.log(getInfo(undefined, 'Tom', '女')); // 序号： 0, 名字： Tom, 性别： 女
console.log(getInfo(undefined, 'Jerry')); // 序号： 0, 名字： Jerry, 性别： 男
console.log(getInfo(1, 'Cat')); // 序号： 1, 名字： Cat, 性别： 男
```

## 剩余参数

```typescript
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

```typescript
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

```typescript
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

```js
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

```js
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

```typescript
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
```

## null 与 undefined

> 编译时 `--strictNullChecks` 参数的影响

```typescript
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

```typescript
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

## type alias (类型别名) 与 interface (接口) 区别

* 类型别名

> 不仅可以定义的是单个变量，还可以是对象

```js
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

```js
interface str = string; // 不允许，报错

interface Person {
  name: string;
  age: number
}
```

## 只读 readonly

```js
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

```js
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