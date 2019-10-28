import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TopicList from '../views/topic-list/index.jsx';
import TopicDeail from '../views/topic-detail/index.jsx';

export default () => [
  // exact={true} 表示严格匹配路径

  // 访问 '/' 重定向到 '/list'
  <Route path="/" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={TopicDeail} />
];
