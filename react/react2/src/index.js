import React from 'react';
import ReactDom from 'react-dom';
import Welcome from './components/index.jsx';
import './reset.less';

ReactDom.render(
  <Welcome name={'World'}/>,
  document.querySelector('#app')
);
