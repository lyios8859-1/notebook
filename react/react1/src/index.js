import React from "react";
import ReactDom from "react-dom";
import "./css/common.css";
import "./css/container.css";
// 使用 BrowserRouter 需要注意的是webpack的devServer中的设置：historyApiFallback: true
import { BrowserRouter, HashRouter } from "react-router-dom";
import RouterIndex from "./router/index.js";
import Header from "./components/common/header.js";
import Footer from "./components/common/footer.js";

const App = () => {
  return (
    <div className="app">
      <Header />
      <BrowserRouter>
        <RouterIndex />
      </BrowserRouter>
      <Footer />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#lyproject"));

// 配置和热更新使用（如果不使用该配置的话会刷新页面，注意：热更新不是刷新）
// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  console.log("这是webpack打包的入口文件");
  // 实现热更新
  module.hot.accept();
}
