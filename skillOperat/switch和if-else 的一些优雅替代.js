// 方法一 map
let baseConf = [
  ['animal', ['Dog', 'Cat', 'Pig']],
  ['fruits', ['Appel', 'Peach', 'Orange']],
  ['pepple', { name: 'Tom', age: 32 }],
];

const map = new Map(baseConf);
map.set('book', ['Math', 'physical']);
function getConf(type) {
  return map.get(type) || [];
}
let info = getConf('animal');
// console.log(info);


// 方法二： 对象
const baseConf1 = {
  'animal': ['Dog', 'Cat', 'Pig'],
  'fruits': ['Appel', 'Peach', 'Orange'],
  'pepple': { name: 'Tom', age: 32 },
};
function getConf1(type) {
  return baseConf1[type] || [];
}
let info1 = getConf('pepple');
// console.log(info1);

// Map对象和Object对象有什么区别呢？
// 1, 一个对象通常都有自己的原型，所以一个对象总有一个"prototype"键。
// 2, 一个对象的键只能是字符串或者Symbols，但一个Map的键可以是任意值。
// 3, 你可以通过size属性很容易地得到一个Map的键值对个数，而对象的键值对个数只能手动确认。

// 方法三：map + 其他字符状态
let baseConf2 = [
  ['animal_1', (value) => {console.log(value)}],
  ['animal_2', (value) => {console.log(value)}],
  ['fruits_1', (value) => {console.log(value)}],
  ['fruits_2', (value) => {console.log(value)}],
  ['pepple', (value) => {console.log(value)}],
];

const map2 = new Map(baseConf2);
map2.set('book', ['Math', 'physical']);

// 字符串拼接方式
function getConf2(type, status) {
  return map2.get(`${type}_${status}`) || function(){console.log('default')};
}
let info2 = getConf2('animal', 1);
// info2({name: 'Tom'});

// 方法四：map + 其他字符状态（对象做key）
let baseConf3 = [
  [{type: 'animal', status: 1}, (value) => {console.log(value)}],
  [{type: 'animal', status: 2}, (value) => {console.log(value)}],
  [{type: 'animal', status: 2}, (value) => {console.log(value)}],
  [{type: 'animal', status: 2}, (value) => {console.log(value)}],
  [{type: 'fruits', status: 1}, (value) => {console.log(value)}],
  [{type: 'fruits', status: 3}, (value) => {console.log(value)}],
  [{type: 'pepple', status: 1}, (value) => {console.log(value)}],
  // ['pepple', (value) => {console.log(value)}], map特点的键（字符串）是不能重复的（只能存在一个），因此不能这么书写，对象是一个引用，特殊
  // ['pepple', (value) => {console.log(value)}],
  // ['pepple', (value) => {console.log(value)}],
];

const map3 = new Map(baseConf3);
// 数组过滤方式
function getConf3(type, status) {
  let action = [...map3].filter(([key,value])=>(key.type === type && key.status === status));
  let fn = [];
  action.forEach(([key,value]) => {
    fn.push(value);
  });
  return fn;
}
let info3 = getConf3('animal', 2);
// info3[0]({name: 'Tom1'});
// info3[1]({name: 'Tom2'});
// info3[2]({name: 'Tom3'});


// 方法五：map + 正则
const fnA = (value) => { console.log('>>>>', value) };
const fnB = (value) => { console.log('....', value) };
const fnC = (value) => { console.log('----', value) };

 
let baseConf4 = [
  [/^animal_[1-4]$/,fnA],
  [/^animal_5$/, fnC],
  [/^animal_5$/, fnC],
  [/^fruits_1$/, fnA],
  [/^fruits_2$/, fnB],
  [/^guest_.*$/, fnC],
];

const map4 = new Map(baseConf4);
// 字符串拼接方式
function getConf4(type, status) {
  let action = [...map4].filter(([key,value]) => {
    return key.test(`${type}_${status}`);
  });
  let fn = [];
  action.forEach(([key,value]) => {
    fn.push(value);
  });
  return fn;
}
let info4 = getConf4('animal', 5);
info4[0]({name: 'Tom1'});
info4[1]({name: 'Tom2'});
