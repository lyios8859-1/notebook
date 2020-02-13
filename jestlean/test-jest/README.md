# Jest 前端测试

## 原理

math.js 文件

```js
function add (a, b) {
  return a * b;
}

function minus (a, b) {
  return a - b;
}

function multi (a, b) {
  return a * b;
}

function division (a, b) {
  return a / b;
}

// commjs规范
module.exports = {
  add,
  minus,
  multi,
  division
}
```

math.test.js 测试文件

```js
// commjs规范 （node就是符合commjs规范）
const { add, minus, multi, division } = require('./math.js');

const addResult = add(1, 4);
const addExpected = 5;

if ( addResult !== 5) {
  throw Error(`1 + 4 应该等于${addExpected}，但是结果却是${addResult}`)
} else {
  console.log('add 方法测试通过。')
}

const minusResult = minus(1, 4);
const minusExpected = -3;

if ( minusResult !== -3) {
  throw Error(`1 - 4 应该等于${minusExpected}，但是结果却是${minusResult}`)
} else {
  console.log('minus 方法测试通过。')
}

const multiResult = multi(1, 4);
const multiExpected = 4;

if ( multiResult !== 4) {
  throw Error(`1 * 4 应该等于${multiExpected}，但是结果却是${multiResult}`)
} else {
  console.log('multi 方法测试通过。')
}

const divisionResult = division(2, 4);
const divisionExpected = 0.5;

if ( divisionResult !== 0.5) {
  throw Error(`2 / 4 应该等于${divisionExpected}，但是结果却是${divisionResult}`)
} else {
  console.log('division 方法测试通过。')
}

```

**优化一下**

```js
const { add, minus, multi, division } = require('./math.js');

function expect (result) {
  return {
    toBe: function (actual) {
      if ( result !== actual) {
        throw Error(`预期值与实际值不相等, 预期值${actual}, 结果却是${result}`)
      }
    }
  }
}

function test (desc, fn) {
  try {
    fn && fn();
    console.log(`${desc}，测试通过。`)
  } catch (e) {
    console.log(`${desc}, 测试不通过。${e}`)
  }
}

test('测试加法add, 1 + 4', function () {
  expect(add(1, 4)).toBe(5);
});

test('测试减法minus, 1 - 4', function () {
  expect(minus(1, 4)).toBe(-3);
});

test('测试乘法mutil, 1 * 4', function () {
  expect(multi(1, 4)).toBe(4);
});

test('测试除法division, 2 * 4', function () {
  expect(division(2, 4)).toBe(0.5);
});
```

运行 math.test.js

```shell
node math.test.js
```

是不是非常像测试框架的结构了 :sparkles:

常见测试框架有：Mocha + Chai 配合使用; Jest; Jasmine

## Jest 使用

```shell
npm install --save-dev jest
```

math.test.js 文件内容：

```js
// commonjs 规范
const { add, minus, multi, division } = require('./math.js');

test('测试加法add, 1 + 4', function () {
  expect(add(1, 4)).toBe(5);
});

test('测试减法minus, 1 - 4', function () {
  expect(minus(1, 4)).toBe(-3);
});

test('测试乘法mutil, 1 * 4', function () {
  expect(multi(1, 4)).toBe(4);
});

test('测试除法, 2 * 4', function () {
  expect(division(2, 4)).toBe(0.5);
});
```

运行math.test.js文件

```shell
npx jest math.test.js 
```

生成测试覆盖文件信息, 默认在 coverage 文件夹下

```shell
npx jest --coverage math.test.js
```

**支持 ES Module 方式导入**

math.js文件内容

```js
function add (a, b) {
  return a - b;
}

function minus (a, b) {
  return a - b;
}

function multi (a, b) {
  return a * b;
}

function division (a, b) {
  return a / b;
}
// ES6 规范
export {
  add,
  minus,
  multi,
  division
}
```

math.test.js 文件内容:

```js
// ES6 规范
import { add, minus, multi, division } from './math.js';

test('测试加法add, 1 + 4', function () {
  expect(add(1, 4)).toBe(5);
});

test('测试减法minus, 1 - 4', function () {
  expect(minus(1, 4)).toBe(-3);
});

test('测试乘法mutil, 1 * 4', function () {
  expect(multi(1, 4)).toBe(4);
});

test('测试除法, 2 * 4', function () {
  expect(division(2, 4)).toBe(0.5);
});
```

安装支持 ES 模块的支持插件

```shell
npm i -D @babel/core@7.4.5 @babel/preset-env@7.4.5 
```

创建 ES模块的 .babelrc 配置文件

```json
{
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```

```shell
# jest 会自动检测文件 .babelrc 文件进行语法转换
npx jest math.test.js
```

PS:  如果需要对 Jest 进行配置，运行 `npx jest --init`，会生成jest.config.js文件


## 自动检测文件变化自动进行测试

```shell
# 默认修改一个文件的内容会测试所有文件的测试用例
npx jest --watchAll

# 默认修改那个文件就对那个文件的所有测试用例进行测试
npx jest --watch
```

## Jest 常用的匹配器

1. toEqual() 判断对象
2. toBe() 判断非对象
3. toBeNull() 判断 null
4. toBeUndefined() 判断 undefined
5. toBeDefined() 判断是否定义的变量
6. toBeTruthy() 判断为真
7. toBeFalsy() 判断为假
8. toBeGreaterThan() 判断是否大于
9. toBeLessThan() 判断是否小于
10. toBeGreaterThanOrEqual() 判断是否大于等于
11. toBeLessThanOrEqual 判断是否小于等于
12. toBeCloseTo() 注意：0.1 + 0.2 通过 toEqual() 判断是不能测试通过的，所以使用toBeCloseTo()
13. toContain() 判断是否在数组中
14. toMath() 可以使用正则，判断是否在字符串中

## Jest 的命令工具 查文档

## Jest 异步代码测试

- 异步返回数据

fetchData.js 

```js
import axios from 'axios';

function fetchDatas (callback) {
  const url = 'http://localhost:8080/api/test.json'
  axios.get(url).then(function(response) {
    callback && callback(response.data);
  })
}

export {
  fetchDatas
};
```

fetchData.test.js

```js
import { fetchDatas } from './fetchData.js';

test('结果应该：{success: true}', (done) => {
  fetchDatas(data => {
    expect(data).toEqual({success: true});
    done();
  });
});
```

PS: 多了一个参数 done，执行done()函数，表示等数据请求回来才才进行下一步测试

- 异步返回 Promise 对象 

1. 方案一

fetchData.js 

```js
import axios from 'axios';

function fetchDatas (callback) {
  const url = 'http://localhost:8080/api/test.json'
  return axios.get(url);
}

export {
  fetchDatas
};
```

fetchData.test.js

```js
import { fetchDatas } from './fetchData.js';

test('结果应该：{success: true}', () => {
  return fetchDatas().then((response => {
    expect(response.data).toEqual({success: true});
  }));
});
```

PS: 如果有 catch，`expect.assertions(1);` 这里的数字 `1` 表示会执行 一次expect，如果是数字 n 个， 表示expect有几个就有expect也要执行（n与expect个数一致）
fetchData.js 

```js
import axios from 'axios';

function fetchDatas (callback) {
  const url = 'http://localhost:8080/api/test1.json' // 不存在的地址，才能通过
  return axios.get(url);
}

export {
  fetchDatas
};
```

fetchData.test.js

```js
import { fetchDatas } from './fetchData.js';

test('结果应该返回了 404', () => {
  expect.assertions(1);
  return fetchDatas().catch((err => {
    // expect(err.message.indexOf('404') > -1).toBe(true);
    expect(err.toString().indexOf('404') > -1).toBe(true);
  }));
});
```

1. 方案二


```js
import { fetchDatas } from './fetchData.js';

// 成功返回
test('结果应该返回：{success: true}', () => {
  return expect(fetchDatas()).resolves.toMatchObject({
    data: {
      success: true
    }
  });
});
// 或者 使用 ES6 语法
test('结果应该返回：{success: true}', async () => {
  await expect(fetchDatas()).resolves.toMatchObject({
    data: {
      success: true
    }
  });
});

// 请求路径不存在，返回 404
test('结果应该返回：404', () => {
  return expect(fetchDatas()).rejects.toThrow();
});
// 或者 使用 ES6 语法
test('结果应该返回：404', async () => {
  await expect(fetchDatas()).rejects.toThrow();
});
```

## Jest 中的钩子函数

Counter.js

```js
class Counter {
  constructor () {
    this.number = 0;
  }

  add () {
    this.number +=1;
  }

  minus () {
    this.number -=1;
  }
}

export default Counter;
```

Counter.test.js

```js
import Counter from './Counter.js';

let counter = null;

beforeAll(() => {
  counter = new Counter();
  console.log('beforeAll');
});

beforeEach(() => {
  console.log('beforeEach, 所有的测试实例之前都执行该钩子函数');
})

afterAll(() => {
  counter = null;
  console.log('afterAll');
});

test('测试 Counter 中的 add 方法', () => {
  counter.add();
  expect(counter.number).toBe(1);
  console.log('测试 Counter 中的 add 方法');
});

test('测试 Counter 中的 minus 方法', () => {
  counter.minus();
  expect(counter.number).toBe(0);
  console.log('测试 Counter 中的 minus 方法');
});
```

PS: 这里的 add，minus 都影响同一个变量的值，这是我们不愿看到的。如下，`beforeEach` 解决。

```js
import Counter from './Counter.js';

let counter = null;

beforeEach(() => {
  counter = new Counter(); // 每个测试用例之前都先创建一个新的实例
  console.log('beforeEach, 所有的测试实例之前都先执行该钩子函数');
})

afterEach(() => {
  counter = null;
  console.log('afterEach, 所有的测试实例之后都先执行该钩子函数');
});

test('测试 Counter 中的 add 方法', () => {
  counter.add(); // 每个测试用例之后都先创建一个新的实例
  expect(counter.number).toBe(1);
  console.log('测试 Counter 中的 add 方法');
});

test('测试 Counter 中的 minus 方法', () => {
  counter.minus();
  expect(counter.number).toBe(-1);
  console.log('测试 Counter 中的 minus 方法');
});
```
- Jest describe 分组测试

Counter.js

```js
class Counter {
  constructor () {
    this.number = 0;
  }

  add1 () {
    this.number +=1;
  }
  add2 () {
    this.number +=1;
  }

  minus1 () {
    this.number -=1;
  }

  minus2 () {
    this.number -=1;
  }
}

export default Counter;
```

Counter.test.js

```js
import Counter from './Counter.js';

// 理解为分组测试
describe('测试 Counter 类的相关函数', () => {
  let counter = null;

  beforeEach(() => {
    counter = new Counter(); // 每个测试用例之前都先创建一个新的实例
    // console.log('beforeEach, 所有的测试实例之前都先执行该钩子函数');
  })

  afterEach(() => {
    counter = null;
    // console.log('afterEach, 所有的测试实例之后都先执行该钩子函数');
  });

  describe('测试加法相关的函数', () => {
    test('测试 Counter 中的 add1 方法', () => {
      counter.add1(); // 每个测试用例之后都先创建一个新的实例
      expect(counter.number).toBe(1);
      // console.log('测试 Counter 中的 add 方法');
    });

    test('测试 Counter 中的 add2 方法', () => {
      counter.add2(); // 每个测试用例之后都先创建一个新的实例
      expect(counter.number).toBe(1);
      // console.log('测试 Counter 中的 add 方法');
    });
  });

  describe('测试减法相关的函数', () => {
    test('测试 Counter 中的 minus1 方法', () => {
      counter.minus1();
      expect(counter.number).toBe(-1);
      // console.log('测试 Counter 中的 minus 方法');
    });

    test('测试 Counter 中的 minus2 方法', () => {
      counter.minus2();
      expect(counter.number).toBe(-1);
      // console.log('测试 Counter 中的 minus 方法');
    });
  });
});
```

PS：如果忽略其他测试用例，使用 `test.only()`

```js
test.only('测试 Counter 中的 add2 方法', () => {
  counter.add2(); // 每个测试用例之后都先创建一个新的实例
  expect(counter.number).toBe(1);
  // console.log('测试 Counter 中的 add 方法');
});
```

## Jest 中的 Mock 测试回调函数

```js
function ly (callback) {
  callback && callback();
}

export {
  ly
};

// 测试
import { ly } from './TestDemo.js';

test('测试回调函数执行', () => {
  const func = jest.fn(); // Jest 生成一个Mock函数
  ly(func); // 运行自己的回调函数
  expect(func).toBeCalled();
});
```

测试回调函数返回的参数值

```js

function ly (callback) {
  callback && callback('Tom');
}

export {
  ly
};

// 测试
import { ly } from './TestDemo.js';

test('测试回调函数执行', () => {
  const func = jest.fn(); // Jest 生成一个Mock函数
  ly(func); // 运行自己的回调函数
  expect(func.mock.calls[0]).toEqual(['Tom']);
  console.log(func.mock);
  /*
  func.mock = {
    calls: [ [ 'Tom' ] ],
    instances: [ undefined ],
    invocationCallOrder: [ 1 ],
    results: [ { type: 'return', value: undefined } ]
  }
   */
});
```

模拟传递的回调函数

- 执行的都是同一个函数

```js
function ly (callback) {
  callback && callback('Tom');
}

export {
  ly
};

// 测试
import { ly } from './TestDemo.js';

test('测试回调函数执行', () => {
  // 这里书写执行的3次都是同一个函数
  const func = jest.fn(() => {
    return 'Jerry';
  }); // Jest 生成一个Mock函数
  ly(func); // 运行自己的回调函数 1 次
  ly(func); // 运行自己的回调函数 2 次
  ly(func); // 运行自己的回调函数 3 次
  expect(func.mock.calls[0]).toEqual(['Tom']);
  console.log(func.mock)
  /**
  func.mock = {
    calls: [ [ 'Tom' ], [ 'Tom' ], [ 'Tom' ] ],
    instances: [ undefined, undefined, undefined ],
    invocationCallOrder: [ 1, 2, 3 ],
    results: [
      { type: 'return', value: 'Jerry' },
      { type: 'return', value: 'Jerry' },
      { type: 'return', value: 'Jerry' }
    ]
  }
  */
});
```

- 每次执行不同的函数

```js
function ly (callback) {
  callback && callback('Tom');
}

export {
  ly
};

// 测试
import { ly } from './TestDemo.js';

test('测试回调函数执行', () => {
  const func = jest.fn(); // Jest 生成一个Mock函数
  func.mockReturnValueOnce('Jerry1');
  func.mockReturnValueOnce('Jerry2');
  func.mockReturnValueOnce('Jerry4');
  // func.mockReturnValueOnce('Jerry1').mockReturnValueOnce('Jerry2').mockReturnValueOnce('Jerry3');
  // func.mockReturnValue('Jerry1') // 所有的执行都是同一个函数
  ly(func); // 运行自己的回调函数 1 次
  ly(func); // 运行自己的回调函数 2 次
  ly(func); // 运行自己的回调函数 3 次
  expect(func.mock.calls[0]).toEqual(['Tom']);
  console.log(func.mock)
  /**
  func.mock = {
    calls: [ [ 'Tom' ], [ 'Tom' ], [ 'Tom' ] ],
    instances: [ undefined, undefined, undefined ],
    invocationCallOrder: [ 1, 2, 3 ],
    results: [
      { type: 'return', value: 'Jerry1' },
      { type: 'return', value: 'Jerry2' },
      { type: 'return', value: 'Jerry4' }
    ]
  }
  */
});
```

- Jest 测试函数的 this 指向

```js
function instanceLy (classInstace) {
  new classInstace('ab');
}
export {
  instanceLy
};

// 测试
import { instanceLy } from './TestDemo.js';

test.only('测试函数的this指向', () => {
  const func = jest.fn();
  instanceLy(func); // 运行自己的回调函数 1 次
  console.log(func.mock);
  /**
  func.mock = {
    calls: [ ['ab'] ],
    instances: [ mockConstructor {} ],  // 函数执行 this 的指向 mockConstructor
    invocationCallOrder: [ 1 ],
    results: [ { type: 'return', value: undefined } ]
  }
   */
});
```