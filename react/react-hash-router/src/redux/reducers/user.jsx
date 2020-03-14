import * as userConstants from '../constants/user.jsx';

export default function (state = {}, action) {

  switch (action.type) {
    case userConstants.USER_LOGIN : {
      return {
        ...state,
        ...action.data,
        isLogin: true
      }
    }

    case userConstants.USER_LOGOUT : {
      return {
        isLogin: false
      }
    }

    case userConstants.USER_UPDATE : {
      return {
        ...state,
        ...action.data,
        isLogin: true
      }
    }

    default: {
      return {
        ...state,
        type: 'NO_TYPES'
      }
    }
  }
}

// Actions 会触发这里的函数