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

let info = getConf('a');
console.log(map);
