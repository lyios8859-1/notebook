import { combineReducers } from 'redux';

import user from './user.jsx';
import city from './city.jsx';

// 聚合多个 reducer
export default combineReducers({
  user,
  city
})