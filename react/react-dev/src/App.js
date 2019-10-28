
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import App from './views/App.jsx';

// eslint-disable-next-line no-unused-vars
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

const root = document.querySelector('#root');
const render = (Component) => {
  // ReactDOM.hydrate( // 服务端渲染使用
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component/>
      </BrowserRouter>
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
