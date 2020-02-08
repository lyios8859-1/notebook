import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
  componentDidMount() { // TODO
  }

  render() {
    return React.createElement('div', null, '详情');
  }
}

ReactDom.render(React.createElement(App, null), document.getElementById('root'));

if (module.hot) {
  console.log('hot'); // eslint-disable-line

  module.hot.accept();
}
