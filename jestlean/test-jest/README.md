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
npx jest --watchAll
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