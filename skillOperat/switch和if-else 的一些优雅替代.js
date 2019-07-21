let baseConf = [
  ['animal', ['Dog', 'Cat', 'Pig']],
  ['fruits', ['Appel', 'Peach', 'Orange']],
  ['pepple', { name: 'Tom', age: 32 }],
]
const map = new Map(baseConf);
map.set('book', ['Math', 'physical']);

function getConf(type) {
  return map.get(type);
}

let info = getConf('animal');
console.log(info);


// 或者

const baseConf1 = {
  'animal': ['Dog', 'Cat', 'Pig'],
  'fruits': ['Appel', 'Peach', 'Orange'],
  'pepple': { name: 'Tom', age: 32 },
}

function getConf1(type) {
  return baseConf1[type] || [];
}

let info1 = getConf('animal');
console.log(info1);
