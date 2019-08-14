import Demo from './test.js';

export { Demo };
debugger;
console.log('方式但是的');
if (module.hot) {
  // 检测是否有模块热更新
  module.hot.accept();
}
