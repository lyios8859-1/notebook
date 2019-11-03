import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './views/App.jsx';
import appState from './store/app-store.js';

const root = document.querySelector('#root');
const render = (Component) => {
  // ReactDOM.hydrate( // 服务端渲染使用
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component/>
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
    console.log('热更替');
    render(NextApp);
  });
}
