- [x] 装饰器捕获异常
- [x] 接口与构造器签名
- [x] `keyof` 索引查询
- [x] TypeScript 内置的 `Partial` 可选属性
- [ ] 接口合并,函数合并,类型别名联合
- [ ] TypeScript 内置的 `Pick` 部分属性选择
- [ ] TypeScript 内置的 `Exclude` 属性排除
- [ ] TypeScript 内置的 `Omit` 属性忽略
- [ ] 类继承
- [ ] never 永不存在的值的类型


[参考](http://www.semlinker.com/ts-constructor-type/)
[参考](https://m.jb51.net/article/176528.htm)

## 装饰器捕获异常

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

## 接口与构造器签名

> 为了描述不同的类之间的一些共同点, 可以将这些相同的部分提取到一个接口 `interface` 中用于集中维护，类并关键字 `implements` 来实现这个接口.

* 构造签名

> 如下: 接口 `Point` 中的 `new (x: number, y: number): Point;` 就叫构造签名.
```ts
interface Point {
  new (x: number, y: number): Point;
}
```

> 1. 包含一个或多个构造签名的对象类型被称为构造函数类型；
> 2. 构造函数类型可以使用构造函数类型字面量或包含构造签名的对象类型字面量来编写。

构造函数类型字面量: 是包含单个构造函数签名的对象类型的简写, 如下形式:

`new < T1, T2, ... > ( p1, p2, ... ) => R` 该形式与以下对象字面量类型是等价的：`{ new < T1, T2, ... > ( p1, p2, ... ) : R }`

例如:

```ts
// 构造函数字面量
new (x: number, y: number) => Point

// 等价于以下对象类型字面量：
{
  new (x: number, y: number): Point;
}
```

* 几种常见的使用形式如下:
1. new C
2. new C ( ... )
3. new C < ... > ( ... )

```ts
interface IPerson {
  name: string;
  age: number;
  walk (): void;
}

class Human implements IPerson {
  name: string;
  age: number;
  constructor (name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  walk () {
    console.log('I am walking...');
  }
}

const man = new Human('Tom', 23);
man.walk();
```

PS: 注意到在 `Human` 类中包含 `constructor` 构造函数，如果我们想在接口中为该构造函数定义一个签名并让 `Human` 类来实现这个接口.

```ts
interface IPerson {
  new (x: string, y: number): Human;
  name: string;
  age: number;
  walk (): void;
}

/*
编译报错:
Class 'Human' incorrectly implements interface 'IPerson'.
  Type 'Human' provides no match for the signature 'new (x: string, y: number): Human'.
*/
class Human implements IPerson {
  name: string;
  age: number;
  constructor (name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  walk () {
    console.log('I am walking...');
  }
}

const man = new Human('Tom', 23);
man.walk();
```

PS: 这样写, TypeScript 是不会编译通过的.
```ts
interface IPerson {
  new (x: string, y: number): Human;
  name: string;
  age: number;
  walk (): void;
}
```
TypeScript编译出错，告诉我们错误地实现了 IPerson 接口，这是因为当一个类实现一个接口时，只会对实例部分进行编译检查，类的静态部分是不会被编译器检查的。因此就直接操作类的静态部分.

```ts
interface HumanConstructor {
  new (x: string, y: number): Human; // 单个构造签名
}
interface IPerson {
  name: string;
  age: number;
  walk (): void;
}

class Human implements IPerson {
  name: string;
  age: number;
  constructor (name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  walk () {
    console.log('I am walking...');
  }
}

// 工厂函数
function createHuman(constructor: HumanConstructor, name: string, age: number): IPerson {
  return new constructor(name, age);
}

// 此时当我们调用 createHuman 工厂函数, 把构造函数作为第一个参数传入时, 编译器便会检查第一个参数是否符合 HumanConstructor 接口的构造器签名
const man = createHuman(Human, 'Tom', 99);
man.walk();
```

## keyof 索引查询

> 在 TypeScript 中的 `keyof` 有点类似于 JavaScript 中的 `Object.keys()` 方法，但**前者遍历的是类型中的字符串索引**，**后者遍历的是对象中的键名**.
> 通过使用 `keyof` 来限制函数的参数名 property 必须被包含在类型 Rectangle 的所有字符串索引中, 如果没有被包含, 则编译器会报错

```ts
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

type keys = keyof Rectangle; // 等价于 type keys = 'x' | 'y' | 'width' | 'height';

// 这里使用了泛型，强制要求第二个参数的参数名必须包含在第一个参数的所有字符串索引中
function getRectProperty<T extends object, K extends keyof T>(rect: T, property: K): T[K] {
  return rect[property];
}

const rect: Rectangle = {
  x: 50,
  y: 50,
  width: 100,
  height: 200
};

console.log(getRectProperty(rect, 'height')); // 200

// 编译报错: Argument of type '"notExist"' is not assignable to parameter of type '"width" | "x" | "y" | "height"'.
// console.log(getRectProperty(rect, 'notExist'));
```

## Partial 可选属性

> 希望类型中的所有属性都不是必需的，只有在某些条件下才存在，可以使用 TypeScript 内置的  `Partial` 来将已声明的类型中的所有属性标识为可选的.

```ts

```