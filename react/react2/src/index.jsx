import React from 'react';
import './index.less';
class Welcome extends React.Component {
  constructor() {
    super();
    console.log('hello world');
  }
  render() {
    return (
      <div>
        <header>Hello, React</header>
        <h1>Hello, {this.props.name}</h1>
      </div>
    );
  }
}

export default Welcome;
