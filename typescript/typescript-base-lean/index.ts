
// 接口(提取出共性的属性)继承
interface Person {
  name: string
}

interface Teacher extends Person {
  teaching_age: number
}

interface Student extends Person {
  age: number
}

interface Driver extends Person {
  driver_age: number,
  occupation: string
}

const teach: Teacher = {
  name: 'Tom',
  teaching_age: 4
}

const student: Student = {
  name: '小明',
  age: 16
}

const driver: Driver = {
  name: '李师傅',
  occupation: '司机',
  driver_age: 3
}

const getMsg = (msg: Person) => {
  console.log(JSON.stringify(msg, null, 2));
}

getMsg(teach);
getMsg(student);
getMsg(driver);