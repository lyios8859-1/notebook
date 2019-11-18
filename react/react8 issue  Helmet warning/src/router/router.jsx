import React from 'react';
import { Route, Redirect } from 'react-router';
import TopicList from '../views/topic-list/index.jsx';
import TopicDeail from '../views/topic-detail/index.jsx';

// export default () => [
//   // exact={true} 表示严格匹配路径

//   // 访问 '/' 重定向到 '/list'
//   <Route key="0" path="/" render={() => <Redirect to="/list" />} exact />,
//   <Route key="1" path="/list" component={TopicList} />,
//   <Route key="2" path="/detail" component={TopicDeail} />
// ];

export default () => [
  <Route key="0" path="/" render={() => <Redirect to="/list" />} exact />,
  <Route key="1" path="/list" component={TopicList} />,
  <Route key="2" path="/detail" component={TopicDeail} />
];
