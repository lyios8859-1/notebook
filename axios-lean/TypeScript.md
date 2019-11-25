# TypeScript 的基础学习

## 基础类型

```javascript
// Blooean类型
const isMark: boolean = false;
// String类型
const username: string = 'Tom';
// Number类型
const num: number = 12;

// Array类型
const list: number[] = [1, 3, 4];
const list1: Array<number> = [1, 3, 4];

// Tuple 元组类型
const x: [string, number] = ['Tom', 34];
x[1] = '34'; // 不允许
x[4] = 12; // 越界,不允许

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

## 泛型

```javascript
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
