import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
// import { add } from './a.js';
// add();

import Home from './home.js';
import List from './list.js';

// import _ from 'lodash';
// const element = document.createElement('mark');
// element.innerHTML = _.join(['Tom', 'Jerry'], '@');
import './s1.css';

class App extends Component {
  // 测试 code-spilttin的异步分割
  async getComponent () {
    const {default: _} = await import(/* webpackChunkName: "lodash" */'lodash');
    const element = document.createElement('h1');
    element.innerHTML = _.join(['Tom', 'Jerry'], '@');
    return element;
  }

  componentDidMount () {
    document.addEventListener('click', () => {
      this.getComponent().then((element) => {
        document.body.appendChild(element);
      });
    },false);
  }
  
	render() {
		return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home}/>
          <Route path="/list" component={List}/>
        </div>
      </BrowserRouter>
		);
	}
}

ReactDom.render(<App />, document.getElementById('root'));

if (module.hot) {
	console.log('hot');
	module.hot.accept();
}
// 支持 serviceWorker
// if ('serviceWorker' in navigator) {  
//   window.addEventListener('load', () => {
//     // service-worker.js 是生成的文件
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }