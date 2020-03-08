import { createStore } from 'redux';

import reducer from '../reducers/index.jsx';

/**
 * 创建 Redux store 来存放应用的状态。
 * 
 * @param {*} ininState 接受初始数据
 */
export default function Store (ininState) {
  return createStore(reducer, ininState);
};