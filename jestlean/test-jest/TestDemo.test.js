import { ly, instanceLy } from './TestDemo.js';

test('测试回调函数执行', () => {
  const func = jest.fn(); // Jest 生成一个Mock函数
  func.mockReturnValue('Jerry1');
  ly(func); // 运行自己的回调函数 1 次
  ly(func); // 运行自己的回调函数 2 次
  expect(func.mock.calls[0]).toEqual(['Tom']);
  expect(func.mock.results[0]).toEqual({ type: 'return', value: 'Jerry1' });
  console.log(func.mock)
  /**
  func.mock = {
    calls: [ [ 'Tom' ], [ 'Tom' ] ],
    instances: [ undefined, undefined ],
    invocationCallOrder: [ 1, 2 ],
    results: [
      { type: 'return', value: 'Jerry1' },
      { type: 'return', value: 'Jerry2' },
    ]
  }
  */
});

test.only('测试函数的this指向', () => {
  const func = jest.fn();
  console.log(func);
  instanceLy(func); // 运行自己的回调函数 1 次
  console.log(func.mock);
  /**
  func.mock = {
    calls: [ [] ],
    instances: [ mockConstructor {} ],  // 函数执行 this 的指向 mockConstructor
    invocationCallOrder: [ 1 ],
    results: [ { type: 'return', value: undefined } ]
  }
   */
});