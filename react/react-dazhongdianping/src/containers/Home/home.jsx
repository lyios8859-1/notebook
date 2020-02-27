import React from 'react';

function handleClick1(e) {
  e.stopPropagation();
  e.preventDefault();
  this.setState(state => ({
    isToggleOn: !state.isToggleOn
  }));
}


class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {isToggleOn: true};

    // 必须使用这种方式绑定this，否者对应的函数中的this指向不是该组件实例
    this.handleClick3 = this.handleClick3.bind(this);
  }
  handleClick2 (e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  handleClick3 (e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  componentDidMount () {
    // 渲染完成
    // ajax 请求数据
    console.log('componentDidMount');
  }
  componentDidUpdate (prevProps, prevState) {
    // 触发更新
    console.log('componentDidUpdate');
  }
  componentWillUnmount () {
    // 组件即将消失 清空一些事件，setTimout 等
  }
  render() {
    const style = {
      border: this.state.isToggleOn ? '4px solid red' : '4px solid blue',
      backgroundColor: this.state.isToggleOn ? 'blue' : 'red',
      display: 'flex',
      justifyContent: 'center',
      boxSizing: 'border-box'
    }
    return (
      <div className="home" style={style}>
        <button className="btn1" onClick={handleClick1.bind(this)}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
        <button className="btn2" onClick={this.handleClick2.bind(this)}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
        <button className="btn2" onClick={this.handleClick3}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
      </div>
    )
  }
  
}

export default Home;
