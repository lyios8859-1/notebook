import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { add } from './a.js';
add();

import _ from 'lodash';
const element = document.createElement('mark');
element.innerHTML = _.join(['Tom', 'Jerry'], '@');

// 测试 code-spilttin的异步分割
// function getComponent () {
//     // 如果静态的一部引入报错，需要安装npm install --save-dev @babel/plugin-syntax-dynamic-import
//     return import(/* webpackChunkName: "lodash" */'lodash').then(({default: _}) => {
//         const element = document.createElement('mark');
//         element.innerHTML = _.join(['Tom', 'Jerry'], '@');
//         return element;
//     });
// }

// class App extends Component {
// 	render() {
// 		return (
// 			<div>
// 				Hello React!!!!
//       </div>
// 		);
// 	}
// }

// ReactDom.render(<App />, document.getElementById('root'));
// getComponent().then((element) => {
document.body.appendChild(element);
// });
if (module.hot) {
	console.log('hot');
	module.hot.accept();
}