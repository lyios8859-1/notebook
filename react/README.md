# React 基础学习

## 事件传递 this 几种方法

```js
import React, { Component } from 'react';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {isToggleOn: true};

    // 必须使用这种方式绑定this，否者对应的函数中的this指向不是该组件实例
    this.handleClick2 = this.handleClick2.bind(this);
  }
  
  handleClick1 (e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
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
    console.log(e)
    console.log(this)
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
        <p>React 事件传递组件的this处理</p>
        <button className="btn1" onClick={this.handleClick1.bind(this)}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
        <button className="btn2" onClick={this.handleClick2}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
        <button className="btn3" onClick={e => this.handleClick3(e)}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
      </div>
    )
  } 
}

export default Home;
```

## React 中是没有 数据双向绑定的，那么怎么是实现 React 的数据双向绑定呢？

```js
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nickname: '',
        username: '',
        password: ''
      },
    };
  }


  handleChange = (key, e) => {
    e.stopPropagation();
    // 这种方式可以让多个数据进行双向绑定
    const form = this.state.form;
    for (let item in this.state.form) {
      if (item === key) {
        form[item] = e.target.value
        this.setState({ form: form })
      }
    }
  }

  render() {
    const style = {
      border: '1px solid blue',
      display: 'flex',
      justifyContent: 'center',
      boxSizing: 'border-box'
    }

    return (
      <div className="home" style={style}>
        <p>React 实现数据双向绑定</p>
        {/* 给输入框绑定事件 */}
        <input type="text" onChange={this.handleChange.bind(this, 'nickname')} placeholder="请输入昵称..." />
        <input type="text" onChange={this.handleChange.bind(this, 'username')} placeholder="请输入姓名..." />
        <input type="text" onChange={this.handleChange.bind(this, 'password')} placeholder="请输入密码..." />
        <p>昵称：{this.state.form.nickname}</p>
        <hr />
        <p>姓名：{this.state.form.username}</p>
        <hr />
        <p>密码：{this.state.form.password}</p>
      </div>
    )
  }

}

export default Home;
```
