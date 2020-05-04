import React from 'react';
import { render } from 'react-dom';

/*
// 测试路由
import RouteMap from './router/routerMap.jsx';
// 全局的css样式
import './assets/css/common/common.less';
render(<RouteMap />, document.getElementById('root'));
*/

// 测试 Redux
import { Provider } from 'react-redux';
import TestRedux from './redux/TestRedux.jsx';
import Store from './redux/store/index.jsx';

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
    <TestRedux />
  </Provider>, document.getElementById('root'));