import React from 'react';
import { render } from 'react-dom';
import RouteMap from './router/routerMap.jsx';

// 全局的css样式
import './static/css/common/common.less';

render(<RouteMap />, document.getElementById('root'));