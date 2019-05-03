import Demo from "./test.js";

export { Demo };

if (module.hot) {
  // 检测是否有模块热更新
  module.hot.accept();
}
