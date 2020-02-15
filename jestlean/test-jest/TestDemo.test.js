// fetchData 是异步请求数据，需要模拟，所以这种引入方式
import { fetchData } from "./TestDemo.js";

// getNumber 是同步返回数据，不需要模拟，所以这种请求方式
const { getNumber } = jest.requireActual('./TestDemo.js');

// 创建一个TestDemo.js真实请求后台数据的文件同级文件夹__mocks__下的替换真实文件内容的TestDemo.js文件，这样fetchData()就不会真实请求后台数据了
jest.mock('./TestDemo.js');

test('创建一个与TestDemo.js同级文件夹__mocks__下TestDemo.js替换真实的文件内容，测试Jest模拟ajax请求数据', () => {

  return fetchData().then(data => {
    expect(eval(data)).toEqual('Jerry');
  });
});

test('测试非异步的方法 getNumber', () => {
  expect(getNumber()).toEqual(123);
});
