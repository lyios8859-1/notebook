import MyReact from './my-react/react/index.js';
import MyReactDOM from './my-react/react-dom/index.js';


// 函数做组件
// function Home () {
//   return (
//     <div className='active' title='123'>
//       hello, <span>MyReact</span>
//     </div>
//   );
// }
const title = 'active';

// 类组件
class Home extends MyReact.Component {

  constructor (props) {
    super(props);
    this.state = {
      num: 0
    };
  }

  componentDidMount () {
    console.log('组件挂载后（插入 DOM 树中）立即调用...');
  }
  componentWillUnmount () {
    console.log('当组件从 DOM 中移除时会调用');
  }
  componentDidUpdate (prevProps) {
    console.log('组件在更新后会被立即调用。首次渲染不会执行此方法。...');
    // 典型用法（不要忘记比较 props）：
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
  }

  //#region 在react最新版本中,将来要遗弃的生命周期
  // 在react最新版本中,该方法即将过时，在新代码中应该避免使用它
  componentWillReceiveProps (props) {
    console.log('props:', props);
  }
  // 在react最新版本中,该生命周期方法即将过时，在新代码中应该避免使用它
  componentWillMount () {
    console.log('组件将要加载...');
  }
  // 在react最新版本中,该生命周期方法即将过时，在新代码中应该避免使用它
  componentWillUpdate() {
    console.log('组件将要更新...');
  }
  //#endregion

  handlerClick () {
    console.log(3);
    this.setState({
      num: this.state.num + 1
    });
  }
  render () {
    return (
      <div className='active' title='123'>
        hello, <span>MyReact!={this.state.num}</span>
        <button onClick={this.handlerClick.bind(this)}>点击</button>
      </div>
    );
  }
}


const ClassComponent = <Home name={title} title='类组件'/>;
console.log('类组件: ', ClassComponent);
// 测试函数组件


const ele = (
  <div className='active' title='123'>
    hello, <span>MyReact.....</span>
  </div>
);
MyReactDOM.render(ele, document.getElementById('myroot'));