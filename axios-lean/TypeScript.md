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
