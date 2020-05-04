import * as cityConstants from '../constants/city.jsx';

export const login = (data) => {
  return {
    type: cityConstants.CITY_NAME,
    data
  }
};

export const logout = (data) => {
  return {
    type: cityConstants.CITY_AREA,
    data
  }
};

// 调用该 Actions， 需要通过 dispatch 触发