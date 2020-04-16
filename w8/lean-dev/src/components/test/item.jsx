import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Item extends Component {
  constructor (props) {
    super(props);
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  deleteHandler () {
    this.props.deleteHandler(this.props.index);
  }
  render() { 
    return (
      <li style={{margin: "20px 0"}}>
        {this.props.avname}===
        <span>{this.props.item}</span>
        <span style={{marginLeft: "20px"}} onClick={this.deleteHandler}>删除</span>
      </li>
    );
  }
}


Item.propTypes = {
  item: PropTypes.string,
  index: PropTypes.number.isRequired,
  deleteHandler: PropTypes.func
}

Item.defaultProps = {
  avname: 'jerry'
}
export default Item;