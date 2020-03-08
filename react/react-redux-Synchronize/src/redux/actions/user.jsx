import * as userConstants from '../constants/user.jsx';

export const login = (data) => {
  return {
    type: userConstants.USER_LOGIN,
    data
  }
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