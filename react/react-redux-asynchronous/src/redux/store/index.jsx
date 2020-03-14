import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from '../reducers/index.jsx';

/**
 * 创建 Redux store 来存放应用的状态。
 * 
 * @param {*} ininState 接受初始数据
 */
export default function Store (ininState) {
  // 第三个参数可以不传递，为了开发是调试 redux ，__REDUX_DEVTOOLS_EXTENSION__
  // return createStore(reducer, ininState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
  // 使用 compse 是为了 聚合 __REDUX_DEVTOOLS_EXTENSION__ 调试工具，如果不需要调试就直接return createStore(reducer, ininState, applyMiddleware(reduxThunk));
  return createStore(reducer, ininState, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
};