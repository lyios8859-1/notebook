import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import Store from './redux/store/index.jsx';

import Router from './router/index.jsx';
const store = Store({
  // 传递初始的数据
  user: {
    isLogin: false,
    name: 'Tomly',
    loading: false
  },
  city: {
    name: '天国'
  }
});

render(
  <Provider store={store}>
    <Router />
  </Provider>, document.getElementById('root'));