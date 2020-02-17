
import Util from './Util.js';
import referenceUtilClass from './TestDemo.js';

// 测试的时候，只需要知道是否调用了，Util 类中的方法即可，
// 由于 Util 的方法特别复杂，测试时候特别耗时，我们只需要知道调用了就行了，那么就需要模拟该 Util 类中的这些方法,
// jest.mock 发现 Uitl 这个类，会自动把类的构造函数和方法变成 jest.fn()
jest.mock('./Util.js');

test('测试 referenceUtilClass', () => {
  referenceUtilClass(1, 3);
  // toHaveBeenCalled() 表示方法是否执行了
  // 表示 referenceUtilClass 中调用了类 Util 的 add 方法，如果没有调用，则测试不通过
  expect(Util.mock.instances[0].add).toHaveBeenCalled();
  // 表示 referenceUtilClass 中调用了类 Util 的 minus 方法，如果没有调用，则测试不通过
  expect(Util.mock.instances[0].minus).toHaveBeenCalled();

})