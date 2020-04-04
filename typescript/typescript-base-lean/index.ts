interface Person {
  readonly name: string;
  age: number;
  [propName: string]: any; // 表示可以扩展多个属性，如果不设置，下面的sex就会编译出错
}

const person: Person = {
  name: 'tom',
  age: 34,
  sex: 'male'
};

function getMsg (person: Person) {
  console.log(person)
}
getMsg(person);