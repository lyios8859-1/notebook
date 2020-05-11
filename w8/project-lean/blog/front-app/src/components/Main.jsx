import React, { Fragment } from 'react';

import { Nav, Serach, Login } from './header';

export default class Index extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render () {
    return (
      <Fragment>
        <header>
          <Nav />
          <Serach />
          <Login />
        </header>
      </Fragment>
    );
  }
}
