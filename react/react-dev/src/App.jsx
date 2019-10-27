
import React from 'react';

const App = () => (
  <div>
    <h1>d</h1>
  </div>
);
export default App;

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
