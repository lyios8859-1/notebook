// 这个文件内容会替换与 Uitl.js 文件中的内容
const Util = jest.fn();

Util.prototype.add = jest.fn(() => {
  console.log('手动模拟 add 方法');
});

Util.prototype.minus = jest.fn(() => {
  console.log('手动模拟 minus 方法');
});


export default Util;