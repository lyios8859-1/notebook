import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
  componentDidMount() {
    document.addEventListener('click', () => {
      App.getComponent().then((element) => {
        document.body.appendChild(element);
      });
    }, false);
  }

  static async getComponent() {
    const {
      default: _,
    } = await import(
      /* webpackChunkName: "lodash" */
      'lodash'
    );
    const element = document.createElement('h1');
    element.innerHTML = _.join(['Tom', 'Jerry'], '@');
    return element;
  }

  render() {
    return React.createElement('div', null, '首页');
  }
}

ReactDom.render(React.createElement(App, null), document.getElementById('root'));

if (module.hot) {
  console.log('hot'); // eslint-disable-line

  module.hot.accept();
}
