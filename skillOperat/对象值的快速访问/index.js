const obj = {
  boy: {
    name: 'Tom',
    hobbly: {
      play: ['run', 'read']
    },
    age: 34
  }
};
// vue的源码中的 parsePath 函数
const parsePath = function(key) {
  const args = key.split('.');
  return function(obj) {
    for (let i = 0; i < args.length; i++) {
      if (!obj) return;
      console.log(obj);
      obj = obj[args[i]];
    }
    return obj;
  };
};

function getObjValue(obj, key) {
  key = key.substring(key.indexOf('.') + 1);
  return parsePath(key)(obj);
}
console.log(getObjValue(obj, 'obj.boy.hobbly.play'));
