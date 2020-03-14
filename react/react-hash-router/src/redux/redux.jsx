import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as userActions from './actions/user.jsx';
import { USER_LOGIN, USER_LOGOUT } from './constants/user.jsx';

class TestRedux extends Component {

  testReduxHandle (e, isLogin) {
    e.stopPropagation();
    const { dispatch } = this.props;
    
    if (isLogin) {
      dispatch(userActions.logout({
        type: USER_LOGOUT
      }));
    } else {
      dispatch(userActions.login({
        type: USER_LOGIN,
        account: 'Tom',
        password: '123456'
      }));
    }
  }

  render () {
    const { isLogin, loading } = this.props.user;
    return (
      <div className="test-redux">
        <button onClick={e => this.testReduxHandle(e, isLogin)}>{ loading ? 'loading...' : 'TestReduxAsyncRequest' }</button>
        
        {
          isLogin ? '欢迎您' : '未登录'
        }
      </div>
    );
  }
}

export default connect(state => {
  // 过滤一些数据，该组件需要接收的数据
  return {
    user: state.user
  }
})(TestRedux);