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
