import React, { Component } from 'react';
import _ from 'lodash';

class Home extends Component {
  render() {
    return React.createElement('div', null, _.join(['This', 'is', 'Table', 'Home'], ' '));
  }
}

export default Home;
