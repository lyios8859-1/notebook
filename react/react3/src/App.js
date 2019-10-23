
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import App from './App.jsx';

// eslint-disable-next-line no-unused-vars
// import { AppContainer } from 'react-hot-loader';

// const render = Component => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component/>
//     </AppContainer>,
//     document.querySelector('#root')
//   );
// };
// render(App);

// if (module.hot) {
//   module.hot.accept('./App.jsx', () => {
//     const NextApp = require('./App.jsx').default;
//     render(NextApp);
//   });
// }

// 新的写法
// eslint-disable-next-line no-unused-vars
import { hot } from 'react-hot-loader/root';
hot(App);
const render = Component => {
  ReactDOM.render(
    <Component/>,
    document.querySelector('#root')
  );
};
render(App);
