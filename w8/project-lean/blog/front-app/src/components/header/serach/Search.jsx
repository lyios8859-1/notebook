import React, { Fragment } from 'react';
import './search.less';
export default class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Fragment>
        <div className="serach-wrap">
          搜索
        </div>
      </Fragment>
    );
  }
}