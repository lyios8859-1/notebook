
import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../router/router.jsx';

export default class App extends React.Component {
  componentDidMount () {
    // TODO
  }

  render () {
    // 这种写法报错:
    // Error: Invariant failed: You should not use <Link> outside a <Router>
    // 您不应在<Router>外使用<Link>
    // return [
    //   <div key="0">
    //     <Link to="/">首页</Link>
    //     <Link to="/detail">详情</Link>
    //   </div>,
    //   <Routes key="1"/>
    // ];
    
    return (
      <React.Fragment>
        <Link to="/">首页</Link>
        <Link to="/detail">详情</Link>
        <Routes />
      </React.Fragment>
    );
  }
}

/*
// const App = () => (
//   <div>
//     <h1>d</h1>
//   </div>
// );
// export default App;

// eslint issue:  error  Component should be written as a pure function
// react/prefer-stateless-function
// 原因是这样使用会有很多的生命周期方法,会占用空间,你可以配置忽略这个检测
// class App extends React.Component {
//   render () {
//     return (
//       <div>
//         <h1>gggggg</h1>
//       </div>
//     );
//   }
// }
// export default App;
*/
