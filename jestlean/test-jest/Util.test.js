import Util from './Util.js';

let util = null;

beforeAll(() => {
  util = new Util();
});

describe('类 Util 的相关方法测试', () => {

  test('测试 add 方法', () => {
    expect(util.add(1, 3)).toBe(4);
  });

  test('测试 minus 方法', () => {
    expect(util.minus(1, 3)).toBe(-2);
  });
});

// 显然单独测试这个 Util 类，不是很复杂，那么如果在引用这个类时，进行测试呢？