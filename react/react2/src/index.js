import React from 'react';
import ReactDom from 'react-dom';
import Welcome from './index.jsx';

ReactDom.render(
<Welcome name={'World'}/>,
document.querySelector('#app')
);
