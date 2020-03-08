import * as userConstants from '../constants/user.jsx';

function loginRequest () {
  return new Promise(resolve => {
    // 模拟异步请求数据
    setTimeout(() => {
      resolve({
        isLogin: true,
        nickname: 'Tomly',
        avater: 'img/avater.png'
      });
    }, 3000);
  });
}

export const login = (data) => {

  return async function (dispatch) {
    dispatch(update({
      ...data,
      loading: true
    }));

    const res = await loginRequest();

    dispatch(update({
      ...res,
      loading: false
    }));
  };
};

export const logout = (data) => {
  return {
    type: userConstants.USER_LOGOUT,
    data
  }
};

export const update = (data) => {
  return {
    type: userConstants.USER_UPDATE,
    data
  }
};

// 调用该 Actions， 需要通过 dispatch 触发