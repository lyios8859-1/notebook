import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './child/home';
import List from './child/list';

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
    return React.createElement(BrowserRouter, null, React.createElement('div', null, React.createElement(Route, {
      path: '/',
      exact: true,
      component: Home,
    }), React.createElement(Route, {
      path: '/list',
      component: List,
    })));
  }
}

ReactDom.render(React.createElement(App, null), document.getElementById('root'));

if (module.hot) {
  console.log('hot'); // eslint-disable-line

  module.hot.accept();
}
