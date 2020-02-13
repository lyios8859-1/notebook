function ly (callback) {
  callback && callback('Tom');
}

function instanceLy (classInstace) {
  new classInstace('ab');
}
export {
  ly,
  instanceLy
};