// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
// import { add } from './a.js';
// add();

// import _ from 'lodash';
// const element = document.createElement('mark');
// element.innerHTML = _.join(['Tom', 'Jerry'], '@');
import './s1.css';
// 测试 code-spilttin的异步分割
async function getComponent () {
  const {default: _} = await import(/* webpackChunkName: "lodash" */'lodash');
  const element = document.createElement('h1');
  element.innerHTML = _.join(['Tom', 'Jerry'], '@');
  return element;
}

consoled.log('dd')
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
document.addEventListener('click', () => {
	getComponent().then((element) => {
		document.body.appendChild(element);
	});
},false);
if (module.hot) {
	console.log('hot');
	module.hot.accept();
}