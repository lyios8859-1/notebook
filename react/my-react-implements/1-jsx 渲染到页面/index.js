import MyReact from './my-react/react/index.js';
import MyReactDOM from './my-react/react-dom/index.js';


// 函数做组件
function Home () {
  return (
    <div className='active' title='123'>
      hello, <span>MyReact</span>
    </div>
  );
}
const title = 'active';

// class Home extends MyReact.Component {

// }


const FuncComponent = <Home name={title} title='函数组件'/>;
console.log('函数做组件: ', FuncComponent);
// 测试函数组件
MyReactDOM.render(FuncComponent, document.getElementById('myroot'));