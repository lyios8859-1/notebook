import React, { Component } from 'react';
import _ from 'lodash';

class List extends Component {
  render() {
    return React.createElement('div', null, _.join(['This', 'is', 'Table', 'List'], ' '));
  }
}

export default List;
