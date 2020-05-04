import MyReact from './my-react/react/index.js';
import MyReactDOM from './my-react/react-dom/index.js';

// https://www.babeljs.cn/repl 
const ele = (
  <div className='active' title='123'>
    hello, <span>MyReact</span>
  </div>
);
console.log('vnode ', ele);
// MyReactDOM.render('测试是字符串', document.getElementById('myroot'));

// 测试是虚拟 DOM, ele 是被 @babel/plugin-transform-react-jsx 插件转换成 js 对象
MyReactDOM.render(ele, document.getElementById('myroot'));