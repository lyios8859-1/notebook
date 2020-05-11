import React, { Fragment } from 'react';
import './login.less';

export default class Nav extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Fragment>
        <ul className="nav-wrap" >
          <li className="nav-item"><span>登录</span></li>
          <li className="nav-item"><span>退出</span></li>
        </ul>
      </Fragment>
    );
  }
}