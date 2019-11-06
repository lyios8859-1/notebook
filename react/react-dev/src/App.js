import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { BrowserRouter } from 'react-router-dom';
// import { autorun } from 'mobx';
import { Provider } from 'mobx-react';
import App from './views/App.jsx';

import AppState from './store/app-store.js';

// autorun(() => {
//   console.log('>>', appState.msg);
// });

const initialState = window.INITIAL_STATE || {};
const appState = new AppState(initialState.appState);

// setInterval(() => {
//   appState.add();
// }, 1000);

const root = document.querySelector('#root');
const render = (MyComponent) => {
  // ReactDOM.hydrate( // 服务端渲染使用
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <MyComponent/>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default; // eslint-disable-line
    // console.log('热更替');
    render(NextApp);
  });
}
