import { testTimer } from "./TestDemo.js";

jest.useFakeTimers();

test('timer 测试', () => {
  const fn = jest.fn();
  testTimer(fn);
  jest.advanceTimersByTime(12000); // 表示 12 秒
  expect(fn).toHaveBeenCalledTimes(2); // 表示 12 秒后 fn 被调用了 2 次
})