
import createElementDom from './TestDemo';


test('测试 Jest DOM， createElementDom', () => {
  createElementDom();
  createElementDom();
  expect(document.getElementsByClassName('JestDom').length).toBe(2);
})