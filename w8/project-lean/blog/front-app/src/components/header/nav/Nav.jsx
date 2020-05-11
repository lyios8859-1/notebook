import React, { Fragment } from 'react';
import './nav.less';

export default class Nav extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Fragment>
        <nav>
          <ul className="nav-ul" >
            <li className="nav-li"><span>产品</span></li>
            <li className="nav-li"><span>大数据</span></li>
            <li className="nav-li"><span>解决方案</span></li>
            <li className="nav-li"><span>社区</span></li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}