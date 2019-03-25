import Demo from "./test.js";

/**
 * 你好
 */
function Test() {
  // To Do
  console.log("Hello World!!!");
}

export { Demo, Test };

if (module.hot) {
  // 检测是否有模块热更新
  module.hot.accept();
}
