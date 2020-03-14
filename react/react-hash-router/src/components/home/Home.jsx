import React, { Component } from 'react';
import TestRedux from '../../redux/redux.jsx';
class Home extends Component {
  render() {
    return (
      <div className="detail">
        Home
        <a href='#/detail'>去detail</a>
        <TestRedux />
      </div>
    )
  }
}

export default Home;