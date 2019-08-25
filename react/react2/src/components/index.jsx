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
        <a href='http://www.baidu.com'>dfdf</a>
        <ul>
          <li>item1</li>
          <li>item2</li>
          <li>item3</li>
<li>i的的的3</li>
        </ul>
      </div>
    );
  }
}

export default Welcome;
