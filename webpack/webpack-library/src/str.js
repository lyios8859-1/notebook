import _ from 'lodash';

/**
 * 重复字符串
 * @param {*} str 
 * @param {*} len 
 */
export function repeat(str, len) {
  return str.repeat(len);
}

export function connect (a, b) {
  return _.join([a, b]);
}