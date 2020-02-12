import { fetchDatas } from './fetchData.js';

test('结果应该返回了 404', () => {
  expect.assertions(1);
  return fetchDatas().catch((err => {
    expect(err.message.indexOf('404') > -1).toBe(true);
  }));
});